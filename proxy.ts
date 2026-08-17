import { NextResponse, type NextRequest } from 'next/server'

import { defaultLocale, locales } from '@/lib/i18n/config'

const LOCALE_COOKIE = 'NEXT_LOCALE'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365

/** Язык из Accept-Language, с откатом на польский. */
function detectLocale(request: NextRequest) {
  const header = request.headers.get('accept-language')
  if (!header) return defaultLocale

  const preferred = header
    .split(',')
    .map((part) => {
      const [tag, q] = part.trim().split(';q=')
      return { tag: tag.toLowerCase().split('-')[0], q: q ? Number(q) : 1 }
    })
    .sort((a, b) => b.q - a.q)

  return preferred.find((entry) => (locales as readonly string[]).includes(entry.tag))?.tag ?? defaultLocale
}

/** Ранее выбранный язык имеет приоритет над заголовком браузера. */
function preferredLocale(request: NextRequest) {
  const saved = request.cookies.get(LOCALE_COOKIE)?.value
  if (saved && (locales as readonly string[]).includes(saved)) return saved
  return detectLocale(request)
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const currentLocale = locales.find(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  )

  if (currentLocale) {
    const response = NextResponse.next()
    // Запоминаем выбор, чтобы при следующем визите не уводить человека
    // обратно на язык из Accept-Language.
    if (request.cookies.get(LOCALE_COOKIE)?.value !== currentLocale) {
      response.cookies.set(LOCALE_COOKIE, currentLocale, {
        maxAge: COOKIE_MAX_AGE,
        path: '/',
        sameSite: 'lax',
      })
    }
    return response
  }

  const url = request.nextUrl.clone()
  url.pathname = `/${preferredLocale(request)}${pathname === '/' ? '' : pathname}`
  // 307, а не 308: язык зависит от посетителя, постоянный редирект тут кэшировать нельзя.
  return NextResponse.redirect(url, 307)
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}
