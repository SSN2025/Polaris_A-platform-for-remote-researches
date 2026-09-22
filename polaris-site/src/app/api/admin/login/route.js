import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE_NAME,
  getAdminPassword,
  createAdminSessionToken,
} from "@/lib/auth";
import { isRateLimited, recordFailedAttempt, clearAttempts } from "@/lib/rateLimit";

function getClientIdentifier(request) {
  // Best-effort client identifier for rate limiting. Behind a
  // proxy, x-forwarded-for is set by the proxy; this is not
  // spoof-proof, but this endpoint is also throttled server-side
  // per identifier, and the password itself is still required.
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "local"
  );
}

// Length-independent-ish comparison to avoid trivial timing
// side-channels on the password check.
function safeCompare(a, b) {
  if (typeof a !== "string" || typeof b !== "string") {
    return false;
  }

  if (a.length !== b.length) {
    return false;
  }

  let mismatch = 0;
  for (let i = 0; i < a.length; i += 1) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }

  return mismatch === 0;
}

export async function POST(request) {
  const identifier = getClientIdentifier(request);

  if (isRateLimited(identifier)) {
    return NextResponse.json(
      { ok: false, error: "too_many_attempts" },
      { status: 429 }
    );
  }

  let body;

  try {
    body = await request.json();
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: "invalid_request" },
      { status: 400 }
    );
  }

  const { password } = body || {};

  if (!safeCompare(password, getAdminPassword())) {
    recordFailedAttempt(identifier);

    return NextResponse.json(
      { ok: false, error: "invalid_password" },
      { status: 401 }
    );
  }

  clearAttempts(identifier);

  const { token, maxAge } = await createAdminSessionToken();

  const response = NextResponse.json({ ok: true });

  response.cookies.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge,
    path: "/",
  });

  return response;
}
