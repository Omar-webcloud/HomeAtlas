import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });

const siteUrl = 'https://home-atlas-estate.vercel.app';
const siteTitle = 'HomeAtlas | Curated Luxury Real Estate & Architectural Estates';
const siteDescription =
  'Discover premier architectural estates, contemporary villas, and iconic luxury residences curated across the globe.';

export const viewport: Viewport = {
  themeColor: '#0A0A0A',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: '%s | HomeAtlas',
  },
  description: siteDescription,
  applicationName: 'HomeAtlas',
  keywords: [
    'HomeAtlas',
    'luxury real estate',
    'architectural estates',
    'luxury homes',
    'contemporary villas',
    'modern architecture',
    'trophy estates',
    'private residences',
    'curated estates',
    'waterfront estates',
  ],
  authors: [{ name: 'HomeAtlas', url: siteUrl }],
  creator: 'HomeAtlas',
  publisher: 'HomeAtlas',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'HomeAtlas',
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'HomeAtlas — Curated Luxury Real Estate & Architectural Estates',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: ['/og-image.jpg'],
    creator: '@homeatlas',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '192x192',
        url: '/icon-192.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '512x512',
        url: '/icon-512.png',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: 'HomeAtlas',
    url: siteUrl,
    logo: `${siteUrl}/icon-512.png`,
    image: `${siteUrl}/og-image.jpg`,
    description: siteDescription,
    sameAs: [],
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased overflow-x-hidden`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

