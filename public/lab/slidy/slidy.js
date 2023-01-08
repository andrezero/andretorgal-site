!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define("Slidy",[],e):"object"==typeof exports?exports.Slidy=e():t.Slidy=e()}(self,(function(){return function(){var t={"./src/Carousel.js":function(t,e,n){"use strict";n.r(e),n.d(e,{Carousel:function(){return l}});var r=n("./src/util/dom.js"),i=n("./src/constants.js"),o=n("./src/ui.js"),s=n("./src/Controls.js");function a(t){return function(t){if(Array.isArray(t))return c(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||function(t,e){if(!t)return;if("string"==typeof t)return c(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return c(t,e)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function c(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function u(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function f(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var l=function(){function t(e){u(this,t),this._container=e,this._slides=a(e.children);var n=(0,o.createDom)(e),c=n.track,f=n.prev,l=n.next;this._frames=this._slides.map((function(t){return(0,o.appendToTrack)(t,c)})),this._track=c,this._prev=f,this._next=l;var d=(0,r.getWidth)(e);(0,o.applyStyleToFrames)(this._frames,d),(0,o.applyStyleToTrack)(c,this._frames.length,d),e.classList.add((0,o.makeClass)(i.ROOT),(0,o.makeClass)(i.READY)),this._controls=new s.Controls(e,this._frames,c,f,l)}var e,n,c;return e=t,(n=[{key:"destroy",value:function(){var t=this;[].concat(a(this._frames),a(this._container.children)).forEach((function(t){return t.remove()})),this._slides.forEach((function(e){return t._container.appendChild(e)})),this._container.classList.remove((0,o.makeClass)(i.ROOT),(0,o.makeClass)(i.READY)),this._controls.destroy()}}])&&f(e.prototype,n),c&&f(e,c),t}()},"./src/Controls.js":function(t,e,n){"use strict";n.r(e),n.d(e,{Controls:function(){return c}});var r=n("./src/util/dom.js"),i=n("./src/ui.js"),o=n("./src/constants.js");function s(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function a(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var c=function(){function t(e,n,r,i,s){var c=this;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),a(this,"_handlePrev",(function(){c._index&&(c._index--,c._updateTrack(!0))})),a(this,"_handleNext",(function(){c._index!==c._frames.length-1&&(c._index++,c._updateTrack(!0))})),this._index=0,this._container=e,this._frames=n,this._track=r,this._prev=i,this._next=s,i.addEventListener(o.CLICK,this._handlePrev),s.addEventListener(o.CLICK,this._handleNext),this._resizeObserver=new ResizeObserver((function(){return c._updateSize()})),this._resizeObserver.observe(this._container)}var e,n,c;return e=t,(n=[{key:"destroy",value:function(){this._resizeObserver.disconnect(),this._prev.removeEventListener(o.CLICK,this._handlePrev),this._next.removeEventListener(o.CLICK,this._handleNext)}},{key:"_updateSize",value:function(){this._width=(0,r.getWidth)(this._container),(0,i.applyStyleToFrames)(this._frames,this._width),this._updateTrack()}},{key:"_updateTrack",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],n=this._frames,r=this._track,s=this._width,a=this._index,c=n.length;(0,i.applyStyleToTrack)(r,c,s,a,e),clearTimeout(this._timeout),e&&(this._timeout=setTimeout((function(){return t._updateTrack()}),o.ANIMATION_SPEED))}}])&&s(e.prototype,n),c&&s(e,c),t}()},"./src/Registry.js":function(t,e,n){"use strict";function r(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}n.r(e),n.d(e,{Registry:function(){return i}});var i=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._instances=[]}var e,n,i;return e=t,(n=[{key:"add",value:function(t){this._instances.push(t)}},{key:"remove",value:function(t){var e=this._instances.indexOf(t);this._instances.splice(e,1)}}])&&r(e.prototype,n),i&&r(e,i),t}()},"./src/constants.js":function(t,e,n){"use strict";n.r(e),n.d(e,{CLICK:function(){return r},DIV:function(){return i},BUTTON:function(){return o},PREV:function(){return s},NEXT:function(){return a},READY:function(){return c},ROOT:function(){return u},ANIMATION_SPEED:function(){return f}});var r="click",i="div",o="button",s="prev",a="next",c="is-ready",u="root",f=500},"./src/ui.js":function(t,e,n){"use strict";n.r(e),n.d(e,{makeClass:function(){return a},createDom:function(){return u},appendToTrack:function(){return f},applyStyleToFrames:function(){return l},applyStyleToTrack:function(){return d}});var r=n("./src/util/dom.js"),i=n("./src/constants.js"),o=n("./src/svg/arrow.svg"),s=n.n(o),a=function(t){return"slidy-".concat(t)},c=function(t){var e,n=(0,r.createNode)("span",null,t),o=((e=(0,r.createNode)(i.DIV)).innerHTML=s(),e.childNodes[0]);return(0,r.createNode)(i.BUTTON,a(t),[n,o])},u=function(t){var e=(0,r.createNode)(i.DIV,a("track")),n=(0,r.createNode)(i.DIV,a("viewport"),e),o=c(i.PREV),s=c(i.NEXT);return(0,r.appendNode)(t,o),(0,r.appendNode)(t,n),(0,r.appendNode)(t,s),{track:e,prev:o,next:s}},f=function(t,e){var n=(0,r.createNode)(i.DIV,a("frame"));return(0,r.appendNode)(n,t),(0,r.appendNode)(e,n),n},l=function(t,e){return t.forEach((function(t){return t.style.width="".concat(e,"px")}))},d=function(t,e,n){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,o=arguments.length>4&&void 0!==arguments[4]&&arguments[4],s=t.style;s.width="".concat(n*e,"px"),s.transform="translate3d(".concat(-r*n,"px, 0px, 0px)"),s.transition=o?"transform ".concat(i.ANIMATION_SPEED,"ms ease"):""}},"./src/util/dom.js":function(t,e,n){"use strict";n.r(e),n.d(e,{createNode:function(){return r},appendNode:function(){return i},getWidth:function(){return o}});var r=function(t,e,n){var r=document.createElement(t);return e&&(r.className=e),Array.isArray(n)?n.forEach((function(t){return i(r,t)})):"string"==typeof n?r.innerHTML=n:n&&i(r,n),r},i=function(t,e){t.appendChild(e)},o=function(t){return t.getBoundingClientRect().width}},"./src/styles/index.css":function(t,e,n){"use strict";n.r(e)},"./src/svg/arrow.svg":function(t){t.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path d="M20 12l-2.83 2.83 9.17 9.17-9.17 9.17 2.83 2.83 12-12z"></path><path d="M0 0h48v48h-48z" fill="none"></path></svg>'}},e={};function n(r){if(e[r])return e[r].exports;var i=e[r]={exports:{}};return t[r](i,i.exports,n),i.exports}n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,{a:e}),e},n.d=function(t,e){for(var r in e)n.o(e,r)&&!n.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})};var r={};return function(){"use strict";n.r(r);var t,e=n("./src/constants.js"),i=n("./src/ui.js"),o=n("./src/Registry.js"),s=n("./src/Carousel.js"),a=(n("./src/styles/index.css"),{auto:function(){console.log("!")},create:function(n,r){var a=(t||(t=new o.Registry),t);if(n.classList.contains((0,i.makeClass)(e.ROOT)))throw new Error("DOM element is already a Slidy.");var c=new s.Carousel(n,r);return a.add(c),c.destroy=function(){a.remove(c),s.Carousel.prototype.destroy.apply(c)},c},destroy:function(){}});r.default=a}(),r=r.default}()}));
//# sourceMappingURL=slidy.js.map