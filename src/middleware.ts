// import { withAuth } from "next-auth/middleware";

import { NextRequest, NextResponse } from "next/server";
import { getCookie } from "./utils/cookieActions";
import { cookies } from "next/headers";

// export default withAuth({
//   pages: {
//     signIn: "/login",
//     error: "/notfound",
//   },
// });

// export const config = {
//   matcher: [
//     // "/users/:path*" //use this syntax for nested routes,
//     "/:path*",
//   ],
// };

const protectedRoutes = ["/products"];
const publicRoutes = ["/login", "/signup", "/"];

export default async function middleware(request: NextRequest) {
  const cookie = await getCookie("auth");

  const path = request.nextUrl.pathname;
  console.log(path);
  // const isProtectedRoute = protectedRoutes.includes(path);
  const isProtectedRoute = protectedRoutes.some((ele) => path.includes(ele));
  const isPublicRoute = publicRoutes.includes(path);

  if (isProtectedRoute && !cookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
