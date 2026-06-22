import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { toast } from "sonner";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — Mydisa" },
      { name: "description", content: "Sign in to your Mydisa account to track orders, save favourites and manage your profile." },
      { property: "og:title", content: "Sign in — Mydisa" },
      { property: "og:description", content: "Sign in to manage your Mydisa account." },
      { property: "og:url", content: "/auth" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/auth" }],
  }),
  component: AuthPage,
});

const emailSchema = z.string().trim().email("Enter a valid email").max(120);
const passSchema = z.string().min(6, "At least 6 characters").max(72);

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;
    supabase.auth.getUser().then(({ data }) => {
      if (active && data.user) navigate({ to: "/dashboard" });
    });
    return () => { active = false; };
  }, [navigate]);

  const handleGoogle = async () => {
    setBusy(true);
    const res = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin + "/dashboard",
    });
    if (res.error) {
      toast.error("Google sign-in failed", { description: res.error.message });
      setBusy(false);
      return;
    }
    if (res.redirected) return;
    navigate({ to: "/dashboard" });
  };

  const handleEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailRes = emailSchema.safeParse(email);
    const passRes = passSchema.safeParse(password);
    if (!emailRes.success) return toast.error(emailRes.error.issues[0].message);
    if (!passRes.success) return toast.error(passRes.error.issues[0].message);
    setBusy(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email: emailRes.data,
          password: passRes.data,
          options: {
            emailRedirectTo: window.location.origin + "/dashboard",
            data: { full_name: name.trim() },
          },
        });
        if (error) throw error;
        toast.success("Account created. You can sign in now.");
        setMode("signin");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: emailRes.data,
          password: passRes.data,
        });
        if (error) throw error;
        navigate({ to: "/dashboard" });
      }
    } catch (err) {
      toast.error("Sign in failed", { description: err instanceof Error ? err.message : "Unknown error" });
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-12">
      <div className="rounded-3xl border border-border bg-card p-6 shadow-soft md:p-8">
        <h1 className="font-display text-2xl font-semibold text-foreground">
          {mode === "signin" ? "Welcome back" : "Create your account"}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Sign in to track orders, save favourites and reorder in one tap.
        </p>

        <button
          type="button"
          onClick={handleGoogle}
          disabled={busy}
          className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-full border border-border bg-background px-4 py-3 text-sm font-medium text-foreground transition hover:bg-accent disabled:opacity-60"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
            <path fill="#EA4335" d="M12 10.2v3.92h5.46c-.24 1.4-1.65 4.1-5.46 4.1-3.29 0-5.97-2.72-5.97-6.07S8.71 6.07 12 6.07c1.87 0 3.13.8 3.85 1.48l2.62-2.53C16.86 3.5 14.66 2.5 12 2.5 6.78 2.5 2.55 6.73 2.55 12s4.23 9.5 9.45 9.5c5.45 0 9.06-3.83 9.06-9.22 0-.62-.07-1.1-.16-1.58H12Z"/>
          </svg>
          Continue with Google
        </button>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs uppercase tracking-wider text-muted-foreground">or</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <form onSubmit={handleEmail} className="space-y-3">
          {mode === "signup" && (
            <input
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
              maxLength={80}
            />
          )}
          <input
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
            required
          />
          <input
            type="password"
            autoComplete={mode === "signin" ? "current-password" : "new-password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
            required
          />
          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-full bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition hover:opacity-95 disabled:opacity-60"
          >
            {mode === "signin" ? "Sign in" : "Create account"}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-muted-foreground">
          {mode === "signin" ? "New to Mydisa? " : "Already have an account? "}
          <button
            type="button"
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            className="font-medium text-primary hover:underline"
          >
            {mode === "signin" ? "Create account" : "Sign in"}
          </button>
        </p>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          By continuing you agree to our <Link to="/terms" className="underline">Terms</Link>.
        </p>
      </div>
    </section>
  );
}
