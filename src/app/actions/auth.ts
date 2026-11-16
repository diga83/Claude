"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createUser, findUserByEmail } from "@/lib/db";
import { createSession, destroySession } from "@/lib/session";

export interface AuthState {
  error?: string;
  fields?: { name?: string; email?: string };
}

const SignupSchema = z.object({
  name: z.string().trim().min(1, "Enter your name.").max(80),
  email: z.string().trim().toLowerCase().email("Enter a valid email address."),
  password: z.string().min(8, "Use a password of at least 8 characters.").max(200),
});

export async function signup(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const raw = Object.fromEntries(formData) as Record<string, string>;
  const fields = { name: raw.name, email: raw.email };
  const parsed = SignupSchema.safeParse(raw);
  if (!parsed.success) return { error: parsed.error.issues[0].message, fields };

  const { name, email, password } = parsed.data;
  if (await findUserByEmail(email)) {
    return { error: "An account with that email already exists. Sign in instead.", fields };
  }
  const user = await createUser(email, name, await bcrypt.hash(password, 11));
  await createSession(user.id);
  redirect("/");
}

export async function login(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const user = email ? await findUserByEmail(email) : null;
  // Compare against a dummy hash when the user is unknown so timing doesn't reveal it.
  const hash = user?.passwordHash ?? "$2b$11$C6UzMDM.H6dfI/f/IKcEeO5S5rXK9m8mJ8Xw3o2QHcF0VUYlR0n6K";
  const ok = await bcrypt.compare(password, hash);
  if (!user || !ok) {
    return { error: "That email and password don't match an account.", fields: { email } };
  }
  await createSession(user.id);
  redirect("/");
}

export async function logout() {
  await destroySession();
  redirect("/");
}
