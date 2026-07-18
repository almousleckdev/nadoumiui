import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect Admin Dashboard Routes
  if (pathname.startsWith("/admin/dashboard")) {
    const adminToken = request.cookies.get("adminToken")?.value;
    
    if (!adminToken) {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Protect Student Dashboard Routes
  if (pathname.startsWith("/dashboard")) {
    const studentToken = request.cookies.get("studentToken")?.value;
    
    if (!studentToken) {
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/dashboard/:path*",
    "/dashboard/:path*",
  ],
};
