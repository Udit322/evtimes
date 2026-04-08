"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Signup() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
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
    // TODO: connect signup API when backend integration is ready.
    setTimeout(() => {
      router.push("/login");
    }, 1200);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[linear-gradient(180deg,var(--wh)_0%,var(--grn-xlight)_100%)] px-4 py-8">
      <div className="w-full max-w-md rounded-[28px] border border-[var(--brd)] bg-white p-8 shadow-[0_24px_60px_rgba(39,80,10,0.12)]">
        <p className="text-center text-xs font-medium uppercase tracking-[0.18em] text-[var(--grn)]">
          New Member
        </p>
        <h2 className="mt-3 text-center text-3xl font-semibold text-[var(--blk)]">
          Sign Up
        </h2>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full rounded-xl border border-[var(--brd)] bg-[var(--gry)] px-4 py-3 text-sm outline-none transition focus:border-[var(--grn)] focus:bg-white"
          />

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
            Sign Up
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-[var(--txt2)]">
          Already have account?{" "}
          <Link href="/login" className="font-medium text-[var(--grn)] hover:text-[var(--grn-acc)]">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
