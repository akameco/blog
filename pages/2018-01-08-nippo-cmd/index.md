---
title: "高速で日報を作成"
date: "2018-01-08"
path: "/2018-01-08-nippo-cmd/"
---

## 高速でnippoを開けるようにした。

以下のようなスクリプトを用意する。
普通ならshellscirptの書くのだろうけどjsで書く方が高速に書けるのでいつもjsで書いてしまう。

```js
'use strict'
const fs = require('fs')
const path = require('path')
const shell = require('shelljs')
const moment = require('moment')
const ejs = require('ejs')

const dateStr = moment().format('YYYY-MM-DD')
const outputDirPath = `pages/${dateStr}`
const outputPath = path.join(outputDirPath, 'index.md')

if (fs.existsSync(outputPath)) {
  console.log(outputPath)
  process.exit(0)
}

shell.mkdir(outputDirPath)

ejs.renderFile(
  path.resolve(__dirname, './template/index.md.ejs'),
  { title: dateStr, date: dateStr, path: `/${dateStr}/` },
  (err, output) => {
    fs.writeFileSync(outputPath, output)
  },
)

console.log(outputPath)
```

shelljsがが便利

package.jsonのscirptsフィールドに以下を追記。
`xargs -o`を使って`vim`を開く。

```package.json
  "nippo": "node ./scripts/nippo.js | xargs -o vim",
```

さらに`.zshrc`に以下の関数を定義すればどこからでも日報が開ける。

```sh
GHQ=`ghq root`/github.com

nippo() {
	cd $GHQ/akameco/blog
	yarn run nippo
}
```

書いてすぐ公開とはいかないのが不便だけど、適当にマークダウンで書けるのが便利なので、とりあえず続けてみる。
