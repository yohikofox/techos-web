// http://localhost:3000/api/auth/signout
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, params: any) {
  return NextResponse.json({ status: 'LOGOUT' })
}


