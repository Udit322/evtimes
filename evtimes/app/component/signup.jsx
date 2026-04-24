"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getStoredUser, saveUser } from "../lib/mockAuth";

export default function Signup() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    const trimmedName = form.name.trim();
    const trimmedEmail = form.email.trim().toLowerCase();

    if (!trimmedName || !trimmedEmail || !form.password.trim() || !form.confirmPassword.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(trimmedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const existingUser = getStoredUser();

    if (existingUser?.email === trimmedEmail) {
      setError("An account with this email already exists.");
      return;
    }

    setIsSubmitting(true);

    saveUser({
      name: trimmedName,
      email: trimmedEmail,
      password: form.password,
    });

    setSuccess("Account created successfully. Redirecting to login...");

    window.setTimeout(() => {
      setIsSubmitting(false);
      router.push("/login");
    }, 900);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[linear-gradient(180deg,var(--wh)_0%,var(--grn-xlight)_100%)] px-8 py-14 sm:px-12 sm:py-20">
      <div className="m-4 w-full max-w-md rounded-[28px] border border-[var(--brd)] bg-white px-8 py-10 shadow-[0_24px_60px_rgba(39,80,10,0.12)] sm:m-6 sm:px-10 sm:py-12">
        <p className="text-center text-xs font-medium uppercase tracking-[0.18em] text-[var(--grn)]">
          New Member
        </p>
        <h2 className="mt-4 text-center text-3xl font-semibold text-[var(--blk)]">
          Sign Up
        </h2>
        <p className="mt-4 text-center text-sm leading-7 text-[var(--txt2)]">
          Create your EVTimes account to continue.
        </p>

        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          <div className="space-y-2.5">
            <label htmlFor="signup-name" className="block text-sm font-medium text-[var(--txt)]">
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

          <div className="space-y-2.5">
            <label htmlFor="signup-email" className="block text-sm font-medium text-[var(--txt)]">
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

          <div className="space-y-2.5">
            <label htmlFor="signup-password" className="block text-sm font-medium text-[var(--txt)]">
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

          <div className="space-y-2.5">
            <label htmlFor="signup-confirm-password" className="block text-sm font-medium text-[var(--txt)]">
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

          {error ? (
            <p className="text-sm text-red-600">{error}</p>
          ) : null}

          {success ? (
            <p className="text-sm text-[var(--grn-dark)]">{success}</p>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 w-full rounded-xl bg-[var(--grn)] py-3.5 text-sm font-medium text-white transition hover:bg-[var(--grn-acc)] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm leading-7 text-[var(--txt2)]">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-[var(--grn)] hover:text-[var(--grn-acc)]"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
