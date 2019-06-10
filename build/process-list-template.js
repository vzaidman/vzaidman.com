const fs = require('fs')

let currentClassNameCharCode = 97

module.exports = ({htmlContent, listItemsData, templateName, listItemTemplate}) => {
	const generatedTemplateContent = listItemsData
		.map(listItem => {
			return Object.entries(listItem).reduce((result, [listItemName, listItemContent]) => {
				listItemContent = Array.isArray(listItemContent) ? listItemContent.join(' ') : listItemContent
				return result.split(`{{${listItemName}}}`).join(listItemContent)
			}, listItemTemplate)
		})
		.join('')

	return htmlContent
		.replace(`{{${templateName}}}`, generatedTemplateContent)
		.replace('{{currentYear}}', new Date().getFullYear())
		.replace('{{currentYear}}', 'present')
}
