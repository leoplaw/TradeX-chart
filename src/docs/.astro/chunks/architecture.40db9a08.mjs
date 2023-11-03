const id = "reference/architecture.md";
						const collection = "docs";
						const slug = "reference/architecture";
						const body = "\n# Architectural Organization\n\n* Factory\n  * Core\n    * Utils\n    * Widgets\n    * Body\n      * Tools\n      * Main Pane\n        * Timeline (X Axis)\n        * Rows\n          * Row\n            * Chart Panes - Primary (price / candles), Secondary (indicators)\n              * Price Scale (Y Axis)\n              * Graph\n                * Overlays\n                  * Grid\n                  * Cursor\n                  * Price Line\n                  * Candles\n                  * Volume\n                  * Technical Indicators\n                  * User Defined\n\nMost of these features can be accessed externally eg.\n\n``chart.secondaryPane.entries().next().value[1]``\n\nAlthough it is recommended that use the API to modify the chart or respond to events.\n\n## Factory\n\nThe static factory class is used to instantiate (multiple) chart instances. It registers the chart WebComponent.\n\n## Core\n\nThe core starts the cascade of chart component creation. It provides:\n\n* Internal and external API\n* State management\n* Event messaging\n* Chart Data State\n  * Validation\n  * Export\n  * Range handling - data subset\n* Configuration\n* Themes\n\n\n# Patterns\n\n**Hook Observer Pattern**\nAn extensible API like WordPress\nmaking it easy for third party programmers to write extensions to the core\n\n**Aspect-Oriented Programming**\nCode injection\ninto existing functions or objects, without modifying the target logic.\n\n**State Machine**\nLogical state management\nproviding a behaviour model describing the states the system can be in and the conditions by which one transitions to another.\n\n**Global Store**\n\n**Event Hub**\n\n**Scalable Application Architecture**\nDecoupled, event-driven architecture\n\n**Model Contoler View**\n\n## Aspect-Oriented Programming\n\nCode injection\n\n[https://en.wikipedia.org/wiki/Aspect-oriented_programming](https://en.wikipedia.org/wiki/Aspect-oriented_programming)\n\n### Meld\n\n[https://github.com/cujojs/meld](https://github.com/cujojs/meld)\n\n## State Machine\n\nLogical finite state management\n\n![State Machine](../../../assets/quick_ref_sct_overview.png)\n\n[State Machine documentation](state_machine.md)\n\n## Scalable Javascript Applicaton Architecture\n\ndecoupled, event-driven architecture\n\nThe features of the architecture are decoupled, allowing for flexible and extensible applications. The application is broken down into the following parts:\n\n* Modules (sandboxed)\n* Mediator (API)\n* Application Core (Plugins, Base Libraries)\n\n![Scalable Javascript Applicaton Architecture]../../../assets/architecture.png)\n\n#### Module\n\nModules are single-purpose parts of a larger system that are interchangeable. They are classes which will be instantiated with a Mediator which will sand box them.\n\nReferences: [1]\n\n#### Sandbox\n\nA Sandbox is a module instance created with the Mediator, which presents a siloed API of the Core for the Module. None of the modules can directly mutate each other or the Core.\n\nThe Sandbox uses a [Facade](#facade) [2] and [Mediator](#mediator<a id=\"application-core\"></a>) [3] pattern.\n\nModules can interact with the Core and each other via the Mediator which has inheirited a specific methods and properties ([Facade](#facade)) from the Core.\n\n#### Mediator\n\nThe Mediator can be thought of as a customized API for the Core (Facade).\n\n#### <a id=\"application-core\"></a>Core\n\nThe Core is responsible for starting and stopping the modules. It also handles the messages by using the [Publish/Subscribe (Mediator) pattern](https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern).\n\n#### Plugins\n\nPlugins extend or mofify the functionality of the Core.\n\n### Design Patterns\n\n#### <a id=\"facade\"></a>Facade\n\nThe Facace is a unifying (simplified) API for the [Application Core](#application-core).\n\nIt serves as an **abstraction** of the application core which sits between the mediator and our modules - it should ideally be the **only** other part of the system modules are aware of.\n\nIn that way you can hide the features provided by the core and only show a well defined custom static long term API to your modules.\n\nReferences: [2]\n\n#### <a id=\"mediator\"></a>Mediator\n\nA mediator **encapsulates** how disparate modules **interact**\nwith each other by acting as an intermediary. The pattern also promotes\nloose coupling by preventing objects from referring to each other\nexplicitly - in our system, this helps to solve our module\ninter-dependency issues.\n\nIt provides the Facade to Module, by extending the Module class.\n\nRefrences: [3]\n\n# Modules\n\n## Module Template\n\n```javascript\n// optional State Machine\n// import stateMachineConfig from \"../state/state-chart\"\n\nexport default class UtilsBar {\n\n  #modID                 // required - set by the Core\n  #name = \"Utilities\"    // required\n  #shortName = \"utils\"   // required\n  #mediator              // required\n  #options               // required\n\n  // user defined properties follow...\n\n  // required - can be empty\n  constructor (mediator, options) {\n\n    this.#mediator = mediator\n    this.#options = options\n    this.init()\n  }\n\n  // suggested\n  log(l) { this.#mediator.log(l) }\n  info(i) { this.#mediator.info(i) }\n  warn(w) { this.#mediator.warn(w) }\n  error(e) { this.#mediator.error(e) }\n\n  // required\n  get name() {return this.#name}\n  // required\n  get shortName() {return this.#shortName}\n  // required\n  get mediator() {return this.#mediator}\n  // required\n  get options() {return this.#options}\n\n  init() {\n    this.mount(this.#elUtils)\n  }\n\n  // required\n  start() {\n    // Start the module's activities.\n    // Play time!\n\n    // set up event listeners\n    this.eventsListen()\n\n    // start State Machine \n    // stateMachineConfig.context = this\n    // this.#mediator.stateMachine = stateMachineConfig\n    // this.#mediator.stateMachine.start()\n  }\n\n  // required\n  end() {\n    // Stop and clean up the module to prevent memory leaks.\n    // It should remove: event listeners, timers, ect.\n    // Put your toys away or it will end in tears.\n  }\n\n\n\n  // recommended\n  on(topic, handler, context) {\n    this.#mediator.on(topic, handler, context)\n  }\n\n  // recommended\n  off(topic, handler) {\n    this.#mediator.off(topic, handler)\n  }\n\n  // recommended\n  emit(topic, data) {\n    this.#mediator.emit(topic, data)\n  }\n}\n\n```\n\n# References\n\n1. [Modlule - https://addyosmani.com/largescalejavascript/#modpattern](https://addyosmani.com/largescalejavascript/#modpattern)\n2. [Facade - https://addyosmani.com/largescalejavascript/#facadepattern](https://addyosmani.com/largescalejavascript/#facadepattern)\n3. [Mediator - https://addyosmani.com/largescalejavascript/#mediatorpattern](https://addyosmani.com/largescalejavascript/#mediatorpatternhttps:/)\n4.\n\n---\n\n";
						const data = {title:"Architecture",editUrl:true,head:[],template:"doc"};
						const _internal = {
							type: 'content',
							filePath: "/mnt/ext4/Home/neoarttec/Archives/Linux/Crypto/Trading/Mercury/MercuryTrader/component-module-tests/TradeX/tradex-chart/src/docs/src/content/docs/reference/architecture.md",
							rawData: "\ntitle: Architecture",
						};

export { _internal, body, collection, data, id, slug };