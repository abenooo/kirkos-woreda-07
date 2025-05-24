// app/sitemap.xml/route.ts

import { NextRequest } from 'next/server';

const BASE_URL = 'https://www.kirkosw07pubservice.org';

export async function GET(_req: NextRequest) {
  const staticPaths = [
    '/',
    '/services',
    '/news',
    '/requirements',
    '/search',
    '/complaints',
    '/anonymous',
    '/about',
    '/about/core-values',
    '/about/mission',
    '/about/vision',
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPaths
  .map(
    (path) => `
  <url>
    <loc>${`${BASE_URL}${path}`}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
  )
  .join('')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
