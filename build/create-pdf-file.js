const fs = require('fs')
const htmlPdf = require('html-pdf-chrome');

module.exports = async html => {
	html = html.replace(/<footer\b[^>]*>.*?<\/footer>/, '') // remove footer
	html = html.replace(/<a download\b[^>]*>.*?<\/a>/, '') // remove the download cv button

	const pdf = await htmlPdf.create(html);
	pdf.toFile('dist/Vitali_Zaidman_CV.pdf');
}
