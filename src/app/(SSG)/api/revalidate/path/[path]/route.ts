import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import Container from '@/infrastructure/dependencyFactory'
import { DependencyKeys } from '@/infrastructure/dependencies'
import { IConfigManager } from '@/infrastructure/adapter/configManager'

export const dynamic = 'force-dynamic'

/**
 * e.g a webhook to `your-website.com/api/revalidate/path/collection?secret=<token>`
 * 
 * @param request 
 * @returns 
 */
export async function POST(request: NextRequest, { params: { path } }: { params: { path: string } }) {
  const secret = request.nextUrl.searchParams.get('secret')
  const configManager = await Container.Instance.resolve<IConfigManager>(DependencyKeys.helper_configmanager)

  if (secret !== configManager.get('REVALIDATE_SECRET')) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  if (!path) {
    return NextResponse.json({ message: 'Missing path param' }, { status: 400 })
  }

  revalidatePath(path)

  return NextResponse.json({ revalidated: true, now: Date.now() })
}