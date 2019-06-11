const fs = require('fs')

module.exports = html => {
	return html.replace(/src=\"([^"]*png)\"/g, (match, imagePath) => {
		const imageAsBase64 = fs.readFileSync(`assets/${imagePath}`, 'base64');
		return `src="data:image/jpeg;base64,${imageAsBase64}"`
	})
}
