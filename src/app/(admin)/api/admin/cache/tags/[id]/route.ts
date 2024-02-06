import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
//request: Request, { params }: { params: { id: string } }
export async function GET() {
  // const Provider = CacheFactory.resolve()
  // const cache = await new Provider({}).get(params.id);

  // if (!cache) return NextResponse.json("Not found", { status: 404 });

  // return NextResponse.json({ ...cache });

  return NextResponse.json({ success: true });
}

export async function DELETE() {
  // const Provider = CacheFactory.resolve()
  // await new Provider({}).remove(params.id);
  // return NextResponse.json({ success: true });

  return NextResponse.json({ success: true });
}
