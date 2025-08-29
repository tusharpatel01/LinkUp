import {
  convexAuthNextjsMiddleware,
  createRouteMatcher,
  isAuthenticatedNextjs,
  nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server";

const isPublicPage = createRouteMatcher([
  "/auth",
  "/api/auth(.*)", // needed for Convex auth callbacks
]);

export default convexAuthNextjsMiddleware(async (request) => {
  // here `request` is a NextRequest object
  const authenticated = await isAuthenticatedNextjs(request);

  // Case 1: Not authenticated → redirect to /auth
  if (!isPublicPage(request) && !authenticated) {
    return nextjsMiddlewareRedirect(request, "/auth");
  }

  // Case 2: Already authenticated but at /auth → redirect to /
  if (isPublicPage(request) && authenticated) {
    return nextjsMiddlewareRedirect(request, "/");
  }

  // otherwise just continue
  return;
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
