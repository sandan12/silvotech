/** @type {import('next').NextConfig} */
const nextConfig = {
  // Сборка снова проверяет типы. Если после включения появятся ошибки —
  // это реальные ошибки, которые до сих пор просто скрывались.
  typescript: {
    ignoreBuildErrors: false,
  },

  images: {
    // Было unoptimized: true — из-за этого в браузер уходили исходные PNG
    // весом до 2,9 МБ. Теперь Next сам отдаёт AVIF/WebP нужного размера.
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [64, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },

  poweredByHeader: false,

  async headers() {
    // Content-Security-Policy в боевом режиме.
    // 'unsafe-inline' в script-src обязателен: Next инлайнит собственные
    // bootstrap-скрипты и JSON-LD. Полностью убрать его можно только через
    // nonce в proxy.ts, но nonce требует чтения заголовков в layout,
    // а это переводит страницы из статики в динамику — для лендинга невыгодно.
    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self' data:",
      "connect-src 'self' https://*.vercel-insights.com https://vitals.vercel-insights.com",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "object-src 'none'",
      'upgrade-insecure-requests',
    ].join('; ')

    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
          { key: 'Content-Security-Policy', value: csp },
        ],
      },
      {
        // Изображения и статика: длинный кэш, иначе Vercel каждый раз пересчитывает.
        source: '/:path*.(png|jpg|jpeg|webp|avif|svg|mp4|woff2)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ]
  },
}

export default nextConfig
