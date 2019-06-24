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

module.exports = html => {
	const interval = setInterval(() => console.log('building pdf cv'), 2000)

	createPdfFile({html, dist: 'dist/vitali_zaidman_cv.pdf'})
		.catch((...args) => console.error(...args))
		.finally(() => clearInterval(interval))
}


const { parse } = require('url');
const { getScreenshot } = require('./chromium');
const { getInt, getUrlFromPath, isValidUrl } = require('./validator');

module.exports = async function (req, res) {
	try {
		const {
			pathname = '/',
			query = {}
		} = parse(req.url, true);
		const { type = 'png', quality, fullPage } = query;

		const url = getUrlFromPath(pathname);

		const qual = getInt(quality);

		if (!isValidUrl(url)) {
			res.statusCode = 400;
			res.setHeader('Content-Type', 'text/html');
			res.end(`<h1>Bad Request</h1><p>The url <em>${url}</em> is not valid.</p>`);
		} else {
			const file = await getScreenshot(url, type, qual, fullPage);
			res.statusCode = 200;
			res.setHeader('Content-Type', `image/${type}`);
			res.end(file);
		}
	} catch (e) {
		res.statusCode = 500;
		res.setHeader('Content-Type', 'text/html');
		res.end('<h1>Server Error</h1><p>Sorry, there was a problem</p>');
		console.error(e.message);
	}
};
