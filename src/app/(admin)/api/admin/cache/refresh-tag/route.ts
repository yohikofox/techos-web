import { revalidateTag, revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tag = searchParams.get('tag');

  if (tag) {
    console.log("🚀 ~ file: route.ts:12 ~ GET ~ tag:", tag)
    revalidateTag(tag);
    // revalidatePath('/');
  }

  return NextResponse.json({ status: 'OK' });
}