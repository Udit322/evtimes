"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // TODO: connect login API when backend integration is ready.
    router.push("/");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[linear-gradient(180deg,var(--grn-xlight)_0%,var(--wh)_100%)] px-4 py-8">
      <div className="w-full max-w-md rounded-[28px] border border-[var(--brd)] bg-white p-8 shadow-[0_24px_60px_rgba(39,80,10,0.12)]">
        <p className="text-center text-xs font-medium uppercase tracking-[0.18em] text-[var(--grn)]">
          Member Access
        </p>
        <h2 className="mt-3 text-center text-3xl font-semibold text-[var(--blk)]">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-xl border border-[var(--brd)] bg-[var(--gry)] px-4 py-3 text-sm outline-none transition focus:border-[var(--grn)] focus:bg-white"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full rounded-xl border border-[var(--brd)] bg-[var(--gry)] px-4 py-3 text-sm outline-none transition focus:border-[var(--grn)] focus:bg-white"
          />

          <button
            type="submit"
            className="w-full rounded-xl bg-[var(--grn)] py-3 text-sm font-medium text-white transition hover:bg-[var(--grn-acc)]"
          >
            Login
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-[var(--txt2)]">
          Do not have account?{" "}
          <Link href="/signup" className="font-medium text-[var(--grn)] hover:text-[var(--grn-acc)]">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}
