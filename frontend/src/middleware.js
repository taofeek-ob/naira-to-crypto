// middleware.js
import { NextResponse } from "next/server";

export function middleware(req) {
  // Check if the user is authenticated
  const isAuthenticated = req.cookies.get("isAuthenticated");
  console.log(req);
  // If not authenticated, redirect to the login page
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", req.url)); // Adjust URL to your login page
  }

  // Allow the request to continue
  return NextResponse.next();
}

// Specify the paths that the middleware should apply to
export const config = {
  matcher: ["/dashboard/:path*"], // Protect the dashboard route
};
