import { NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest, params: any) {
  return NextResponse.json({ status: 'LOGOUT' })
}


