import { NextResponse } from 'next/server';
import { rateLimit } from './lib/rateLimit';

export async function middleware(request) {
  // سيب الملفات العادية
  if (!request.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  const ip = request.ip || request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';
  const { allowed, remaining } = rateLimit(ip, 10);

  if (!allowed) {
    return NextResponse.json(
      { error: 'Too many requests. Try again later.' },
      { status: 429 }
    );
  }

  const response = NextResponse.next();
  response.headers.set('X-RateLimit-Remaining', remaining.toString());
  return response;
}

export const config = {
  matcher: '/api/:path*',
};
