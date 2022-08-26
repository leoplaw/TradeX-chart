// const { Chart } = require("../dist/tradex-chart.es.js")
// const state = require ('../data/data.json')
import { Chart } from "dist/tradex-chart.es.js"
import state from 'data/data.json'

const mount = document.getElementById('test')
const config = {
  id: "TradeX_test",
  title: "BTC/USDT",
  width: 1000,
  height: 800,
  rangeLimit: 30,
  theme: {
    candleType: "CANDLE_SOLID",
    onchartVolumeH: 15,
  },
  isCrypto: true,
  logs: false,
  infos: true,
  warnings: true,
  errors: true,
}
const chart = Chart.create(mount, config, state )
window.chart = chart
chart.start(chart.getModID())

console.log("API: id:", chart.id)
console.log("API: name:", chart.name)
console.log("API: height:", chart.height)

function internals() {
  const data = {}
  const tx = chart.Timeline.xAxis

  data.rangeLength = [`range.length:`,`${tx.range.Length}`]
  data.rangeIntervalStr = [`range.intervalStr:`,`${tx.range.intervalStr}`]
  data.rangeStart = ["range.indexStart: ", new Date(tx.range.value(tx.indexStart)[0])]
  data.rangeEnd = ["range.indexEnd: ", new Date(tx.range.value(tx.indexEnd)[0])]
  data.scrollPos = ["scrollPos:", chart.scrollPos]
  data.bufferPx = ["bufferPx:", chart.bufferPx]
  data.gradsTimeSpan = ["grads.timeSpan: ", tx.xAxisGrads.timeSpan]
  data.gradsUnits = ["grads.units: ", JSON.stringify(tx.xAxisGrads.units)]
  data.gradsMajor = ["grads.major: ", tx.xAxisGrads.majorTick]
  data.gradsMinor = ["grads.minor: ", tx.xAxisGrads.minorTick]
  data.gradsInc = ["grads.inc: ", tx.xAxisGrads.inc]
  // data.gradsValues = ["grads.values: ", JSON.stringify(tx.xAxisGrads.values)]

  return data
}

const infoBox = {}
      infoBox.el = document.getElementById('info')
      infoBox.out = function (info) {
        let inf = `<ul style="color:#FFF; text-align:left;">`
        for (let i in info) {
          inf += `<li>${info[i][0]} <span>${info[i][1]}</span></li>`
        }
        inf += "</ul>"
        infoBox.el.innerHTML = inf
      }

chart.on("chart_zoom", (e) => { infoBox.out(internals()) })
chart.on("chart_pan", (e) => { infoBox.out(internals()) })
infoBox.out(internals())
// test()