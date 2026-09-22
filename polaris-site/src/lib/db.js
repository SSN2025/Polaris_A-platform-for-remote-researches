// src/lib/db.js  —  NEW FILE, create it

import { PrismaClient } from "@prisma/client";

/*
 * Prisma Client singleton.
 *
 * Next.js dev mode hot-reloads modules on every file save. If
 * `new PrismaClient()` ran on every reload, each save would open
 * a fresh connection pool without closing the old one - a real
 * connection-leak bug in dev. Stashing the instance on
 * `globalThis` (which survives hot reloads, unlike module state)
 * is the standard fix.
 */

const globalForPrisma = globalThis;

export const prisma = globalForPrisma.__polarisPrisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.__polarisPrisma = prisma;
}