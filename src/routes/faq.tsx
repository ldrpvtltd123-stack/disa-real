import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, HelpCircle, MessageSquare } from "lucide-react";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — MYDISA" },
      { name: "description", content: "Frequently asked questions about MYDISA millet products, delivery, party orders, training and bulk supply." },
      { property: "og:title", content: "FAQ — MYDISA" },
      { property: "og:description", content: "Answers to common questions about MYDISA." },
      { property: "og:url", content: "/faq" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
  }),
  component: FaqPage,
});

const FAQS: { q: string; a: string; cat: string }[] = [
  { cat: "Orders", q: "How do I place an order?", a: "Go to the Order page, pick your products and quantities, fill in delivery details and submit. We'll confirm on WhatsApp within an hour." },
  { cat: "Orders", q: "What is the minimum order value?", a: "₹299 for home delivery. No minimum for store pickup." },
  { cat: "Delivery", q: "Which cities do you deliver to?", a: "Same-day in Chennai, next-day in Bengaluru/Hyderabad/Coimbatore/Madurai, and 2–5 days across the rest of India." },
  { cat: "Delivery", q: "Do you charge for shipping?", a: "Free shipping on orders above ₹599. Below that, ₹49 within Tamil Nadu and ₹79 pan-India." },
  { cat: "Products", q: "Are your millets organic?", a: "All our grains are sourced from small farms practicing natural and chemical-free cultivation. Select SKUs carry the India Organic certification." },
  { cat: "Products", q: "Are millets gluten-free?", a: "Yes — jowar, bajra, ragi, foxtail, kodo, little, proso and barnyard millets are all naturally gluten-free." },
  { cat: "Party Orders", q: "How many days notice for a party order?", a: "We recommend 5 days for menus under 100 plates and 10 days for larger events." },
  { cat: "Party Orders", q: "Do you handle puja prasadam?", a: "Yes, our Puja Prasadam menu is sattvic, onion-and-garlic free, prepared in a separate kitchen line." },
  { cat: "Training", q: "Who can attend the training programs?", a: "Anyone — homemakers, students, SHGs, entrepreneurs and corporates. Beginner to advanced tracks available." },
  { cat: "Training", q: "Do you offer online training?", a: "Yes. Most cooking and entrepreneur programs are available both in-person (Chennai) and online (Zoom)." },
  { cat: "Wholesale", q: "Can I sell MYDISA products in my store?", a: "Absolutely. Visit our Sell with us page to apply as a stockist or list your own millet products with us." },
];

function FaqPage() {
  const cats = Array.from(new Set(FAQS.map((f) => f.cat)));
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [activeCat, setActiveCat] = useState<string>("All");
  const list = activeCat === "All" ? FAQS : FAQS.filter((f) => f.cat === activeCat);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 md:px-6 md:py-16">
      <header className="text-center">
        <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <HelpCircle className="h-7 w-7" />
        </div>
        <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl">Frequently asked questions</h1>
        <p className="mt-3 text-muted-foreground">Quick answers about orders, delivery, party menus and training.</p>
      </header>

      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {["All", ...cats].map((c) => (
          <button
            key={c}
            onClick={() => { setActiveCat(c); setOpenIdx(null); }}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              activeCat === c ? "bg-primary text-primary-foreground" : "border border-border bg-background text-foreground hover:bg-accent"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <section className="mt-8 space-y-3">
        {list.map((f, i) => {
          const open = openIdx === i;
          return (
            <div key={f.q} className="overflow-hidden rounded-2xl border border-border bg-card">
              <button
                onClick={() => setOpenIdx(open ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                aria-expanded={open}
              >
                <span className="font-medium text-foreground">{f.q}</span>
                <ChevronDown className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
              </button>
              {open && <div className="border-t border-border px-5 py-4 text-sm leading-relaxed text-muted-foreground">{f.a}</div>}
            </div>
          );
        })}
      </section>

      <div className="mt-12 rounded-3xl border border-clay/30 bg-gradient-warm p-8 text-cream">
        <h2 className="font-display text-2xl font-semibold">Still have a question?</h2>
        <p className="mt-2 text-cream/85">Share a suggestion or chat with us on WhatsApp.</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link to="/suggestions" className="inline-flex items-center gap-2 rounded-full bg-cream px-5 py-2.5 text-sm font-semibold text-burgundy">
            <MessageSquare className="h-4 w-4" /> Send suggestion
          </Link>
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-cream/50 px-5 py-2.5 text-sm font-semibold text-cream">
            Contact us
          </Link>
        </div>
      </div>
    </div>
  );
}
