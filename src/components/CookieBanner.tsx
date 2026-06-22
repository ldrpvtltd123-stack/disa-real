import { useEffect, useState } from "react";
import { Cookie, X } from "lucide-react";

const KEY = "mydisa_cookie_consent";

export function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setShow(true);
    } catch {
      setShow(true);
    }
  }, []);

  function set(value: "accepted" | "rejected") {
    try {
      localStorage.setItem(KEY, JSON.stringify({ value, at: Date.now() }));
    } catch {}
    setShow(false);
  }

  if (!show) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-3 overflow-hidden rounded-2xl border border-border bg-background/95 p-4 shadow-2xl ring-1 ring-black/5 backdrop-blur sm:flex-row sm:items-center sm:gap-4 sm:p-5">
        <div className="flex min-w-0 items-start gap-3 sm:items-center">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-clay/15 text-clay">
            <Cookie className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-foreground sm:hidden">We use cookies</p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              <span className="hidden font-semibold text-foreground sm:inline">We use cookies. </span>
              MYDISA uses cookies to remember your preferences and improve the site.{" "}
              <a href="/faq" className="font-medium text-foreground underline-offset-4 hover:underline">Learn more</a>
            </p>
          </div>
          <button
            type="button"
            aria-label="Dismiss"
            onClick={() => set("rejected")}
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted-foreground hover:bg-accent sm:hidden"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="flex shrink-0 items-center gap-2 sm:ml-auto">
          <button
            type="button"
            onClick={() => set("rejected")}
            className="flex-1 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-accent sm:flex-none"
          >
            Reject
          </button>
          <button
            type="button"
            onClick={() => set("accepted")}
            className="flex-1 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-soft hover:opacity-90 sm:flex-none"
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}
