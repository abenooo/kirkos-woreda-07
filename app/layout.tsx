import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Metadata } from 'next'
import Script from 'next/script'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Kirkos Sub City Wereda 07",
  description: "Kirkos Sub City Wereda 07 Administrative Office - Public Service Portal",
  keywords: "Kirkos Sub City, Wereda 07, Public Service, Administration, Ethiopia, Addis Ababa",
  authors: [{ name: "Kirkos Sub City Administration" }],
  creator: "Kirkos Sub City Administration",
  publisher: "Kirkos Sub City Administration",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://kirkoswereda07.gov.et'),
  alternates: {
    canonical: '/',
    languages: {
      'en': '/en',
      'am': '/am',
      'or': '/or',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://kirkoswereda07.gov.et',
    title: 'Kirkos Sub City Wereda 07',
    description: 'Kirkos Sub City Wereda 07 Administrative Office - Public Service Portal',
    siteName: 'Kirkos Sub City Wereda 07',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kirkos Sub City Wereda 07',
    description: 'Kirkos Sub City Wereda 07 Administrative Office - Public Service Portal',
  },
  verification: {
    google: "googlec4c057d2b8e0d65f",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "GovernmentOrganization",
  "name": "Kirkos Sub City Wereda 07 Administration",
  "url": "https://kirkoswereda07.gov.et",
  "logo": "https://kirkoswereda07.gov.et/kirkos-wo7.png",
  "description": "Kirkos Sub City Wereda 07 Administrative Office - Public Service Portal",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Addis Ababa",
    "addressCountry": "Ethiopia"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+251 11 234 5678",
    "contactType": "customer service",
    "email": "info@kirkoswereda07.gov.et"
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="googlec4c057d2b8e0d65f" />
        <meta name="msvalidate.01" content="4680C0BBC49F451555D98F586BF78DB1" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
        
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>

        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "YOUR_CLARITY_ID");
          `}
        </Script>
      </body>
    </html>
  )
}
