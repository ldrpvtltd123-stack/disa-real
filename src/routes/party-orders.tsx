import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";
import {
  UtensilsCrossed, Sparkles, Briefcase, Cake, Flower2, Cookie,
  Users, CalendarDays, MapPin, Phone, Mail, IndianRupee, Truck, Clock,
  type LucideIcon,
} from "lucide-react";
import { makeRefCode } from "../lib/reference-code";
import { RefCodeBadge } from "../components/RefCodeBadge";

export const Route = createFileRoute("/party-orders")({
  head: () => ({
    meta: [
      { title: "Party & Bulk Orders — Mydisa" },
      { name: "description", content: "Book bulk millet-based catering for weddings, birthdays, corporate events and pujas." },
      { property: "og:title", content: "Party & Bulk Orders — Mydisa" },
      { property: "og:description", content: "Millet-based party catering for events of every size." },
      { property: "og:url", content: "/party-orders" },
    ],
    links: [{ rel: "canonical", href: "/party-orders" }],
  }),
  component: PartyOrdersPage,
});

type Menu = { id: string; name: string; perPlate: number; Icon: LucideIcon; tone: string };

const MENUS: Menu[] = [
  { id: "millet-thali",  name: "Thali",         perPlate: 199, Icon: UtensilsCrossed, tone: "from-amber-100 to-amber-50 text-amber-700" },
  { id: "festive-feast", name: "Festive",       perPlate: 349, Icon: Sparkles,        tone: "from-rose-100 to-rose-50 text-rose-700" },
  { id: "corporate-box", name: "Corporate",     perPlate: 249, Icon: Briefcase,       tone: "from-sky-100 to-sky-50 text-sky-700" },
  { id: "kids-birthday", name: "Birthday",      perPlate: 179, Icon: Cake,            tone: "from-pink-100 to-pink-50 text-pink-700" },
  { id: "puja-prasadam", name: "Prasadam",      perPlate: 149, Icon: Flower2,         tone: "from-orange-100 to-orange-50 text-orange-700" },
  { id: "snack-platter", name: "Snacks",        perPlate: 99,  Icon: Cookie,          tone: "from-lime-100 to-lime-50 text-lime-700" },
];

const OCCASIONS = ["Wedding", "Birthday", "Corporate", "House Warming", "Puja", "Get-together", "Other"];
const STATES = [
  "Andhra Pradesh","Assam","Bihar","Chhattisgarh","Delhi","Goa","Gujarat","Haryana",
  "Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra",
  "Odisha","Punjab","Rajasthan","Tamil Nadu","Telangana","Uttar Pradesh","Uttarakhand","West Bengal",
];

const schema = z.object({
  name: z.string().trim().min(2, "Enter name").max(80),
  phone: z.string().trim().regex(/^[6-9]\d{9}$/, "10-digit mobile"),
  email: z.string().trim().email("Valid email").max(120),
  occasion: z.string().min(2),
  guests: z.coerce.number().int().min(20, "Min 20 guests").max(5000),
  eventDate: z.string().min(4, "Pick a date"),
  city: z.string().trim().min(2).max(60),
  state: z.string().trim().min(2),
  venue: z.string().trim().min(4, "Add venue").max(300),
});

function PartyOrdersPage() {
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [form, setForm] = useState({
    name: "", phone: "", email: "", occasion: "Wedding",
    guests: 50, eventDate: "", city: "", state: "Tamil Nadu", venue: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState<null | { id: string; estimate: number }>(null);

  const chosen = useMemo(() => MENUS.filter((m) => selected[m.id]), [selected]);
  const perPlate = chosen.reduce((s, m) => s + m.perPlate, 0);
  const estimate = perPlate * Number(form.guests || 0);
  const toggle = (id: string) => setSelected((s) => ({ ...s, [id]: !s[id] }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (chosen.length === 0) { setErrors({ menus: "Pick at least one menu." }); return; }
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const map: Record<string, string> = {};
      parsed.error.issues.forEach((i) => { map[i.path[0] as string] = i.message; });
      setErrors(map); return;
    }
    setErrors({});
    const id = makeRefCode("PTY");
    try {
      const existing = JSON.parse(localStorage.getItem("mydisa_party_orders") || "[]");
      existing.push({ id, at: new Date().toISOString(), menus: chosen, estimate, customer: parsed.data });
      localStorage.setItem("mydisa_party_orders", JSON.stringify(existing));
    } catch {}
    setDone({ id, estimate });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (done) {
    return (
      <section className="mx-auto max-w-md px-4 py-16 text-center">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-primary/10 text-3xl">🎉</div>
        <h1 className="mt-4 font-display text-2xl font-semibold">Inquiry sent!</h1>
        <p className="mt-2 text-sm">Estimate: <span className="font-semibold">₹{done.estimate.toLocaleString("en-IN")}</span></p>
        <RefCodeBadge code={done.id} label="Inquiry code" />
        <div className="mt-6 flex justify-center gap-2">
          <Link to="/" className="rounded-full border border-input px-4 py-2 text-sm">Home</Link>
          <button onClick={() => setDone(null)} className="rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground">New inquiry</button>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-12">
      <div className="text-center md:text-left md:max-w-2xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">Party Orders</p>
        <h1 className="mt-1 font-display text-2xl md:text-5xl font-semibold tracking-tight">
          Millet catering for every celebration
        </h1>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2">
        {[
          { Icon: Users, t: "20+ guests" },
          { Icon: Clock, t: "48 hrs notice" },
          { Icon: Truck, t: "PAN-India" },
        ].map(({ Icon, t }) => (
          <div key={t} className="flex flex-col items-center gap-1 rounded-xl border border-border/60 bg-card p-3 text-center">
            <Icon className="h-5 w-5 text-primary" />
            <div className="text-[11px] font-medium text-foreground sm:text-sm">{t}</div>
          </div>
        ))}
      </div>

      <form onSubmit={submit} className="mt-6 grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="space-y-6">
          <div className="rounded-2xl border border-border/60 bg-card p-4 md:p-6">
            <h2 className="font-display text-base font-semibold md:text-lg">Pick menus</h2>
            <div className="mt-3 grid grid-cols-3 gap-2 sm:gap-3">
              {MENUS.map((m) => {
                const on = !!selected[m.id];
                const Icon = m.Icon;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => toggle(m.id)}
                    className={`relative flex flex-col items-center gap-1.5 rounded-2xl border p-2.5 text-center transition ${on ? "border-primary ring-2 ring-primary/30 bg-primary/5" : "border-border/60 hover:bg-accent/40"}`}
                  >
                    <div className={`grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ${m.tone}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="text-xs font-medium text-foreground leading-tight">{m.name}</div>
                    <div className="inline-flex items-center text-[11px] font-semibold text-foreground">
                      <IndianRupee className="h-3 w-3" />{m.perPlate}
                    </div>
                    {on && <span className="absolute right-1.5 top-1.5 grid h-4 w-4 place-items-center rounded-full bg-primary text-[9px] text-primary-foreground">✓</span>}
                  </button>
                );
              })}
            </div>
            {errors.menus && <p className="mt-3 text-xs text-destructive">{errors.menus}</p>}
          </div>

          <div className="rounded-2xl border border-border/60 bg-card p-4 md:p-6">
            <h2 className="font-display text-base font-semibold md:text-lg">Event details</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <Field label="Name" Icon={Users} error={errors.name}>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} />
              </Field>
              <Field label="Mobile" Icon={Phone} error={errors.phone}>
                <input inputMode="numeric" maxLength={10} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputCls} />
              </Field>
              <Field label="Email" Icon={Mail} error={errors.email}>
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputCls} />
              </Field>
              <Field label="Occasion" Icon={Sparkles} error={errors.occasion}>
                <select value={form.occasion} onChange={(e) => setForm({ ...form, occasion: e.target.value })} className={inputCls}>
                  {OCCASIONS.map((o) => <option key={o}>{o}</option>)}
                </select>
              </Field>
              <Field label="Guests" Icon={Users} error={errors.guests}>
                <input type="number" min={20} max={5000} value={form.guests} onChange={(e) => setForm({ ...form, guests: Number(e.target.value) })} className={inputCls} />
              </Field>
              <Field label="Date" Icon={CalendarDays} error={errors.eventDate}>
                <input type="date" value={form.eventDate} onChange={(e) => setForm({ ...form, eventDate: e.target.value })} className={inputCls} />
              </Field>
              <Field label="City" Icon={MapPin} error={errors.city}>
                <input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className={inputCls} />
              </Field>
              <Field label="State" Icon={MapPin} error={errors.state}>
                <select value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} className={inputCls}>
                  {STATES.map((s) => <option key={s}>{s}</option>)}
                </select>
              </Field>
              <Field label="Venue" Icon={MapPin} error={errors.venue} className="sm:col-span-2">
                <textarea rows={2} value={form.venue} onChange={(e) => setForm({ ...form, venue: e.target.value })} className={inputCls} />
              </Field>
            </div>
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 self-start rounded-2xl border border-border/60 bg-secondary/40 p-4 md:p-6">
          <h2 className="font-display text-base font-semibold md:text-lg">Estimate</h2>
          {chosen.length === 0 ? (
            <p className="mt-3 text-xs text-muted-foreground">Pick menus above.</p>
          ) : (
            <ul className="mt-3 space-y-1.5 text-xs">
              {chosen.map((m) => (
                <li key={m.id} className="flex justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5"><m.Icon className="h-3.5 w-3.5 text-primary" />{m.name}</span>
                  <span className="font-medium">₹{m.perPlate}</span>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-4 space-y-1 border-t border-border/60 pt-3 text-xs">
            <div className="flex justify-between"><span className="text-muted-foreground">Per plate</span><span>₹{perPlate}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Guests</span><span>{form.guests || 0}</span></div>
            <div className="mt-2 flex justify-between text-base font-semibold"><span>Total</span><span>₹{estimate.toLocaleString("en-IN")}</span></div>
          </div>
          <button type="submit" className="mt-5 w-full rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-soft transition hover:opacity-95">
            Request quote
          </button>
        </aside>
      </form>
    </section>
  );
}

const inputCls =
  "w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20";

function Field({
  label, Icon, error, children, className = "",
}: { label: string; Icon: LucideIcon; error?: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={`block text-xs ${className}`}>
      <span className="mb-1 flex items-center gap-1.5 font-medium text-foreground">
        <Icon className="h-3.5 w-3.5 text-primary" />{label}
      </span>
      {children}
      {error && <span className="mt-1 block text-[11px] text-destructive">{error}</span>}
    </label>
  );
}
