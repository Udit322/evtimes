"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getStoredUser, saveSessionUser } from "../lib/mockAuth";

function Login() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
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

    if (!form.email.trim() || !form.password.trim()) {
      setError("Please fill in both email and password.");
      return;
    }

    const trimmedEmail = form.email.trim().toLowerCase();
    const storedUser = getStoredUser();

    if (!storedUser) {
      setError("No account found. Please sign up first.");
      return;
    }

    if (storedUser.email !== trimmedEmail || storedUser.password !== form.password) {
      setError("Invalid email or password.");
      return;
    }

    saveSessionUser({
      name: storedUser.name,
      email: storedUser.email,
    });

    setIsSubmitting(true);
    setSuccess(`Welcome back, ${storedUser.name}. Account saved. Redirecting...`);

    window.setTimeout(() => {
      setIsSubmitting(false);
      router.push("/");
    }, 700);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[linear-gradient(180deg,var(--grn-xlight)_0%,var(--wh)_100%)] px-4 py-6 sm:py-8">
      <div className="w-full max-w-md rounded-[24px] border border-[var(--brd)] bg-white p-5 shadow-[0_24px_60px_rgba(39,80,10,0.12)] sm:rounded-[28px] sm:p-8">
        <p className="text-center text-xs font-medium uppercase tracking-[0.18em] text-[var(--grn)]">
          Member Access
        </p>
        <h2 className="mt-3 text-center text-2xl font-semibold text-[var(--blk)] sm:text-3xl">
          Login
        </h2>
        <p className="mt-3 text-center text-sm text-[var(--txt2)]">
          Login with the account you created on signup.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="login-email" className="text-sm font-medium text-[var(--txt)]">
              Email
            </label>
            <input
              id="login-email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-xl border border-[var(--brd)] bg-[var(--gry)] px-4 py-3 text-sm outline-none transition focus:border-[var(--grn)] focus:bg-white"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="login-password" className="text-sm font-medium text-[var(--txt)]">
              Password
            </label>
            <input
              id="login-password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
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
            className="w-full rounded-xl bg-[var(--grn)] py-3 text-sm font-medium text-white transition hover:bg-[var(--grn-acc)] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Signing In..." : "Login"}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-[var(--txt2)]">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-[var(--grn)] hover:text-[var(--grn-acc)]"
          >
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
