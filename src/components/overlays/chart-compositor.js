// chart-assembler.js

import { isArray } from "../../utils/typeChecks"


export default class chartCompositor {

  #parent
  #core
  #config = {}
  #theme
  #xAxis
  #yAxis
  #target
  #scene
  #params

  constructor(target, xAxis=false, yAxis=false, theme, parent, params) {

    this.#parent = parent
    this.#core = parent.core
    this.#target = target
    this.#scene = target.scene
    this.#theme = theme
    this.#params = params
    this.#config.components = params?.components || []
  }

  set position(p) { this.#target.setPosition(0, 0) }

  draw() {

    this.#scene.clear()

    let x,y,h,w
    const ctx = this.#scene.context
    ctx.save();

    const chart = this.#core.MainPane.chart
    this.#scene.context.drawImage(
      chart.graph.viewport.scene.canvas,
      0,
      0,
      chart.graph.viewport.scene.width,
      chart.graph.viewport.scene.height
    );

    y = chart.height
    for (let oc of this.#core.MainPane.offCharts.values()) {
      x = 0
      h = oc.graph.viewport.scene.height
      this.#scene.context.drawImage(
        oc.graph.viewport.scene.canvas,
        x,
        y,
        oc.graph.viewport.scene.width,
        h
      );
      x += h
    }

    const time = this.#core.MainPane.time
    const rowsH = this.#core.MainPane.rowsH
    x = 0
    y = rowsH
    this.#scene.context.drawImage(
      time.graph.viewport.scene.canvas,
      x,
      y,
      time.graph.viewport.scene.width,
      time.graph.viewport.scene.height
    );


    ctx.restore();
  }

}

