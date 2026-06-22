import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { makeRefCode } from "../lib/reference-code";
import { RefCodeBadge } from "../components/RefCodeBadge";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Mydisa" },
      { name: "description", content: "Questions about our millet foods, bulk orders or wholesale? Send Mydisa a message and we'll reply within one business day." },
      { property: "og:title", content: "Contact — Mydisa" },
      { property: "og:description", content: "Get in touch with the Mydisa team about orders, wholesale or partnerships." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const contactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  topic: z.enum(["order", "wholesale", "partnership", "other"]),
  message: z.string().trim().min(10, "Tell us a bit more (10+ characters)").max(1000),
});

type FieldErrors = Partial<Record<keyof z.infer<typeof contactSchema>, string>>;

function ContactPage() {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "success">("idle");
  const [refCode, setRefCode] = useState<string | null>(null);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = contactSchema.safeParse({
      name: fd.get("name"),
      email: fd.get("email"),
      topic: fd.get("topic"),
      message: fd.get("message"),
    });
    if (!parsed.success) {
      const fieldErrors: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof FieldErrors;
        if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      setStatus("idle");
      return;
    }
    const code = makeRefCode("ENQ");
    try {
      const saved = JSON.parse(localStorage.getItem("mydisa_enquiries") || "[]");
      localStorage.setItem("mydisa_enquiries", JSON.stringify([{ id: code, at: Date.now(), ...parsed.data }, ...saved]));
    } catch {}
    setErrors({});
    setRefCode(code);
    setStatus("success");
    e.currentTarget.reset();
  };

  const inputCls =
    "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 transition-colors focus:border-clay focus:outline-none focus:ring-2 focus:ring-clay/30";

  return (
    <>
      <section className="border-b border-border/60 bg-gradient-to-b from-cream to-background">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <p className="text-sm font-medium uppercase tracking-wider text-clay">Contact</p>
          <h1 className="mt-3 max-w-3xl font-display text-5xl font-semibold tracking-tight text-foreground text-balance md:text-6xl">
            Let's talk millets.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            Questions about your order, bulk pricing, or stocking Mydisa in your store? Send us a note — we reply within one business day.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-5">
          {/* Info side */}
          <aside className="md:col-span-2">
            <div className="overflow-hidden rounded-3xl bg-gradient-warm p-8 text-cream shadow-warm">
              <h2 className="font-display text-2xl font-semibold">Reach us directly</h2>
              <p className="mt-3 text-sm text-cream/80">
                Prefer email or a phone call? Use the details below — our small team handles every message personally.
              </p>
              <dl className="mt-8 space-y-5 text-sm">
                <div>
                  <dt className="text-xs uppercase tracking-wider text-cream/70">Email</dt>
                  <dd className="mt-1"><a href="mailto:hello@mydisa.com" className="font-medium underline-offset-4 hover:underline">hello@mydisa.com</a></dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-cream/70">Phone</dt>
                  <dd className="mt-1"><a href="tel:+919884539288" className="font-medium underline-offset-4 hover:underline">+91 98845 39288</a></dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-cream/70">Hours</dt>
                  <dd className="mt-1">Open 24×7</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-cream/70">Mill & warehouse</dt>
                  <dd className="mt-1">Plot 14, Agro Park,<br />Bengaluru, Karnataka 560100</dd>
                </div>
              </dl>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-border bg-card p-5">
                <p className="font-display text-2xl font-semibold text-foreground">&lt; 24h</p>
                <p className="mt-1 text-xs text-muted-foreground">Reply time</p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-5">
                <p className="font-display text-2xl font-semibold text-foreground">30+</p>
                <p className="mt-1 text-xs text-muted-foreground">Cities served</p>
              </div>
            </div>
          </aside>

          {/* Form */}
          <div className="md:col-span-3">
            <form
              onSubmit={onSubmit}
              noValidate
              className="rounded-3xl border border-border bg-card p-8 shadow-soft md:p-10"
            >
              {status === "success" && (
                <div className="mb-6 rounded-xl border border-clay/30 bg-clay/10 px-4 py-3 text-center text-sm text-burgundy">
                  Thanks! Your message is on its way — we'll reply within one business day.
                  {refCode && <RefCodeBadge code={refCode} />}
                </div>
              )}

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-foreground">Your name</label>
                  <input id="name" name="name" type="text" maxLength={100} placeholder="Anika Sharma" className={inputCls} aria-invalid={!!errors.name} />
                  {errors.name && <p className="mt-1.5 text-xs text-destructive">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">Email</label>
                  <input id="email" name="email" type="email" maxLength={255} placeholder="you@example.com" className={inputCls} aria-invalid={!!errors.email} />
                  {errors.email && <p className="mt-1.5 text-xs text-destructive">{errors.email}</p>}
                </div>
              </div>

              <div className="mt-5">
                <label htmlFor="topic" className="mb-2 block text-sm font-medium text-foreground">What can we help with?</label>
                <select id="topic" name="topic" defaultValue="order" className={inputCls}>
                  <option value="order">Order or delivery question</option>
                  <option value="wholesale">Wholesale / bulk pricing</option>
                  <option value="partnership">Stockist or partnership</option>
                  <option value="other">Something else</option>
                </select>
              </div>

              <div className="mt-5">
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-foreground">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  maxLength={1000}
                  placeholder="Tell us what you'd like to know…"
                  className={inputCls + " resize-y"}
                  aria-invalid={!!errors.message}
                />
                {errors.message && <p className="mt-1.5 text-xs text-destructive">{errors.message}</p>}
              </div>

              <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
                <p className="text-xs text-muted-foreground">
                  By submitting, you agree to be contacted about your inquiry.
                </p>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3 text-sm font-medium text-primary-foreground shadow-warm transition-transform hover:scale-[1.03]"
                >
                  Send message →
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
