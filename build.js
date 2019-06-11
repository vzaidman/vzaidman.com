const fs = require('fs')
const processCss = require('./build/process-css')

let html = fs.readFileSync('index.html').toString()

html = require('./build/process-list-template')('seo-tags')('seo-tags')(html)

html = require('./build/process-list-template')('project-list-item')('project-list')(html)

const publicationListGenerator = require('./build/process-list-template')('publication-list-item')
html = publicationListGenerator('meetup-video-list')(html)
html = publicationListGenerator('podcast-list')(html)
html = publicationListGenerator('publication-list')(html)
html = publicationListGenerator('open-source-projects')(html)

html = require('./build/process-images.js')('png')(html)

html = require('./build/process-css')({
	htmlContent: html,
	cssContent: fs.readFileSync('index.css').toString()
})

html = require('./build/compress-html')(html)

require('./build/create-robots-txt.js')()

fs.writeFileSync('dist/index.html', html)
