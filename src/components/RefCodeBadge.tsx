import { useState } from "react";
import { Copy, Check } from "lucide-react";

export function RefCodeBadge({ code, label = "Reference code" }: { code: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };
  return (
    <div className="mx-auto mt-5 inline-flex max-w-full flex-col items-center gap-1.5 rounded-2xl border border-dashed border-primary/40 bg-primary/5 px-5 py-3 text-center">
      <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary/80">{label}</span>
      <div className="flex items-center gap-2">
        <code className="select-all font-mono text-base font-semibold tracking-wider text-foreground">{code}</code>
        <button
          type="button"
          onClick={onCopy}
          aria-label="Copy reference code"
          className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition hover:bg-accent hover:text-foreground"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
        </button>
      </div>
      <span className="text-[11px] text-muted-foreground">Save this code — quote it when you contact us.</span>
    </div>
  );
}
