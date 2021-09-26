const fse = require('fs-extra')
const path = require('path')

// 声明配置文件内容
const jsonConfig = {
  "name": "xt-cli",
  "mirror": "https://xt-template-cli-git-main-xt-cli.vercel.app/"
}

// 拼接 config.json 完整路径
const configPath = path.resolve(__dirname,'../config.json')

async function defConfig() {
  try {
    await fse.outputJson(configPath, jsonConfig)
  } catch (err) {
    console.error(err)
    process.exit()
  }
}

module.exports = defConfig
