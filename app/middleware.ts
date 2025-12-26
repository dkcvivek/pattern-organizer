import { NextRequest, NextResponse } from "next/server";

const PROTECTED_ROUTES = ["/", "/dashboard", "/styles"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = PROTECTED_ROUTES.some((route) => {
    pathname.startsWith(route);
  });

  const token = request.cookies.getAll();

  if(isProtected && !token){
    const loginUrl= new URL("/login", request.url)
    NextResponse.redirect(loginUrl)
  }

  return NextResponse.next();
}


export const config = {
  matcher: ["/((?!login|register|_next|api).*)"],
};