const fs = require('fs')
const path = require('path')

module.exports = extension => html => {
	return html.replace(new RegExp(`src="([^"]*${extension})"`, 'g'), (match, imagePath) => {
		const imageAsBase64 = fs.readFileSync(`assets/${imagePath}`, 'base64');
		return `src="data:image/jpeg;base64,${imageAsBase64}"`
	})
}
