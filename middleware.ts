import { NextRequest, NextResponse } from 'next/server';
const locales = ['pl','en','de','cz','sk'];
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === '/cs' || pathname.startsWith('/cs/')) { request.nextUrl.pathname = `/cz${pathname.slice(3)}`; return NextResponse.redirect(request.nextUrl, 308); }
  if (locales.some(l => pathname === `/${l}` || pathname.startsWith(`/${l}/`))) return NextResponse.next();
  if (pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname.includes('.')) return NextResponse.next();
  const preferred = request.headers.get('accept-language')?.split(',').map((x: string)=>x.trim().slice(0,2)).find((x: string)=>locales.includes(x)) || 'pl';
  request.nextUrl.pathname = `/${preferred}${pathname}`;
  return NextResponse.redirect(request.nextUrl, 307);
}
export const config = { matcher: ['/((?!_next|api|.*\\..*).*)'] };
