import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tag = searchParams.get("tag");

  if (tag !== null) {
    revalidateTag(tag);
  }

  return NextResponse.json({ status: "OK" });
}
