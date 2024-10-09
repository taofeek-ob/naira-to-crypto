import { NextResponse } from "next/server";

export async function POST(req) {
  const { isValid } = await req.json();

  try {
    if (isValid) {
      // Set the cookie in the response
      const response = NextResponse.json({ success: true }, { status: 200 });
      response.cookies.set("isAuthenticated", "true", {
        path: "/", // Set the cookie for the entire site
        httpOnly: true,
        maxAge: 60 * 60 * 24, // 1 day// Recommended for security
      });

      return response;
    } else {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json({ error: "Verification failed" }, { status: 400 });
  }
}
