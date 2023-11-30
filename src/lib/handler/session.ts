import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const sessionHandler = async (request: NextRequest, callback: (request: NextRequest) => Promise<NextResponse>): Promise<NextResponse> => {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  return callback(request)
}

export default sessionHandler

