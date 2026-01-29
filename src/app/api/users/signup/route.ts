import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

export async function POST(request: NextRequest) {
  try {
    await connect();

    const { username, email, password } = await request.json();

    // ✅ validation (VERY IMPORTANT)
    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    // check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 },
      );
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();

    // send verification email (optional)

    await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });
    return NextResponse.json(
      {
        message: "User created successfully",
        success: true,
        userId: newUser._id,
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("SIGNUP API ERROR:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 },
    );
  }
}
