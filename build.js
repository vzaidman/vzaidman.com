const fs = require('fs')

require('./build/copy-assets')()

let html = fs.readFileSync('index.html').toString()

html = require('./build/process-list-template')('social-media-link-item')('social-media-profiles-list')(html)

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

require('./build/create-pdf-file.js')(html)
