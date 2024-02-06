import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get("path");

  if (path !== null) {
    revalidatePath(path);
  }

  return NextResponse.json({ status: "OK" });
}
