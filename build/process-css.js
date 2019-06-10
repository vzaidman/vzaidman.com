const fs = require('fs')

let currentClassName = 0

module.exports = ({htmlContent, cssContent}) => {
	// remove whitespaces
	cssContent = cssContent
		.replace(/,\s*/g, ',')  // between class names separated with , {
		.replace(/\s*\{/g, '{') // between class name and {
		.replace(/\{\s*/g, '{') // between class { and class content start
		.replace(/:\s*/g, ':')  // between attribute: and attribute value
		.replace(/;\s*/g, ';')  // between prev attribute; and next attribute
		.replace(/\}\s*/g, '}') // between end of class and next class

	const classNamesMapping = {}
	const classNamesInUse = []

	cssContent = cssContent.replace(/\.([^.]*?)\{/g, (match, classNames) => {
		const newClassNames = classNames
			.split(/\s/)
			.map(className => {
				if (classNamesMapping[className]) {
					return classNamesMapping[className]
				}

				const newClassName = `c${currentClassName++}`
				classNamesMapping[className] = newClassName
				return newClassName
			})

		return `.${newClassNames.join(' ')}{`
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
