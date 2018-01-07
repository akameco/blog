'use strict'
const fs = require('fs')
const path = require('path')
const meow = require('meow')
const shell = require('shelljs')
const moment = require('moment')
const ejs = require('ejs')

const cli = meow(`
  Usage:
    yarn run add-page <input>
`)

const { input } = cli
const title = input[0]

if (!title) {
  console.error('required input')
  process.exit(1)
}

const dateStr = moment().format('YYYY-MM-DD')
const titleWithDate = `${dateStr}-${title}`
const outputDirPath = `pages/${titleWithDate}`
const outputPath = path.join(outputDirPath, 'index.md')

if (fs.existsSync(outputPath)) {
  console.log(outputPath)
  process.exit(0)
}

shell.mkdir(outputDirPath)

ejs.renderFile(
  path.resolve(__dirname, './template/index.md.ejs'),
  { title, date: dateStr, path: `/${titleWithDate}/` },
  (err, output) => {
    fs.writeFileSync(outputPath, output)
  },
)

console.log(outputPath)
