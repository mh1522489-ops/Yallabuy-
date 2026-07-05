import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

export async function middleware(request) {
  if (!request.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  const ip = request.ip || 'unknown';
  const key = `rate:${ip}`;
  const count = await redis.get(key) || 0;

  if (count >= 10) {
    return NextResponse.json(
      { error: 'Too many requests' },
      { status: 429 }
    );
  }

  await redis.set(key, parseInt(count) + 1, { ex: 60 });
  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};
