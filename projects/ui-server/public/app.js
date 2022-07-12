/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./scripts/favorites.js":
/*!******************************!*\
  !*** ./scripts/favorites.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Favorites)\n/* harmony export */ });\nclass Favorites {\r\n  constructor() {\r\n    this.load();\r\n  }\r\n  list = [];\r\n  save() {\r\n    window.localStorage.setItem('favorites', JSON.stringify(this.list));\r\n  };\r\n  load() {\r\n    const stored = JSON.parse(window.localStorage.getItem('favorites'));\r\n    if (stored) this.list = stored;\r\n  };\r\n  remove(soundName) {\r\n    this.list = this.list.filter(i => i !== soundName);\r\n  };\r\n  toggleBtnAsFav(favStar) {\r\n    const star = favStar;\r\n    if (star.classList.contains('fav-set')) {\r\n      star.innerHTML = 'star_outline';\r\n      this.remove(star.parentElement.dataset.soundName);\r\n    } else {\r\n      star.innerHTML = 'star';\r\n      this.list.push(star.parentElement.dataset.soundName);\r\n    }\r\n    star.classList.toggle('fav-set');\r\n    star.parentElement.classList.toggle('fav');\r\n    this.save();\r\n  };\r\n};\n\n//# sourceURL=webpack://discordbot-web-interface/./scripts/favorites.js?");

/***/ }),

/***/ "./scripts/main.js":
/*!*************************!*\
  !*** ./scripts/main.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _requests__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./requests */ \"./scripts/requests.js\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ \"./scripts/utils.js\");\n/* harmony import */ var _favorites__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./favorites */ \"./scripts/favorites.js\");\n\r\n\r\n\r\n\r\nconst favorites = new _favorites__WEBPACK_IMPORTED_MODULE_2__[\"default\"];\r\n\r\ndocument.addEventListener('DOMContentLoaded', async () => {\r\n  const userData = await (0,_requests__WEBPACK_IMPORTED_MODULE_0__.fetchUser)();\r\n  (0,_utils__WEBPACK_IMPORTED_MODULE_1__.makeSoundButtons)(userData.soundList, favorites);\r\n})\r\n\r\n;(0,_utils__WEBPACK_IMPORTED_MODULE_1__.addSoundLogic)();\r\n\r\ndocument.getElementById('btn-container').addEventListener('click', e => {\r\n  if (e.target.classList.contains('sound-btn')) {\r\n    e.target.classList.add('btn-red');\r\n    (0,_requests__WEBPACK_IMPORTED_MODULE_0__.postSound)(e.target);\r\n    setTimeout(() => e.target.classList.remove('btn-red'), 1);\r\n  }\r\n  if (e.target.classList.contains('favStar')) favorites.toggleBtnAsFav(e.target);\r\n});\r\n\r\ndocument.addEventListener('click', e => {\r\n  const logOutMenu = document.getElementById('log-out-menu');\r\n  const avatar = document.getElementById('avatar');\r\n  if (e.target === document.getElementById('skip-one')) (0,_requests__WEBPACK_IMPORTED_MODULE_0__.skipRequest)();\r\n  if (e.target === document.getElementById('skip-all')) (0,_requests__WEBPACK_IMPORTED_MODULE_0__.skipRequest)(true);\r\n  if (e.target === avatar) logOutMenu.classList.toggle('log-out-menu-hide');\r\n  if (e.target !== avatar) logOutMenu.classList.add('log-out-menu-hide');\r\n  if (e.target === document.getElementById('search-cancel')) (0,_utils__WEBPACK_IMPORTED_MODULE_1__.searchFilter)(true);\r\n});\r\n\r\ndocument.getElementById('search').addEventListener('keyup', () => (0,_utils__WEBPACK_IMPORTED_MODULE_1__.searchFilter)());\r\n\r\ndocument.getElementById('favorites-btn')\r\n  .addEventListener('click', e => {\r\n    const buttons = Array.from(document.getElementById('btn-container').children);\r\n    if (e.target.classList.contains('filter-btn-on'))\r\n      buttons.forEach(i => i.classList.remove('btn-filter-fav'));\r\n    else\r\n      buttons.forEach(i => {\r\n        if (!i.classList.contains('fav')) i.classList.add('btn-filter-fav');\r\n      });\r\n    e.target.classList.toggle('filter-btn-on');\r\n  });\r\n\n\n//# sourceURL=webpack://discordbot-web-interface/./scripts/main.js?");

/***/ }),

/***/ "./scripts/requests.js":
/*!*****************************!*\
  !*** ./scripts/requests.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"addSound\": () => (/* binding */ addSound),\n/* harmony export */   \"fetchUser\": () => (/* binding */ fetchUser),\n/* harmony export */   \"postSound\": () => (/* binding */ postSound),\n/* harmony export */   \"skipRequest\": () => (/* binding */ skipRequest)\n/* harmony export */ });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"./scripts/utils.js\");\n\r\n\r\nasync function fetchUser() {\r\n  try{ \r\n    const userResponse = await fetch('/api/user');\r\n    const userData = await userResponse.json();\r\n    document.getElementById('username').innerHTML = userData.name;\r\n    document.getElementById('avatar').src = `https://cdn.discordapp.com/avatars/${ userData.userID }/${ userData.avatar }.png`;\r\n    return userData;\r\n  } catch (error) {\r\n    console.error(error);\r\n    document.getElementById('body').classList.add('body-error');\r\n    document.getElementById('error-container').classList.add('message-container-show');\r\n    document.getElementById('search-container').classList.add('search-hide');\r\n    return;\r\n  }\r\n}\r\n\r\nconst postSound = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.debounce)(soundButton => {\r\n  fetch('/api/sound', {\r\n    method: 'POST',\r\n    headers: { 'Content-Type': 'text/plain' },\r\n    body: soundButton.parentElement.dataset.soundName,\r\n  })\r\n    .then(res => {\r\n      if (res.status === 401) window.location.reload();\r\n    })\r\n    .catch(error => console.log(error));\r\n  soundButton.classList.remove('btn-red');\r\n  soundButton.classList.add('btn-green');\r\n  setTimeout(() => soundButton.classList.remove('btn-green'), 1);\r\n}, 2000, true);\r\n\r\nconst skipRequest = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.debounce)(async (all = false) => {\r\n  await fetch(`/api/skip?skipAll=${ all }`, { headers: { 'Content-Type': 'text/plain' } })\r\n    .then(res => {\r\n      if (res.status === 401) window.location.reload();\r\n    })\r\n    .catch(error => console.log(error));\r\n}, 500, true);\r\n\r\nconst addSoundButton = document.getElementById('add-sound-button');\r\nconst addSoundDialog = document.getElementById('add-sound-dialog');\r\nconst fileInput = document.getElementById('file-upload');\r\nconst confirmButton = document.getElementById('addsound-confirm-btn');\r\nconst nameInput = document.getElementById('sound-name-input');\r\nconst dialogMessage = document.getElementById('add-sound-text');\r\nconst defaultMessage = 'Upload a new sound file';\r\n\r\nfunction randomSuccessMessage() {\r\n  const messages = ['The cloud awaits...', 'sv_gravity -800', 'Maybe you\\'re actually falling tho.', 'ZOOM', 'TO THE SKY REALM',\r\n    'SOUNDS FOR THE SOUND GOD', 'NOOOOO THIS FILE IS FULL OF HELIUM'];\r\n  return messages[Math.floor(Math.random() * messages.length)];\r\n}\r\n\r\nasync function addSound() {\r\n  if (!fileInput.value) return;\r\n  const formData = new FormData();\r\n  if (nameInput.value) formData.append('custom-name', nameInput.value);\r\n  formData.append('sound-file', fileInput.files[0]);\r\n\r\n  try {\r\n    confirmButton.classList.add('btn-hide');\r\n    const addSoundRes = await fetch('/api/addsound', {\r\n      method: 'POST',\r\n      body: formData,\r\n    });\r\n    if (addSoundRes.status === 409) throw new Error('Sound already exists', { cause: 409 });\r\n    addSoundButton.disabled = true;\r\n    addSoundButton.classList.add('btn-green');\r\n    addSoundButton.classList.remove('btn');\r\n    dialogMessage.innerHTML = randomSuccessMessage();\r\n    addSoundDialog.classList.add('add-sound-displace', 'btn-green');\r\n    fileInput.disabled = true;\r\n    nameInput.disabled = true;\r\n    setTimeout(() => {\r\n      addSoundButton.classList.remove('btn-green');\r\n      addSoundButton.classList.add('btn');\r\n      fileInput.value = null;\r\n      nameInput.value = null;\r\n      fileInput.disabled = false;\r\n      nameInput.disabled = false;\r\n      dialogMessage.innerHTML = defaultMessage;\r\n      addSoundDialog.classList.add('btn-hide');\r\n      addSoundDialog.classList.remove('add-sound-displace', 'btn-green');\r\n      addSoundButton.disabled = false;\r\n    }, 2100);\r\n  } catch (error) {\r\n    console.log(error);\r\n    addSoundDialog.classList.add('btn-red', 'add-sound-shake');\r\n    if (error.cause === 409) dialogMessage.innerHTML = 'Whoops, a sound already has that name';\r\n    else dialogMessage.innerHTML = 'Yikes! Something went wrong';\r\n    setTimeout(() => {\r\n      addSoundDialog.classList.remove('btn-red', 'add-sound-shake');\r\n      dialogMessage.innerHTML = defaultMessage;\r\n      confirmButton.classList.remove('btn-hide');\r\n    }, 3500);\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://discordbot-web-interface/./scripts/requests.js?");

/***/ }),

/***/ "./scripts/utils.js":
/*!**************************!*\
  !*** ./scripts/utils.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"addSoundLogic\": () => (/* binding */ addSoundLogic),\n/* harmony export */   \"debounce\": () => (/* binding */ debounce),\n/* harmony export */   \"makeSoundButtons\": () => (/* binding */ makeSoundButtons),\n/* harmony export */   \"searchFilter\": () => (/* binding */ searchFilter)\n/* harmony export */ });\n/* harmony import */ var _requests__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./requests */ \"./scripts/requests.js\");\n\r\n\r\nfunction makeSoundButtons(data, userFavorites) {\r\n  data.forEach(i => {\r\n    const div = document.createElement('div');\r\n    const btn = document.createElement('button');\r\n    const fav = document.createElement('span');\r\n    fav.classList.add('material-icons', 'favStar', 'icon-btn');\r\n    if (userFavorites.list.find(x => x === i)) {\r\n      div.classList.add('fav');\r\n      fav.innerHTML = 'star';\r\n      fav.classList.add('fav-set');\r\n    } else {\r\n      fav.innerHTML = 'star_outline';\r\n    }\r\n    btn.innerHTML = i;\r\n    btn.classList.add('btn', 'sound-btn');\r\n    div.dataset.soundName = i;\r\n    div.classList.add('sound-tile');\r\n    div.appendChild(btn);\r\n    div.appendChild(fav);\r\n    document.getElementById('btn-container').appendChild(div);\r\n  });\r\n}\r\n\r\nfunction searchFilter(cancelButton = false) {\r\n  const search = document.getElementById('search');\r\n  if (cancelButton) search.value = '';\r\n  search.focus();\r\n\r\n  const searchX = document.getElementById('search-cancel');\r\n  if (search.value) searchX.classList.add('search-cancel-show');\r\n  else searchX.classList.remove('search-cancel-show');\r\n\r\n  const searchMessage = document.getElementById('empty-search-container');\r\n  searchMessage.classList.remove('message-container-show');\r\n  const buttons = Array.from(document.getElementById('btn-container').children);\r\n  buttons.forEach(i => i.classList.add('btn-hide'));\r\n  buttons.forEach(i => {\r\n    const btnName = i.dataset.soundName.toUpperCase();\r\n    if (btnName.includes(search.value.toUpperCase())) i.classList.remove('btn-hide');\r\n  });\r\n  if (buttons.every(i => i.classList.contains('btn-hide'))) searchMessage.classList.add('message-container-show');\r\n}\r\n\r\nfunction debounce(func, wait, immediate) {\r\n  let timeout;\r\n\r\n  return function executedFunction(...args) {\r\n    const context = this;\r\n\r\n    const later = () => {\r\n      timeout = null;\r\n      if (!immediate) func.apply(context, args);\r\n    };\r\n\r\n    const callNow = immediate && !timeout;\r\n\r\n    clearTimeout(timeout);\r\n\r\n    timeout = setTimeout(later, wait);\r\n\r\n    if (callNow) func.apply(context, args);\r\n  };\r\n}\r\n\r\nfunction addSoundLogic() {\r\n\r\nconst addSoundButton = document.getElementById('add-sound-button');\r\nconst addSoundDialog = document.getElementById('add-sound-dialog');\r\nconst fileInput = document.getElementById('file-upload');\r\nconst confirmButton = document.getElementById('addsound-confirm-btn');\r\nconst nameInput = document.getElementById('sound-name-input');\r\nconst dialogMessage = document.getElementById('add-sound-text');\r\nconst defaultMessage = 'Upload a new sound file';\r\n\r\naddSoundButton.addEventListener('click', () => {\r\n  if (addSoundDialog.classList.contains('btn-hide')) {\r\n    addSoundDialog.classList.remove('btn-hide');\r\n    return;\r\n  }\r\n  fileInput.value = null;\r\n  nameInput.value = null;\r\n  confirmButton.classList.add('btn-hide');\r\n  addSoundDialog.classList.add('btn-hide');\r\n});\r\n\r\nfileInput.addEventListener('change', () => {\r\n  const supportedFileTypes = ['wav', 'mp3', 'webm', 'ogg'];\r\n  const path = fileInput.value.split('.');\r\n  const extension = path[path.length - 1];\r\n\r\n  if (!supportedFileTypes.includes(extension) && fileInput.value) {\r\n    fileInput.value = null;\r\n    addSoundDialog.classList.add('btn-red', 'add-sound-shake');\r\n    dialogMessage.innerHTML = 'WRONG FILE TYPE (try: wav mp3 webm ogg)';\r\n    setTimeout(() => {\r\n      addSoundDialog.classList.remove('btn-red', 'add-sound-shake');\r\n      dialogMessage.innerHTML = defaultMessage;\r\n    }, 3500);\r\n    return;\r\n  }\r\n\r\n  if (fileInput.value && nameInput.value) confirmButton.classList.remove('btn-hide');\r\n  else confirmButton.classList.add('btn-hide');\r\n});\r\n\r\nnameInput.onkeydown = e => { if (e.key === 'Enter') e.target.blur(); };\r\n\r\nnameInput.addEventListener('keyup', () => {\r\n  if (!fileInput.value || !nameInput.value) {\r\n    confirmButton.classList.add('btn-hide');\r\n    return;\r\n  }\r\n  if (fileInput.value && nameInput.value) confirmButton.classList.remove('btn-hide');\r\n});\r\n\r\ndocument.getElementById('addsound-confirm-btn').addEventListener('click', () => (0,_requests__WEBPACK_IMPORTED_MODULE_0__.addSound)());\r\n\r\n}\r\n\n\n//# sourceURL=webpack://discordbot-web-interface/./scripts/utils.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./scripts/main.js");
/******/ 	
/******/ })()
;