const STORAGE_KEY = "evtimes-user";
const SESSION_KEY = "evtimes-session-user";
const SESSION_EVENT = "evtimes-session-change";
let cachedSessionRaw = null;
let cachedSessionUser = null;

function parseStoredValue(key) {
  if (typeof window === "undefined") {
    return null;
  }

  const rawValue = window.localStorage.getItem(key);
  if (!rawValue) {
    return null;
  }

  try {
    return JSON.parse(rawValue);
  } catch {
    window.localStorage.removeItem(key);
    return null;
  }
}

export function getStoredUser() {
  return parseStoredValue(STORAGE_KEY);
}

export function saveUser(user) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

export function saveSessionUser(user) {
  if (typeof window === "undefined") {
    return;
  }

  const safeUser = {
    name: user?.name ?? "",
    email: user?.email ?? "",
  };

  const serialized = JSON.stringify(safeUser);
  cachedSessionRaw = serialized;
  cachedSessionUser = safeUser;
  window.localStorage.setItem(SESSION_KEY, serialized);
  window.dispatchEvent(new Event(SESSION_EVENT));
}

export function getSessionUser() {
  if (typeof window === "undefined") {
    return null;
  }

  const rawValue = window.localStorage.getItem(SESSION_KEY);

  if (rawValue === cachedSessionRaw) {
    return cachedSessionUser;
  }

  cachedSessionRaw = rawValue;

  if (!rawValue) {
    cachedSessionUser = null;
    return null;
  }

  try {
    cachedSessionUser = JSON.parse(rawValue);
    return cachedSessionUser;
  } catch {
    window.localStorage.removeItem(SESSION_KEY);
    cachedSessionRaw = null;
    cachedSessionUser = null;
    return null;
  }
}

export function clearSessionUser() {
  if (typeof window === "undefined") {
    return;
  }

  cachedSessionRaw = null;
  cachedSessionUser = null;
  window.localStorage.removeItem(SESSION_KEY);
  window.dispatchEvent(new Event(SESSION_EVENT));
}

export function subscribeToSessionChange(callback) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const handleChange = () => callback();

  window.addEventListener(SESSION_EVENT, handleChange);
  window.addEventListener("storage", handleChange);

  return () => {
    window.removeEventListener(SESSION_EVENT, handleChange);
    window.removeEventListener("storage", handleChange);
  };
}
