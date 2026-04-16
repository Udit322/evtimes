"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { getStoredUser, saveSessionUser, saveUser } from "../lib/mockAuth";

function Signup() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const authMode = searchParams.get("mode") === "login" ? "login" : "signup";
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const switchAuthMode = (mode) => {
    setError("");
    setSuccess("");
    setIsSubmitting(false);
    router.replace(`/signup?mode=${mode}`);
  };

  const handleChange = (event) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));

    if (error) {
      setError("");
    }
    if (success) {
      setSuccess("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedEmail = form.email.trim().toLowerCase();
    const trimmedName = form.name.trim();
    const trimmedPassword = form.password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      setError("Please fill in email and password.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(trimmedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (trimmedPassword.length < 5) {
      setError("Password must be at least 5 characters long.");
      return;
    }

    const existingUser = getStoredUser();

    if (authMode === "signup") {
      if (!trimmedName || !form.confirmPassword.trim()) {
        setError("Please fill in all signup fields.");
        return;
      }

      if (form.password !== form.confirmPassword) {
        setError("Passwords do not match.");
        return;
      }

      setIsSubmitting(true);

      try {
        const res = await fetch("/api/auth/registerr", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: trimmedName,
            email: trimmedEmail,
            password: trimmedPassword,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Something went wrong");
        }

        // ✅ save session (optional)
        saveSessionUser({
          name: data.user.name,
          email: data.user.email,
        });

        setSuccess("Account created successfully 🚀");

        setTimeout(() => {
          router.push("/");
        }, 900);

      } catch (err) {
        setError(err.message);
      } finally {
        setIsSubmitting(false);
      }

      return;
    }
    if (!trimmedName || !form.confirmPassword.trim()) {
      setError("Please fill in all signup fields.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (existingUser?.email === trimmedEmail) {
      setError("Account already exists. Please use Login tab.");
      return;
    }

    setIsSubmitting(true);

    saveUser({
      name: trimmedName,
      email: trimmedEmail,
      password: form.password,
    });

    saveSessionUser({
      name: trimmedName,
      email: trimmedEmail,
    });

    setSuccess("Account created successfully. Your account is saved. Redirecting...");

    window.setTimeout(() => {
      setIsSubmitting(false);
      router.push("/");
    }, 900);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[linear-gradient(180deg,var(--wh)_0%,var(--grn-xlight)_100%)] px-4 py-6 sm:py-8">
      <div className="w-full max-w-md rounded-[24px] border border-[var(--brd)] bg-white p-5 shadow-[0_24px_60px_rgba(39,80,10,0.12)] sm:rounded-[28px] sm:p-8">
        <p className="text-center text-xs font-medium uppercase tracking-[0.18em] text-[var(--grn)]">
          {authMode === "signup" ? "New Member" : "Member Access"}
        </p>
        <h2 className="mt-3 text-center text-2xl font-semibold text-[var(--blk)] sm:text-3xl">
          {authMode === "signup" ? "Sign Up" : "Login"}
        </h2>
        <p className="mt-3 text-center text-sm text-[var(--txt2)]">
          {authMode === "signup"
            ? "Create your EVTimes account."
            : "Login with your saved EVTimes account."}
        </p>

        <div className="mt-6 grid grid-cols-2 rounded-xl border border-[var(--brd)] bg-[var(--gry)] p-1">
          <button
            type="button"
            onClick={() => {
              switchAuthMode("signup");
            }}
            className={`rounded-lg px-3 py-2 text-xs font-medium transition sm:text-sm ${authMode === "signup" ? "bg-white text-[var(--grn-dark)] shadow-sm" : "text-[var(--txt2)] hover:text-[var(--grn-dark)]"
              }`}
          >
            Signup
          </button>
          <button
            type="button"
            onClick={() => {
              switchAuthMode("login");
            }}
            className={`rounded-lg px-3 py-2 text-xs font-medium transition sm:text-sm ${authMode === "login" ? "bg-white text-[var(--grn-dark)] shadow-sm" : "text-[var(--txt2)] hover:text-[var(--grn-dark)]"
              }`}
          >
            Login
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          {authMode === "signup" ? (
            <div className="space-y-1.5">
              <label htmlFor="signup-name" className="text-sm font-medium text-[var(--txt)]">
                Full Name
              </label>
              <input
                id="signup-name"
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={form.name}
                onChange={handleChange}
                className="w-full rounded-xl border border-[var(--brd)] bg-[var(--gry)] px-4 py-3 text-sm outline-none transition focus:border-[var(--grn)] focus:bg-white"
              />
            </div>
          ) : null}

          <div className="space-y-1.5">
            <label htmlFor="signup-email" className="text-sm font-medium text-[var(--txt)]">
              Email
            </label>
            <input
              id="signup-email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-xl border border-[var(--brd)] bg-[var(--gry)] px-4 py-3 text-sm outline-none transition focus:border-[var(--grn)] focus:bg-white"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="signup-password" className="text-sm font-medium text-[var(--txt)]">
              Password
            </label>
            <input
              id="signup-password"
              type="password"
              name="password"
              placeholder="Create a password"
              value={form.password}
              onChange={handleChange}
              className="w-full rounded-xl border border-[var(--brd)] bg-[var(--gry)] px-4 py-3 text-sm outline-none transition focus:border-[var(--grn)] focus:bg-white"
            />
          </div>

          {authMode === "signup" ? (
            <div className="space-y-1.5">
              <label htmlFor="signup-confirm-password" className="text-sm font-medium text-[var(--txt)]">
                Confirm Password
              </label>
              <input
                id="signup-confirm-password"
                type="password"
                name="confirmPassword"
                placeholder="Re-enter your password"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full rounded-xl border border-[var(--brd)] bg-[var(--gry)] px-4 py-3 text-sm outline-none transition focus:border-[var(--grn)] focus:bg-white"
              />
            </div>
          ) : null}

          {error ? (
            <p className="text-sm text-red-600">{error}</p>
          ) : null}

          {success ? (
            <p className="text-sm text-[var(--grn-dark)]">{success}</p>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-[var(--grn)] py-3 text-sm font-medium text-white transition hover:bg-[var(--grn-acc)] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? (authMode === "signup" ? "Creating Account..." : "Logging In...") : authMode === "signup" ? "Sign Up" : "Login"}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-[var(--txt2)]">
          {authMode === "signup"
            ? "Already have an account? Switch to Login tab."
            : "New user? Switch to Signup tab."}
        </p>
      </div>
    </div>
  );
}

export default Signup;
