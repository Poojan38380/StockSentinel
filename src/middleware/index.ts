import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(request: NextRequest) {
    const sessionCookie = getSessionCookie(request);
    const { pathname } = request.nextUrl;

    // Allow unauthenticated access to home page and auth pages
    if (pathname === '/' || pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up')) {
        return NextResponse.next();
    }

    // For all other routes, require authentication
    if (!sessionCookie) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|assets).*)',
    ],
};