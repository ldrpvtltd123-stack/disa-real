import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Globe2, Send, CheckCircle2, Ship, Package, ShieldCheck, Mail, Phone } from "lucide-react";
import { makeRefCode } from "../lib/reference-code";
import { RefCodeBadge } from "../components/RefCodeBadge";

export const Route = createFileRoute("/overseas")({
  head: () => ({
    meta: [
      { title: "Overseas Supply & Export Enquiry — MYDISA" },
      { name: "description", content: "Import MYDISA millet foods to your country. Wholesale export of ragi, jowar, bajra, foxtail millet, flours and ready-to-eat range. FSSAI certified, container-load shipments worldwide." },
      { property: "og:title", content: "Overseas Supply & Export Enquiry — MYDISA" },
      { property: "og:description", content: "Wholesale export of Indian millets and ready-to-eat foods. Submit an overseas supply enquiry." },
      { property: "og:url", content: "/overseas" },
    ],
    links: [{ rel: "canonical", href: "/overseas" }],
  }),
  component: OverseasPage,
});

const ROLES = ["Importer / Distributor", "Wholesaler", "Retail chain / Supermarket", "Indian grocery store", "Restaurant / HORECA", "Private label / Brand", "Other"] as const;
const INCOTERMS = ["FOB Chennai", "FOB Mumbai", "CIF (destination port)", "CFR", "EXW Bengaluru", "Door delivery (DDP)"] as const;

const schema = z.object({
  company: z.string().trim().min(2, "Company name required").max(120),
  contact: z.string().trim().min(2, "Contact name required").max(80),
  email: z.string().trim().email("Valid email required").max(255),
  phone: z.string().trim().min(6, "Include country code").max(20),
  country: z.string().trim().min(2, "Country required").max(60),
  city: z.string().trim().max(60).or(z.literal("")),
  port: z.string().trim().max(80).or(z.literal("")),
  role: z.enum(ROLES),
  incoterm: z.enum(INCOTERMS),
  products: z.string().trim().min(3, "Tell us what you need").max(400),
  volume: z.string().trim().max(80).or(z.literal("")),
  frequency: z.string().trim().max(60).or(z.literal("")),
  notes: z.string().trim().max(700).or(z.literal("")),
});

type Form = z.infer<typeof schema>;
const EMPTY: Form = {
  company: "", contact: "", email: "", phone: "",
  country: "", city: "", port: "",
  role: ROLES[0], incoterm: INCOTERMS[0],
  products: "", volume: "", frequency: "", notes: "",
};

function OverseasPage() {
  const [form, setForm] = useState<Form>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [done, setDone] = useState(false);
  const [refCode, setRefCode] = useState<string | null>(null);

  function set<K extends keyof Form>(k: K, v: Form[K]) {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const errs: Partial<Record<keyof Form, string>> = {};
      for (const issue of parsed.error.issues) {
        const k = issue.path[0] as keyof Form;
        if (k && !errs[k]) errs[k] = issue.message;
      }
      setErrors(errs);
      return;
    }
    const code = makeRefCode("EXP");
    try {
      const saved = JSON.parse(localStorage.getItem("mydisa_overseas") || "[]");
      localStorage.setItem("mydisa_overseas", JSON.stringify([{ id: code, at: Date.now(), ...parsed.data }, ...saved]));
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
        <h1 className="mt-5 font-display text-3xl font-semibold text-foreground">Enquiry received</h1>
        <p className="mt-3 text-muted-foreground">
          Thanks {form.contact}. Our export desk will reply to {form.email} within 1 working day (IST) with a price sheet and next steps.
        </p>
        {refCode && <RefCodeBadge code={refCode} label="Enquiry code" />}
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
          <Globe2 className="h-7 w-7" />
        </div>
        <p className="mt-3 text-sm font-medium uppercase tracking-wider text-burgundy">Overseas supply</p>
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
          Export enquiry — please contact our team
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          MYDISA exports Indian millets, flours, and ready-to-eat range to importers, retail chains and Indian grocery stores worldwide. Share your requirement below or write to us directly.
        </p>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-sm">
          <a href="mailto:export@mydisa.com" className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 hover:bg-accent">
            <Mail className="h-4 w-4" /> export@mydisa.com
          </a>
          <a href="tel:+919884539288" className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 hover:bg-accent">
            <Phone className="h-4 w-4" /> +91 98845 39288
          </a>
          <a href="https://wa.me/919884539288" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 font-medium text-primary-foreground">
            WhatsApp our export desk
          </a>
        </div>
      </header>

      <section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: Ship, title: "FCL & LCL", body: "Container & part-load shipments" },
          { icon: Package, title: "Private label", body: "Your brand on our products" },
          { icon: ShieldCheck, title: "FSSAI + APEDA", body: "Export documentation handled" },
          { icon: Globe2, title: "30+ countries", body: "USA, UK, EU, GCC, SG, AU, CA" },
        ].map((b) => (
          <div key={b.title} className="rounded-2xl border border-border bg-card p-5">
            <b.icon className="h-6 w-6 text-burgundy" />
            <p className="mt-3 font-display text-xl font-semibold text-foreground">{b.title}</p>
            <p className="text-sm text-muted-foreground">{b.body}</p>
          </div>
        ))}
      </section>

      <form onSubmit={submit} noValidate className="mt-10 rounded-3xl border border-border bg-card p-6 md:p-8">
        <h2 className="font-display text-xl font-semibold text-foreground">Overseas supply enquiry</h2>
        <p className="mt-1 text-sm text-muted-foreground">Fields marked * are required.</p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Field label="Company name *" error={errors.company}>
            <input value={form.company} onChange={(e) => set("company", e.target.value)} maxLength={120} className="ovs-input" />
          </Field>
          <Field label="Contact person *" error={errors.contact}>
            <input value={form.contact} onChange={(e) => set("contact", e.target.value)} maxLength={80} className="ovs-input" />
          </Field>
          <Field label="Email *" error={errors.email}>
            <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} maxLength={255} className="ovs-input" />
          </Field>
          <Field label="Phone / WhatsApp (with country code) *" error={errors.phone}>
            <input value={form.phone} onChange={(e) => set("phone", e.target.value)} maxLength={20} placeholder="+1 555 123 4567" className="ovs-input" />
          </Field>
          <Field label="Country *" error={errors.country}>
            <input value={form.country} onChange={(e) => set("country", e.target.value)} maxLength={60} className="ovs-input" />
          </Field>
          <Field label="City">
            <input value={form.city} onChange={(e) => set("city", e.target.value)} maxLength={60} className="ovs-input" />
          </Field>
          <Field label="Destination port (if known)">
            <input value={form.port} onChange={(e) => set("port", e.target.value)} maxLength={80} placeholder="e.g. Jebel Ali, Felixstowe, NY" className="ovs-input" />
          </Field>
          <Field label="Your role *" error={errors.role}>
            <select value={form.role} onChange={(e) => set("role", e.target.value as Form["role"])} className="ovs-input">
              {ROLES.map((r) => <option key={r}>{r}</option>)}
            </select>
          </Field>
          <Field label="Preferred incoterm *" error={errors.incoterm}>
            <select value={form.incoterm} onChange={(e) => set("incoterm", e.target.value as Form["incoterm"])} className="ovs-input">
              {INCOTERMS.map((r) => <option key={r}>{r}</option>)}
            </select>
          </Field>
          <Field label="Order frequency">
            <input value={form.frequency} onChange={(e) => set("frequency", e.target.value)} maxLength={60} placeholder="e.g. one-time, monthly, quarterly" className="ovs-input" />
          </Field>
          <Field label="Products & SKUs of interest *" full error={errors.products}>
            <textarea rows={3} value={form.products} onChange={(e) => set("products", e.target.value)} maxLength={400} placeholder="e.g. Ragi flour 1kg — 2000 packs, Foxtail millet 500g — 1500 packs, Multigrain dosa mix..." className="ovs-input" />
          </Field>
          <Field label="Expected volume" full>
            <input value={form.volume} onChange={(e) => set("volume", e.target.value)} maxLength={80} placeholder="e.g. 1 x 20ft FCL, 5 MT trial, mixed pallet" className="ovs-input" />
          </Field>
          <Field label="Anything else?" full error={errors.notes}>
            <textarea rows={4} value={form.notes} onChange={(e) => set("notes", e.target.value)} maxLength={700} placeholder="Labelling requirements, certifications needed (organic, halal, kosher), target landed price..." className="ovs-input" />
          </Field>
        </div>

        <button type="submit" className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft">
          <Send className="h-4 w-4" /> Send export enquiry
        </button>
      </form>

      <style>{`.ovs-input{ width:100%; border:1px solid var(--border); background:var(--background); color:var(--foreground); border-radius:0.75rem; padding:0.7rem 0.9rem; font-size:0.875rem; outline:none; }
      .ovs-input:focus{ border-color: var(--primary); box-shadow: 0 0 0 3px color-mix(in oklab, var(--primary) 18%, transparent); }`}</style>
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
