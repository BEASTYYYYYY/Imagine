import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse, type NextRequest } from "next/server";

// Define public routes
const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)"]);

export default clerkMiddleware(async (auth, req: NextRequest) => {
    if (!isPublicRoute(req)) {
        try {
            // Protect private routes, ensuring only authenticated users can access
            await auth.protect();
        } catch (error) {
            // Redirect to sign-in page if authentication fails
            const signInUrl = new URL("/sign-in", req.url);
            signInUrl.searchParams.set("redirect_url", req.url); // Optional: Pass the original URL for redirection after sign-in
            return NextResponse.redirect(signInUrl);
        }
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
