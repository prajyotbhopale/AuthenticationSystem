export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/route";

export async function GET(request: NextRequest) {
  console.log("➡️ /api/users/me HIT");
  console.log("➡️ COOKIES IN ROUTE 👉", request.cookies.getAll());
  console.log(
  "JWT_SECRET_KEY 👉",
  process.env.JWT_SECRET_KEY
);


  try {
    const userId = getDataFromToken(request);

    return NextResponse.json({
        
      success: true,
      data: {
        _id: userId,
        
      },
      
    });

    
  } catch (error: any) {
    console.log("❌ ERROR IN /me 👉", error.message);

    return NextResponse.json(
      { success: false, message: error.message },
      { status: 401 }
    );
  }
}
