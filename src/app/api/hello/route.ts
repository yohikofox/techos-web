import { NextRequest, NextResponse } from "next/server"

const badRequest = (message?: string) => new Response(message || 'Bad Request', { status: 400 })

export async function GET(request: NextRequest, params: any) {
  return NextResponse.json({ message: 'Hello World' })
}


