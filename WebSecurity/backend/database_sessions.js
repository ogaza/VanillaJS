var sessionId = 1;
const sessionDurationInMinutes = 20;
const sessionDurationInSeconds = 30;
export let sessions = [
  // { id: 1, userId: 1, token: "", created: undefined, expires: undefined }
];

export function getActiveSessionFor(sessionId) {
  const existingSession = sessions.find((x) => x.id == sessionId);

  if (!existingSession) return undefined;

  var now = Date.now();
  var isActive = existingSession.expires - now > 0;

  if (!isActive) return undefined;

  return { ...existingSession };
}

export function hasActiveSession(sessionId) {
  const existingSession = sessions.find((x) => x.id == sessionId);

  return !!existingSession && existingSession.expires - Date.now() > 0;
}

export function createNewSessionFor(userId) {
  var created = new Date();
  var expires = new Date();

  expires.setSeconds(expires.getSeconds() + sessionDurationInSeconds);
  // expires.setMinutes(expires.getMinutes() + sessionDurationInMinutes);

  const session = { id: sessionId, userId, token: sessionId, created, expires };
  sessionId++;
  sessions.push(session);

  return session;
}

export function clearSessionFor(userId) {
  const filtered = sessions.filter((x) => x.userId != userId);

  sessions = [...filtered];
}
