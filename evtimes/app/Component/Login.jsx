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

    try {
      setIsSubmitting(true);

      const res = await fetch("/api/auth/loginn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email.trim().toLowerCase(),
          password: form.password,
        }),
      });

      let loginData;
      try {
        loginData = await res.json();
      } catch {
        setError("Server returned an invalid response.");
        return;
      }
      if (!res.ok) {
        setError(loginData?.error || "Login failed");
        return;
      }

      const profileRes = await fetch("/api/auth/profile", {
        method: "GET",
        credentials: "include",
      });

      let profileData;
      try {
        profileData = await profileRes.json();
      } catch {
        setError("Profile API response was invalid.");
        return;
      }

      if (!profileRes.ok || !profileData?.user) {
        setError(profileData?.message || profileData?.error || "Profile fetch failed");
        return;
      }

      const user = profileData.user;
      const role = user.role || loginData.user?.role || "";


      localStorage.setItem("token", "session-active");
      localStorage.setItem("role", role);
      localStorage.setItem("user", JSON.stringify(user));

      saveSessionUser({
        name: user?.name || "",
        email: user?.email || "",
      });

      setSuccess(`Welcome ${user.name}`);

      if (role === "super_admin") {
        router.replace("/dashboard");
      } else if (role === "admin") {
        router.replace("/admin");
      } else {
        router.replace("/");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[linear-gradient(180deg,var(--grn-xlight)_0%,var(--wh)_100%)] px-4 py-6">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow">
        <h2 className="mb-4 text-center text-2xl font-semibold">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={form.email}
            onChange={handleChange}
            className="w-full rounded border p-2"
          />

          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={form.password}
            onChange={handleChange}
            className="w-full rounded border p-2"
          />

          {error ? <p className="text-sm text-red-500">{error}</p> : null}
          {success ? <p className="text-sm text-green-600">{success}</p> : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded bg-[#166534] py-2 text-white hover:bg-[#14532d]"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
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
