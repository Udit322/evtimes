"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 const handleLogin = () => {
  if (email === "admin@gmail.com" && password === "1234") {
    localStorage.setItem("role", "admin");

    setTimeout(() => {
      router.push("/dashboard");
    }, 100);

  } else if (email === "superadmin@gmail.com" && password === "1234") {
    localStorage.setItem("role", "superadmin");

    setTimeout(() => {
      router.push("/dashboard");
    }, 100);

  } else {
    alert("Invalid Credentials ❌");
  }
};

  return (
    <div className="login-container mx-auto flex items-center justify-center min-h-screen bg-gray-100">
      
      {/* Card */}
      <div className=" login-box bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm">
        
        <h1 className="text-2xl font-bold text-green-600 text-center mb-6">
          Admin Login
        </h1>

        <input
          type="email"
          placeholder="Enter Email"
          className="w-full mb-4 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          className="w-full mb-4 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
        >
          Login
        </button>

      
      </div>
    </div>
  );
}