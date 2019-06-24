const fs = require('fs')

module.exports = () => {
	fs.writeFileSync('dist/robots.txt', [
		'user-agent: *',
		'allow: /$',
		'allow: /vitali_zaidman_cv.pdf$',
		'allow: /vitali-zaidman-200x200.png$',
		'',
		'sitemap: https://vzaidman.com/sitemap.xml$'
	].join('\n'))

	fs.writeFileSync('dist/sitemap.xml',
`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
   <url>
      <loc>https://vzaidman.com/</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>1.0</priority>
   </url>
      <url>
      <loc>https://vzaidman.com/vitali_zaidman_cv.pdf</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.8</priority>
   </url>
</urlset>`
	)
}
