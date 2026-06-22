import { useEffect, useRef, useState } from "react";
import { LANGUAGES, useI18n, type LangCode } from "@/lib/i18n";

export function LanguageSwitcher() {
  const { lang, setLang } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const active = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-secondary"
      >
        <span aria-hidden="true">🌐</span>
        <span>{active.native}</span>
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className={`transition-transform ${open ? "rotate-180" : ""}`}>
          <path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 z-50 mt-2 max-h-80 w-56 overflow-auto rounded-2xl border border-border bg-card p-1.5 shadow-warm"
        >
          {LANGUAGES.map((l) => {
            const isActive = l.code === lang;
            return (
              <li key={l.code}>
                <button
                  onClick={() => { setLang(l.code as LangCode); setOpen(false); }}
                  role="option"
                  aria-selected={isActive}
                  className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2 text-left text-sm transition-colors ${
                    isActive ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-secondary"
                  }`}
                >
                  <span className="font-medium">{l.native}</span>
                  <span className={`text-xs ${isActive ? "text-primary-foreground/80" : "text-muted-foreground"}`}>{l.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
