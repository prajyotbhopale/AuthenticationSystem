"use client";

import axios from "axios";
import React, { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();

  // 👇 null = not loaded yet
  const [userId, setUserId] = useState<string | null>(null);

  const logout = async () => {
    try {
      await axios.get("/api/users/logout", {
        withCredentials: true,
      });
      toast.success("Logout successful");
      router.push("/login");
    } catch {
      toast.error("Logout failed");
    }
  };

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me", {
        withCredentials: true,
      });

      // 👇 this triggers re-render
      setUserId(res.data.data._id);
    } catch {
      toast.error("Failed to get user details");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-white px-4">
      <div className="w-full max-w-md bg-gray-900 rounded-2xl shadow-xl p-8 border border-gray-700">
        
        <h1 className="text-3xl font-bold text-center mb-2">
          Profile
        </h1>

        <p className="text-center text-gray-400 mb-6">
          Welcome to your profile page
        </p>

        {/* User ID box */}
        <div className="mb-6">
          <h2 className="text-sm text-gray-400 mb-2">User ID</h2>
          <div className="bg-green-600/20 border border-green-500 text-green-400 rounded-lg p-3 text-center font-mono break-all">
            {userId ? userId : "Click “Get User Details”"}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={getUserDetails}
            className="w-full bg-green-600 hover:bg-green-700 transition text-white font-semibold py-2.5 rounded-lg"
          >
            Get User Details
          </button>

          <button
            onClick={logout}
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-2.5 rounded-lg"
          >
            Logout
          </button>
        </div>

      </div>
    </div>
  );
}
