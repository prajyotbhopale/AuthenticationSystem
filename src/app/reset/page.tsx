"use client";

import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const resetPassword = async () => {
    try {
      setError("");
      setMessage("");

      const res = await axios.post("/api/users/resetpassword", {
        token,
        password,
      });

      setMessage(res.data.message);
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-2xl font-bold">Reset Password</h1>

      <input
        type="password"
        placeholder="Enter new password"
        className="border p-2 rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={resetPassword}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Reset Password
      </button>

      {message && <p className="text-green-600">{message}</p>}
      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
}
