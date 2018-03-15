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
// data属性：URLハッシュに対応するか（オプションよりこちらが優先される）
const DATA_HASH = 'data-tabs-hash';


export default class {

    /**
     * コンストラクタ
     * @param {String} target タブボタングループのDOMセレクタ
     */
    constructor(target, options) {
        // 設定
        this.opt = Object.assign(defaults, options);

        // タブグループのエレメント
        this.tab_group = document.querySelector(target);

        // 該当するエレメントがなければ抜ける
        if (this.tab_group === null) {
          return;
        }

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

        // URLハッシュ付けるかを確認
        this.$_check_url_hash_enabled();

        // 現在表示しているページを取得
        this.active = 0;
        this._set_initial_page();
    }

    /**
     * URLハッシュ対応するか確認
     */
    $_check_url_hash_enabled() {
      const is_enable = this.tab_group.getAttribute(DATA_HASH) === 'true';
      this.opt.use_url_hash = is_enable;
    }

    /**
     * 指定した index のタブをアクティブにする
     * @param {Number} index タブ番号
     */
    set_active_from_index(index) {
        // タブボタンとコンテンツにアクティブ属性付与
        get_node_array(this.tab_buttons).forEach((btn, i) => {
            if (index === i) {
                btn.setAttribute(DATA_ACTIVE, 'true');
            } else {
                btn.setAttribute(DATA_ACTIVE, 'false');
            }
        });

        get_node_array(this.contents).forEach((content, i) => {
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
        get_node_array(this.tab_buttons).forEach((elm) => {
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
            const index = Number.parseInt(e.currentTarget.hash.substr(1), 10);
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

}

/**
 * NodeListをArrayとして取り出す（IE対策）
 */
function get_node_array(node_list) {
    return Array.prototype.slice.call(node_list, 0);
}
