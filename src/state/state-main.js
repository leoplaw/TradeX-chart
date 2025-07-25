// state-mainPain.js

import { isObject } from "../utils/typeChecks"

export default
{
  id: "main",
  initial: "idle",
  context: {},
  states: {
    idle: {
      onEnter(data) {
        // console.log(`${this.id}: state: "${this.state}" - onEnter`)
      },
      onExit(data) {
        // console.log(`${this.id}: state: "${this.state}" - onExit (${this.event})`)
      },
      on: {
        global_resize: {
          target: 'global_resize',
          action (data) {
            // console.log('secondaryPane: transition from "idle" to "chart_IndicatorAdd" state')
          },
        },
        chart_paneMaximize: {
          target: 'chart_paneMaximize',
          action (data) {}
        },
        range_set: {
          target: 'range_set',
          action (data) {
            // console.log(`${this.id}: transition from "${this.state}" to  "range_set"`)
          },
        },
        chart_pan: {
          target: 'chart_pan',
          action (data) {
            // console.log(`${this.id}: transition from "${this.state}" to  "chart_pan"`)
          },
        },
        chart_scrollTo: {
          target: 'chart_scrollTo',
          action (data) {
            // console.log(`${this.id}: transition from "${this.state}" to  "chart_scrollTo"`)
          },
        },
        divider_pointerDrag: {
          target: 'divider_pointerDrag',
          action (data) {
            // console.log('secondaryPane: transition from "idle" to "divider_pointerDrag" state')
            this.context.currCursor = this.context.origin.cursor
            this.context.origin.cursor = "row-resize"
          },
        },
        chart_IndicatorAdd: {
          target: 'chart_IndicatorAdd',
          action (data) {
            // console.log('secondaryPane: transition from "idle" to "chart_IndicatorAdd" state')
          },
        },
        chart_ToolActive: {
          target: 'chart_ToolActive',
          action (data) {
            // console.log('secondaryPane: transition from "idle" to "chart_IndicatorAdd" state')
          },
        },
        chart_ToolInactive: {
          target: 'chart_ToolInactive',
          action (data) {
            // console.log('secondaryPane: transition from "idle" to "chart_IndicatorAdd" state')
          },
        },
      }
    },
    global_resize: {
      onEnter(data) {
        // console.log(`${this.id}: state: "${this.state}" - onEnter`)
        this.context.origin.setDimensions()
      },
      onExit(data) {
        // console.log(`${this.id}: state: "${this.state}" - onExit (${this.event})`)
      },
      on: {
        always: {
          target: 'idle',
          condition: 'resizeDone',
          action (data) {
            // console.log(`${this.id}: transition from "${this.state}" to "idle"`)
          },
        },
      },
    },
    chart_paneMaximize: {
      onEnter (data) {},
      onExit (data) {},
      on: {
        always: {
          target: 'idle',
          action (data) {
            // console.log(`${this.id}: transition from "${this.state}" to "idle"`)
            this.context.maximize = "some pane pointer"
            // this.context.origin.updateRange(data) 
          },
        },
      }
    },
    range_set: {
      onEnter (data) {
        // console.log(`${this.id}: state: "${this.state}" - onEnter`)
      },
      onExit (data) {
        // console.log(`${this.id}: state: "${this.state}" - onExit (${this.event})`)
      },
      on: {
        always: {
          target: 'idle',
          condition: 'zoomDone',
          action (data) {
            // console.log(`${this.id}: transition from "${this.state}" to "idle"`)
            this.context.origin.zoomRange(data) 
          },
        },
      }
    },
    chart_pan: {
      onEnter (data) {
        // console.log(`${this.id}: state: "${this.state}" - onEnter`)
        this.context.origin.cursor = "grab"
      },
      onExit (data) {
        // console.log(`${this.id}: state: "${this.state}" - onExit (${this.event})`)
      },
      on: {
        chart_pan: {
          target: 'chart_pan',
          action (data) {
            // console.log(`${this.id}: transition from "${this.state}" to "chart_pan"`)
            this.context.origin.updateRange(data) 
            this.context.origin.cursor = "grab"
          },
        },
        chart_panDone: {
          target: 'idle',
          action (data) {
            // console.log(`${this.id}: transition from "${this.state}" to "chart_panDone"`)
            this.context.origin.updateRange(data) 
            this.context.origin.cursor = "default"
          },
        },
      }
    },
    chart_scrollTo: {
      onEnter (data) {
        // console.log(`${this.id}: state: "${this.state}" - onEnter`)
      },
      onExit (data) {
        // console.log(`${this.id}: state: "${this.state}" - onExit (${this.event})`)
      },
      on: {
        always: {
          target: 'idle',
          action (data) {
            // console.log(`${this.id}: transition from "${this.state}" to "idle"`)
            this.context.origin.updateRange(data) 
          },
        },
      }
    },
    divider_pointerDrag: {
      onEnter(data) {

      },
      onExit(data) {
        // console.log(`${this.id}: state: "${this.state}" - onExit (${this.event})`)
      },
      on: {
        divider_pointerDrag: {
          target: "divider_pointerDrag",
          action (data) {
            // console.log(`${this.id}: transition from "${this.state}" to "ilde"`)
          },
        },
        divider_pointerDragEnd: {
          target: "idle",
          action (data) {
            // this.actions.removeProperty.call(this)
            // this.context.pair.active.Divider.setPos()
            // console.log(`${this.id}: transition from "${this.state}" to "idle"`)
            this.context.origin.cursor = this.context.currCursor
          },
        },
      }
    },
    chart_IndicatorAdd: {
      onEnter(data) {
        // console.log(`${this.id}: state: "${this.state}" - onEnter`)

        this.context.origin.addIndicator(data) 
      },
      onExit(data) {
        // console.log(`${this.id}: state: "${this.state}" - onExit (${this.event})`)
      },
      on: {
        chart_IndicatorAddDone: {
          target: "idle",
          action (data) {
            // console.log('transition action for "onIdle" in "chart_IndicatorAdd" state')

          },
        }
      }
    },
    chart_ToolActive: {
      onEnter(data) {
        // console.log(`${this.id}: state: "${this.state}" - onEnter`)

        // this.context.origin.addIndicator(data) 
      },
      onExit(data) {
        // console.log(`${this.id}: state: "${this.state}" - onExit (${this.event})`)
      },
      on: {
        chart_ToolInactive: {
          target: "chart_ToolInactive",
          action (data) {
            // console.log('transition action for "onIdle" in "chart_IndicatorAdd" state')

          },
        }
      }
    },
    chart_ToolInactive: {
      onEnter(data) {
        // console.log(`${this.id}: state: "${this.state}" - onEnter`)

        // this.context.origin.addIndicator(data) 
      },
      onExit(data) {
        // console.log(`${this.id}: state: "${this.state}" - onExit (${this.event})`)
      },
      on: {
        always: {
          target: "idle",
          action (data) {
            // console.log('transition action for "onIdle" in "chart_IndicatorAdd" state')

          },
        }
      }
    },
  },
  guards: {
    zoomDone () { return true },
    resizeDone () { return true },
  },
  actions: {
    removeProperty () {
      let active = this.context.pair.active,
      prev = this.context.pair.prev;

      if ( isObject(active) )
        active.element.style.removeProperty('user-select');
      if ( isObject(prev) )
        prev.element.style.removeProperty('user-select');
    }
  }
}
