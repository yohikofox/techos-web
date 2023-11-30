import sessionHandler from '@/lib/handler/session';
import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tag = searchParams.get('tag');

  if (tag) revalidateTag(tag);

  return NextResponse.json({ status: 'OK' });
}

// const { GET } = {
//   GET: (request: NextRequest) => sessionHandler(request, refreshTag),
// }

// export { GET }