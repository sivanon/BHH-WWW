import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function proxy(req) {
    // If the path is /admin and the user is NOT authenticated, NextResponse.redirect will be handled by withAuth pages configuration.
    // withAuth automatically handles redirection to the signIn page if the token is null.
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        const path = req.nextUrl.pathname;
        // Protect /th/admin and /en/admin, but exclude /login
        if (path.includes("/admin") && !path.includes("/login")) {
          return token !== null;
        }
        return true;
      },
    },
    pages: {
      signIn: "/th/admin/login",
    },
  }
);

export const config = {
  // Matches all routes under /[lang]/admin/...
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
