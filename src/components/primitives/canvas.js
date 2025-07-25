// canvas.js

import { decimalToHex, limit } from "../../utils/number";
import { arrayMove } from "../../utils/utilities";
import { blobToDataURL, isHTMLElement } from "../../utils/DOM";
import { isArray, isBoolean, isNumber } from "../../utils/typeChecks";
// import WebGLCanvas from "../../renderer/Canvas2DtoWebGL/Canvas2DtoWebGL"

const composition = ["source-over","source-atop","source-in","source-out","destination-over","destination-atop","destination-in","destination-out","lighter","copy","xor","multiply","screen","overlay","darken","lighten","color-dodge","color-burn","hard-light","soft-light","difference","exclusion","hue","saturation","color","luminosity"]
const _OffscreenCanvas = (typeof OffscreenCanvas !== "undefined") ? true : false
const contextTypes = ["2d", "webgl", "webgl2d", "webgl2", "webgpu", "bitmaprenderer"]


/**
 * Create a multi-layered canvas (not appended to container element)
 */
class Node {

  #key = 0
  #id
  #scene
  #layers
  #container

  /**
   * Viewport constructor
   * @param {Object} cfg - {width, height, container, contextType, offscreen, layer}
   */
  constructor(cfg={}) {

    if (!cfg?.offscreen && !isHTMLElement(cfg?.container)) throw new Error("Viewport container is not a valid HTML element.")

    this.#container = cfg.container;
    this.#layers = [];
    this.#id = CEL.idCnt++;
    this.#scene = new CEL.Scene(cfg);
    const rect = this.#container.getBoundingClientRect();
    this.setSize(rect.width || cfg.width, rect.height || cfg.height);
  }

  get id() { return this.#id }
  get scene() { return this.#scene }
  get layers() { return this.#layers }
  get container() { return this.#container }
  // does the browser support OffscreenCanvas ?
  get OffscreenCanvas() { return _OffscreenCanvas }

  generateKey() {
    return this.#key++
  }

  /**
   * set viewport size in pixels and all layers in the stack which are composited into the viewport.
   * @param {number} width - viewport width in pixels
   * @param {number} height - viewport height in pixels
   * @returns {Viewport}
   */
  setSize(width, height) {
    let {width: w, height: h} = sizeSanitize(width, height)
    
    this.width = w
    this.height = h
    this.scene.setSize(w, h);

    this.layers.forEach(function (layer) {
      layer.setSize(w, h);
    });

    return this;
  }

  /**
   * add layer a layer to the viewport
   * @param {Layer} layer
   * @returns {Viewport|false}
   */
  addLayer(layer) {
    if (!(layer instanceof Layer)) return false

    this.layers.push(layer);
    layer.setSize(layer.width || this.width, layer.height || this.height);
    layer.viewport = this;
    return this;
  }

  /**
   * remove a layer from the viewport
   * @param {Layer} layer 
   * @returns {boolean}
   */
  removeLayer(layer) {
    if (!(layer instanceof Layer) ||
        !layer.index || 
        this.layers[layer.index] !== layer
    ) return false

    this.layers.splice(layer.index, 1)
    return true
  }
  /**
   * return associated hit id for coordinates - utilized for pointer events.
   * @param {number} x
   * @param {number} y
   * @returns {number} integer - returns -1 if transparent
   */
  getIntersection(x, y) {
    var layers = this.layers,
        n = layers.length - 1,
        layer,
        key;

    while (n >= 0) {
      layer = layers[n];
      key = layer.hit.getIntersection(x, y);
      if (key >= 0) {
        return key;
      }
      n--;
    }

    return -1;
  }

  /**
   * get viewport index in all CEL viewports
   * @returns {number|null}
   */
  get index() {
    let viewports = CEL.viewports,
      viewport,
      n = 0;

    for (viewport of viewports) {
      if (this.id === viewport.id) return n;
      n++;
    }

    return null;
  }

  /**
   * destroy viewport
   * free up resources
   */
  destroy() {
    // remove layers
    for (let layer of this.layers) {
      this.removeLayer(layer);
      layer.destroy()
    }
  }

  /**
   * composite layers onto canvas
   * @param {boolean} [all=false] - render all sub layers
   */
  render(all=false) {
    let {scene, layers} = this,
        layer;

    scene.clear();
    let ctx = scene.context
    if (!ctx) return 

    ctx.save();

    for (layer of layers) {

      if (all &&
          isArray(layer.layers) &&
          layer.layers.length > 0) 
          layer.render(all)

      if (layer.visible && layer.width > 0 && layer.height > 0) {

        if (composition.includes(layer?.composition))
        ctx.globalCompositeOperation = layer.composition
        ctx.globalAlpha = layer.alpha
        ctx.scale(1,1)
        ctx.drawImage(
          layer.scene.canvas,
          layer.x,
          layer.y,
          layer.width,
          layer.height
        );
      }
    }
    ctx.restore()
  }
}


/**
 * Create multi-layered canvas and appends it to a containter element
 * @class Viewport
 */
class Viewport extends Node {
/**
 * Viewport constructor
 * @param {Object} cfg - {width, height, container, contextType, offscreen, layer}
 */
  constructor(cfg={}) {

    const cfg2 = {...cfg}
    cfg2.offscreen = false
    super(cfg2)

    const canvas = this.scene.canvas
    const c = cfg.container
    if (c?.hasCanvasSlot)
      canvas.slot = "viewportCanvas"
    // clear container
    c.innerHTML = "";
    c.appendChild(canvas);

    CEL.viewports.push(this);
  }

  /**
   * destroy viewport
   */
  destroy() {
    // remove layers
    super.destroy()

    // clear dom
    this.container.innerHTML = "";

    // remove self from #viewports array
    CEL.viewports.splice(this.index, 1);
  }

}

class Layer {

  #x = 0
  #y = 0
  #width = 0
  #height = 0
  #alpha = 1
  #visible = true
  #composition = null
  #offScreen = true && _OffscreenCanvas

  viewport
  
  /**
   * Layer constructor
   * @param {Object} cfg - {x, y, width, height, contextType, offscreen}
   */
  constructor(cfg={}) {

    const c = {...cfg}
    this.id = CEL.idCnt++;
    this.#offScreen = (isBoolean(cfg?.offscreen)) ? cfg.offscreen : this.#offScreen
    c.layer = this
    c.offscreen = this.#offScreen
    this.hit = new CEL.Hit(c);
    this.scene = new CEL.Scene(c);

    if (cfg?.x && cfg?.y) {
      this.setPosition(cfg.x, cfg.y);
    }
    if (cfg?.width && cfg?.height) {
      this.setSize(cfg.width, cfg.height);
    }
    if (cfg?.composition) {
      this.composition = cfg.composition
    }
    if (cfg?.alpha) {
      this.alpha = cfg.alpha
    }
    if (cfg?.visible) {
      this.visible = cfg.visible
    }
  }

  set x(x) { if (isNumber(x)) this.#x = x }
  get x() { return this.#x }
  set y(y) { if (isNumber(y)) this.#y = y}
  get y() { return this.#y }
  set width(width) { if (isNumber(width)) this.#width = width }
  get width() { return this.#width }
  set height(height) { if (isNumber(height)) this.#height = height}
  get height() { return this.#height }
  set alpha(alpha) { this.#alpha = (isNumber(alpha))? limit(alpha, 0, 1) : 1 }
  get alpha() { return this.#alpha }
  set composition(c) { if (composition.includes(c)) this.#composition = c }
  get composition() { return this.#composition }
  set visible(v) { if (isBoolean(v)) this.#visible = v }
  get visible() { return this.#visible }
  get isOffScreen() { return this.#offScreen }

  /**
   * get layer index from viewport layers
   * @returns {Number|null}
   */
  get index() {
    let layers = this.viewport.layers,
        n = 0,
        layer;

    for (layer of layers) {
      if (this.id === layer.id) return n;
      n++;
    }
    return null;
  }

  /**
   * set layer position
   * @param {number} x
   * @param {number} y
   * @returns {Layer}
   */
  setPosition(x, y) {
    this.x = x;
    this.y = y;
    return this;
  }

  /**
   * set layer size and associated hit detection layer
   * @param {number} width
   * @param {number} height
   * @returns {Layer}
   */
  setSize(width, height) {
    let {width: w, height: h} = sizeSanitize(width, height)

    this.width = w;
    this.height = h;
    this.scene.setSize(w, h);
    this.hit.setSize(w, h);
    return this;
  }

  /**
   * change the stacking order of the layer
   * @param {string} [pos="up"|"down"|"top"|"bottom"|number] - position in layer stack
   * @returns 
   */
  move(pos) {
    let { index = 0, viewport } = this,
        layers = viewport.layers,
        order;

    if (isNumber(pos)) {
      order = limit(Math.floor(pos), (layers.length - 1) * -1, layers.length - 1)
      pos = "order"
    }

    switch (pos) {
      case "up":
        if (index < layers.length - 1) {
          // swap
          layers[index] = layers[index + 1];
          layers[index + 1] = this;
        }
        break;
      case "down":
        if (index > 0) {
          layers[index] = layers[index - 1];
          layers[index - 1] = this;
        }
        break;
      case "top":
        layers.splice(index, 1);
        layers.push(this);
        break;
      case "bottom":
        layers.splice(index, 1);
        layers.unshift(this);
        break;
      case "order":
        arrayMove(layers, this.index, order)
        break;
    }
    return this;
  }
  /**
   * move up
   * @returns {Layer}
   */
  moveUp() {
    return this.move("up")
  }
  /**
   * move down
   * @returns {Layer}
   */
  moveDown() {
    return this.move("down")
  }
  /**
   * move to top
   * @returns {Layer}
   */
  moveTop() {
    return this.move("top")
  }
  /**
   * move to bottom
   * @returns {Layer}
   */
  moveBottom() {
    return this.move("bottom")
  }
  /**
   * remove
   */
  remove() {
    // remove this layer from layers array
    return this.viewport.removeLayer(this)
  }

  destroy() {
    // setting size to 0x0 will not release all of the memory
    // however, 1x1 will ensure minimal amount of memory is consumed 
    // until the browser disposes of the canvas
    setSize(1, 1, this.scene)
    this.scene.clear()
    this.hit.clear()
  }
}


/**
 * Creates a canvas
 */
class Foundation {

  #id
  #width = 0;
  #height = 0;
  #canvas
  #offscreen = true
  #context
  #contextType
  #layer

  /**
   * Constructor
   * @param {Object} cfg - {width, height, contextType, offscreen, layer}
   */
  constructor(cfg={offscreen: true}) {
    this.#id = CEL.idCnt++;
    this.#layer = cfg?.layer
    this.#contextType = (contextTypes.includes(cfg?.contextType)) ? cfg.contextType : "2d"
    // canvas
    const canvas = document.createElement("canvas");
          canvas.className = "scene-canvas";
          canvas.style.display = "block";
    // offscreenCanvas
    cfg.offscreen = (isBoolean(cfg?.offscreen)) ? cfg.offscreen : true
    if (_OffscreenCanvas && cfg.offscreen) {
      this.#canvas = canvas.transferControlToOffscreen()
      this.#offscreen = true
    }
    else {
      this.#canvas = canvas
      this.#offscreen = false
    }
    // context
    if (this.#contextType == "webgl2d")
      // this.#context = WebGLCanvas(this.canvas)
      this.#context = this.getContext("2d");
    else
      // this.#context = this.canvas.getContext(this.contextType);
      this.#context = this.getContext(this.contextType);
    // size
    if (!!cfg?.width && !!cfg?.height) {
      this.setSize(cfg.width, cfg.height);
    } 

  }

  get id() { return this.#id }
  set width(width) { if (isNumber(width)) this.#width = width }
  get width() { return this.#width }
  set height(height) { if (isNumber(height)) this.#height = height}
  get height() { return this.#height }
  get canvas() { return this.#canvas }
  get offscreen() { return this.#offscreen }
  get contextType() { return this.#contextType }
  get context() { return this.#context }
  get layer() { return this.#layer }

  getContext(type, cfg) {
    return this.canvas.getContext(type, cfg);
  }

  getDataURL(type, quality, canvas=this.canvas) {
    if (!this.offscreen) {
      const dataURL = canvas.toDataURL(type, quality);
      return dataURL
    }
    else {
      try {
        canvas.convertToBlob()
        .then(blob => {
          blobToDataURL(blob)
          .then(dataURL => {
            return dataURL
          })
        });
      } catch (error) {
        throw error
      }

    }
  }

 /**
   * set scene size
   * @param {number} width
   * @param {number} height
   * @returns {Scene}
   */
  setSize(width, height) {
    return setSize(width, height, this);
  }

  /**
   * clear scene
   * @returns {Scene}
   */
  clear() {
    return clear(this);
  }
}

/**
 * Extends canvas functionality
 */
class Scene extends Foundation {

  /**
   * Scene constructor
   * @param {Object} cfg - {width, height, contextType, offscreen, layer}
   */
  constructor(cfg={offscreen: true}) {

    super(cfg)
  }

  /**
   * convert scene into an HTML image source
   * @param {String} type - image format "img/png"|"img/jpg"|"img/webp"
   * @param {number} quality - image quality 0 - 1
   * @param {Function} cb - callback
   */
  toImage(type = "image/png", quality, cb) {
    let that = this,
      imageObj = new Image(),
      dataURL = this.getDataURL(type, quality);

    imageObj.onload = function () {
      imageObj.width = that.width;
      imageObj.height = that.height;
      cb(imageObj);
    };
    imageObj.src = dataURL;
  }

  /**
   * export scene as an image file
   * @param {Object} cfg - {filename}
   * @param {String} type - image format "img/png"|"img/jpg"|"img/webp"
   * @param {number} quality - image quality 0 - 1
   */
  export(cfg, type = "image/png", quality) {
    if (!this.offscreen) {
      const dataURL = this.getDataURL(type, quality);
      this.invokeImageDownload(dataURL, cfg.fileName)
    }
    else {
      this.getDataURL()
      .then(dataURL => {
        this.invokeImageDownload(dataURL, cfg.fileName)
      });
    }
  }

  /**
   * export hit as an image file - for debugging / testing purposes
   * @param {Object} cfg - {filename}
   * @param {String} type - image format "img/png"|"img/jpg"|"img/webp"
   * @param {number} quality - image quality 0 - 1
   */
  exportHit(cfg, type = "image/png", quality) {
    const dataURL = this.getDataURL(type, quality, this.layer.hit.canvas);
    this.invokeImageDownload(dataURL, cfg.fileName)
  }

  invokeImageDownload(dataURL, fileName) {
    let anchor = document.createElement("a");

    // set <a></a> attributes
    anchor.setAttribute("href", dataURL);
    anchor.setAttribute("target", "_blank");
    anchor.setAttribute("download", fileName || "canvas.png");

    // invoke click
    if (document.createEvent) {
      Object.assign(document.createElement("a"), {
        href: dataURL,
        target: "_blank",
        download: fileName,
      }).click();
    } 
    else if (anchor.click) {
      anchor.click();
    }
  }
}

/**
 * Provides canvas hit detection
 */
class Hit extends Foundation {

  /**
   * Hit constructor
   * @param {Object} cfg - {width, height, contextType, layer, offscreen}
   */
  constructor(cfg={}) {

    super(cfg)
  }

  getContext(type) {
    return super.getContext(type, {
      // add preserveDrawingBuffer to pick colours with readPixels for hit detection
      preserveDrawingBuffer: true,
      // fix webgl antialiasing picking issue
      antialias: false,
    });
  }

  /**
   * Test if a hit for coordinates. This can be used for pointer interactivity.
   * @param {number} x
   * @param {number} y
   * @returns {number} layer index (integer) - returns -1 if no pixel is there
   */
  getIntersection(x, y) {
    let ctx = this.context,
        data;

    x = Math.round(x - this.layer.x);
    y = Math.round(y - this.layer.y);

    // if x or y are out of bounds return -1
    if (x < 0 || y < 0 || x > this.width || y > this.height) {
      return -1;
    }

    // 2d
    if (this.contextType === "2d") {
      data = ctx.getImageData(x, y, 1, 1).data;

      if (data[3] < 255) {
        return -1;
      }
    }
    // webgl
    else {
      data = new Uint8Array(4);
      ctx.readPixels(
        x * CEL.pixelRatio,
        (this.height - y - 1) * CEL.pixelRatio,
        1,
        1,
        ctx.RGBA,
        ctx.UNSIGNED_BYTE,
        data
      );

      if (data[0] === 255 && data[1] === 255 && data[2] === 255) {
        return -1;
      }
    }

    return this.rgbToInt(data);
  }
  /**
   * get canvas formatted colour string from data index
   * @param {number} index
   * @returns {String}
   */
  getIndexToRGB(index) {
    return `#${decimalToHex(index).padStart(6, '0')}`
  }
  /**
   * converts rgb array to integer value
   * @param {Array} rgb - [r,g,b]
   * @returns {number}
   */
  rgbToInt(rgb) {
    let r = rgb[0];
    let g = rgb[1];
    let b = rgb[2];
    return (r << 16) + (g << 8) + b;
  }
  /**
   * converts integer value to rgb array
   * @param {number} number - positive number between 0 and 256*256*256 = 16,777,216
   * @returns {array}
   */
  intToRGB(number) {
    let r = (number & 0xff0000) >> 16;
    let g = (number & 0x00ff00) >> 8;
    let b = number & 0x0000ff;
    return [r, g, b];
  }
}
// end of class Hit

function clear(that) {
  let context = that.context;
  const dpr = windowDevicePixelRatio()

  if (that.contextType === "2d") {
    // Save the current transform
    context.save();
    // Reset the transform to clear the entire canvas
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, that.canvas.width, that.canvas.height);
    // Restore the transform
    context.restore();
  }
  // webgl or webgl2
  else {
    context.clear(context.COLOR_BUFFER_BIT | context.DEPTH_BUFFER_BIT);
  }
  return that;
}

function windowDevicePixelRatio() {
  return (window && window.devicePixelRatio) || 1;
}

function sizeSanitize(width, height) {
  if (width < 0) width = 0
  if (height < 0) height = 0
  return {width, height}
}

function setSize(width, height, scene) {
  let {width: w, height: h} = sizeSanitize(width, height)
  const dpr = windowDevicePixelRatio()

  scene.width = w;
  scene.height = h;

  // Set the buffer size (actual pixels)
  scene.canvas.width = Math.round(w * dpr);
  scene.canvas.height = Math.round(h * dpr);
  
  // Scale all drawing operations by the dpr
  if (scene.contextType === "2d") {
    scene.context.scale(dpr, dpr)
  }

  if (!scene.offscreen) {
    // Set the display size (css pixels)
    scene.canvas.style.width = `${w}px`;
    scene.canvas.style.height = `${h}px`;
  }

  if (scene.contextType !== "2d" &&
      scene.contextType !== "bitmaprenderer") {
    scene.context.viewport(0, 0, scene.canvas.width, scene.canvas.height);
  }

  return scene;
}

// Canvas Extension Layers
const CEL = {
  idCnt: 0,
  viewports: [],
  get pixelRatio() { return windowDevicePixelRatio() },

  Node,
  Viewport,
  Layer,
  Scene,
  Hit,
};

export default CEL
