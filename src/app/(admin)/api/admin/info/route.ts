import { NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  console.log('request:', request.headers.get('x-pathname'))
  return NextResponse.json({ status: 'success' })
}


