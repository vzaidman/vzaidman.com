const fs = require('fs')

require('./build/copy-assets')()

let html = fs.readFileSync('index.html').toString()

const template = require('./build/process-list-template')
html = template('social-media-link-item')('social-media-profiles-list')(html)
html = template('seo-tags')('seo-tags')(html)
html = template('detailed-list-item')('education-list')(html)
html = template('detailed-list-item')('project-list')(html)

const publicationListGenerator = template('publication-list-item')
html = publicationListGenerator('meetup-video-list')(html)
html = publicationListGenerator('podcast-list')(html)
html = publicationListGenerator('publication-list')(html)
html = publicationListGenerator('open-source-projects')(html)

html = require('./build/compress-html')(html)

html = require('./build/process-css')({
	htmlContent: html,
	cssContent: fs.readFileSync('index.css').toString()
})

html = require('./build/process-images')('(png|jpg)')(html)

require('./build/create-robot-files.js')()

fs.writeFileSync('dist/index.html', html)
