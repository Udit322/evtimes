"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { saveSessionUser } from "../lib/mockAuth";

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

    if (error) setError("");
    if (success) setSuccess("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.email.trim() || !form.password.trim()) {
      setError("Please fill in both email and password.");
      return;
    }

    const trimmedEmail = form.email.trim().toLowerCase();

    try {
      setIsSubmitting(true);

      const res = await fetch("/api/auth/loginn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: trimmedEmail,
          password: form.password,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }

      //  TOKEN SAVE
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      saveSessionUser({
        name: data.user?.name ?? "",
        email: data.user?.email ?? "",
      });

      setSuccess(`Welcome back, ${data.user.name} `);

      const role = data.user.role;
      localStorage.setItem("role", role);

      if (role === "super_admin") {
        router.replace("/dashboard");
      } else if (role === "admin") {
        router.replace("/admin");
      } else {
        router.replace("/");
      }
    } catch {
      setError("Server error");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-[linear-gradient(180deg,var(--grn-xlight)_0%,var(--wh)_100%)] px-4 py-6 sm:py-8">
      <div className="w-full max-w-md rounded-[24px] border border-[var(--brd)] bg-white p-5 shadow-[0_24px_60px_rgba(39,80,10,0.12)] sm:rounded-[28px] sm:p-8">

        <h2 className="text-center text-2xl font-semibold">Login</h2>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">

          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={form.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={form.password}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          {error && <p className="text-red-600">{error}</p>}
          {success && <p className="text-green-600">{success}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-600 text-white py-2 rounded"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-center">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-green-600">
            Signup
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;
