import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
  apiRoutes: ["/(api|trpc)(.*)"],
  publicRoutes: ["/sign-in", "/sign-up", "/", "/api/webhooks(.*)"],
  afterAuth(auth, req, evt) {
    // Allow access to all routes, including the webhook route
    return NextResponse.next();
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
