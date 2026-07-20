import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  console.log("All cookies:", request.cookies.getAll());

  const token = request.cookies.get("user_token")?.value;

  console.log("Token:", token);

  const { pathname } = request.nextUrl;

  if (!token && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  if (
    token &&
    (pathname.startsWith("/signin") || pathname.startsWith("/signup"))
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}``

export const config = {

     matcher: ["/" , "/dashboard/:path*", "/signin", "/signup"]

}