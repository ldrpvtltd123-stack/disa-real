import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export function AccountButton() {
  const [signedIn, setSignedIn] = useState<boolean | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSignedIn(!!data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setSignedIn(!!session);
    });
    return () => { sub.subscription.unsubscribe(); };
  }, []);

  if (signedIn === null) {
    return <span className="hidden h-10 w-24 animate-pulse rounded-full bg-muted md:inline-block" aria-hidden />;
  }

  return (
    <Link
      to={signedIn ? "/dashboard" : "/auth"}
      className="hidden items-center gap-1.5 rounded-full border border-border bg-background px-3 py-2 text-sm font-medium text-foreground transition hover:bg-accent md:inline-flex"
      aria-label={signedIn ? "My account" : "Sign in"}
    >
      <User className="h-4 w-4" />
      <span>{signedIn ? "My account" : "Sign in"}</span>
    </Link>
  );
}
