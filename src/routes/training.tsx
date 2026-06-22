import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import {
  ChefHat, Cookie, Rocket, Users2, GraduationCap, Building2,
  User, Phone, Mail, MapPin, CalendarDays, Monitor, IndianRupee,
  type LucideIcon,
} from "lucide-react";
import { makeRefCode } from "../lib/reference-code";
import { RefCodeBadge } from "../components/RefCodeBadge";

export const Route = createFileRoute("/training")({
  head: () => ({
    meta: [
      { title: "Millet Training & Workshops — Mydisa" },
      { name: "description", content: "Hands-on millet cooking, baking and entrepreneurship training by Mydisa." },
      { property: "og:title", content: "Millet Training & Workshops — Mydisa" },
      { property: "og:description", content: "Learn millet cooking, baking and small-business setup with Mydisa." },
      { property: "og:url", content: "/training" },
    ],
    links: [{ rel: "canonical", href: "/training" }],
  }),
  component: TrainingPage,
});

type Program = { id: string; name: string; price: number; duration: string; Icon: LucideIcon; tone: string };

const PROGRAMS: Program[] = [
  { id: "home-cook",    name: "Home Cooking",  price: 1499,  duration: "1 day",   Icon: ChefHat,       tone: "from-amber-100 to-amber-50 text-amber-700" },
  { id: "baking",       name: "Baking",        price: 3999,  duration: "2 days",  Icon: Cookie,        tone: "from-rose-100 to-rose-50 text-rose-700" },
  { id: "entrepreneur", name: "Entrepreneur",  price: 9999,  duration: "5 days",  Icon: Rocket,        tone: "from-sky-100 to-sky-50 text-sky-700" },
  { id: "shg",          name: "SHG Group",     price: 0,     duration: "3 days",  Icon: Users2,        tone: "from-emerald-100 to-emerald-50 text-emerald-700" },
  { id: "schools",      name: "School / College", price: 499, duration: "½ day",  Icon: GraduationCap, tone: "from-violet-100 to-violet-50 text-violet-700" },
  { id: "corporate",    name: "Corporate",     price: 14999, duration: "3 hrs",   Icon: Building2,     tone: "from-orange-100 to-orange-50 text-orange-700" },
];

const schema = z.object({
  name: z.string().trim().min(2, "Enter name").max(80),
  phone: z.string().trim().regex(/^[6-9]\d{9}$/, "10-digit mobile"),
  email: z.string().trim().email("Valid email").max(120),
  city: z.string().trim().min(2).max(60),
  mode: z.enum(["online", "onsite"]),
  participants: z.coerce.number().int().min(1).max(200),
  preferredDate: z.string().min(4, "Pick a date"),
});

function TrainingPage() {
  const [picked, setPicked] = useState<string>("home-cook");
  const [form, setForm] = useState({
    name: "", phone: "", email: "", city: "",
    mode: "online" as "online" | "onsite",
    participants: 1, preferredDate: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState<null | { id: string; program: string }>(null);

  const program = PROGRAMS.find((p) => p.id === picked)!;
  const total = program.price === 0 ? 0 : program.price * Number(form.participants || 0);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const map: Record<string, string> = {};
      parsed.error.issues.forEach((i) => { map[i.path[0] as string] = i.message; });
      setErrors(map); return;
    }
    setErrors({});
    const id = makeRefCode("TRN");
    try {
      const existing = JSON.parse(localStorage.getItem("mydisa_training") || "[]");
      existing.push({ id, at: new Date().toISOString(), program: program.id, customer: parsed.data });
      localStorage.setItem("mydisa_training", JSON.stringify(existing));
    } catch {}
    setDone({ id, program: program.name });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (done) {
    return (
      <section className="mx-auto max-w-md px-4 py-16 text-center">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-primary/10 text-3xl">🎓</div>
        <h1 className="mt-4 font-display text-2xl font-semibold">Enrolled!</h1>
        <p className="mt-1 text-sm">Program: <span className="font-semibold">{done.program}</span></p>
        <RefCodeBadge code={done.id} label="Enrolment code" />
        <div className="mt-6 flex justify-center gap-2">
          <Link to="/" className="rounded-full border border-input px-4 py-2 text-sm">Home</Link>
          <button onClick={() => setDone(null)} className="rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground">New enrolment</button>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-12">
      <div className="text-center md:text-left md:max-w-2xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">Training</p>
        <h1 className="mt-1 font-display text-2xl md:text-5xl font-semibold tracking-tight">
          Learn the magic of millets
        </h1>
      </div>

      <div className="mt-5 grid grid-cols-4 gap-2">
        {[
          { Icon: Users2, t: "500+" },
          { Icon: MapPin, t: "20+ cities" },
          { Icon: GraduationCap, t: "6 programs" },
          { Icon: Building2, t: "FSSAI" },
        ].map(({ Icon, t }) => (
          <div key={t} className="flex flex-col items-center gap-1 rounded-xl border border-border/60 bg-card p-2.5 text-center">
            <Icon className="h-5 w-5 text-primary" />
            <div className="text-[11px] font-semibold text-foreground sm:text-sm">{t}</div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <h2 className="font-display text-base font-semibold md:text-lg">Choose a program</h2>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
          {PROGRAMS.map((p) => {
            const on = picked === p.id;
            const Icon = p.Icon;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setPicked(p.id)}
                className={`relative flex flex-col items-center gap-2 rounded-2xl border p-3 text-center transition ${on ? "border-primary ring-2 ring-primary/30 bg-primary/5" : "border-border/60 bg-card hover:bg-accent/40"}`}
              >
                <div className={`grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${p.tone}`}>
                  <Icon className="h-7 w-7" />
                </div>
                <div className="text-sm font-medium text-foreground leading-tight">{p.name}</div>
                <div className="text-[11px] text-muted-foreground">{p.duration}</div>
                <div className="inline-flex items-center text-xs font-semibold text-foreground">
                  {p.price === 0 ? "On request" : <><IndianRupee className="h-3 w-3" />{p.price.toLocaleString("en-IN")}</>}
                </div>
                {on && <span className="absolute right-2 top-2 grid h-5 w-5 place-items-center rounded-full bg-primary text-[10px] text-primary-foreground">✓</span>}
              </button>
            );
          })}
        </div>
      </div>

      <form onSubmit={submit} className="mt-8 grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="rounded-2xl border border-border/60 bg-card p-4 md:p-6">
          <h2 className="font-display text-base font-semibold md:text-lg">Your details</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <Field label="Name" Icon={User} error={errors.name}>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} />
            </Field>
            <Field label="Mobile" Icon={Phone} error={errors.phone}>
              <input inputMode="numeric" maxLength={10} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputCls} />
            </Field>
            <Field label="Email" Icon={Mail} error={errors.email}>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputCls} />
            </Field>
            <Field label="City" Icon={MapPin} error={errors.city}>
              <input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className={inputCls} />
            </Field>
            <Field label="Mode" Icon={Monitor} error={errors.mode}>
              <select value={form.mode} onChange={(e) => setForm({ ...form, mode: e.target.value as "online" | "onsite" })} className={inputCls}>
                <option value="online">Online</option>
                <option value="onsite">On-site</option>
              </select>
            </Field>
            <Field label="Participants" Icon={Users2} error={errors.participants}>
              <input type="number" min={1} max={200} value={form.participants} onChange={(e) => setForm({ ...form, participants: Number(e.target.value) })} className={inputCls} />
            </Field>
            <Field label="Preferred date" Icon={CalendarDays} error={errors.preferredDate} className="sm:col-span-2">
              <input type="date" value={form.preferredDate} onChange={(e) => setForm({ ...form, preferredDate: e.target.value })} className={inputCls} />
            </Field>
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 self-start rounded-2xl border border-border/60 bg-secondary/40 p-4 md:p-6">
          <h2 className="font-display text-base font-semibold md:text-lg">Summary</h2>
          <div className="mt-3 flex items-center gap-3">
            <div className={`grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ${program.tone}`}>
              <program.Icon className="h-6 w-6" />
            </div>
            <div>
              <div className="text-sm font-semibold text-foreground">{program.name}</div>
              <div className="text-[11px] text-muted-foreground">{program.duration}</div>
            </div>
          </div>
          <dl className="mt-4 space-y-1 border-t border-border/60 pt-3 text-xs">
            <div className="flex justify-between"><dt className="text-muted-foreground">Participants</dt><dd>{form.participants || 0}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Mode</dt><dd className="capitalize">{form.mode}</dd></div>
            <div className="mt-2 flex justify-between text-base font-semibold">
              <dt>Fee</dt>
              <dd>{program.price === 0 ? "On request" : `₹${total.toLocaleString("en-IN")}`}</dd>
            </div>
          </dl>
          <button type="submit" className="mt-5 w-full rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-soft transition hover:opacity-95">
            Enrol now
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
