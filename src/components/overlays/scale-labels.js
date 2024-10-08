// scale-labels.js
// draw scale values and tick markers

import Overlay from "./overlay"
import { isBoolean } from "../../utils/typeChecks"

export default class ScaleLabels extends Overlay {

  constructor(target, xAxis, yAxis, theme, parent, params) {

    parent = yAxis
    yAxis = yAxis.yAxis

    super(target, xAxis, yAxis, theme, parent, params)

    this.viewport = target.viewport
  }

  set position(p) { this.target.setPosition(p[0], p[1]) }
  get always() { return true }

  draw() {
    if (!super.mustUpdate()) return

    const ctx = this.scene.context
    const yAxis = this.yAxis
    const grads = yAxis.yAxisGrads || []
    const theme = this.theme.yAxis
    const tickMarker = (isBoolean(theme.tickMarker)) ? theme.tickMarker : true
      let tickPos = []
      let y

    switch (theme?.location) {
      case "left": tickPos = [this.width, this.width - yAxis.yAxisTicks]; break;
      case "right":
      default: tickPos = [1, yAxis.yAxisTicks]; break;
    }

    this.scene.clear()
    ctx.save()
    ctx.strokeStyle = theme.colourTick
    ctx.fillStyle = theme.colourTick
    ctx.font = `${theme.fontWeight} ${theme.fontSize}px ${theme.fontFamily}`
    for (let tick of grads) {
      y = yAxis.yPos(tick[0])
      ctx.fillText(tick[0], yAxis.yAxisTicks + 5, y + (theme.fontSize * 0.3))

      if (tickMarker) {
        ctx.beginPath()
        ctx.moveTo(tickPos[0], y)
        ctx.lineTo(tickPos[1], y)
        ctx.stroke()
      }
    }
    ctx.restore()

    super.updated()
  }
}

