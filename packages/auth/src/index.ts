import type { User } from "@prisma/client";
import { prisma } from "@andysd/db";

export async function getCurrentUser(): Promise<User | null> {
  // TODO: replace with real session lookup
  const user = await prisma.user.findFirst();
  return user ?? null;
}

export async function signIn(email: string): Promise<User> {
  let user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    user = await prisma.user.create({
      data: { email }
    });
  }
  return user;
}

export async function signOut(): Promise<void> {
  // Placeholder for session revocation
}
