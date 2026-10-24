import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: '/',
    name: 'FitMeal Pro // Athletic Longevity & Nutrition',
    short_name: 'FitMeal',
    description:
      'AI-driven fitness syncing with Google Fit, Apple Health, & Strava. Adaptive macro nutrition, recovery readiness, and global arena quests.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#0B0E0C',
    theme_color: '#0B0E0C',
    icons: [
      {
        src: '/pwa-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/pwa-maskable-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
