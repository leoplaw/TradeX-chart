// cursor.js
// dummy class

import { isArray, isBoolean, isNumber, isObject, isString } from '../utils/typeChecks'
import { debounce, idSanitize, uid } from '../utils/utilities';
import { ChartTool } from "../components/overlays/chart-tools"
import State from '../state/chart-state';
import { HIT_DEBOUNCE } from '../definitions/core';

let nameShort = "Cursor"
let nameLong = 'Cursor'

export default class Cursor extends ChartTool {

  static #cnt = 0
  static get inCnt() { return Cursor.#cnt++ }

  get name() { return nameLong }
  get shortName() { return nameShort }

  constructor(cfg) {

    const { target, xAxis=false, yAxis=false, theme, parent, params } = cfg
    super(target, xAxis, yAxis, theme, parent, params)
    this.settings = params.settings
    State.importData("tradesPositions", this.data, this.state, this.state.time.timeFrame)
  }

  get inCnt() { return Cursor.#cnt }

  draw() {}
}
