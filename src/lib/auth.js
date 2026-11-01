import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import prisma from './prisma';

const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'fallback-secret-change-me';
const TOKEN_NAME = 'polaris-admin-token';

export async function hashPassword(password) {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password, hash) {
  return bcrypt.compare(password, hash);
}

export function createToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

export async function getSession() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(TOKEN_NAME)?.value;
    if (!token) return null;
    const decoded = verifyToken(token);
    if (!decoded) return null;
    const admin = await prisma.admin.findUnique({
      where: { id: decoded.id },
      select: { id: true, username: true, name: true, role: true },
    });
    return admin;
  } catch (err) {
    console.warn('[Database Notice] getSession error:', err.message);
    return null;
  }
}

export async function requireAuth() {
  const session = await getSession();
  if (!session) {
    throw new Error('Unauthorized');
  }
  return session;
}

export async function seedAdmin() {
  try {
    const username = process.env.ADMIN_USERNAME || 'admin';
    const password = process.env.ADMIN_PASSWORD || 'polaris-admin-2026';
    
    const existing = await prisma.admin.findUnique({ where: { username } });
    if (existing) return existing;

    const hashed = await hashPassword(password);
    return await prisma.admin.create({
      data: {
        username,
        password: hashed,
        name: 'NCPOR Admin',
        role: 'admin',
      },
    });
  } catch (err) {
    console.warn('[Database Notice] seedAdmin error:', err.message);
    return null;
  }
}

