const fs = require('fs');
const chrome = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');

async function createPdfFile(html, dist) {
	const browser = await puppeteer.launch({
		args: chrome.args,
		executablePath: await chrome.executablePath,
		headless: chrome.headless,
	})

	const page = await browser.newPage()

	await page.setCotent(html);

	const file = await page.pdf({
		path: dist,
		printBackground: true,
		format: 'A4'
	})

	await browser.close()

	return file
}

module.exports = () => {
	const interval = setInterval(() => console.log('building pdf cv'), 2000)

	const html = fs.readFileSync('dist/index.html').toString()

	createPdfFile({html, dist: 'dist/vitali_zaidman_cv.pdf'})
		.catch((...args) => console.error(...args))
		.finally(() => clearInterval(interval))
}

module.exports()
