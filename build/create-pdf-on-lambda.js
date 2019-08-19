const chrome = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');

// issue: https://github.com/zeit/now-cli/issues/1643
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

module.exports = html => {
	const interval = setInterval(() => console.log('building pdf cv'), 2000)

	createPdfFile({html, dist: 'dist/vitali_zaidman_cv.pdf'})
		.catch((...args) => console.error(...args))
		.then(() => clearInterval(interval))
}
