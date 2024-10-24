import { hasActiveSession } from "../database_sessions.js";

export function hasActiveSessionCookie(req) {
  const sessionId = req?.signedCookies?.session;

  return !!sessionId && hasActiveSession(sessionId);
}
