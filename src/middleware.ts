import { adminRouteMiddleware } from './middlewares/admin-route';
import { MiddlewareFactory, stackMiddlewares } from './middlewares/factory';
import { requestEnrichmentMiddleware } from './middlewares/request-enrichment';
import { sessionMiddleware } from './middlewares/session';
import { signOutMiddleware } from './middlewares/signout';

const middlewares: MiddlewareFactory[] = [
  requestEnrichmentMiddleware,
  sessionMiddleware,
  signOutMiddleware,
  adminRouteMiddleware,
]


export default stackMiddlewares(middlewares);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - assets
     */
    '/((?!_next/static|_next/image|favicon.ico|assets).*)',
  ]
}
