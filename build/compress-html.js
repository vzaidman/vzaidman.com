const fs = require('fs')

let currentClassNameCount = 0

module.exports = (htmlContent) => {
	// remove whitespaces
	return htmlContent
		.replace(/>\s*/g, '>')  // between > and content
		.replace(/\s*</g, '<')  // between content and <
}
