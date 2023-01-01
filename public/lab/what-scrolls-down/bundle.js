/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nfunction colorAt(data, i) {\n  return [data[i], data[i + 1], data[i + 2]];\n}\n\nfunction extractColors(imageData, blockSize) {\n  const data = imageData.data;\n  const length = data.length;\n  let i = 0;\n  const colors = [];\n\n  do {\n    colors.push(colorAt(data, i));\n  } while ((i += blockSize * 4) < length);\n\n  return colors;\n}\n\nfunction distanceSquared(colorA, colorB) {\n  let sum = 0;\n\n  for (let n = 0; n < colorA.length; n++) {\n    sum += Math.pow(colorA[n] - colorB[n], 2);\n  }\n\n  return sum;\n}\n\nfunction euclidianDistance(colorA, colorB) {\n  return Math.sqrt(distanceSquared(colorA, colorB));\n}\n\nfunction distanceMatrix(colors) {\n  const length = colors.length;\n  const result = [];\n  colors.forEach((colorA, indexA) => {\n    result[indexA] = [];\n    result[indexA][indexA] = 1;\n\n    for (let indexB = 0; indexB < length; indexB++) {\n      result[indexA][indexB] = indexB > indexA ? euclidianDistance(colorA, colors[indexB]) : result[indexB][indexA];\n    }\n  });\n  return result;\n}\n\nfunction minDistance(distances) {\n  return distances.reduce((acc, item, index) => acc === null || item < distances[acc] ? index : acc, null);\n}\n\nfunction colorHex(color) {\n  const h = color.map(c => {\n    const h = c.toString(16);\n    return h.length > 1 ? h : '0' + h;\n  });\n  return `#${h[0]}${h[1]}${h[2]}`;\n}\n\nclass Sampler {\n  constructor(img, size = 33, blockSize = 3) {\n    this.img = img;\n    this.size = size;\n    this.blockSize = blockSize;\n    const canvas = document.createElement(\"canvas\");\n    canvas.width = size;\n    canvas.height = size;\n    this.ctx = canvas.getContext && canvas.getContext(\"2d\");\n  }\n\n  at(x, y) {\n    const size = this.size;\n    this.ctx.drawImage(this.img, x, y, size, size, 0, 0, size, size);\n    const imageData = this.ctx.getImageData(0, 0, size, size);\n    const colors = extractColors(imageData, this.blockSize);\n    const matrix = distanceMatrix(colors);\n    const distances = matrix.map(item => item.reduce((acc, distance) => acc + distance));\n    const minDistanceIndex = minDistance(distances);\n    return colors[minDistanceIndex];\n  }\n\n}\n\nconst STATE = {\n  normal: 0,\n  zooming: 1,\n  zoomed: 2\n};\n\nfunction main() {\n  const img = document.querySelector(\"img\");\n  const frame = document.querySelector(\".frame\");\n  const aside = document.querySelector(\"aside\");\n  const label = document.querySelector(\"aside em\");\n  const sampler = new Sampler(img, 50, 5);\n  const naturalSize = {\n    w: img.naturalWidth,\n    h: img.naturalHeight\n  };\n  const currentPos = {\n    x: 0,\n    y: 0,\n    width: 0,\n    height: 0\n  };\n  let state = STATE.normal;\n  let frameSize;\n  let size;\n  let center;\n  let ratio;\n\n  function handleResize() {\n    size = {\n      w: img.clientWidth,\n      h: img.clientHeight\n    };\n    frameSize = {\n      w: frame.clientWidth,\n      h: frame.clientHeight\n    };\n    center = {\n      x: frameSize.w / 2,\n      y: frameSize.h / 2\n    };\n    ratio = size.h / naturalSize.h;\n  }\n\n  function sample(pos) {\n    const {\n      x,\n      y\n    } = pos;\n    const color = sampler.at(x, y);\n    const rgb = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;\n    const hex = colorHex(color);\n    aside.style.backgroundColor = rgb;\n    label.innerText = hex;\n\n    if (euclidianDistance(color, [0, 0, 0]) > 200) {\n      label.style.color = '#000';\n    } else {\n      label.style.color = '#fff';\n    }\n  }\n\n  function signal(n) {\n    return Math.abs(n) / n;\n  }\n\n  function touchPoint(pos) {\n    const {\n      x,\n      y\n    } = pos;\n    const scaled = {\n      x: x * ratio,\n      y: y * ratio\n    };\n    let left = center.x - scaled.x;\n    let top = center.y - scaled.y;\n    const dist = {\n      x: pos.width / 2 - Math.abs(left),\n      y: pos.height / 2 - Math.abs(top)\n    };\n    const minX = ratio * 160;\n    const minY = ratio * 200;\n\n    if (dist.x < minX) {\n      left -= (minX - dist.x) * signal(left);\n    }\n\n    if (dist.y < minY) {\n      top -= (minY - dist.y) * signal(top);\n    }\n\n    return {\n      x: left,\n      y: top\n    };\n  }\n\n  function zoomIn(pos) {\n    const scale = 10;\n    const {\n      x: left,\n      y: top\n    } = touchPoint(pos);\n    img.classList.add('is-zoomed');\n    img.style.transform = `scale(${scale}) translate(${left}px, ${top}px)`;\n    state = STATE.zoomed;\n  }\n\n  function zoomOut() {\n    img.classList.remove('is-zoomed');\n    img.style.transform = `scale(1) translate(0, 0)`;\n    state = STATE.normal;\n  }\n\n  function getCoords(ev) {\n    if (ev) {\n      const rect = img.getBoundingClientRect();\n      const x = (ev.clientX - rect.left) / ratio;\n      const y = (ev.clientY - rect.top) / ratio;\n      currentPos.x = x;\n      currentPos.y = y;\n      currentPos.width = rect.width;\n      currentPos.height = rect.height;\n    }\n\n    return currentPos;\n  }\n\n  function handleMove(ev) {\n    getCoords(ev);\n  }\n\n  function handleClick(ev) {\n    if (state === STATE.zoomed) {\n      return zoomOut();\n    }\n\n    const pos = getCoords(ev);\n    sample(pos);\n    zoomIn(pos);\n  }\n\n  window.addEventListener(\"resize\", handleResize);\n  window.addEventListener(\"mousemove\", handleMove);\n  img.addEventListener(\"mousedown\", handleClick);\n  handleResize();\n  setInterval(() => {\n    if (state !== STATE.zoomed) {\n      const pos = getCoords();\n      sample(pos);\n    }\n  }, 750);\n}\n\nwindow.addEventListener(\"load\", main);\n\n//# sourceURL=webpack:///./index.js?");

/***/ })

/******/ });