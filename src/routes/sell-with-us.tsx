import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Store, Package, Send, CheckCircle2, Handshake, BadgeCheck, Truck } from "lucide-react";
import { makeRefCode } from "../lib/reference-code";
import { RefCodeBadge } from "../components/RefCodeBadge";

export const Route = createFileRoute("/sell-with-us")({
  head: () => ({
    meta: [
      { title: "Sell with us — MYDISA" },
      { name: "description", content: "Farmers, SHGs and millet brands: list your products on MYDISA. Fair prices, pan-India reach, training and packaging support." },
      { property: "og:title", content: "Sell with us — MYDISA" },
      { property: "og:description", content: "Partner with MYDISA to bring your millet products to homes across India." },
      { property: "og:url", content: "/sell-with-us" },
    ],
    links: [{ rel: "canonical", href: "/sell-with-us" }],
  }),
  component: SellPage,
});

const CATEGORIES = ["Raw millets / grains", "Millet flours", "Snacks / cookies", "Breakfast mixes", "Ready-to-cook", "Ready-to-eat", "Other"];

function SellPage() {
  const [form, setForm] = useState({
    business: "", contact: "", phone: "", email: "", city: "", state: "",
    category: CATEGORIES[0], product: "", monthlyVolume: "", fssai: "", notes: "",
  });
  const [done, setDone] = useState(false);
  const [refCode, setRefCode] = useState<string | null>(null);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^\d{10}$/.test(form.phone)) return alert("Enter a valid 10-digit phone");
    const code = makeRefCode("VND");
    try {
      const saved = JSON.parse(localStorage.getItem("mydisa_vendors") || "[]");
      localStorage.setItem("mydisa_vendors", JSON.stringify([{ id: code, at: Date.now(), ...form }, ...saved]));
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
        <h1 className="mt-5 font-display text-3xl font-semibold text-foreground">Application received</h1>
        <p className="mt-3 text-muted-foreground">Our partnerships team will reach out within 2 working days on {form.phone}.</p>
        {refCode && <RefCodeBadge code={refCode} label="Application code" />}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 md:px-6 md:py-16">
      <header className="text-center">
        <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-clay/15 text-clay">
          <Store className="h-7 w-7" />
        </div>
        <p className="mt-3 text-sm font-medium uppercase tracking-wider text-clay">Partner with MYDISA</p>
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl">List your millet product</h1>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">Farmers, SHGs, home bakers and millet brands — bring your products to thousands of MYDISA customers.</p>
      </header>

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        {[
          { icon: Handshake, title: "Fair pricing", body: "Transparent margins. You set your base price." },
          { icon: Truck, title: "Pan-India logistics", body: "We handle warehousing, packaging and shipping." },
          { icon: BadgeCheck, title: "Brand & QC support", body: "FSSAI guidance, lab testing and label design." },
        ].map((b) => (
          <div key={b.title} className="rounded-2xl border border-border bg-card p-5">
            <b.icon className="h-6 w-6 text-clay" />
            <h3 className="mt-3 font-display text-lg font-semibold text-foreground">{b.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{b.body}</p>
          </div>
        ))}
      </section>

      <form onSubmit={submit} className="mt-10 rounded-3xl border border-border bg-card p-6 md:p-8">
        <div className="flex items-center gap-2">
          <Package className="h-5 w-5 text-clay" />
          <h2 className="font-display text-xl font-semibold text-foreground">Tell us about your product</h2>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Field label="Business / brand name *">
            <input required value={form.business} onChange={(e) => setForm({ ...form, business: e.target.value })} className="input" />
          </Field>
          <Field label="Contact person *">
            <input required value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} className="input" />
          </Field>
          <Field label="Phone (10 digits) *">
            <input required inputMode="numeric" maxLength={10} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, "") })} className="input" />
          </Field>
          <Field label="Email">
            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input" />
          </Field>
          <Field label="City *">
            <input required value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="input" />
          </Field>
          <Field label="State *">
            <input required value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} className="input" />
          </Field>
          <Field label="Category *">
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="input">
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="Product name *">
            <input required value={form.product} onChange={(e) => setForm({ ...form, product: e.target.value })} className="input" placeholder="e.g. Ragi cookies 200g" />
          </Field>
          <Field label="Monthly capacity (kg / packs)">
            <input value={form.monthlyVolume} onChange={(e) => setForm({ ...form, monthlyVolume: e.target.value })} className="input" />
          </Field>
          <Field label="FSSAI license no.">
            <input value={form.fssai} onChange={(e) => setForm({ ...form, fssai: e.target.value })} className="input" />
          </Field>
          <Field label="Notes" full>
            <textarea rows={4} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="input" placeholder="Sourcing story, certifications, anything else..." />
          </Field>
        </div>

        <button type="submit" className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft">
          <Send className="h-4 w-4" /> Submit application
        </button>
      </form>

      <style>{`.input{ width:100%; border:1px solid var(--border); background:var(--background); color:var(--foreground); border-radius:0.75rem; padding:0.7rem 0.9rem; font-size:0.875rem; }`}</style>
    </div>
  );
}

function Field({ label, children, full }: { label: string; children: React.ReactNode; full?: boolean }) {
  return (
    <label className={`block ${full ? "md:col-span-2" : ""}`}>
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}
