import { NextRequest, NextResponse } from "next/server";
import { Paths } from "./utils/constants";

// Define public paths that don't require authentication
const publicPath = [Paths.Login, Paths.Register];

export async function middleware(req: NextRequest): Promise<NextResponse> {
    // Retrieve the token from cookies
    const token = req?.cookies?.get("AUTH_TOKEN")?.value;
    const verifiedToken = !!token; // In production, you should properly validate the token

    const isPublicPath = publicPath?.some((path) =>
        req?.nextUrl?.pathname?.startsWith(path)
    );

    // If the user is logged in and trying to access a public path, redirect to dashboard
    if (verifiedToken && isPublicPath) {
        return NextResponse?.redirect(new URL(Paths.Dashboard, req?.url));
    }

    // If the user is not logged in and trying to access a protected path, redirect to login
    if (!verifiedToken && !isPublicPath) {
        return NextResponse.redirect(new URL(Paths.Login, req.url));
    }

    // For all other cases, allow the request to proceed
    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!api|static|.*\\..*|_next|favicon.ico|sitemap.xml|robots.txt).*)",
        "/login",
    ],
};
