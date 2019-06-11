const fs = require('fs')
const htmlPdf = require('html-pdf-chrome');

module.exports = async html => {
	const pdf = await htmlPdf.create(html);

	html.replace('')

	pdf.toFile('dist/cv.pdf');
}
