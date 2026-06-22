import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Handshake, Send, CheckCircle2, Store, MapPin, TrendingUp, Percent } from "lucide-react";
import { makeRefCode } from "../lib/reference-code";
import { RefCodeBadge } from "../components/RefCodeBadge";

export const Route = createFileRoute("/dealers")({
  head: () => ({
    meta: [
      { title: "Become a Dealer — MYDISA" },
      { name: "description", content: "Join the MYDISA dealer network. Stock our millet foods in your store, supermarket, or distribution channel. Attractive margins and marketing support." },
      { property: "og:title", content: "Become a Dealer — MYDISA" },
      { property: "og:description", content: "Stock MYDISA millet foods. Apply to become an authorized dealer or distributor." },
      { property: "og:url", content: "/dealers" },
    ],
    links: [{ rel: "canonical", href: "/dealers" }],
  }),
  component: DealersPage,
});

const TYPES = ["Retail store", "Supermarket / chain", "Distributor", "Online seller", "Hotel / restaurant / catering", "Institution / corporate"] as const;

const dealerSchema = z.object({
  business: z.string().trim().min(2, "Business name required").max(120),
  contact: z.string().trim().min(2, "Contact name required").max(80),
  phone: z.string().regex(/^\d{10}$/, "Enter a valid 10-digit phone"),
  email: z.string().trim().email("Invalid email").max(255).or(z.literal("")),
  type: z.enum(TYPES),
  city: z.string().trim().min(2, "City required").max(60),
  state: z.string().trim().min(2, "State required").max(60),
  pincode: z.string().regex(/^\d{6}$/, "Enter a 6-digit pincode"),
  gst: z.string().trim().max(20).or(z.literal("")),
  monthlyVolume: z.string().trim().max(60).or(z.literal("")),
  experience: z.string().trim().max(60).or(z.literal("")),
  notes: z.string().trim().max(600).or(z.literal("")),
});

type DealerForm = z.infer<typeof dealerSchema>;

const EMPTY: DealerForm = {
  business: "", contact: "", phone: "", email: "",
  type: TYPES[0], city: "", state: "", pincode: "",
  gst: "", monthlyVolume: "", experience: "", notes: "",
};

function DealersPage() {
  const [form, setForm] = useState<DealerForm>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof DealerForm, string>>>({});
  const [done, setDone] = useState(false);
  const [refCode, setRefCode] = useState<string | null>(null);

  function set<K extends keyof DealerForm>(k: K, v: DealerForm[K]) {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = dealerSchema.safeParse(form);
    if (!parsed.success) {
      const errs: Partial<Record<keyof DealerForm, string>> = {};
      for (const issue of parsed.error.issues) {
        const k = issue.path[0] as keyof DealerForm;
        if (k && !errs[k]) errs[k] = issue.message;
      }
      setErrors(errs);
      return;
    }
    const code = makeRefCode("DLR");
    try {
      const saved = JSON.parse(localStorage.getItem("mydisa_dealers") || "[]");
      localStorage.setItem("mydisa_dealers", JSON.stringify([{ id: code, at: Date.now(), ...parsed.data }, ...saved]));
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
        <p className="mt-3 text-muted-foreground">Thanks {form.contact}. Our dealer team will call you on {form.phone} within 2 working days.</p>
        {refCode && <RefCodeBadge code={refCode} label="Application code" />}
        <button onClick={() => { setDone(false); setRefCode(null); setForm(EMPTY); }} className="mt-6 rounded-full border border-border bg-background px-5 py-2 text-sm font-medium hover:bg-accent">
          Submit another
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 md:px-6 md:py-16">
      <header className="text-center">
        <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-burgundy/10 text-burgundy">
          <Handshake className="h-7 w-7" />
        </div>
        <p className="mt-3 text-sm font-medium uppercase tracking-wider text-burgundy">Dealer network</p>
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl">Become a MYDISA dealer</h1>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">Stock India's freshest millet foods in your store. Attractive margins, fast restocking, marketing support and a brand customers already trust.</p>
      </header>

      <section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: Percent, title: "Up to 28%", body: "Dealer margin" },
          { icon: TrendingUp, title: "₹0 onboarding", body: "No franchise fee" },
          { icon: Store, title: "100+ SKUs", body: "Grains, flours, snacks, RTE" },
          { icon: MapPin, title: "Pan-India", body: "48–72 hr restocking" },
        ].map((b) => (
          <div key={b.title} className="rounded-2xl border border-border bg-card p-5">
            <b.icon className="h-6 w-6 text-burgundy" />
            <p className="mt-3 font-display text-xl font-semibold text-foreground">{b.title}</p>
            <p className="text-sm text-muted-foreground">{b.body}</p>
          </div>
        ))}
      </section>

      <form onSubmit={submit} noValidate className="mt-10 rounded-3xl border border-border bg-card p-6 md:p-8">
        <h2 className="font-display text-xl font-semibold text-foreground">Dealer application</h2>
        <p className="mt-1 text-sm text-muted-foreground">Fields marked * are required.</p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Field label="Business name *" error={errors.business}>
            <input value={form.business} onChange={(e) => set("business", e.target.value)} maxLength={120} className="dealer-input" />
          </Field>
          <Field label="Contact person *" error={errors.contact}>
            <input value={form.contact} onChange={(e) => set("contact", e.target.value)} maxLength={80} className="dealer-input" />
          </Field>
          <Field label="Phone (10 digits) *" error={errors.phone}>
            <input inputMode="numeric" maxLength={10} value={form.phone} onChange={(e) => set("phone", e.target.value.replace(/\D/g, ""))} className="dealer-input" />
          </Field>
          <Field label="Email" error={errors.email}>
            <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} maxLength={255} className="dealer-input" />
          </Field>
          <Field label="Business type *" error={errors.type}>
            <select value={form.type} onChange={(e) => set("type", e.target.value as DealerForm["type"])} className="dealer-input">
              {TYPES.map((t) => <option key={t}>{t}</option>)}
            </select>
          </Field>
          <Field label="GST number">
            <input value={form.gst} onChange={(e) => set("gst", e.target.value.toUpperCase())} maxLength={20} className="dealer-input" />
          </Field>
          <Field label="City *" error={errors.city}>
            <input value={form.city} onChange={(e) => set("city", e.target.value)} maxLength={60} className="dealer-input" />
          </Field>
          <Field label="State *" error={errors.state}>
            <input value={form.state} onChange={(e) => set("state", e.target.value)} maxLength={60} className="dealer-input" />
          </Field>
          <Field label="Pincode *" error={errors.pincode}>
            <input inputMode="numeric" maxLength={6} value={form.pincode} onChange={(e) => set("pincode", e.target.value.replace(/\D/g, ""))} className="dealer-input" />
          </Field>
          <Field label="Expected monthly volume">
            <input value={form.monthlyVolume} onChange={(e) => set("monthlyVolume", e.target.value)} maxLength={60} placeholder="e.g. 500 kg / 200 packs" className="dealer-input" />
          </Field>
          <Field label="Years in retail / distribution">
            <input value={form.experience} onChange={(e) => set("experience", e.target.value)} maxLength={60} className="dealer-input" />
          </Field>
          <Field label="Anything else?" full error={errors.notes}>
            <textarea rows={4} value={form.notes} onChange={(e) => set("notes", e.target.value)} maxLength={600} placeholder="Existing brands stocked, store size, plans..." className="dealer-input" />
          </Field>
        </div>

        <button type="submit" className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft">
          <Send className="h-4 w-4" /> Submit application
        </button>
      </form>

      <style>{`.dealer-input{ width:100%; border:1px solid var(--border); background:var(--background); color:var(--foreground); border-radius:0.75rem; padding:0.7rem 0.9rem; font-size:0.875rem; outline:none; }
      .dealer-input:focus{ border-color: var(--primary); box-shadow: 0 0 0 3px color-mix(in oklab, var(--primary) 18%, transparent); }`}</style>
    </div>
  );
}

function Field({ label, children, full, error }: { label: string; children: React.ReactNode; full?: boolean; error?: string }) {
  return (
    <label className={`block ${full ? "md:col-span-2" : ""}`}>
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}
