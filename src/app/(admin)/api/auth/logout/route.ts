// http://localhost:3000/api/auth/signout
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ status: "LOGOUT" });
}
