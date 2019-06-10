const fs = require('fs')
const processCss = require('./build/process-css')

let html = fs.readFileSync('./src/index.html').toString()

const projects = JSON.parse(fs.readFileSync('./data/project-list.json').toString())
const projectListItemTemplate = fs.readFileSync('./src/templates/project-list-item.html').toString()
html = require('./build/process-list-template')({
	htmlContent: html,
	listItemsData: projects,
	templateName: 'project-list',
	listItemTemplate: projectListItemTemplate
})

const css = fs.readFileSync('./src/index.css').toString()
html = require('./build/process-css')({
	htmlContent: html,
	cssContent: css
})

fs.writeFileSync('./dist/index.html', html)
