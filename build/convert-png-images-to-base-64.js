const fs = require('fs')
const path = require('path')

module.exports = html => {
	return html.replace(/src=\"([^"]*png)\"/g, (match, imagePath) => {
		const imageAsBase64 = fs.readFileSync(path.resolve('./src/', imagePath), 'base64');
		return `src="data:image/jpeg;base64,${imageAsBase64}"`
	})
}
