// pages/api/sitemap.ts

import { NextApiRequest, NextApiResponse } from 'next';

const BASE_URL = 'https://yourdomain.com'; // Replace with your actual domain

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const staticPages = [
    '',
    'services',
    'news',
    'requirements',
    'search',
    'complaints',
    'anonymous',
    'about',
    'about/core-values',
    'about/mission',
    'about/vision',
    'sitemap',
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages
    .map((path) => {
      return `
    <url>
      <loc>${`${BASE_URL}/${path}`}</loc>
      <changefreq>monthly</changefreq>
      <priority>0.8</priority>
    </url>`;
    })
    .join('')}
</urlset>`;

  res.setHeader('Content-Type', 'application/xml');
  res.write(sitemap);
  res.end();
}
