import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export async function POST() {
  // Remove the authentication cookie
  cookies().delete("isAuthenticated"); // Replace 'auth-token' with your actual cookie name
  console.log("cookies deleted");
  return NextResponse.json({ success: true });
}
