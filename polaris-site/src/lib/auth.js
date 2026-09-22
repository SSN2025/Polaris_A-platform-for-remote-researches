/*
 * Admin session tokens.
 *
 * The previous version of this file set a cookie with a fixed,
 * hardcoded value ("granted"). That is a real auth bug: anyone
 * could open devtools on any origin and manually set
 * `document.cookie = "polaris_admin=granted"` to walk straight
 * into the admin panel - the password check was cosmetic.
 *
 * This replaces it with a signed, expiring token:
 *   token = base64url(payload) + "." + base64url(HMAC-SHA256(payload))
 * where payload = `${expiryTimestamp}`. Verifying requires the
 * server secret, so a forged cookie fails signature verification
 * even if the attacker guesses the exact cookie name.
 *
 * Uses the Web Crypto API (globalThis.crypto.subtle) rather than
 * Node's `crypto` module so the exact same code runs in both the
 * Node API routes and the Edge middleware.
 */

export const ADMIN_COOKIE_NAME = "polaris_admin_session";
export const ADMIN_SESSION_TTL_SECONDS = 60 * 60 * 8; // 8 hours

export function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || "polaris2026";
}

function getSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (secret && secret.length >= 16) {
    return secret;
  }

  // Fallback so the app still runs without extra setup, but this
  // is NOT safe for a real deployment - set ADMIN_SESSION_SECRET
  // in your environment before deploying anywhere public.
  return "polaris-dev-only-secret-change-me-before-deploy";
}

function toBase64Url(bytes) {
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(value) {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/");
  const withPadding = padded + "=".repeat((4 - (padded.length % 4)) % 4);
  const binary = atob(withPadding);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

async function getHmacKey() {
  const encoder = new TextEncoder();
  return globalThis.crypto.subtle.importKey(
    "raw",
    encoder.encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

export async function createAdminSessionToken() {
  const expiresAt = Date.now() + ADMIN_SESSION_TTL_SECONDS * 1000;
  const payload = String(expiresAt);

  const key = await getHmacKey();
  const encoder = new TextEncoder();
  const signature = await globalThis.crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(payload)
  );

  const payloadB64 = toBase64Url(encoder.encode(payload));
  const signatureB64 = toBase64Url(new Uint8Array(signature));

  return {
    token: `${payloadB64}.${signatureB64}`,
    maxAge: ADMIN_SESSION_TTL_SECONDS,
  };
}

export async function verifyAdminSessionToken(token) {
  if (!token || typeof token !== "string" || !token.includes(".")) {
    return false;
  }

  const [payloadB64, signatureB64] = token.split(".");

  if (!payloadB64 || !signatureB64) {
    return false;
  }

  let payloadBytes;
  let signatureBytes;

  try {
    payloadBytes = fromBase64Url(payloadB64);
    signatureBytes = fromBase64Url(signatureB64);
  } catch (error) {
    return false;
  }

  const key = await getHmacKey();

  const valid = await globalThis.crypto.subtle.verify(
    "HMAC",
    key,
    signatureBytes,
    payloadBytes
  );

  if (!valid) {
    return false;
  }

  const expiresAt = Number(new TextDecoder().decode(payloadBytes));

  if (!Number.isFinite(expiresAt) || Date.now() > expiresAt) {
    return false;
  }

  return true;
}
