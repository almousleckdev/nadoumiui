import { NextResponse } from "next/server";

/**
 * There is intentionally no cookie-based auth check here.
 *
 * The backend (nadoumibackend.up.railway.app) sets its session cookie with no
 * `Domain` attribute, so it's a host-only cookie scoped to the backend's exact
 * origin — the browser never sends it to this frontend's origin
 * (nadoumiui.up.railway.app), and this proxy can never see it. A previous
 * version of this file checked `request.cookies.get("adminToken")` /
 * `"studentToken"`, which was not just ineffective but actively broken: since
 * that cookie can never be present here, it would redirect every visitor to
 * these routes to the login page — including users who had just logged in
 * successfully.
 *
 * Route protection currently lives in the dashboard layouts
 * (app/dashboard/layout.tsx, app/admin/dashboard/layout.tsx), which fetch the
 * caller's profile from the backend (their request DOES carry the cookie,
 * since it's a direct same-origin-to-backend call) and redirect client-side
 * on a 401. That's real protection for the data (the backend independently
 * authorizes every endpoint), but it's not server-side route enforcement —
 * an unauthenticated visitor's browser still downloads the dashboard's JS
 * bundle before the redirect fires.
 *
 * Closing that gap for real requires one of:
 *   (a) moving the frontend and backend onto a shared parent domain (e.g.
 *       app.nadoumi.com / api.nadoumi.com) so a `Domain=.nadoumi.com` cookie
 *       is actually readable here, or
 *   (b) introducing a same-origin BFF (Next.js Route Handlers that proxy to
 *       the backend and set their own first-party cookie).
 * Both are deliberate infrastructure/architecture decisions, not something to
 * bundle into an unrelated fix — see the audit notes for detail.
 */
export default function proxy() {
  return NextResponse.next();
}

export const config = {
  matcher: [],
};
