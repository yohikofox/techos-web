import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'
import Container from '@/infrastructure/dependencyFactory'
import { DependencyKeys } from '@/infrastructure/dependencies'
import { IConfigManager } from '@/infrastructure/adapter/configManager'

export const dynamic = 'force-dynamic'

/**
 * e.g a webhook to `your-website.com/api/revalidate/tag/collection?secret=<token>`
 * 
 * @param request 
 * @returns 
 */
export async function POST(request: NextRequest, { params: { tag } }: { params: { tag: string } }) {
  const secret = request.nextUrl.searchParams.get('secret')
  const configManager = await Container.Instance.resolve<IConfigManager>(DependencyKeys.helper_configmanager)

  const secretKey = await configManager.get('REVALIDATE_SECRET')

  if (!secret || !secretKey || secret !== secretKey) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  if (!tag) {
    return NextResponse.json({ message: 'Missing tag param' }, { status: 400 })
  }

  revalidateTag(tag)

  return NextResponse.json({ revalidated: true, now: Date.now() })
}