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
const dateStr = moment().format('YYYY-MM-DD')
const titleWithDate = `${dateStr}-${title}`
const outputDirPath = `pages/${titleWithDate}`
const outputPath = path.join(outputDirPath, 'index.md')

shell.mkdir(outputDirPath)

if (fs.existsSync(outputPath)) {
  console.log(`${outputPath} is already exist`)
  process.exit(0)
}

ejs.renderFile(
  path.resolve(__dirname, './template/index.md.ejs'),
  { title, date: dateStr, path: `/${titleWithDate}/` },
  (err, output) => {
    fs.writeFileSync(outputPath, output)
  },
)
