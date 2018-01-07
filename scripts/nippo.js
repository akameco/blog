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

// ディレクトリの作成
shell.mkdir(outputDirPath)

// テンプレートの作成
ejs.renderFile(
  path.resolve(__dirname, './template/index.md.ejs'),
  { title: dateStr, date: dateStr, path: `/${dateStr}/` },
  (err, output) => {
    fs.writeFileSync(outputPath, output)
  },
)

console.log(outputPath)
