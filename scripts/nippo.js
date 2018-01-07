'use strict'
const fs = require('fs')
const path = require('path')
const shell = require('shelljs')
const moment = require('moment')
const ejs = require('ejs')

const dateStr = moment().format('YYYY-MM-DD')
const outputDirPath = `pages/${dateStr}`
const outputPath = path.join(outputDirPath, 'index.md')

shell.mkdir(outputDirPath)

if (fs.existsSync(outputPath)) {
  console.log(`${outputPath} is already exist`)
  process.exit(0)
}

ejs.renderFile(
  path.resolve(__dirname, './template/index.md.ejs'),
  { title: dateStr, date: dateStr, path: `/${dateStr}/` },
  (err, output) => {
    fs.writeFileSync(outputPath, output)
  },
)
