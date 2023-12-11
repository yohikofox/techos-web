import RedisCacheHandler from 'R/src/infrastructure/cache/redis/redis-cache-handler';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const cache = await globalThis.redisClient?.keys('*');
  return NextResponse.json({ items: cache });
}