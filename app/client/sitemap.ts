// app/sitemap.ts

import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://www.kirkosw07pubservice.org/',
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: 'https://www.kirkosw07pubservice.org/services',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://www.kirkosw07pubservice.org/news',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://www.kirkosw07pubservice.org/requirements',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://www.kirkosw07pubservice.org/search',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://www.kirkosw07pubservice.org/complaints',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://www.kirkosw07pubservice.org/anonymous',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://www.kirkosw07pubservice.org/about',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://www.kirkosw07pubservice.org/about/core-values',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://www.kirkosw07pubservice.org/about/mission',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://www.kirkosw07pubservice.org/about/vision',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://www.kirkosw07pubservice.org/client/sitemap',
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]
}
