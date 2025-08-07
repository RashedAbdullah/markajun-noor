import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(
  process.env.NEXT_PRIVATE_ACCESS_TOKEN_SECRET!
);

export async function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl;

  const publicPaths = ["/signin", "/unauthorized"];
  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  const accessToken = req.cookies.get("accessToken")?.value;

  if (!accessToken) {
    return NextResponse.redirect(new URL("/signin", origin));
  }

  try {
    // console.log("access token ", process.env.NEXT_PRIVATE_ACCESS_TOKEN_SECRET);

    const { payload } = await jwtVerify(accessToken, secret);

    // ADMIN-only access for /dashboard
    if (pathname.startsWith("/dashboard") && payload.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/unauthorized", origin));
    }

    return NextResponse.next();
  } catch (err) {
    console.error("JWT verification failed:", err);
    return NextResponse.redirect(new URL("/signin", origin));
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};
