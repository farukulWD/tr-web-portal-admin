import { jwtDecode } from "jwt-decode";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


export function middleware(request: NextRequest) {
  const refreshToken = request.cookies.get("refreshToken");

  if (refreshToken) {
    const decode: any = jwtDecode(refreshToken?.value);
   
    if (decode?.role === "superAdmin") {
      return NextResponse.next();
    }
  }

  // Redirect to sign-in with safe encoding for the redirect URL
  const url = request.nextUrl.clone();
  url.pathname = "/";
  url.search = `redirect=${encodeURIComponent(
    request.nextUrl.pathname + request.nextUrl.search
  )}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
