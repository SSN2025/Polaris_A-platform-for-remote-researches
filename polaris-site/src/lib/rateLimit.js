/*
 * In-memory login rate limiter.
 *
 * Scope/limitation (worth knowing, not hiding): this resets on
 * server restart and does not share state across multiple
 * server instances. Fine for a single-instance hackathon
 * deployment; swap for a shared store (Redis, etc.) before
 * running this behind a load balancer.
 */

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_ATTEMPTS = 8;

const attempts = new Map(); // key -> { count, windowStart }

function getKey(identifier) {
  return identifier || "unknown";
}

export function isRateLimited(identifier) {
  const key = getKey(identifier);
  const entry = attempts.get(key);

  if (!entry) {
    return false;
  }

  if (Date.now() - entry.windowStart > WINDOW_MS) {
    attempts.delete(key);
    return false;
  }

  return entry.count >= MAX_ATTEMPTS;
}

export function recordFailedAttempt(identifier) {
  const key = getKey(identifier);
  const entry = attempts.get(key);

  if (!entry || Date.now() - entry.windowStart > WINDOW_MS) {
    attempts.set(key, { count: 1, windowStart: Date.now() });
    return;
  }

  entry.count += 1;
}

export function clearAttempts(identifier) {
  attempts.delete(getKey(identifier));
}
