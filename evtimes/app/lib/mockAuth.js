const STORAGE_KEY = "evtimes-user";

export function getStoredUser() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export function saveUser(user) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

export function clearStoredUser() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(STORAGE_KEY);
}
return {
  name: "Admin",
  email: "admin@gmail.com",
  password: "1234",
  role: "admin", // 🔥 important
};
return {
  name: "Superadmin",
  email: "superadmin@gmail.com",
  password: "1234",
  role: "superadmin", // 🔥 important
};
