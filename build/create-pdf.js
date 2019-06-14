const fs = require('fs')
const htmlPdf = require('html-pdf-chrome');

module.exports = html => {
	const interval = setInterval(() => console.log('building pdf cv...'), 1000)

	// copy it to assets for the time being.
	// the better way would be to create it in build time
	// instead of re-creating it but zeit pipelines doesn't
	// support it
	const pdf = htmlPdf.create(html)
		.then(pdf => pdf.toFile('assets/Vitali_Zaidman_CV.pdf'))
		.catch((...args) => console.error(...args))
		.then(() => clearInterval(interval))
}
