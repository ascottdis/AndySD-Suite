import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function unauthorized() {
  return new NextResponse("Authentication required.", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="AndySD Studio Portal"' },
  });
}

export function proxy(request: NextRequest) {
  const user = process.env.PORTAL_USER || "";
  const pass = process.env.PORTAL_PASS || "";
  if (!user || !pass) return unauthorized();

  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Basic ")) return unauthorized();

  const base64Credentials = authHeader.split(" ")[1] ?? "";
  const credentials = Buffer.from(base64Credentials, "base64").toString();
  const [u, p] = credentials.split(":");

  if (u === user && p === pass) return NextResponse.next();
  return unauthorized();
}

export const config = {
  matcher: ["/portal/:path*"],
};
