const fs = require('fs')

let currentClassNameCount = 0

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

	cssContent = cssContent.replace(/\.[^}]*?\{/g, cssSelector => {
		return cssSelector
			.split(',')
			.map(c0 => {
				return c0.split(' ')
					.map(c1 => {
						return c1
							.split('.')
							.map(cssSelectorPart => {
								const classNameMatch = cssSelectorPart.match(/[a-z-]+/)
								const className = classNameMatch && classNameMatch[0]
								if (!className) {
									return cssSelectorPart
								}

								classNamesMapping[className] = (
									classNamesMapping[className] ||
									`c${currentClassNameCount ++ }`
								)

								return cssSelectorPart.replace(className, classNamesMapping[className])
							})
							.join('.')
					})
					.join(' ')
			})
			.join(',')
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

		const devClassNames = (
			process.env.NODE_ENV === 'development' ?
				` orig-class="${classNames}"` : ''
		)

		return `class="${newClassNames}"${devClassNames}`
	})

	Object.keys(classNamesMapping).forEach(className => {
		if(!classNamesInUse.includes(className)){
			throw new Error(`The class name ${className} is not in use in the html.`)
		}
	})

	return htmlContent
}
