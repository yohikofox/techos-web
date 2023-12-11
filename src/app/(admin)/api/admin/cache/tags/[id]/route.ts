import CacheFactory from 'R/src/infrastructure/cache/CacheFactory';
import RedisCacheHandler from 'R/src/infrastructure/cache/redis/redis-cache-handler';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  // const Provider = CacheFactory.resolve()
  // const cache = await new Provider({}).get(params.id);

  // if (!cache) return NextResponse.json("Not found", { status: 404 });

  // return NextResponse.json({ ...cache });

  return NextResponse.json({ success: true });
}


export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  // const Provider = CacheFactory.resolve()
  // await new Provider({}).remove(params.id);
  // return NextResponse.json({ success: true });

  return NextResponse.json({ success: true });
}