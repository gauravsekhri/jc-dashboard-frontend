// import { withAuth } from "next-auth/middleware";

import { NextRequest, NextResponse } from "next/server";
import { getCookie } from "./utils/cookieActions";
import { cookies } from "next/headers";

const protectedRoutes = ["/products"];
const authRoutes = ["/login", "/signup"];
const publicRoutes = ["/"];

export default async function middleware(request: NextRequest) {
  const cookie = await getCookie("auth");
  console.log("cookie value", cookie);

  const path = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some((ele) => path.includes(ele));
  const isAuthRoute = authRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  if (isProtectedRoute && !cookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  } else if (isAuthRoute && cookie) {
    return NextResponse.redirect(new URL("/products", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
