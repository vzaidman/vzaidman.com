const fs = require('fs')

let currentClassNameCharCode = 97

module.exports = ({htmlContent, cssContent}) => {
	// remove whitespaces
	cssContent = cssContent.replace(/\s/g, '')

	const classNamesMapping = {}
	const classNamesInUse = []

	cssContent = cssContent.replace(/\.([^.]*?)\{/g, (match, className) => {
		const currentClassName = String.fromCharCode(currentClassNameCharCode++)
		classNamesMapping[className] = currentClassName
		return `.${currentClassName}{`
	})

	htmlContent = htmlContent.replace('{{inline-style}}', `<style>${cssContent}</style>`)
	htmlContent = htmlContent.replace(/class="(.*?)"/g, (match, classNames) => {
		const newClassNames = classNames
			.split(/\s/)
			.map(className => {
				if (!classNamesMapping[className]) {
					throw new Error(`The class name ${className} doesn't exists in css.`)
				}
				classNamesInUse.push(className)
				return classNamesMapping[className]
			})
			.join(' ')

		return `class="${newClassNames}"`
	})

	Object.keys(classNamesMapping).forEach(className => {
		if(!classNamesInUse.includes(className)){
			throw new Error(`The class name ${className} is not in use in the html.`)
		}
	})

	return htmlContent
}
