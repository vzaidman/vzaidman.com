const fs = require('fs')
const htmlPdf = require('html-pdf-chrome');

module.exports = html => {
	const interval = setInterval(() => console.log('building pdf cv'), 2000)

	html = html.replace(/<footer\b[^>]*>.*?<\/footer>/, '') // remove footer
	html = html.replace(/<a download\b[^>]*>.*?<\/a>/, '') // remove the download cv button

	const pdf = htmlPdf.create(html)
		.then(pdf => pdf.toFile('dist/Vitali_Zaidman_CV.pdf'))
		.catch((...args) => console.error(...args))
		.finally(() => clearInterval(interval))
}
