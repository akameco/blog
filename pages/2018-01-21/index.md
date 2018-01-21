---
title: "2018-01-21"
date: "2018-01-21"
path: "/2018-01-21/"
---

## s2s

3つのライブラリをリリースした。

- [akameco/css-to-flow](https://github.com/akameco/css-to-flow)
- [akameco/find-css-classes: find css classes](https://github.com/akameco/find-css-classes)
- [s2s/packages/s2s-handler-css-to-flow at master · akameco/s2s](https://github.com/akameco/s2s/tree/master/packages/s2s-handler-css-to-flow)

目的は、cssからflowの型定義を作成するためだ。
個人的にはstyeld-componentsがベストだと考えるが、あくまでjsから見た場合であり、既存の資産がある場合はcssを活用した方がいいのは明白だ。
しかし、cssは型がなく補完もない。タイポも検知しずらい。
そこで、cssからflowの型定義を生成するライブラリを書いた。
すでにts版や独立したflow版もあるがflow版はテストがなく利用する価値が低いため、作り直した。
ポイントとしては、他のライブラリと違い、ファイルパスを必要としない。
そして小さい。
個人的にはモジュールは`index.js`ファイル一つより大きくなった時点で分割すべきだと考えている。
さて、ファイルパスに依存しないので、s2sに乗せることが容易になったので、s2sの仕組みの上で動作する。


```js
const handlerCssToFlow = require('s2s-handler-css-to-flow').default

module.exports = {
  watch: './**/*.css',
  plugins: [
    {
      test: /.*.css$/,
      handler: handlerCssToFlow,
      output: '[name].css.flow',
    },
  ],
}
```

flowは同じディレクトリの同じファイル名のあとに`.flow`がついていれば対象の型定義とみなすため、特に設定する必要はない。
これで型安全にcssを扱うことが出来る。

<blockquote class="twitter-tweet" data-partner="tweetdeck"><p lang="ja" dir="ltr">s2sでreact-css-modulesのために、cssのクラスセレクタを型定義に変換してcssを型安全に使う <a href="https://t.co/wnOznkkNYB">pic.twitter.com/wnOznkkNYB</a></p>&mdash; あかめ@アルバイト.js (@akameco) <a href="https://twitter.com/akameco/status/954886445411348480?ref_src=twsrc%5Etfw">January 21, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

ちょっとflowのキャッシュまわりで問題が起こることがあるが、ないよりましだ。

### s2s

久々にメンテした。
テンプレートを分離出来るようにしたのでプロジェクトに余分なファイルを入れずに済む。
これで新規プロジェクトへの導入が楽だ。
また、create-react-appをフォークして、s2s+reduxバージョンを作成したい。
が、CRAのv2が出てから取り組んだ方が良さそうだ。

## 気持ち

読書忘れた。
習慣付けたい。
