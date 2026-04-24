import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex gap-6">
      <Link href="/vehicles">VEHICLES</Link>
      <Link href="/charging">CHARGING</Link>
      <Link href="/policy">POLICY</Link>
      <Link href="/batterytech">BATTERY TECH</Link>
      <Link href="/startup">STARTUPS</Link>
      <Link href="/market">MARKET</Link>
    </nav>
  );
}