import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'HomeAtlas | Curated Luxury Real Estate',
    short_name: 'HomeAtlas',
    description:
      'Curator of the world’s most distinguished architectural residences, modern sanctuaries, and trophy estates.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0A0A0A',
    theme_color: '#0A0A0A',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  };
}
