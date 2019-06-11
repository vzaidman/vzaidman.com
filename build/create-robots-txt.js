const fs = require('fs')

module.exports = () => {
	fs.writeFileSync('dist/robots.txt', [
		'user-agent: *',
		'allow: /$'
	].join('\n'))
}
