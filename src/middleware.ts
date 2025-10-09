import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  let sessionId = request.cookies.get('session_id')?.value;

  if (!sessionId) {
    sessionId = crypto.randomUUID().replace(/-/g, '');
  }

  const response = NextResponse.next();

  response.cookies.set('session_id', sessionId, {
    path: '/',
    sameSite: 'lax',
  });

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
