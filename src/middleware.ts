import { NextResponse, NextRequest } from 'next/server';
import { ROUTES } from './types/routesTypes';
import { LOCALSTORAGE_OBJECTS_NAMES } from './functions/localStorage';
import { jwtVerify } from 'jose';

const UNAUTHENTICATED_PAGES = [ROUTES.LOGIN, ROUTES.SIGNUP];

function redirectToLogin(req: NextRequest) {
  const loginUrl = new URL(ROUTES.LOGIN, req.url);
  return NextResponse.redirect(loginUrl);
}

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  const cookieToken = req.cookies.get(LOCALSTORAGE_OBJECTS_NAMES.ACCESS_TOKEN);
  const accessToken = cookieToken?.value ?? '';

  console.log({ accessToken });

  // If not authenticated and path is not in UNAUTHENTICATED_PAGES don't redirect
  if (!accessToken && UNAUTHENTICATED_PAGES.includes(url.pathname as ROUTES)) {
    return NextResponse.next();
  } else if (!accessToken) {
    console.log('NO ACCESS TOKEN');
    return redirectToLogin(req);
  }

  try {
    const { payload } = await jwtVerify(
      accessToken,
      new TextEncoder().encode(process.env.NEXT_PUBLIC_AUTH_SECRET_KEY ?? ''),
    );
    console.log({ payload });

    // If valid access token and path is in UNAUTHENTICATED_PAGES redirect to movies page
    if (UNAUTHENTICATED_PAGES.includes(url.pathname as ROUTES)) {
      const moviesUrl = new URL(ROUTES.MOVIES, req.url);
      return NextResponse.redirect(moviesUrl);
    } else {
      // if valid access token and path is not in UNAUTHENTICATED_PAGES don't redirect
      return NextResponse.next();
    }
  } catch (error: any) {
    console.log('EXPIRED TOKEN');
    req.cookies.delete(LOCALSTORAGE_OBJECTS_NAMES.ACCESS_TOKEN);

    // If invalid access token and path is in UNAUTHENTICATED_PAGES don't redirect
    if (UNAUTHENTICATED_PAGES.includes(url.pathname as ROUTES)) {
      return NextResponse.next();
    } else {
      // if invalid access token and path is not in UNAUTHENTICATED_PAGES redirect to login
      return redirectToLogin(req);
    }
  }

  // return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/|_proxy/|_auth/|_root/|_static|logo|static|_vercel|[\\w-]+\\.\\w+).*)',
  ],
};
