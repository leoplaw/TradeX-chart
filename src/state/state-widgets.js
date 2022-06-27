// state-chart.js

export default
{
  id: "widgets",
  initial: "idle",
  context: {},
  states: {
    idle: {
      onEnter(stateMachine, data) {
        console.log('idle: onEnter')
      },
      onExit(stateMachine, data) {
        console.log('idle: onExit')
      },
      on: {
        openMenu: {
          target: 'openMenu',
          action: (stateMachine, data) => {
            console.log('Widgets: transition from "idle" to "openMenu"')
          },
        },
      }
    },
    openMenu: {
      onEnter(stateMachine, data) {
        console.log('Widgets: state: "openMenu" - onEnter')

        stateMachine.context.origin.instances[data.menu].open()
      },
      onExit(stateMachine, data) {
        console.log('addIndicator: onExit')

        stateMachine.context.origin.instances[data.menu].close()
      },
      on: {
        closeMenu: {
          target: "idle",
          action: (stateMachine, data) => {
            console.log('Widgets: transition from "openMenu" to "idle" on "closeMenu"')
          },
        }
      }
    }
  }
}