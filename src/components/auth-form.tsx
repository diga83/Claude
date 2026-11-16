"use client";

import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useActionState, useState } from "react";
import { login, signup, type AuthState } from "@/app/actions/auth";

const input =
  "mt-1 block min-h-12 w-full rounded-lg border border-border-strong bg-surface px-3 text-base focus:border-accent";

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const isSignup = mode === "signup";
  const [state, action, pending] = useActionState<AuthState, FormData>(
    isSignup ? signup : login,
    {},
  );
  const [show, setShow] = useState(false);

  return (
    <div className="mx-auto max-w-md px-4 py-12 sm:py-16">
      <h1 className="font-serif text-4xl font-semibold tracking-tight">
        {isSignup ? "Create your account" : "Sign in"}
      </h1>
      <p className="mt-2 text-muted-foreground">
        {isSignup
          ? "Save your scans and download reports."
          : "Welcome back. Your scan history is waiting."}
      </p>

      <form action={action} className="mt-8 space-y-5 rounded-xl border border-border bg-surface p-6 shadow-sm">
        {state.error && (
          <p role="alert" className="rounded-lg border border-ai/30 bg-ai-soft/60 p-3 text-sm font-bold text-ai">
            {state.error}
          </p>
        )}
        {isSignup && (
          <div>
            <label htmlFor="name" className="font-bold">
              Name
            </label>
            <input
              id="name"
              name="name"
              required
              autoComplete="name"
              defaultValue={state.fields?.name}
              className={input}
            />
          </div>
        )}
        <div>
          <label htmlFor="email" className="font-bold">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            defaultValue={state.fields?.email}
            className={input}
          />
        </div>
        <div>
          <label htmlFor="password" className="font-bold">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={show ? "text" : "password"}
              required
              minLength={isSignup ? 8 : undefined}
              autoComplete={isSignup ? "new-password" : "current-password"}
              aria-describedby={isSignup ? "password-help" : undefined}
              className={`${input} pr-12`}
            />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              aria-label={show ? "Hide password" : "Show password"}
              className="absolute right-0.5 top-1/2 mt-0.5 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground hover:text-primary"
            >
              {show ? <EyeOff aria-hidden className="size-5" /> : <Eye aria-hidden className="size-5" />}
            </button>
          </div>
          {isSignup && (
            <p id="password-help" className="mt-1 text-sm text-muted-foreground">
              At least 8 characters.
            </p>
          )}
        </div>
        <button
          type="submit"
          disabled={pending}
          className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-accent px-6 font-bold text-white transition-colors duration-200 hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending && <Loader2 aria-hidden className="size-5 animate-spin" />}
          {isSignup ? "Create account" : "Sign in"}
        </button>
      </form>

      <p className="mt-6 text-center text-muted-foreground">
        {isSignup ? "Already have an account? " : "New here? "}
        <Link href={isSignup ? "/login" : "/signup"} className="font-bold text-accent underline">
          {isSignup ? "Sign in" : "Create an account"}
        </Link>
      </p>
    </div>
  );
}
