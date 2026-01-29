import { NextResponse } from "next/server";
import { verifyAccessToken } from "@/vidyarishiapi/utils/jwt";

export function middleware(req) {
  const url = req.nextUrl.pathname;

  // PUBLIC FRONTEND ROUTES (No login required)
  const publicPages = ["/", "/register"];

  // PUBLIC API ROUTES (OTP / register / basic auth)
  const publicApi = [
    "/api/auth/check-user",
    "/api/auth/verify-otp",
    "/api/auth/register",
  ];

  // If visiting a public page → allow
  if (publicPages.includes(url)) {
    return NextResponse.next();
  }

  // PUBLIC API should pass through
  if (url.startsWith("/api") && publicApi.includes(url)) {
    return NextResponse.next();
  }

  // Extract access token
  const accessToken = req.cookies.get("accessToken")?.value;

  // PROTECTED FRONTEND ROUTES
  if (url.startsWith("/dashboard") || url.startsWith("/student-dashboard")) {
    // No accessToken? → redirect to login
    if (!accessToken) {
      return NextResponse.redirect(new URL("/register", req.url));
    }

    // Try verifying access token
    const decoded = verifyAccessToken(accessToken);

    // Token invalid or expired → redirect to login
    if (!decoded || !decoded.id) {
      return NextResponse.redirect(new URL("/register", req.url));
    }

    // Token valid → allow dashboard load
    return NextResponse.next();
  }

  // PROTECTED API ROUTES
  if (url.startsWith("/api")) {
    // Check token in Authorization header OR cookies
    const headerToken = req.headers.get("authorization")?.split(" ")[1];
    const apiToken = headerToken || accessToken;

    // No token at all → unauthorized
    if (!apiToken) {
      return NextResponse.json(
        { error: "Unauthorized: Token missing" },
        { status: 401 }
      );
    }

    // Validate token
    const decoded = verifyAccessToken(apiToken);

    // Invalid token → still return 401 (backend will NOT refresh)
    // This is correct! Only backend /api/auth/refresh-token will refresh.
    if (!decoded || !decoded.id) {
      return NextResponse.json(
        { error: "Unauthorized: Invalid or expired token" },
        { status: 401 }
      );
    }

    // Token valid → allow API
    return NextResponse.next();
  }

  // Everything else → allowed
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/:path*",
    "/dashboard/:path*",
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
