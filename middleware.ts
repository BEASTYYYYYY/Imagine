import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse, type NextRequest } from "next/server";

const isPublicRoute = createRouteMatcher(["/sign-in(.*)"]);

export default clerkMiddleware((auth, req: NextRequest) => {
    if (!isPublicRoute(req)) {
        const result = auth.protect();
        // Ensure the result is wrapped in a NextResponse
        return NextResponse.next();
    }
    // Allow public routes to proceed
    return NextResponse.next();
});

export const config = {
    matcher: [
        // Skip Next.js internals and static files unless explicitly matched
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        // Always apply middleware for API and `trpc` routes
        "/(api|trpc)(.*)",
    ],
};
