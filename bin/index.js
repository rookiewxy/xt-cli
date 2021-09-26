#!/usr/bin/env node

// 请求 commander 库
const program = require('commander')

const updateChk = require('../lib/update')
const setMirror = require('../lib/mirror')
const dlTemplate = require('../lib/download')
const initProject = require('../lib/init')

// 从 package.json 文件中请求 version 字段的值，-v和--version是参数
program.version(require('../package.json').version, '-v, --version')

// upgrade 检测更新
program
	.command('upgrade')
	.description('Check the xt-cli version.')
	.action(() => {
		updateChk()
	})

// mirror
program
	.command('mirror <template_mirror>')
	.description('Set the template mirror.')
	.action((tplMirror) => {
		setMirror(tplMirror)
	})

// template
program
	.command('template')
	.description('Download template from mirror.')
	.action(() => {
		dlTemplate()
	})

// init
program
	.name('xt-cli')
	.usage('<commands> [options]')
	.command('init <project_name>')
	.description('Create a javascript plugin project.')
	.action(project => {
		initProject(project)
	})

// 解析命令行参数
program.parse(process.argv)
