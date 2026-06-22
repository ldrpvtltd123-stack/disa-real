import { createFileRoute } from "@tanstack/react-router";
import grainsImg from "@/assets/product-grains.jpg";
import cookiesImg from "@/assets/product-cookies.jpg";
import porridgeImg from "@/assets/product-porridge.jpg";
import flourImg from "@/assets/product-flour.jpg";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products — Mydisa Millet Foods" },
      { name: "description", content: "Browse Mydisa's range of millet grains, stone-milled flours, healthy snacks and breakfast mixes — farm-fresh, naturally gluten-free." },
      { property: "og:title", content: "Products — Mydisa Millet Foods" },
      { property: "og:description", content: "Browse millet grains, flours, snacks and breakfast mixes — farm-fresh and naturally gluten-free." },
      { property: "og:url", content: "/products" },
    ],
    links: [{ rel: "canonical", href: "/products" }],
  }),
  component: ProductsPage,
});

type Product = {
  name: string;
  tagline: string;
  price: string;
  weight: string;
  image: string;
  tag: string;
  category: "Grains" | "Flours" | "Snacks" | "Breakfast";
};

const products: Product[] = [
  { name: "Foxtail Millet", tagline: "Light, nutty and quick-cooking. Perfect rice substitute.", price: "₹220", weight: "1 kg", image: grainsImg, tag: "Bestseller", category: "Grains" },
  { name: "Pearl Millet (Bajra)", tagline: "Warming whole grain for hearty rotis and porridge.", price: "₹180", weight: "1 kg", image: grainsImg, tag: "New season", category: "Grains" },
  { name: "Finger Millet (Ragi)", tagline: "Iron-rich heritage grain. Great for kids and elders.", price: "₹190", weight: "1 kg", image: grainsImg, tag: "Iron-rich", category: "Grains" },
  { name: "Kodo Millet", tagline: "Ancient grain with a delicate, earthy flavour.", price: "₹240", weight: "1 kg", image: grainsImg, tag: "Limited", category: "Grains" },
  { name: "Ragi Flour", tagline: "Stone-milled within 7 days of order. Fresh, never bitter.", price: "₹160", weight: "1 kg", image: flourImg, tag: "Stone-milled", category: "Flours" },
  { name: "Multi-Millet Atta", tagline: "Five-millet blend for softer, healthier rotis.", price: "₹210", weight: "1 kg", image: flourImg, tag: "Family pack", category: "Flours" },
  { name: "Millet Jaggery Cookies", tagline: "Baked with ragi, oats and jaggery. Zero refined sugar.", price: "₹150", weight: "200 g", image: cookiesImg, tag: "Kids favourite", category: "Snacks" },
  { name: "Roasted Millet Munchies", tagline: "Crunchy, savoury, gut-friendly. Office-drawer hero.", price: "₹120", weight: "150 g", image: cookiesImg, tag: "Snack pack", category: "Snacks" },
  { name: "Ragi Breakfast Porridge", tagline: "Just add hot milk. Ready in 60 seconds.", price: "₹260", weight: "400 g", image: porridgeImg, tag: "Quick", category: "Breakfast" },
  { name: "Millet Muesli", tagline: "Toasted millets, nuts, dried fruit. No added sugar.", price: "₹320", weight: "400 g", image: porridgeImg, tag: "No sugar", category: "Breakfast" },
];

const categories = ["All", "Grains", "Flours", "Snacks", "Breakfast"] as const;

function ProductsPage() {
  return (
    <>
      <section className="border-b border-border/60 bg-gradient-to-b from-cream to-background">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <p className="text-sm font-medium uppercase tracking-wider text-clay">Our products</p>
          <h1 className="mt-3 max-w-3xl font-display text-5xl font-semibold tracking-tight text-foreground text-balance md:text-6xl">
            Every millet, milled fresh, delivered to your door.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            Ten staples we make and ship across India. Every pack is traceable to the farm and lab-tested for purity.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {categories.map((c, i) => (
              <button
                key={c}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  i === 0
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-background text-foreground hover:bg-secondary"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <article
              key={p.name}
              className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-all hover:-translate-y-1 hover:shadow-warm"
            >
              <div className="relative aspect-square overflow-hidden bg-secondary">
                <img
                  src={p.image}
                  alt={p.name}
                  width={800}
                  height={800}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-full bg-cream/95 px-3 py-1 text-xs font-medium text-burgundy">
                  {p.tag}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-xs font-medium uppercase tracking-wider text-clay">{p.category}</p>
                <h3 className="mt-2 font-display text-xl font-semibold text-foreground">{p.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{p.tagline}</p>
                <div className="mt-5 flex items-end justify-between">
                  <div>
                    <p className="font-display text-2xl font-semibold text-foreground">{p.price}</p>
                    <p className="text-xs text-muted-foreground">{p.weight}</p>
                  </div>
                  <button className="rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground transition-transform hover:scale-[1.05]">
                    Add to cart
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-gradient-warm py-20 text-cream">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
            Not sure where to start?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-cream/85">
            Try the Mydisa Starter Bundle — three grains, one flour, one breakfast mix. Free shipping, full refund if you don't love it.
          </p>
          <a
            href="mailto:hello@mydisa.com"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-cream px-7 py-3.5 text-sm font-semibold text-burgundy shadow-warm transition-transform hover:scale-[1.03]"
          >
            Order the bundle →
          </a>
        </div>
      </section>
    </>
  );
}
