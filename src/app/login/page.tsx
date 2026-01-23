"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function Login() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

 const onLogin = async () => {
  if (loading) return;

  try {
    setLoading(true);

    const response = await axios.post(
      "/api/users/login",
      user,
      { withCredentials: true }
    );

    console.log("Login success", response.data);
    toast.success("Login success");
    router.push("/profile");

  } catch (error: any) {
    const message =
      error.response?.data?.message || "Login failed";
    console.log("Login failed", message);
    toast.error(message);
  } finally {
    setLoading(false);
  }
};

  // ✅ FORM VALIDATION
  useEffect(() => {
    if (user.email.trim() && user.password.trim()) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-300 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        
        {/* Heading */}
        <h1 className="text-3xl font-bold text-center text-gray-800">
          {loading ? "Processing..." : "Login"}
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Welcome back! Please login to your account
        </p>

        {/* ✅ FORM (Enter key support) */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onLogin();
          }}
          className="mt-6 space-y-4"
        >
          
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={user.email}
              onChange={(e) =>
                setUser({ ...user, email: e.target.value })
              }
              placeholder="you@example.com"
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={user.password}
              onChange={(e) =>
                setUser({ ...user, password: e.target.value })
              }
              placeholder="••••••••"
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={buttonDisabled || loading}
            className={`w-full py-2 rounded-md font-semibold transition
              ${
                buttonDisabled || loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-orange-500 hover:bg-orange-600 text-white"
              }
            `}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center text-gray-600 mt-6">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="text-orange-500 font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
