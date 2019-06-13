const fs = require('fs')
const htmlPdf = require('html-pdf-chrome');

module.exports = html => {
	const interval = setInterval(() => console.log('building pdf cv'), 2000)
	
	const pdf = htmlPdf.create(html)
		.then(pdf => pdf.toFile('dist/Vitali_Zaidman_CV.pdf'))
		.catch((...args) => console.error(...args))
		.then(() => clearInterval(interval))
}
