import { A as AstroError, f as AstroErrorData, i as createVNode, F as Fragment, s as spreadAttributes } from './astro.7b6fbd1f.mjs';
import { g as getImage } from './pages/404.astro.1d69ba63.mjs';
import '@astrojs/internal-helpers/path';
import 'html-escaper';
import 'fs';
import 'node:fs/promises';
import 'node:url';
import 'node:fs';
import 'node:path';
import 'slash';
import 'path';
/* empty css                        */import 'zod';
/* empty css                                                             */import 'execa';

const images = {
					'../../../assets/quick_ref_sct_overview.png': await getImageSafely((await import('./quick_ref_sct_overview.961ec6c2.mjs')).default, "../../../assets/quick_ref_sct_overview.png", "/src/assets/quick_ref_sct_overview.png")
				};

				async function getImageSafely(imageSrc, imagePath, resolvedImagePath) {
					if (!imageSrc) {
						throw new AstroError({
							...AstroErrorData.MarkdownImageNotFound,
							message: AstroErrorData.MarkdownImageNotFound.message(
								imagePath,
								resolvedImagePath
							),
							location: { file: "/mnt/ext4/Home/neoarttec/Archives/Linux/Crypto/Trading/Mercury/MercuryTrader/component-module-tests/TradeX/tradex-chart/src/docs/src/content/docs/reference/architecture.md" },
						});
					}

					return await getImage({src: imageSrc})
				}

				function updateImageReferences(html) {
					return html.replaceAll(
						/__ASTRO_IMAGE_="(.+)"/gm,
						(full, imagePath) => spreadAttributes({src: images[imagePath].src, ...images[imagePath].attributes})
					);
				}

				const html = updateImageReferences("<h1 id=\"architectural-organization\">Architectural Organization</h1>\n<ul>\n<li>Factory\n<ul>\n<li>Core\n<ul>\n<li>Utils</li>\n<li>Widgets</li>\n<li>Body\n<ul>\n<li>Tools</li>\n<li>Main Pane\n<ul>\n<li>Timeline (X Axis)</li>\n<li>Rows\n<ul>\n<li>Row\n<ul>\n<li>Chart Panes - Primary (price / candles), Secondary (indicators)\n<ul>\n<li>Price Scale (Y Axis)</li>\n<li>Graph\n<ul>\n<li>Overlays\n<ul>\n<li>Grid</li>\n<li>Cursor</li>\n<li>Price Line</li>\n<li>Candles</li>\n<li>Volume</li>\n<li>Technical Indicators</li>\n<li>User Defined</li>\n</ul>\n</li>\n</ul>\n</li>\n</ul>\n</li>\n</ul>\n</li>\n</ul>\n</li>\n</ul>\n</li>\n</ul>\n</li>\n</ul>\n</li>\n</ul>\n</li>\n</ul>\n<p>Most of these features can be accessed externally eg.</p>\n<p><code>chart.secondaryPane.entries().next().value[1]</code></p>\n<p>Although it is recommended that use the API to modify the chart or respond to events.</p>\n<h2 id=\"factory\">Factory</h2>\n<p>The static factory class is used to instantiate (multiple) chart instances. It registers the chart WebComponent.</p>\n<h2 id=\"core\">Core</h2>\n<p>The core starts the cascade of chart component creation. It provides:</p>\n<ul>\n<li>Internal and external API</li>\n<li>State management</li>\n<li>Event messaging</li>\n<li>Chart Data State\n<ul>\n<li>Validation</li>\n<li>Export</li>\n<li>Range handling - data subset</li>\n</ul>\n</li>\n<li>Configuration</li>\n<li>Themes</li>\n</ul>\n<h1 id=\"patterns\">Patterns</h1>\n<p><strong>Hook Observer Pattern</strong>\nAn extensible API like WordPress\nmaking it easy for third party programmers to write extensions to the core</p>\n<p><strong>Aspect-Oriented Programming</strong>\nCode injection\ninto existing functions or objects, without modifying the target logic.</p>\n<p><strong>State Machine</strong>\nLogical state management\nproviding a behaviour model describing the states the system can be in and the conditions by which one transitions to another.</p>\n<p><strong>Global Store</strong></p>\n<p><strong>Event Hub</strong></p>\n<p><strong>Scalable Application Architecture</strong>\nDecoupled, event-driven architecture</p>\n<p><strong>Model Contoler View</strong></p>\n<h2 id=\"aspect-oriented-programming\">Aspect-Oriented Programming</h2>\n<p>Code injection</p>\n<p><a href=\"https://en.wikipedia.org/wiki/Aspect-oriented_programming\">https://en.wikipedia.org/wiki/Aspect-oriented_programming</a></p>\n<h3 id=\"meld\">Meld</h3>\n<p><a href=\"https://github.com/cujojs/meld\">https://github.com/cujojs/meld</a></p>\n<h2 id=\"state-machine\">State Machine</h2>\n<p>Logical finite state management</p>\n<p><img alt=\"State Machine\" __ASTRO_IMAGE_=\"../../../assets/quick_ref_sct_overview.png\"></p>\n<p><a href=\"state_machine.md\">State Machine documentation</a></p>\n<h2 id=\"scalable-javascript-applicaton-architecture\">Scalable Javascript Applicaton Architecture</h2>\n<p>decoupled, event-driven architecture</p>\n<p>The features of the architecture are decoupled, allowing for flexible and extensible applications. The application is broken down into the following parts:</p>\n<ul>\n<li>Modules (sandboxed)</li>\n<li>Mediator (API)</li>\n<li>Application Core (Plugins, Base Libraries)</li>\n</ul>\n<p>![Scalable Javascript Applicaton Architecture]../../../assets/architecture.png)</p>\n<h4 id=\"module\">Module</h4>\n<p>Modules are single-purpose parts of a larger system that are interchangeable. They are classes which will be instantiated with a Mediator which will sand box them.</p>\n<p>References: [1]</p>\n<h4 id=\"sandbox\">Sandbox</h4>\n<p>A Sandbox is a module instance created with the Mediator, which presents a siloed API of the Core for the Module. None of the modules can directly mutate each other or the Core.</p>\n<p>The Sandbox uses a <a href=\"#facade\">Facade</a> [2] and [Mediator](#mediator<a id=\"application-core\"></a>) [3] pattern.</p>\n<p>Modules can interact with the Core and each other via the Mediator which has inheirited a specific methods and properties (<a href=\"#facade\">Facade</a>) from the Core.</p>\n<h4 id=\"mediator\">Mediator</h4>\n<p>The Mediator can be thought of as a customized API for the Core (Facade).</p>\n<h4 id=\"core-1\"><a id=\"application-core\"></a>Core</h4>\n<p>The Core is responsible for starting and stopping the modules. It also handles the messages by using the <a href=\"https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern\">Publish/Subscribe (Mediator) pattern</a>.</p>\n<h4 id=\"plugins\">Plugins</h4>\n<p>Plugins extend or mofify the functionality of the Core.</p>\n<h3 id=\"design-patterns\">Design Patterns</h3>\n<h4 id=\"facade\"><a id=\"facade\"></a>Facade</h4>\n<p>The Facace is a unifying (simplified) API for the <a href=\"#application-core\">Application Core</a>.</p>\n<p>It serves as an <strong>abstraction</strong> of the application core which sits between the mediator and our modules - it should ideally be the <strong>only</strong> other part of the system modules are aware of.</p>\n<p>In that way you can hide the features provided by the core and only show a well defined custom static long term API to your modules.</p>\n<p>References: [2]</p>\n<h4 id=\"mediator-1\"><a id=\"mediator\"></a>Mediator</h4>\n<p>A mediator <strong>encapsulates</strong> how disparate modules <strong>interact</strong>\nwith each other by acting as an intermediary. The pattern also promotes\nloose coupling by preventing objects from referring to each other\nexplicitly - in our system, this helps to solve our module\ninter-dependency issues.</p>\n<p>It provides the Facade to Module, by extending the Module class.</p>\n<p>Refrences: [3]</p>\n<h1 id=\"modules\">Modules</h1>\n<h2 id=\"module-template\">Module Template</h2>\n<pre is:raw=\"\" class=\"astro-code min-dark\" style=\"background-color: #1f1f1f; overflow-x: auto; white-space: pre-wrap; word-wrap: break-word;\" tabindex=\"0\"><code><span class=\"line\"><span style=\"color: #6B737C\">// optional State Machine</span></span>\n<span class=\"line\"><span style=\"color: #6B737C\">// import stateMachineConfig from \"../state/state-chart\"</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color: #F97583\">export</span><span style=\"color: #B392F0\"> </span><span style=\"color: #F97583\">default</span><span style=\"color: #B392F0\"> </span><span style=\"color: #F97583\">class</span><span style=\"color: #B392F0\"> UtilsBar {</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color: #B392F0\">  #modID                 </span><span style=\"color: #6B737C\">// required - set by the Core</span></span>\n<span class=\"line\"><span style=\"color: #B392F0\">  #name </span><span style=\"color: #F97583\">=</span><span style=\"color: #B392F0\"> </span><span style=\"color: #FFAB70\">\"Utilities\"</span><span style=\"color: #B392F0\">    </span><span style=\"color: #6B737C\">// required</span></span>\n<span class=\"line\"><span style=\"color: #B392F0\">  #shortName </span><span style=\"color: #F97583\">=</span><span style=\"color: #B392F0\"> </span><span style=\"color: #FFAB70\">\"utils\"</span><span style=\"color: #B392F0\">   </span><span style=\"color: #6B737C\">// required</span></span>\n<span class=\"line\"><span style=\"color: #B392F0\">  #mediator              </span><span style=\"color: #6B737C\">// required</span></span>\n<span class=\"line\"><span style=\"color: #B392F0\">  #options               </span><span style=\"color: #6B737C\">// required</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color: #B392F0\">  </span><span style=\"color: #6B737C\">// user defined properties follow...</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color: #B392F0\">  </span><span style=\"color: #6B737C\">// required - can be empty</span></span>\n<span class=\"line\"><span style=\"color: #B392F0\">  </span><span style=\"color: #F97583\">constructor</span><span style=\"color: #B392F0\"> (mediator</span><span style=\"color: #BBBBBB\">,</span><span style=\"color: #B392F0\"> options) {</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color: #B392F0\">    </span><span style=\"color: #79B8FF\">this</span><span style=\"color: #B392F0\">.#mediator </span><span style=\"color: #F97583\">=</span><span style=\"color: #B392F0\"> mediator</span></span>\n<span class=\"line\"><span style=\"color: #B392F0\">    </span><span style=\"color: #79B8FF\">this</span><span style=\"color: #B392F0\">.#options </span><span style=\"color: #F97583\">=</span><span style=\"color: #B392F0\"> options</span></span>\n<span class=\"line\"><span style=\"color: #B392F0\">    </span><span style=\"color: #79B8FF\">this</span><span style=\"color: #B392F0\">.init()</span></span>\n<span class=\"line\"><span style=\"color: #B392F0\">  }</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color: #B392F0\">  </span><span style=\"color: #6B737C\">// suggested</span></span>\n<span class=\"line\"><span style=\"color: #B392F0\">  log(l) { </span><span style=\"color: #79B8FF\">this</span><span style=\"color: #B392F0\">.</span><span style=\"color: #79B8FF\">#mediator</span><span style=\"color: #B392F0\">.log(l) }</span></span>\n<span class=\"line\"><span style=\"color: #B392F0\">  info(i) { </span><span style=\"color: #79B8FF\">this</span><span style=\"color: #B392F0\">.</span><span style=\"color: #79B8FF\">#mediator</span><span style=\"color: #B392F0\">.info(i) }</span></span>\n<span class=\"line\"><span style=\"color: #B392F0\">  warn(w) { </span><span style=\"color: #79B8FF\">this</span><span style=\"color: #B392F0\">.</span><span style=\"color: #79B8FF\">#mediator</span><span style=\"color: #B392F0\">.warn(w) }</span></span>\n<span class=\"line\"><span style=\"color: #B392F0\">  error(e) { </span><span style=\"color: #79B8FF\">this</span><span style=\"color: #B392F0\">.</span><span style=\"color: #79B8FF\">#mediator</span><span style=\"color: #B392F0\">.error(e) }</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color: #B392F0\">  </span><span style=\"color: #6B737C\">// required</span></span>\n<span class=\"line\"><span style=\"color: #B392F0\">  </span><span style=\"color: #F97583\">get</span><span style=\"color: #B392F0\"> name() {</span><span style=\"color: #F97583\">return</span><span style=\"color: #B392F0\"> </span><span style=\"color: #79B8FF\">this</span><span style=\"color: #B392F0\">.#name}</span></span>\n<span class=\"line\"><span style=\"color: #B392F0\">  </span><span style=\"color: #6B737C\">// required</span></span>\n<span class=\"line\"><span style=\"color: #B392F0\">  </span><span style=\"color: #F97583\">get</span><span style=\"color: #B392F0\"> shortName() {</span><span style=\"color: #F97583\">return</span><span style=\"color: #B392F0\"> </span><span style=\"color: #79B8FF\">this</span><span style=\"color: #B392F0\">.#shortName}</span></span>\n<span class=\"line\"><span style=\"color: #B392F0\">  </span><span style=\"color: #6B737C\">// required</span></span>\n<span class=\"line\"><span style=\"color: #B392F0\">  </span><span style=\"color: #F97583\">get</span><span style=\"color: #B392F0\"> mediator() {</span><span style=\"color: #F97583\">return</span><span style=\"color: #B392F0\"> </span><span style=\"color: #79B8FF\">this</span><span style=\"color: #B392F0\">.#mediator}</span></span>\n<span class=\"line\"><span style=\"color: #B392F0\">  </span><span style=\"color: #6B737C\">// required</span></span>\n<span class=\"line\"><span style=\"color: #B392F0\">  </span><span style=\"color: #F97583\">get</span><span style=\"color: #B392F0\"> options() {</span><span style=\"color: #F97583\">return</span><span style=\"color: #B392F0\"> </span><span style=\"color: #79B8FF\">this</span><span style=\"color: #B392F0\">.#options}</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color: #B392F0\">  init() {</span></span>\n<span class=\"line\"><span style=\"color: #B392F0\">    </span><span style=\"color: #79B8FF\">this</span><span style=\"color: #B392F0\">.mount(</span><span style=\"color: #79B8FF\">this</span><span style=\"color: #B392F0\">.#elUtils)</span></span>\n<span class=\"line\"><span style=\"color: #B392F0\">  }</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color: #B392F0\">  </span><span style=\"color: #6B737C\">// required</span></span>\n<span class=\"line\"><span style=\"color: #B392F0\">  start() {</span></span>\n<span class=\"line\"><span style=\"color: #B392F0\">    </span><span style=\"color: #6B737C\">// Start the module's activities.</span></span>\n<span class=\"line\"><span style=\"color: #B392F0\">    </span><span style=\"color: #6B737C\">// Play time!</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color: #B392F0\">    </span><span style=\"color: #6B737C\">// set up event listeners</span></span>\n<span class=\"line\"><span style=\"color: #B392F0\">    </span><span style=\"color: #79B8FF\">this</span><span style=\"color: #B392F0\">.eventsListen()</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color: #B392F0\">    </span><span style=\"color: #6B737C\">// start State Machine </span></span>\n<span class=\"line\"><span style=\"color: #B392F0\">    </span><span style=\"color: #6B737C\">// stateMachineConfig.context = this</span></span>\n<span class=\"line\"><span style=\"color: #B392F0\">    </span><span style=\"color: #6B737C\">// this.#mediator.stateMachine = stateMachineConfig</span></span>\n<span class=\"line\"><span style=\"color: #B392F0\">    </span><span style=\"color: #6B737C\">// this.#mediator.stateMachine.start()</span></span>\n<span class=\"line\"><span style=\"color: #B392F0\">  }</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color: #B392F0\">  </span><span style=\"color: #6B737C\">// required</span></span>\n<span class=\"line\"><span style=\"color: #B392F0\">  end() {</span></span>\n<span class=\"line\"><span style=\"color: #B392F0\">    </span><span style=\"color: #6B737C\">// Stop and clean up the module to prevent memory leaks.</span></span>\n<span class=\"line\"><span style=\"color: #B392F0\">    </span><span style=\"color: #6B737C\">// It should remove: event listeners, timers, ect.</span></span>\n<span class=\"line\"><span style=\"color: #B392F0\">    </span><span style=\"color: #6B737C\">// Put your toys away or it will end in tears.</span></span>\n<span class=\"line\"><span style=\"color: #B392F0\">  }</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color: #B392F0\">  </span><span style=\"color: #6B737C\">// recommended</span></span>\n<span class=\"line\"><span style=\"color: #B392F0\">  on(topic</span><span style=\"color: #BBBBBB\">,</span><span style=\"color: #B392F0\"> handler</span><span style=\"color: #BBBBBB\">,</span><span style=\"color: #B392F0\"> context) {</span></span>\n<span class=\"line\"><span style=\"color: #B392F0\">    </span><span style=\"color: #79B8FF\">this</span><span style=\"color: #B392F0\">.</span><span style=\"color: #79B8FF\">#mediator</span><span style=\"color: #B392F0\">.on(topic</span><span style=\"color: #BBBBBB\">,</span><span style=\"color: #B392F0\"> handler</span><span style=\"color: #BBBBBB\">,</span><span style=\"color: #B392F0\"> context)</span></span>\n<span class=\"line\"><span style=\"color: #B392F0\">  }</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color: #B392F0\">  </span><span style=\"color: #6B737C\">// recommended</span></span>\n<span class=\"line\"><span style=\"color: #B392F0\">  off(topic</span><span style=\"color: #BBBBBB\">,</span><span style=\"color: #B392F0\"> handler) {</span></span>\n<span class=\"line\"><span style=\"color: #B392F0\">    </span><span style=\"color: #79B8FF\">this</span><span style=\"color: #B392F0\">.</span><span style=\"color: #79B8FF\">#mediator</span><span style=\"color: #B392F0\">.off(topic</span><span style=\"color: #BBBBBB\">,</span><span style=\"color: #B392F0\"> handler)</span></span>\n<span class=\"line\"><span style=\"color: #B392F0\">  }</span></span>\n<span class=\"line\"></span>\n<span class=\"line\"><span style=\"color: #B392F0\">  </span><span style=\"color: #6B737C\">// recommended</span></span>\n<span class=\"line\"><span style=\"color: #B392F0\">  emit(topic</span><span style=\"color: #BBBBBB\">,</span><span style=\"color: #B392F0\"> data) {</span></span>\n<span class=\"line\"><span style=\"color: #B392F0\">    </span><span style=\"color: #79B8FF\">this</span><span style=\"color: #B392F0\">.</span><span style=\"color: #79B8FF\">#mediator</span><span style=\"color: #B392F0\">.emit(topic</span><span style=\"color: #BBBBBB\">,</span><span style=\"color: #B392F0\"> data)</span></span>\n<span class=\"line\"><span style=\"color: #B392F0\">  }</span></span>\n<span class=\"line\"><span style=\"color: #B392F0\">}</span></span>\n<span class=\"line\"></span></code></pre>\n<h1 id=\"references\">References</h1>\n<ol>\n<li><a href=\"https://addyosmani.com/largescalejavascript/#modpattern\">Modlule - https://addyosmani.com/largescalejavascript/#modpattern</a></li>\n<li><a href=\"https://addyosmani.com/largescalejavascript/#facadepattern\">Facade - https://addyosmani.com/largescalejavascript/#facadepattern</a></li>\n<li><a href=\"https://addyosmani.com/largescalejavascript/#mediatorpatternhttps:/\">Mediator - https://addyosmani.com/largescalejavascript/#mediatorpattern</a></li>\n<li></li>\n</ol>\n<hr>");

				const frontmatter = {"title":"Architecture"};
				const file = "/mnt/ext4/Home/neoarttec/Archives/Linux/Crypto/Trading/Mercury/MercuryTrader/component-module-tests/TradeX/tradex-chart/src/docs/src/content/docs/reference/architecture.md";
				const url = undefined;
				function rawContent() {
					return "\n# Architectural Organization\n\n* Factory\n  * Core\n    * Utils\n    * Widgets\n    * Body\n      * Tools\n      * Main Pane\n        * Timeline (X Axis)\n        * Rows\n          * Row\n            * Chart Panes - Primary (price / candles), Secondary (indicators)\n              * Price Scale (Y Axis)\n              * Graph\n                * Overlays\n                  * Grid\n                  * Cursor\n                  * Price Line\n                  * Candles\n                  * Volume\n                  * Technical Indicators\n                  * User Defined\n\nMost of these features can be accessed externally eg.\n\n``chart.secondaryPane.entries().next().value[1]``\n\nAlthough it is recommended that use the API to modify the chart or respond to events.\n\n## Factory\n\nThe static factory class is used to instantiate (multiple) chart instances. It registers the chart WebComponent.\n\n## Core\n\nThe core starts the cascade of chart component creation. It provides:\n\n* Internal and external API\n* State management\n* Event messaging\n* Chart Data State\n  * Validation\n  * Export\n  * Range handling - data subset\n* Configuration\n* Themes\n\n\n# Patterns\n\n**Hook Observer Pattern**\nAn extensible API like WordPress\nmaking it easy for third party programmers to write extensions to the core\n\n**Aspect-Oriented Programming**\nCode injection\ninto existing functions or objects, without modifying the target logic.\n\n**State Machine**\nLogical state management\nproviding a behaviour model describing the states the system can be in and the conditions by which one transitions to another.\n\n**Global Store**\n\n**Event Hub**\n\n**Scalable Application Architecture**\nDecoupled, event-driven architecture\n\n**Model Contoler View**\n\n## Aspect-Oriented Programming\n\nCode injection\n\n[https://en.wikipedia.org/wiki/Aspect-oriented_programming](https://en.wikipedia.org/wiki/Aspect-oriented_programming)\n\n### Meld\n\n[https://github.com/cujojs/meld](https://github.com/cujojs/meld)\n\n## State Machine\n\nLogical finite state management\n\n![State Machine](../../../assets/quick_ref_sct_overview.png)\n\n[State Machine documentation](state_machine.md)\n\n## Scalable Javascript Applicaton Architecture\n\ndecoupled, event-driven architecture\n\nThe features of the architecture are decoupled, allowing for flexible and extensible applications. The application is broken down into the following parts:\n\n* Modules (sandboxed)\n* Mediator (API)\n* Application Core (Plugins, Base Libraries)\n\n![Scalable Javascript Applicaton Architecture]../../../assets/architecture.png)\n\n#### Module\n\nModules are single-purpose parts of a larger system that are interchangeable. They are classes which will be instantiated with a Mediator which will sand box them.\n\nReferences: [1]\n\n#### Sandbox\n\nA Sandbox is a module instance created with the Mediator, which presents a siloed API of the Core for the Module. None of the modules can directly mutate each other or the Core.\n\nThe Sandbox uses a [Facade](#facade) [2] and [Mediator](#mediator<a id=\"application-core\"></a>) [3] pattern.\n\nModules can interact with the Core and each other via the Mediator which has inheirited a specific methods and properties ([Facade](#facade)) from the Core.\n\n#### Mediator\n\nThe Mediator can be thought of as a customized API for the Core (Facade).\n\n#### <a id=\"application-core\"></a>Core\n\nThe Core is responsible for starting and stopping the modules. It also handles the messages by using the [Publish/Subscribe (Mediator) pattern](https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern).\n\n#### Plugins\n\nPlugins extend or mofify the functionality of the Core.\n\n### Design Patterns\n\n#### <a id=\"facade\"></a>Facade\n\nThe Facace is a unifying (simplified) API for the [Application Core](#application-core).\n\nIt serves as an **abstraction** of the application core which sits between the mediator and our modules - it should ideally be the **only** other part of the system modules are aware of.\n\nIn that way you can hide the features provided by the core and only show a well defined custom static long term API to your modules.\n\nReferences: [2]\n\n#### <a id=\"mediator\"></a>Mediator\n\nA mediator **encapsulates** how disparate modules **interact**\nwith each other by acting as an intermediary. The pattern also promotes\nloose coupling by preventing objects from referring to each other\nexplicitly - in our system, this helps to solve our module\ninter-dependency issues.\n\nIt provides the Facade to Module, by extending the Module class.\n\nRefrences: [3]\n\n# Modules\n\n## Module Template\n\n```javascript\n// optional State Machine\n// import stateMachineConfig from \"../state/state-chart\"\n\nexport default class UtilsBar {\n\n  #modID                 // required - set by the Core\n  #name = \"Utilities\"    // required\n  #shortName = \"utils\"   // required\n  #mediator              // required\n  #options               // required\n\n  // user defined properties follow...\n\n  // required - can be empty\n  constructor (mediator, options) {\n\n    this.#mediator = mediator\n    this.#options = options\n    this.init()\n  }\n\n  // suggested\n  log(l) { this.#mediator.log(l) }\n  info(i) { this.#mediator.info(i) }\n  warn(w) { this.#mediator.warn(w) }\n  error(e) { this.#mediator.error(e) }\n\n  // required\n  get name() {return this.#name}\n  // required\n  get shortName() {return this.#shortName}\n  // required\n  get mediator() {return this.#mediator}\n  // required\n  get options() {return this.#options}\n\n  init() {\n    this.mount(this.#elUtils)\n  }\n\n  // required\n  start() {\n    // Start the module's activities.\n    // Play time!\n\n    // set up event listeners\n    this.eventsListen()\n\n    // start State Machine \n    // stateMachineConfig.context = this\n    // this.#mediator.stateMachine = stateMachineConfig\n    // this.#mediator.stateMachine.start()\n  }\n\n  // required\n  end() {\n    // Stop and clean up the module to prevent memory leaks.\n    // It should remove: event listeners, timers, ect.\n    // Put your toys away or it will end in tears.\n  }\n\n\n\n  // recommended\n  on(topic, handler, context) {\n    this.#mediator.on(topic, handler, context)\n  }\n\n  // recommended\n  off(topic, handler) {\n    this.#mediator.off(topic, handler)\n  }\n\n  // recommended\n  emit(topic, data) {\n    this.#mediator.emit(topic, data)\n  }\n}\n\n```\n\n# References\n\n1. [Modlule - https://addyosmani.com/largescalejavascript/#modpattern](https://addyosmani.com/largescalejavascript/#modpattern)\n2. [Facade - https://addyosmani.com/largescalejavascript/#facadepattern](https://addyosmani.com/largescalejavascript/#facadepattern)\n3. [Mediator - https://addyosmani.com/largescalejavascript/#mediatorpattern](https://addyosmani.com/largescalejavascript/#mediatorpatternhttps:/)\n4.\n\n---\n\n";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [{"depth":1,"slug":"architectural-organization","text":"Architectural Organization"},{"depth":2,"slug":"factory","text":"Factory"},{"depth":2,"slug":"core","text":"Core"},{"depth":1,"slug":"patterns","text":"Patterns"},{"depth":2,"slug":"aspect-oriented-programming","text":"Aspect-Oriented Programming"},{"depth":3,"slug":"meld","text":"Meld"},{"depth":2,"slug":"state-machine","text":"State Machine"},{"depth":2,"slug":"scalable-javascript-applicaton-architecture","text":"Scalable Javascript Applicaton Architecture"},{"depth":4,"slug":"module","text":"Module"},{"depth":4,"slug":"sandbox","text":"Sandbox"},{"depth":4,"slug":"mediator","text":"Mediator"},{"depth":4,"slug":"core-1","text":"Core"},{"depth":4,"slug":"plugins","text":"Plugins"},{"depth":3,"slug":"design-patterns","text":"Design Patterns"},{"depth":4,"slug":"facade","text":"Facade"},{"depth":4,"slug":"mediator-1","text":"Mediator"},{"depth":1,"slug":"modules","text":"Modules"},{"depth":2,"slug":"module-template","text":"Module Template"},{"depth":1,"slug":"references","text":"References"}];
				}
				async function Content() {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;
					const contentFragment = createVNode(Fragment, { 'set:html': html });
					return contentFragment;
				}
				Content[Symbol.for('astro.needsHeadRendering')] = true;

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, images, rawContent, url };