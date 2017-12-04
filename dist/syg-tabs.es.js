var classCallCheck = function (instance, Constructor) {
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

export default _class;
//# sourceMappingURL=syg-tabs.es.js.map
