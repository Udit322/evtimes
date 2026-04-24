"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getStoredUser } from "../lib/mockAuth";

export default function Login() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ✅ NOW INSIDE COMPONENT
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));

    if (error) setError("");
    if (success) setSuccess("");
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
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

    if (
      storedUser.email !== trimmedEmail ||
      storedUser.password !== form.password
    ) {
      setError("Invalid email or password.");
      return;
    }

    setIsSubmitting(true);
    setSuccess(`Welcome back, ${storedUser.name}. Redirecting...`);

    localStorage.setItem("role", storedUser.role);

    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/dashboard");
    }, 1000);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow">

        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 border rounded"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 border rounded"
          />

          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-500 text-white p-3 rounded"
          >
            {isSubmitting ? "Signing In..." : "Login"}
          </button>
        </form>

        <p className="text-center mt-4">
          Don't have account?{" "}
          <Link href="/signup" className="text-green-600">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}


