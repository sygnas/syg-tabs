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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dist_tabs_es__ = __webpack_require__(1);



// simple setting
var tabs1 = new __WEBPACK_IMPORTED_MODULE_0__dist_tabs_es__["a" /* default */]('.js-section-1 .js-tabs');

// advanced setting
var tabs2 = new __WEBPACK_IMPORTED_MODULE_0__dist_tabs_es__["a" /* default */]('.js-section-2 .js-tabs', {
    use_url_hash: true
});

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var classCallCheck = function classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
};

var createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }

    return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
    };
}();

/**
 * Easy tab controll
 *
 * @author   Hiroshi Fukuda <info.sygnas@gmail.com>
 * @license  MIT
 */

// デフォルト設定
var defaults = {
    // タブボタンのセレクタ
    tab_selector: 'a',
    // URLハッシュに対応するか
    use_url_hash: false
};

// data属性：コンテンツ
var DATA_CONTENT = 'data-tabs-content';
// data属性：前のボタン
var DATA_PREV = 'data-tabs-prev';
// data属性：次のボタン
var DATA_NEXT = 'data-tabs-next';
// data属性：初期ページ番号
var DATA_INITIAL = 'data-tabs-initial';
// data属性：アクティブボタン / アクティブコンテンツ
var DATA_ACTIVE = 'data-tabs-active';

var _class = function () {

    /**
     * コンストラクタ
     * @param {String} target タブボタングループのDOMセレクタ
     */
    function _class(target, options) {
        classCallCheck(this, _class);

        // 設定
        this.opt = Object.assign(defaults, options);

        // タブグループのエレメント
        this.tab_group = document.querySelector(target);
        // 個々のタブボタン
        this.tab_buttons = this.tab_group.querySelectorAll(this.opt.tab_selector);
        // コンテンツ
        this.contents = document.querySelectorAll(this.tab_group.getAttribute(DATA_CONTENT));
        // 戻るボタン
        this.prev_button = document.querySelector(this.tab_group.getAttribute(DATA_PREV));
        // 進むボタン
        this.next_button = document.querySelector(this.tab_group.getAttribute(DATA_NEXT));

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

    createClass(_class, [{
        key: 'set_active_from_index',
        value: function set_active_from_index(index) {
            // タブボタンとコンテンツにアクティブ属性付与
            get_node_array(this.tab_buttons).forEach(function (btn, i) {
                if (index === i) {
                    btn.setAttribute(DATA_ACTIVE, 'true');
                } else {
                    btn.setAttribute(DATA_ACTIVE, 'false');
                }
            });

            get_node_array(this.contents).forEach(function (content, i) {
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

    }, {
        key: '_init_event',
        value: function _init_event() {
            var _this = this;

            // タブボタンをクリック
            // 指定されたページをアクティブにする
            get_node_array(this.tab_buttons).forEach(function (elm) {
                _this._init_event_tab_button(elm);
            });

            // 戻るボタン
            if (this.prev_button) {
                this.prev_button.addEventListener('click', function (e) {
                    _this._init_event_prev_button(e);
                });
            }

            // 進むボタン
            if (this.next_button) {
                this.next_button.addEventListener('click', function (e) {
                    _this._init_event_next_button(e);
                });
            }
        }

        /**
         * タブボタンのイベント
         * @param elm {DOM} ボタンエレメント
         */

    }, {
        key: '_init_event_tab_button',
        value: function _init_event_tab_button(elm) {
            var _this2 = this;

            elm.addEventListener('click', function (e) {
                var index = Number.parseInt(e.target.hash.substr(1), 10);
                _this2.set_active_from_index(index);
                e.preventDefault();
            });
        }

        /**
         * 戻るボタンのイベント
         * @param e {Event} クリックイベント
         */

    }, {
        key: '_init_event_prev_button',
        value: function _init_event_prev_button(e) {
            var index = this.active - 1 >= 0 ? this.active - 1 : this.contents.length - 1;
            this.set_active_from_index(index);
            e.preventDefault();
        }

        /**
         * 進むボタンのイベント
         * @param e {Event} クリックイベント
         */

    }, {
        key: '_init_event_next_button',
        value: function _init_event_next_button(e) {
            var index = (this.active + 1) % this.contents.length;
            this.set_active_from_index(index);
            e.preventDefault();
        }

        /**
         * 初期表示ページを設定する
         */

    }, {
        key: '_set_initial_page',
        value: function _set_initial_page() {
            var page_index = 0;

            // まずはhtml側で指定された初期ページ番号を取得
            page_index = Number.parseInt(this.tab_group.getAttribute(DATA_INITIAL), 10) || 0;

            // URLパラメーターが有効だった場合
            if (this.opt.use_url_hash) {
                var hash = window.location.hash.substr(1);
                var index = Number.parseInt(hash, 10);

                // 1以上だったらページ指定
                if (index >= 1) {
                    page_index = index;
                }
            }

            // ページをアクティブにする
            this.set_active_from_index(page_index);
        }
    }]);
    return _class;
}();

function get_node_array(node_list) {
    return Array.prototype.slice.call(node_list, 0);
}

/* harmony default export */ __webpack_exports__["a"] = (_class);
//# sourceMappingURL=tabs.es.js.map

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ })
/******/ ]);