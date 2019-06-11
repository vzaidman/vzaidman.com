const fs = require('fs')
const path = require('path')

module.exports = extension => html => {
	return html.replace(new RegExp(`src="([^"]*${extension})"`, 'g'), (match, imagePath) => {
		const distFilePath = `dist/${imagePath}`
		const distDirPath = path.dirname(distFilePath)
		if (!fs.existsSync(distDirPath)){
			fs.mkdirSync(distDirPath);
		}

		fs.copyFileSync(`assets/${imagePath}`, distFilePath)

		const imageAsBase64 = fs.readFileSync(`assets/${imagePath}`, 'base64');
		return `src="data:image/jpeg;base64,${imageAsBase64}"`
	})
}
