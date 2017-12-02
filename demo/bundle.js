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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__syg_tabs__ = __webpack_require__(1);



// simple setting
const tabs1 = new __WEBPACK_IMPORTED_MODULE_0__syg_tabs__["a" /* default */]('.js-section-1 .js-tabs');

// advanced setting
const tabs2 = new __WEBPACK_IMPORTED_MODULE_0__syg_tabs__["a" /* default */]('.js-section-2 .js-tabs', {
    use_url_hash: true
});




/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Easy tab controll
 *
 * @author   Hiroshi Fukuda <info.sygnas@gmail.com>
 * @license  MIT
 */

// デフォルト設定
const defaults = {
    // タブボタンのセレクタ
    tab_selector: 'a',
    // URLハッシュに対応するか
    use_url_hash: false
};

// data属性：コンテンツ
const DATA_CONTENT = 'data-tabs-content';
// data属性：前のボタン
const DATA_PREV = 'data-tabs-prev';
// data属性：次のボタン
const DATA_NEXT = 'data-tabs-next';
// data属性：初期ページ番号
const DATA_INITIAL = 'data-tabs-initial';
// data属性：アクティブボタン / アクティブコンテンツ
const DATA_ACTIVE = 'data-tabs-active';



/* harmony default export */ __webpack_exports__["a"] = (class {

    /**
     * コンストラクタ
     * @param {String} target タブボタングループのDOMセレクタ
     */
    constructor(target, options) {
        // 設定
        this.opt = Object.assign(defaults, options);

        // タブグループのエレメント
        this.tab_group = document.querySelector(target);
        // 個々のタブボタン
        this.tab_buttons = this.tab_group.querySelectorAll(
            this.opt.tab_selector
        );
        // コンテンツ
        this.contents = document.querySelectorAll(
            this.tab_group.getAttribute(DATA_CONTENT)
        );
        // 戻るボタン
        this.prev_button = document.querySelector(
            this.tab_group.getAttribute(DATA_PREV)
        );
        // 進むボタン
        this.next_button = document.querySelector(
            this.tab_group.getAttribute(DATA_NEXT)
        );

        // イベント設定
        this._init_event();

        // 現在表示しているページを取得
        this.active = 0;
        this._set_initial_page();
    }

    /**
     * 指定した index のタブをアクティブにする
     * @param {Number} index タブ番号
     */
    set_active_from_index(index) {
        // タブボタンとコンテンツにアクティブ属性付与
        this.tab_buttons.forEach((btn, i) => {
            if (index === i) {
                btn.setAttribute(DATA_ACTIVE, 'true');
            } else {
                btn.setAttribute(DATA_ACTIVE, 'false');
            }
        });

        this.contents.forEach((content, i) => {
            if (index === i) {
                content.setAttribute(DATA_ACTIVE, 'true');
            } else {
                content.setAttribute(DATA_ACTIVE, 'false');
            }
        });

        // URLにハッシュ付与
        if (this.opt.use_url_hash) {
            window.location.hash = index;
        }
        this.active = index;
    }

    /**
     * イベント設定
     */
    _init_event() {

        // タブボタンをクリック
        // 指定されたページをアクティブにする
        this.tab_buttons.forEach((elm) => {
            this._init_event_tab_button(elm);
        });

        // 戻るボタン
        if (this.prev_button) {
            this.prev_button.addEventListener('click', (e) => {
                this._init_event_prev_button(e);
            });
        }

        // 進むボタン
        if (this.next_button) {
            this.next_button.addEventListener('click', (e) => {
                this._init_event_next_button(e);
            });
        }
    }

    /**
     * タブボタンのイベント
     * @param elm {DOM} ボタンエレメント
     */
    _init_event_tab_button(elm) {
        elm.addEventListener('click', (e) => {
            const index = Number.parseInt(e.target.hash.substr(1), 10);
            this.set_active_from_index(index);
            e.preventDefault();
        });
    }

    /**
     * 戻るボタンのイベント
     * @param e {Event} クリックイベント
     */
    _init_event_prev_button(e) {
        const index = this.active - 1 >= 0 ?
            this.active - 1 : this.contents.length - 1;
        this.set_active_from_index(index);
        e.preventDefault();
    }

    /**
     * 進むボタンのイベント
     * @param e {Event} クリックイベント
     */
    _init_event_next_button(e) {
        const index = (this.active + 1) % this.contents.length;
        this.set_active_from_index(index);
        e.preventDefault();
    }

    /**
     * 初期表示ページを設定する
     */
    _set_initial_page() {
        let page_index = 0;

        // まずはhtml側で指定された初期ページ番号を取得
        page_index = Number.parseInt(
            this.tab_group.getAttribute(DATA_INITIAL), 10
        ) || 0;

        // URLパラメーターが有効だった場合
        if (this.opt.use_url_hash) {
            const hash = window.location.hash.substr(1);
            const index = Number.parseInt(hash, 10);

            // 1以上だったらページ指定
            if (index >= 1) {
                page_index = index;
            }
        }

        // ページをアクティブにする
        this.set_active_from_index(page_index);
    }
});


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ })
/******/ ]);