// app/sitemap.xml/route.ts
export async function GET() {
    const BASE_URL = 'https://yourdomain.com'; // Replace with your domain
  
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
  
    return new Response(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  }
  