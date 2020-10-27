const fs = require('fs')

let currentClassNameCharCode = 97

module.exports = templateName => dataName => html => {
	const listItemData = JSON.parse(fs.readFileSync(`data/${dataName}.json`).toString())
	const listItemTemplate = fs.readFileSync(`templates/${templateName}.html`).toString()

	const generatedTemplateContent = listItemData
		.map(listItem => {
			return [...Object.entries(listItem), ['list-name', dataName]]
				.reduce((result, [listItemName, listItemContent]) => {
					listItemContent = Array.isArray(listItemContent) ? listItemContent.join(' ') : listItemContent

					const conditionalContentMatch = /\<if (.*?)\>([\s\S]*?)\<\/if\>/gmi.exec(result);
					if (conditionalContentMatch) {
						const [match, ifProperty, content] = conditionalContentMatch; 
						if (listItemName === ifProperty) {
							result = result.replace(match, content);
						}
					}

					if(listItemContent.startsWith('<list>')){
						listItemContent = listItemContent.replace('<list>', '')
						listItemContent = listItemContent.split('|')
							.map(item => `<span class="list-box-item">${item}</span>`)
							.join('')
						listItemContent = `<div class="list-box">${listItemContent}</div>`
					} 

					return result.split(`{{${listItemName}}}`).join(listItemContent)
				}, listItemTemplate)
		})
		.join('')
		.replace(/\<if (.*?)\>([\s\S]*?)\<\/if\>/gmi, '')

	return html
		.replace(`{{${dataName}}}`, generatedTemplateContent)
		.replace(/datetime="\{\{currentYear\}\}"/g, `datetime="${new Date().getFullYear()}"`)
		.replace(/\{\{currentYear\}\}/g, 'present')
}
