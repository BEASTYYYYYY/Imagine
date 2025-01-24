import { NextResponse } from 'next/server';

// Custom Clerk Middleware Mock
const customClerkMiddleware = async (req) => {
  try {
    // If Clerk integration is needed, validate the request here (optional for Edge)
    // Add your custom logic or pass requests directly.
    return NextResponse.next();
  } catch (error) {
    console.error('Clerk Middleware Error:', error);
    return NextResponse.error();
  }
};

export default async function middleware(req) {
  return customClerkMiddleware(req);
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
