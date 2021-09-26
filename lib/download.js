/*
 * @Description: 
 * @Autor: wxy
 * @Date: 2021-09-24 08:21:22
 * @LastEditors: wxy
 * @LastEditTime: 2021-09-26 11:41:11
 */

const download = require('download')
const ora = require('ora')
const chalk = require('chalk')
const path = require('path')
const fse = require('fs-extra')

const defConfig = require('./config')

const cfgPath = path.resolve(__dirname,'../config.json')
const tplPath = path.resolve(__dirname,'../template')

async function dlTemplate() {
  const exists = await fse.pathExists(cfgPath)
  if (exists){
    await dlAction()
  }else{
    await defConfig()
    await dlAction()
  }
}

async function dlAction(){
  // Remove <template> dir 
  try {
    await fse.remove(tplPath)
  } catch (err) {
    console.error(err)
    process.exit() 
  }

  const jsonConfig = await fse.readJson(cfgPath)
  const dlSpinner = ora(chalk.cyan('Downloading template...'))
  
  // Download xt-cli template
  dlSpinner.start()
  try {
    // 下载模板后解压
    await download(jsonConfig.mirror+'xt-template.zip', path.resolve(__dirname,'../template/'),{extract:true});
  } catch (err) {
    dlSpinner.text = chalk.red(`Download template failed. ${err}`)
    dlSpinner.fail()
    process.exit() 
  }
  dlSpinner.text = 'Download template successful.'
  dlSpinner.succeed()
}

module.exports = dlTemplate


