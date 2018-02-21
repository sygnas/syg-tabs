# syg-tabs

カスタマイズ可能なタブナビゲーションを実装。

## Description
シンプルなタブナビゲーションを使いたい人向け。

タブナビゲーションのスクリプトという名目ですが、data属性を与えるだけでコンテンツ制御を何もしません。
その代わり CSS で好きなように見た目をカスタマイズできます。

- data属性でターゲットとなるコンテンツ、前後ボタン、初期表示ページを設定
- URLのハッシュでも初期表示ページを設定可能
- 表示エフェクトに関しては全てcssにて行う。
- 非表示状態についてもcssで定義する。

注意：IEで使う場合は polyfill が必要です。

## Usage

[DEMO](demo/)

### Install
```sh
npm install --save @sygnas/tabs
```

### html
```html
<!-- <a href="#{番号}"> でコンテンツ番号を指定-->
<!-- data-tabs-content="{コンテンツのセレクタ}" -->
<ul class="js-tabs" data-tabs-content=".js-tabs-content">
    <li><a href="#0">PROFILE</a></li>
    <li><a href="#1">DISCOGRAPHY</a></li>
</ul>

<!-- 配置順がそのままコンテンツ番号になる -->
<div class="js-tabs_content">コンテンツ 0</div>
<div class="js-tabs_content">コンテンツ 1</div>
```

### Sass
```sass
.js-tabs{
    // タブボタン
    a{
        // アクティブ状態
        &[data-tabs-active = "true"]{
            background-color: #ccc;
        }
    }
}



// 表示切り替えコンテンツ
.js-tab-content{
    display: none;

    // アクティブ状態
    &[data-tabs-active = "true"]{
        display: block;
    }
}
```

### Script
```JavaScript
import Tabs from '@sygnas/tabs';
const tab = new Tabs('.js-tabs');
```

## Data attributes

| data属性 | 初期値 | 説明 |
| --- | --- | --- |
| data-tabs-content |  | 切り替え対象コンテンツのセレクタ |
| data-tabs-prev |  | 戻るボタンのセレクタ |
| data-tabs-next |  | 進むボタンのセレクタ |
| data-tabs-initial | 0 | 初期状態で表示するページ番号 |
| data-tabs-hash |  | URLハッシュに対応するなら "true"。 Options より優先される |

## Options

```javascript
const tab = new Tabs('.js-tabs', {
    tab_selector: 'button',
    use_url_hash: true
});
```

| 項目 | 初期値 | 説明 |
| ---- | -- | ---- |
| tab_selector | 'a' | タブボタンのセレクタ。&lt;button&gt; を使いたい時などに変更 |
| use_url_hash | false | タブ状態をURLに反映したり、URLから初期表示ページを設定出来るようにする |


## License
MIT