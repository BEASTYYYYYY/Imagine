import { NextResponse } from 'next/server';

export default async function middleware(req: Request) {
    try {
        const { pathname } = new URL(req.url);

        // Add custom logic based on pathname or headers
        console.log(`Incoming request to: ${pathname}`);

        // Proceed to the next middleware or handler
        return NextResponse.next();
    } catch (error) {
        console.error('Middleware Error:', error);

        // Return a 500 error if the middleware encounters an issue
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}

export const config = {
    matcher: [
        // Match all paths except Next.js internals and static assets
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run middleware for API routes
        '/(api|trpc)(.*)',
    ],
};
