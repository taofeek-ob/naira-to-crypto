import { NextResponse } from "next/server";

// This is for Next.js App Router (API route handler in /app/api)
export async function GET(req) {
  const cookies = req.headers.get("cookie");
  const isAuthenticated = cookies?.includes("isAuthenticated");

  if (isAuthenticated) {
    return NextResponse.json({ authenticated: true }, { status: 200 });
  } else {
    return NextResponse.json({ authenticated: false }, { status: 200 });
  }
}
