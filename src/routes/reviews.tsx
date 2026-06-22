import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Star, Quote, Send } from "lucide-react";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Customer Reviews — MYDISA" },
      { name: "description", content: "Read what families, schools and corporates say about MYDISA millet foods, training and party orders. Share your own review." },
      { property: "og:title", content: "Customer Reviews — MYDISA" },
      { property: "og:description", content: "Real stories from MYDISA customers. Share your own review." },
      { property: "og:url", content: "/reviews" },
    ],
    links: [{ rel: "canonical", href: "/reviews" }],
  }),
  component: ReviewsPage,
});

type Review = { id: string; name: string; city: string; rating: number; text: string; at: number };

const SEED: Review[] = [
  { id: "s1", name: "Priya R.", city: "Chennai", rating: 5, text: "Ragi mudde mix is now a Sunday ritual at home. Kids ask for seconds!", at: Date.now() },
  { id: "s2", name: "Arun K.", city: "Bengaluru", rating: 5, text: "Ordered the corporate lunch box for our office offsite. 60 plates, on time, delicious.", at: Date.now() },
  { id: "s3", name: "Lakshmi SHG", city: "Madurai", rating: 5, text: "Mythili ma'am's training changed our group. We now run a small millet bakery.", at: Date.now() },
  { id: "s4", name: "Vikram S.", city: "Hyderabad", rating: 4, text: "Fresh, fragrant millet flour. Packaging is sturdy. Delivery in 2 days.", at: Date.now() },
];

const KEY = "mydisa_reviews";

function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>(SEED);
  const [form, setForm] = useState({ name: "", city: "", rating: 5, text: "" });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) || "[]") as Review[];
      if (saved.length) setReviews([...saved, ...SEED]);
    } catch {}
  }, []);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.text) return;
    const r: Review = { id: crypto.randomUUID(), name: form.name, city: form.city || "—", rating: form.rating, text: form.text, at: Date.now() };
    const next = [r, ...reviews];
    setReviews(next);
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) || "[]") as Review[];
      localStorage.setItem(KEY, JSON.stringify([r, ...saved]));
    } catch {}
    setForm({ name: "", city: "", rating: 5, text: "" });
    setSent(true);
    setTimeout(() => setSent(false), 2500);
  }

  const avg = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
      <header className="text-center">
        <p className="text-sm font-medium uppercase tracking-wider text-clay">⭐ Customer love</p>
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl">What our customers say</h1>
        <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2">
          <div className="flex">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />)}</div>
          <span className="text-sm font-semibold text-foreground">{avg} / 5</span>
          <span className="text-sm text-muted-foreground">from {reviews.length} reviews</span>
        </div>
      </header>

      <section className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((r) => (
          <article key={r.id} className="rounded-2xl border border-border bg-card p-6 shadow-soft/40">
            <Quote className="h-6 w-6 text-clay/60" />
            <p className="mt-3 text-sm leading-relaxed text-foreground">{r.text}</p>
            <div className="mt-4 flex items-center justify-between">
              <div>
                <p className="font-semibold text-foreground">{r.name}</p>
                <p className="text-xs text-muted-foreground">{r.city}</p>
              </div>
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < r.rating ? "fill-amber-500 text-amber-500" : "text-muted-foreground/30"}`} />
                ))}
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="mt-14 rounded-3xl border border-border bg-secondary/40 p-6 md:p-10">
        <h2 className="font-display text-2xl font-semibold text-foreground">Share your experience</h2>
        <p className="mt-2 text-sm text-muted-foreground">Tell us how MYDISA made a difference for you.</p>
        <form onSubmit={submit} className="mt-6 grid gap-4 md:grid-cols-2">
          <input className="rounded-xl border border-border bg-background px-4 py-3 text-sm" placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <input className="rounded-xl border border-border bg-background px-4 py-3 text-sm" placeholder="City" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
          <div className="md:col-span-2">
            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">Rating</p>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button type="button" key={n} onClick={() => setForm({ ...form, rating: n })} aria-label={`${n} stars`}>
                  <Star className={`h-7 w-7 ${n <= form.rating ? "fill-amber-500 text-amber-500" : "text-muted-foreground/30"}`} />
                </button>
              ))}
            </div>
          </div>
          <textarea className="rounded-xl border border-border bg-background px-4 py-3 text-sm md:col-span-2" rows={4} placeholder="Your review" value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} required />
          <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft md:col-span-2 md:w-fit">
            <Send className="h-4 w-4" /> {sent ? "Thank you!" : "Submit review"}
          </button>
        </form>
      </section>
    </div>
  );
}
