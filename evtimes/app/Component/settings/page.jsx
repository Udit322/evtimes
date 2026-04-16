"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useSyncExternalStore } from "react";
import { clearSessionUser, getSessionUser, subscribeToSessionChange } from "../../lib/mockAuth";

export default function SettingsPage() {
  const router = useRouter();
  const sessionUser = useSyncExternalStore(
    subscribeToSessionChange,
    getSessionUser,
    () => null
  );

  useEffect(() => {
    if (!sessionUser) {
      router.replace("/login");
    }
  }, [router, sessionUser]);

  if (!sessionUser) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[var(--gry)] px-4">
        <p className="text-sm text-[var(--txt2)]">Loading settings...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,var(--wh)_0%,var(--grn-xlight)_100%)] px-4 py-6 sm:py-10">
      <div className="mx-auto max-w-2xl rounded-[24px] border border-[var(--brd)] bg-white p-5 shadow-[0_20px_50px_rgba(39,80,10,0.14)] sm:rounded-3xl sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--grn)]">Settings</p>
        <h1 className="mt-3 text-2xl font-semibold text-[var(--blk)] sm:text-3xl">Account Settings</h1>
        <p className="mt-2 text-sm text-[var(--txt2)]">
          Manage your account preferences and sign-in controls.
        </p>

        <div className="mt-6 space-y-3">
          <div className="rounded-2xl border border-[var(--brd)] bg-[var(--gry)] p-4">
            <p className="text-sm font-medium text-[var(--blk)]">Email notifications</p>
            <p className="mt-1 text-xs text-[var(--txt2)]">Enabled for {sessionUser.email}</p>
          </div>
          <div className="rounded-2xl border border-[var(--brd)] bg-[var(--gry)] p-4">
            <p className="text-sm font-medium text-[var(--blk)]">Security status</p>
            <p className="mt-1 text-xs text-[var(--txt2)]">Account saved and logged in</p>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link
            href="/account"
            className="rounded-xl border border-[var(--brd-dark)] px-4 py-2 text-center text-sm text-[var(--grn-dark)] hover:bg-[var(--grn-xlight)]"
          >
            My Account
          </Link>
          <button
            type="button"
            onClick={() => {
              clearSessionUser();
              router.push("/login");
            }}
            className="rounded-xl bg-[#b42318] px-4 py-2 text-sm text-white hover:bg-[#9c1f15]"
          >
            Sign out
          </button>
        </div>
      </div>
    </main>
  );
}
