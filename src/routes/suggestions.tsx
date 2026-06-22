import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Lightbulb, Send, CheckCircle2 } from "lucide-react";
import { makeRefCode } from "../lib/reference-code";
import { RefCodeBadge } from "../components/RefCodeBadge";

export const Route = createFileRoute("/suggestions")({
  head: () => ({
    meta: [
      { title: "Customer Suggestions — MYDISA" },
      { name: "description", content: "Share your ideas, product wishes and feedback to help MYDISA serve you better." },
      { property: "og:title", content: "Customer Suggestions — MYDISA" },
      { property: "og:description", content: "Tell us what you'd love to see next from MYDISA." },
      { property: "og:url", content: "/suggestions" },
    ],
    links: [{ rel: "canonical", href: "/suggestions" }],
  }),
  component: SuggestionsPage,
});

const TOPICS = ["New product idea", "Recipe request", "Packaging feedback", "Delivery feedback", "Training topic", "Other"];

function SuggestionsPage() {
  const [form, setForm] = useState({ name: "", email: "", topic: TOPICS[0], message: "" });
  const [done, setDone] = useState(false);
  const [refCode, setRefCode] = useState<string | null>(null);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.message) return;
    const code = makeRefCode("SUG");
    try {
      const saved = JSON.parse(localStorage.getItem("mydisa_suggestions") || "[]");
      localStorage.setItem("mydisa_suggestions", JSON.stringify([{ id: code, at: Date.now(), ...form }, ...saved]));
    } catch {}
    setRefCode(code);
    setDone(true);
  }

  if (done) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-20 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h1 className="mt-5 font-display text-3xl font-semibold text-foreground">Thank you!</h1>
        <p className="mt-3 text-muted-foreground">Your suggestion is in. We read every single one.</p>
        {refCode && <RefCodeBadge code={refCode} label="Suggestion code" />}
        <button onClick={() => { setDone(false); setRefCode(null); setForm({ name: "", email: "", topic: TOPICS[0], message: "" }); }} className="mt-6 rounded-full border border-border bg-background px-5 py-2 text-sm font-medium hover:bg-accent">
          Send another
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 md:px-6 md:py-16">
      <header className="text-center">
        <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
          <Lightbulb className="h-7 w-7" />
        </div>
        <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl">Your suggestion matters</h1>
        <p className="mt-3 text-muted-foreground">Got an idea for a new millet product, a recipe, or a way we can serve you better? Tell us.</p>
      </header>

      <form onSubmit={submit} className="mt-10 space-y-4 rounded-3xl border border-border bg-card p-6 md:p-8">
        <div className="grid gap-4 md:grid-cols-2">
          <input className="rounded-xl border border-border bg-background px-4 py-3 text-sm" placeholder="Your name (optional)" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input type="email" className="rounded-xl border border-border bg-background px-4 py-3 text-sm" placeholder="Email (optional)" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </div>
        <select className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })}>
          {TOPICS.map((t) => <option key={t}>{t}</option>)}
        </select>
        <textarea className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" rows={6} placeholder="Share your suggestion..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
        <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft">
          <Send className="h-4 w-4" /> Send suggestion
        </button>
      </form>
    </div>
  );
}
