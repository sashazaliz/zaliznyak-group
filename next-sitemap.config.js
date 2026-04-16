/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://zaliznyakgroup.com',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/start'],   // intake form — exclude from sitemap
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: '/start' },
    ],
  },
}
