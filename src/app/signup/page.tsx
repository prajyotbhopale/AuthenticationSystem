"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function SignUp() {

  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });

  const [disabledbutton, setDisablebutton] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
     const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);

      router.push("/login");
      

    } catch (error:any) {
      console.log("Signup failed", error.message);
      toast.error(error.message);
    }finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setDisablebutton(false);
    } else {
      setDisablebutton(true);
    }
  }, [user]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-400 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-2 text-black">
          {loading ? "processing" : "Sign up"}
        </h1>
        <hr className="mb-6" />

        {/* Username */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Username
          </label>
          <input
            type="text"
            value={user.username}
            onChange={(e) =>
              setUser({ ...user, username: e.target.value })
            }
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-black mb-1">
            Email
          </label>
          <input
            type="email"
            value={user.email}
            onChange={(e) =>
              setUser({ ...user, email: e.target.value })
            }
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-black mb-1">
            Password
          </label>
          <input
            type="password"
            value={user.password} // ✅ FIXED
            onChange={(e) =>
              setUser({ ...user, password: e.target.value })
            }
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Button */}
        <button
          onClick={onSignup}
          disabled={disabledbutton}
          className={`w-full py-2 rounded-md font-semibold transition
            ${disabledbutton
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700 text-white"
            }`}
        >
          {disabledbutton ? "Fill all fields" : "Sign Up"}
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Visit login page
          </Link>
        </p>
      </div>
    </div>
  );
}
