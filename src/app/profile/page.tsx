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
  <div>
    <h1>Profile Page</h1>
    <p>Welcome to your profile!</p>

    <br />

    {/* 👇 DETAILS SHOW HERE DIRECTLY */}
    <h2 className="text-2xl font-bold bg-green-500 p-2 text-white">
      {userId ? userId : "Click Get User Details"}
    </h2>

    <button
      onClick={getUserDetails}
      className="bg-green-500 mt-4 text-white font-bold py-2 px-4 rounded"
    >
      Get User Details
    </button>

    <button
      onClick={logout}
      className="bg-blue-500 mt-4 ml-2 text-white font-bold py-2 px-4 rounded"
    >
      Logout
    </button>
  </div>
);

}
