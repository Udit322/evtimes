"use client";

import type { ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { saveSessionUser } from "@/app/lib/mockAuth";

type AccountUser = {
  id?: string;
  name: string;
  email: string;
  role: string;
  status?: string;
  isVerified?: boolean;
  phone?: string;
  location?: string;
  department?: string;
  bio?: string;
  profileImage?: string;
};

type FormState = {
  name: string;
  email: string;
  location: string;
};

const emptyForm: FormState = {
  name: "",
  email: "",
  location: "",
};

const roleOptions = [
  { value: "user", label: "User" },
  { value: "staff", label: "Staff" },
  { value: "super_admin", label: "Super Admin" },
];

function formatRole(role: string) {
  return (role || "user")
    .split("_")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function formatStatus(status?: string) {
  const value = (status || "active").trim().toLowerCase();
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export default function AccountPage() {
  const router = useRouter();
  const [role, setRole] = useState("user");
  const [status, setStatus] = useState("active");
  const [canManageAccess, setCanManageAccess] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadProfile() {
      const rawUser = window.localStorage.getItem("user");

      if (!rawUser) {
        router.replace("/login");
        return;
      }

      try {
        const fallbackUser = JSON.parse(rawUser) as AccountUser;

        const response = await fetch("localhost:3000/api/auth/profile", {
          method: "GET",
          credentials: "include",
        });

        if (response.status === 401) {
          router.replace("/login");
          return;
        }

        const data = await response.json();

        if (!response.ok || !data?.user) {
          throw new Error(data?.error || "Profile fetch failed");
        }

        const user = data.user as AccountUser;

        if (!isMounted) return;

        const resolvedRole = user.role || fallbackUser.role || "user";
        const resolvedStatus = user.status || fallbackUser.status || "active";

        setRole(resolvedRole);
        setStatus(resolvedStatus);
        setCanManageAccess(resolvedRole === "super_admin");
        setForm({
          name: user.name || "",
          email: user.email || "",
          location: user.location || "",
        });
        window.localStorage.setItem("user", JSON.stringify(user));
        saveSessionUser({
          name: user.name || "",
          email: user.email || "",
        });
        setIsLoaded(true);
      } catch {
        try {
          const user = JSON.parse(rawUser) as AccountUser;

          if (!isMounted) return;

          const resolvedRole = user.role || "user";
          const resolvedStatus = user.status || "active";

          setRole(resolvedRole);
          setStatus(resolvedStatus);
          setCanManageAccess(resolvedRole === "super_admin");
          setForm({
            name: user.name || "",
            email: user.email || "",
            location: user.location || "",
          });
          setIsLoaded(true);
        } catch {
          router.replace("/login");
        }
      }
    }

    loadProfile();

    return () => {
      isMounted = false;
    };
  }, [router]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    if (message) setMessage("");
    if (error) setError("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = form.name.trim();
    const trimmedEmail = form.email.trim().toLowerCase();

    if (!trimmedName || !trimmedEmail) {
      setError("Name aur email required hain.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(trimmedEmail)) {
      setError("Valid email address enter karo.");
      return;
    }

    setIsSaving(true);

    try {
      const currentUser = JSON.parse(window.localStorage.getItem("user") || "{}") as AccountUser;
      const response = await fetch("/api/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          location: form.location.trim(),
          role,
          status,
        }),
      });

      if (response.status === 401) {
        router.replace("/login");
        return;
      }

      const data = await response.json();

      if (!response.ok || !data?.user) {
        throw new Error(data?.error || "Profile update failed");
      }

      const updatedUser: AccountUser = {
        ...currentUser,
        ...data.user,
        role: data.user.role || role,
        status: data.user.status || status,
      };

      window.localStorage.setItem("user", JSON.stringify(updatedUser));
      window.localStorage.setItem("role", updatedUser.role || "user");
      saveSessionUser({
        name: updatedUser.name,
        email: updatedUser.email,
      });

      setForm({
        name: updatedUser.name,
        email: updatedUser.email,
        location: updatedUser.location || "",
      });
      setRole(updatedUser.role || "user");
      setStatus(updatedUser.status || "active");
      setCanManageAccess((updatedUser.role || "user") === "super_admin");
      setMessage(data.message || "Profile details save ho gayi.");
      router.push("/dashboard");
    } catch {
      setError("Details save nahi ho paayi. Dobara try karo.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!isLoaded) {
    return <div className="p-6">Loading account...</div>;
  }

  const statusLabel = formatStatus(status);
  const roleLabel = formatRole(role);

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f8fdf9_0%,#eef7f0_100%)] py-6">
      <div className="flex w-full flex-col gap-6">
        <div className="flex w-full flex-wrap items-center justify-between gap-3 rounded-[24px] border border-[#dcebdd] bg-white/90 px-5 py-4 shadow-[0_18px_40px_rgba(20,83,45,0.08)] backdrop-blur sm:px-6">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#2f7a49]">
              My Profile
            </p>
            <h1 className="mt-1 text-2xl font-semibold text-[#173223] sm:text-3xl">
              Account Settings
            </h1>
          </div>
          <Link
            href="/dashboard"
            className="rounded-xl border border-[#cfe3d2] bg-[#f5fbf6] px-4 py-2 text-sm font-semibold text-[#1b6c3f] transition hover:bg-white"
          >
            Back to Dashboard
          </Link>
        </div>

        <section className="grid gap-6 grid-cols-1">
          <section className="rounded-[26px] border border-[#dcebdd] bg-white p-5 shadow-[0_18px_40px_rgba(20,83,45,0.08)] sm:p-6 lg:p-7">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#6f8574]">
                  Edit Details
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-[#173223]">
                  Update Your Account
                </h2>
                {/* <p className="mt-2 max-w-2xl text-sm leading-6 text-[#6f8574]">
                  Profile details yahan se update hongi aur account menu me bhi reflect
                  karengi.
                </p> */}
              </div>

              {/* <div className="rounded-2xl border border-[#dcebdd] bg-white px-4 py-3 text-sm text-[#4d6756]">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#7a8f80]">
                  Current Access
                </p>
                <p className="mt-2 font-semibold text-[#173223]">
                  {roleLabel} . {statusLabel}
                </p>
              </div> */}
            </div>

            <form className="mt-8 flex flex-col gap-5" onSubmit={handleSubmit}>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-semibold text-[#3b5a47]">Full Name</span>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="rounded-2xl border border-[#d8e8db] bg-[#f8fcf9] px-4 py-3 text-sm text-[#173223] outline-none transition focus:border-[#33a05f] focus:bg-white focus:shadow-[0_0_0_4px_rgba(20,131,70,0.08)]"
                  />
                </label>

                <label className="flex flex-col gap-2">
                  <span className="text-sm font-semibold text-[#3b5a47]">Email</span>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="rounded-2xl border border-[#d8e8db] bg-[#f8fcf9] px-4 py-3 text-sm text-[#173223] outline-none transition focus:border-[#33a05f] focus:bg-white focus:shadow-[0_0_0_4px_rgba(20,131,70,0.08)]"
                  />
                </label>

                <div className="flex flex-col gap-2">
                  <span className="text-sm font-semibold uppercase tracking-[0.08em] text-[#8b9b90]">
                    Status
                  </span>
                  <button
                    type="button"
                    disabled={!canManageAccess}
                    onClick={() =>
                      setStatus((current) => (current === "active" ? "blocked" : "active"))
                    }
                    className={`flex min-h-[52px] items-center justify-start rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                      status === "active"
                        ? "bg-[#d7f7e1] text-[#0a8b52]"
                        : "bg-[#f1f3f5] text-[#6b7280]"
                    } ${canManageAccess ? "cursor-pointer hover:opacity-90" : "cursor-not-allowed opacity-90"}`}
                  >
                    {statusLabel}
                  </button>
                </div>

                <label className="flex flex-col gap-2">
                  <span className="text-sm font-semibold text-[#3b5a47]">Location</span>
                  <input
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="Enter your location"
                    className="rounded-2xl border border-[#d8e8db] bg-[#f8fcf9] px-4 py-3 text-sm text-[#173223] outline-none transition focus:border-[#33a05f] focus:bg-white focus:shadow-[0_0_0_4px_rgba(20,131,70,0.08)]"
                  />
                </label>

                <label className="flex flex-col gap-2">
                  <span className="text-sm font-semibold uppercase tracking-[0.08em] text-[#8b9b90]">
                    Change Role
                  </span>
                  <select
                    value={role}
                    disabled={!canManageAccess}
                    onChange={(event) => setRole(event.target.value)}
                    className="rounded-2xl border border-[#d8e8db] bg-white px-4 py-3 text-sm text-[#173223] outline-none transition focus:border-[#33a05f] focus:bg-white focus:shadow-[0_0_0_4px_rgba(20,131,70,0.08)] disabled:cursor-not-allowed disabled:bg-[#eef4ef] disabled:text-[#6f8574]"
                  >
                    {roleOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              {error ? (
                <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                  {error}
                </p>
              ) : null}

              {message ? (
                <p className="rounded-2xl bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                  {message}
                </p>
              ) : null}

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="rounded-2xl bg-[#148346] px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_26px_rgba(20,131,70,0.22)] transition hover:bg-[#116b39]"
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
                <Link
                  href="/dashboard"
                  className="rounded-2xl border border-[#d8e8db] bg-[#f8fcf9] px-5 py-3 text-sm font-semibold text-[#1b6c3f] transition hover:bg-white"
                >
                  Cancel
                </Link>
              </div>
            </form>
          </section>
        </section>
      </div>
    </main>
  );
}
