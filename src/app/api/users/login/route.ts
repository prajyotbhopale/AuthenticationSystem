import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connect(); // ✅ IMPORTANT

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 400 },
      );
    }

    // Create token payload
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    // Create JWT
    const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY!, {
      expiresIn: "1d",
    });

    // Create response
    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    });

    // ✅ Set cookie correctly
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: false, // 👈 IMPORTANT for localhost
      sameSite: "lax",
      path: "/",
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
