import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Link2, CheckCircle2 } from "lucide-react";
import { makeRefCode } from "../lib/reference-code";
import { RefCodeBadge } from "../components/RefCodeBadge";

const schema = z.object({
  siteName: z.string().min(2, "Site name is required"),
  siteUrl: z.string().url("Enter a valid URL (https://...)"),
  contactName: z.string().min(2, "Your name is required"),
  email: z.string().email("Enter a valid email"),
  niche: z.string().min(2, "Niche / category is required"),
  domainAuthority: z.string().optional(),
  monthlyTraffic: z.string().optional(),
  linkType: z.enum(["guest-post", "link-exchange", "resource-page", "sponsored", "other"]),
  proposedAnchor: z.string().min(2, "Proposed anchor text is required"),
  targetUrl: z.string().url("Enter a valid Mydisa URL you want to link to"),
  message: z.string().min(10, "Tell us a bit more (min 10 chars)"),
});

type FormData = z.infer<typeof schema>;

const STORAGE_KEY = "mydisa_backlinks";

export const Route = createFileRoute("/backlinks")({
  head: () => ({
    meta: [
      { title: "Backlink Partnership — Mydisa" },
      { name: "description", content: "Propose a backlink collaboration with Mydisa — guest posts, link exchanges, resource pages and sponsored placements." },
      { property: "og:title", content: "Backlink Partnership — Mydisa" },
      { property: "og:description", content: "Submit your site for a backlink collaboration with Mydisa." },
      { property: "og:url", content: "/backlinks" },
    ],
    links: [{ rel: "canonical", href: "/backlinks" }],
  }),
  component: BacklinksPage,
});

function BacklinksPage() {
  const [data, setData] = useState<Partial<FormData>>({ linkType: "guest-post", targetUrl: "https://mydisa.com/" });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [refCode, setRefCode] = useState<string | null>(null);

  const set = <K extends keyof FormData>(k: K, v: FormData[K]) => setData((d) => ({ ...d, [k]: v }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const errs: Partial<Record<keyof FormData, string>> = {};
      for (const issue of parsed.error.issues) {
        errs[issue.path[0] as keyof FormData] = issue.message;
      }
      setErrors(errs);
      return;
    }
    setErrors({});
    const code = makeRefCode("BLK");
    try {
      const list = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
      list.push({ id: code, createdAt: new Date().toISOString(), ...parsed.data });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch {}
    setRefCode(code);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-20 text-center">
        <CheckCircle2 className="mx-auto h-14 w-14 text-primary" />
        <h1 className="mt-4 font-display text-3xl font-semibold text-foreground">Pitch received</h1>
        <p className="mt-2 text-muted-foreground">
          Thanks for reaching out. Our content team reviews backlink proposals weekly and will reply if it's a fit.
        </p>
        {refCode && <RefCodeBadge code={refCode} label="Pitch code" />}
        <div className="mt-6">
          <button
            onClick={() => { setSubmitted(false); setRefCode(null); setData({ linkType: "guest-post", targetUrl: "https://mydisa.com/" }); }}
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
          >
            Submit another
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-12 md:py-16">
      <header className="mb-8 text-center">
        <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Link2 className="h-6 w-6" />
        </div>
        <h1 className="mt-3 font-display text-3xl font-semibold text-foreground md:text-4xl">Backlink partnership</h1>
        <p className="mt-2 text-muted-foreground">
          Run a food, wellness or lifestyle site? Pitch a guest post, link exchange, or sponsored placement.
        </p>
      </header>

      <form onSubmit={onSubmit} className="grid gap-4 rounded-2xl border border-border bg-card p-6 shadow-soft md:grid-cols-2">
        <Field label="Site name" error={errors.siteName}>
          <input value={data.siteName ?? ""} onChange={(e) => set("siteName", e.target.value)} className="input" placeholder="The Millet Times" />
        </Field>
        <Field label="Site URL" error={errors.siteUrl}>
          <input value={data.siteUrl ?? ""} onChange={(e) => set("siteUrl", e.target.value)} className="input" placeholder="https://example.com" />
        </Field>
        <Field label="Your name" error={errors.contactName}>
          <input value={data.contactName ?? ""} onChange={(e) => set("contactName", e.target.value)} className="input" placeholder="Priya Iyer" />
        </Field>
        <Field label="Email" error={errors.email}>
          <input type="email" value={data.email ?? ""} onChange={(e) => set("email", e.target.value)} className="input" placeholder="you@example.com" />
        </Field>
        <Field label="Niche / category" error={errors.niche}>
          <input value={data.niche ?? ""} onChange={(e) => set("niche", e.target.value)} className="input" placeholder="Healthy food blog" />
        </Field>
        <Field label="Link type" error={errors.linkType}>
          <select value={data.linkType ?? "guest-post"} onChange={(e) => set("linkType", e.target.value as FormData["linkType"])} className="input">
            <option value="guest-post">Guest post</option>
            <option value="link-exchange">Link exchange</option>
            <option value="resource-page">Resource page</option>
            <option value="sponsored">Sponsored</option>
            <option value="other">Other</option>
          </select>
        </Field>
        <Field label="Domain authority (optional)">
          <input value={data.domainAuthority ?? ""} onChange={(e) => set("domainAuthority", e.target.value)} className="input" placeholder="DA 42" />
        </Field>
        <Field label="Monthly traffic (optional)">
          <input value={data.monthlyTraffic ?? ""} onChange={(e) => set("monthlyTraffic", e.target.value)} className="input" placeholder="25k visits / mo" />
        </Field>
        <Field label="Proposed anchor text" error={errors.proposedAnchor}>
          <input value={data.proposedAnchor ?? ""} onChange={(e) => set("proposedAnchor", e.target.value)} className="input" placeholder="organic millet flour" />
        </Field>
        <Field label="Target Mydisa URL" error={errors.targetUrl}>
          <input value={data.targetUrl ?? ""} onChange={(e) => set("targetUrl", e.target.value)} className="input" placeholder="https://mydisa.com/products" />
        </Field>
        <Field label="Pitch / message" error={errors.message} full>
          <textarea
            rows={5}
            value={data.message ?? ""}
            onChange={(e) => set("message", e.target.value)}
            className="input"
            placeholder="Briefly describe the article topic, audience, and what you're proposing."
          />
        </Field>

        <div className="md:col-span-2 flex justify-end">
          <button type="submit" className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground shadow-soft hover:scale-[1.02] transition-transform">
            Submit pitch
          </button>
        </div>
      </form>

      <style>{`
        .input { width: 100%; border-radius: 0.6rem; border: 1px solid hsl(var(--border)); background: hsl(var(--background)); padding: 0.6rem 0.75rem; font-size: 0.875rem; color: hsl(var(--foreground)); outline: none; }
        .input:focus { border-color: hsl(var(--primary)); box-shadow: 0 0 0 3px hsl(var(--primary) / 0.15); }
      `}</style>
    </main>
  );
}

function Field({ label, error, full, children }: { label: string; error?: string; full?: boolean; children: React.ReactNode }) {
  return (
    <label className={`flex flex-col gap-1.5 ${full ? "md:col-span-2" : ""}`}>
      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</span>
      {children}
      {error && <span className="text-xs text-destructive">{error}</span>}
    </label>
  );
}
