import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero-millet.jpg";
import grainsImg from "@/assets/product-grains.jpg";
import cookiesImg from "@/assets/product-cookies.jpg";
import porridgeImg from "@/assets/product-porridge.jpg";
import flourImg from "@/assets/product-flour.jpg";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mydisa — Millet Foods Delivered in Bengaluru & Across India" },
      { name: "description", content: "Order farm-fresh millet grains, flours, snacks & breakfast bowls online. Same-week delivery in Bengaluru and pan-India shipping. Lab-tested, FSSAI certified." },
      { property: "og:title", content: "Mydisa — Millet Foods Delivered in Bengaluru & Across India" },
      { property: "og:description", content: "Farm-fresh millet grains, flours, snacks and breakfast bowls. Same-week delivery in Bengaluru, pan-India shipping." },
      { property: "og:url", content: "/" },
      { property: "og:image", content: heroImg },
      { name: "twitter:image", content: heroImg },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  const { t } = useI18n();
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-cream via-background to-secondary/40" />
        <div className="mx-auto grid max-w-7xl gap-12 px-6 pb-20 pt-16 md:grid-cols-2 md:gap-8 md:pt-24 lg:pt-32">
          <div className="flex flex-col justify-center">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-clay/30 bg-clay/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-clay">
              <span className="h-1.5 w-1.5 rounded-full bg-amber" />
              {t("hero_eyebrow")}
            </span>
            <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-foreground text-balance sm:text-5xl md:text-6xl lg:text-7xl">
              {t("hero_title_1")}{" "}
              <span className="bg-gradient-warm bg-clip-text text-transparent">{t("hero_title_2")}</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
              {t("hero_sub")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/products"
                className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-warm transition-transform hover:scale-[1.03]"
              >
                {t("hero_explore")}
              </Link>
              <a
                href="#story"
                className="inline-flex items-center justify-center rounded-full border border-border bg-background px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                {t("hero_story")}
              </a>
            </div>
            <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-border/60 pt-8">
              <div>
                <dt className="text-xs uppercase tracking-wider text-muted-foreground">{t("stat_farms")}</dt>
                <dd className="mt-1 font-display text-2xl font-semibold text-foreground">120+</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-muted-foreground">{t("stat_varieties")}</dt>
                <dd className="mt-1 font-display text-2xl font-semibold text-foreground">9</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-muted-foreground">{t("stat_cities")}</dt>
                <dd className="mt-1 font-display text-2xl font-semibold text-foreground">30+</dd>
              </div>
            </dl>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-warm opacity-20 blur-3xl" />
            <div className="overflow-hidden rounded-[2rem] border border-border shadow-warm">
              <img
                src={heroImg}
                alt="Golden millet grains spilling from a linen sack with millet porridge and flour"
                width={1536}
                height={1280}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-border bg-card p-4 shadow-soft md:block">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-gold text-burgundy font-display font-bold">✓</div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Lab-tested fresh</p>
                  <p className="text-xs text-muted-foreground">Milled within 7 days</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP — what a first-time visitor needs to feel in 5 seconds */}
      <section className="border-y border-border/60 bg-cream/60">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <ul className="grid grid-cols-2 gap-6 text-center md:grid-cols-5">
            {[
              { icon: "🛡️", title: "FSSAI Certified", body: "Lic. food safety" },
              { icon: "🌾", title: "100% Natural", body: "Zero preservatives" },
              { icon: "🚚", title: "Free Shipping", body: "On orders ₹599+" },
              { icon: "⏱️", title: "Milled Fresh", body: "Within 7 days" },
              { icon: "⭐", title: "10,000+ Families", body: "Across India" },
            ].map((b) => (
              <li key={b.title} className="flex flex-col items-center gap-1">
                <span className="text-2xl" aria-hidden>{b.icon}</span>
                <p className="font-display text-sm font-semibold text-foreground">{b.title}</p>
                <p className="text-xs text-muted-foreground">{b.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* WHAT VISITORS WANT TO KNOW FIRST */}
      <section className="bg-background py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium uppercase tracking-wider text-clay">First time here?</p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              Everything you're probably wondering — answered.
            </h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              { q: "Is it really fresh?", a: "Yes. We mill in small batches and dispatch within 7 days. You can smell the difference the moment you open the pack.", label: "See our process", href: "/#story" },
              { q: "How do I order?", a: "Browse products, fill a short order form, and we confirm by phone/WhatsApp. Pay-on-delivery available in Bengaluru.", label: "Order now", href: "/order" },
              { q: "Will my family like the taste?", a: "Our customers say our food tastes like grandma's kitchen — nutty, comforting, never bland. Try a small pack first.", label: "Read reviews", href: "/reviews" },
              { q: "Do you deliver to my city?", a: "Same-week delivery across Bengaluru and 3–5 day shipping pan-India through trusted courier partners.", label: "Check delivery", href: "/contact" },
              { q: "Is it safe for diabetics & kids?", a: "Millets are naturally low-GI, high-fibre and gluten-free. We share age-friendly recipes — but please consult your doctor for medical advice.", label: "Read FAQ", href: "/faq" },
              { q: "Can I buy in bulk or stock it?", a: "Absolutely. Dealers, party caterers, schools and overseas importers — we have plans for all of you.", label: "Talk to us", href: "/dealers" },
            ].map((item) => (
              <article key={item.q} className="rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-soft">
                <h3 className="font-display text-lg font-semibold text-foreground">{item.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
                <Link to={item.href as string} className="mt-4 inline-flex text-sm font-medium text-primary hover:underline">
                  {item.label} →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* BENTO GRID */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-12 flex items-end justify-between gap-6">
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-clay">What we make</p>
            <h2 className="mt-2 font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
              A pantry built on millets.
            </h2>
          </div>
          <Link to="/products" className="hidden text-sm font-medium text-primary hover:underline md:inline">
            See all products →
          </Link>
        </div>

        <div className="grid auto-rows-[180px] grid-cols-1 gap-4 md:grid-cols-4">
          {/* large hero card */}
          <div className="group relative col-span-1 row-span-2 overflow-hidden rounded-3xl bg-gradient-warm p-8 text-cream md:col-span-2 md:row-span-2">
            <div className="flex h-full flex-col justify-between">
              <span className="text-xs font-medium uppercase tracking-wider text-cream/70">Whole grains</span>
              <div>
                <h3 className="font-display text-3xl font-semibold leading-tight md:text-4xl">
                  Foxtail, Pearl, Finger, Kodo — all the millets.
                </h3>
                <p className="mt-3 max-w-md text-sm text-cream/80">
                  Cleaned, sorted and stone-milled at source. Naturally gluten-free.
                </p>
              </div>
            </div>
            <div className="pointer-events-none absolute -bottom-12 -right-12 h-64 w-64 rounded-full bg-gold/30 blur-3xl" />
          </div>

          <div className="group relative overflow-hidden rounded-3xl border border-border bg-card">
            <img src={grainsImg} alt="Pouch of foxtail millet grains" width={800} height={800} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-burgundy/90 to-transparent p-5">
              <p className="font-display text-lg font-semibold text-cream">Heritage Grains</p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-border bg-secondary p-6">
            <p className="text-xs font-medium uppercase tracking-wider text-clay">Promise</p>
            <p className="mt-3 font-display text-2xl font-semibold leading-snug text-foreground">
              Zero preservatives. Ever.
            </p>
            <div className="absolute bottom-4 right-4 text-5xl">🌾</div>
          </div>

          <div className="group relative overflow-hidden rounded-3xl border border-border bg-card">
            <img src={cookiesImg} alt="Stack of millet cookies" width={800} height={800} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-burgundy/90 to-transparent p-5">
              <p className="font-display text-lg font-semibold text-cream">Snacks & Cookies</p>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-3xl border border-border bg-card">
            <img src={porridgeImg} alt="Warm millet porridge with jaggery" width={800} height={800} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-burgundy/90 to-transparent p-5">
              <p className="font-display text-lg font-semibold text-cream">Breakfast Bowls</p>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-3xl border border-border bg-card">
            <img src={flourImg} alt="Millet flour with wooden scoop" width={800} height={800} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-burgundy/90 to-transparent p-5">
              <p className="font-display text-lg font-semibold text-cream">Stone-milled Flour</p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl bg-gradient-gold p-6 text-burgundy">
            <p className="text-xs font-medium uppercase tracking-wider">Free shipping</p>
            <p className="mt-3 font-display text-2xl font-semibold leading-snug">
              On orders over ₹599
            </p>
          </div>
        </div>
      </section>

      {/* TASTE CAPTIONS */}
      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium uppercase tracking-wider text-clay">Taste talk</p>
            <h2 className="mt-2 font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
              “The food was very tasty.”
            </h2>
            <p className="mt-4 text-base text-muted-foreground">
              And we keep hearing it — from grandmothers, gym buffs, school kids, party guests and first-time millet eaters. Here are a few of our favourite lines.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[
              { q: "Tasted like my grandmother's kitchen — warm, nutty, real.", a: "Lakshmi R., Bengaluru" },
              { q: "Crispy outside, soft inside. The ragi dosa disappeared in minutes!", a: "Arjun M., Chennai" },
              { q: "Sweet, earthy, comforting. My kids asked for a second bowl of porridge.", a: "Priya S., Hyderabad" },
              { q: "Best cookies I've had in years — and they're actually healthy.", a: "Rohan K., Mumbai" },
              { q: "Catered our office party. 80 people, zero leftovers. Need we say more?", a: "Anitha V., HR Lead" },
              { q: "Fresh, fragrant flour. You can smell the millet the moment you open the pack.", a: "Suresh P., Home baker" },
            ].map((t) => (
              <figure key={t.a} className="relative rounded-3xl border border-border bg-card p-7 shadow-soft">
                <span className="absolute -top-4 left-6 font-display text-6xl leading-none text-burgundy/20">“</span>
                <blockquote className="font-display text-lg leading-snug text-foreground md:text-xl">
                  {t.q}
                </blockquote>
                <figcaption className="mt-5 text-sm font-medium text-muted-foreground">— {t.a}</figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {[
              "🌾 Stone-milled freshness",
              "🍪 Bakery-soft cookies",
              "🥣 Comfort in every bowl",
              "🌶️ Spices from small farms",
              "💛 Made with love",
            ].map((c) => (
              <span key={c} className="rounded-full border border-border bg-secondary/60 px-4 py-1.5 text-sm font-medium text-foreground">
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>



      {/* STORY */}
      <section id="story" className="bg-secondary/40 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <p className="text-sm font-medium uppercase tracking-wider text-clay">Our story</p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
                Built on experience, trust, and millet expertise.
              </h2>
              <p className="mt-6 text-base text-muted-foreground">
                <span className="font-semibold text-foreground">Healthy Food · Expert Training · Trusted Quality</span>
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {["Naturally gluten-free", "Farm-traceable", "Stone-milled", "Lab-tested"].map((t) => (
                  <span key={t} className="rounded-full border border-border bg-background px-4 py-1.5 text-sm font-medium text-foreground">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="space-y-5 text-base leading-relaxed text-muted-foreground md:text-lg">
              <p>
                At <span className="font-semibold text-foreground">MYDISA</span>, our journey began with a simple mission: to bring the goodness of millet-based foods to every home while creating awareness about healthy eating.
              </p>
              <p>
                The inspiration behind MYDISA comes from <span className="font-semibold text-foreground">Mythili</span>, one of the founders and a passionate food entrepreneur with extensive experience in millet-based food products, nutrition, and healthy lifestyle education. Over the years, she has worked with government organizations, private institutions, self-help groups, and communities — conducting training programs and awareness sessions for thousands of participants.
              </p>
              <p>
                Through her experience, Mythili recognized the growing need for nutritious, traditional foods that fit modern lifestyles, and saw how millets could improve health while supporting sustainable agriculture.
              </p>
              <p>
                Alongside her, <span className="font-semibold text-foreground">Mr. Punith Narayan D</span> — our Bakery & Training Expert — leads product development, large-scale bakery production, and skill-development programs. With deep expertise in cakes, cookies, and millet-based bakery innovation, he has successfully delivered high-volume orders for events, institutions, and commercial clients while conducting workshops for aspiring bakers, entrepreneurs, self-help groups, and government bodies.
              </p>
            </div>
          </div>

          {/* MEET THE TEAM */}
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {[
              {
                name: "Mythili",
                role: "Co-Founder · Millet Foods & Nutrition Expert",
                emoji: "🌾",
                body: "A passionate food entrepreneur with deep expertise in millet-based foods, nutrition, and healthy lifestyle education — having trained thousands across government bodies, institutions, and self-help groups.",
                skills: [
                  "Millet Foods & Nutrition",
                  "Healthy Lifestyle Education",
                  "Government & SHG Training",
                  "Community Awareness Programs",
                ],
              },
              {
                name: "Mr. Punith Narayan D",
                role: "Bakery & Training Expert",
                emoji: "🎂",
                body: "A skilled food professional with extensive expertise in cakes, cookies, bakery products, and large-scale food production — delivering high-volume orders for events, institutions, and commercial clients while leading professional bakery training programs.",
                skills: [
                  "Cakes & Specialty Bakery Products",
                  "Cookies & Healthy Millet-Based Snacks",
                  "Bulk Order Production & Supply",
                  "Food Product Development",
                  "Bakery Entrepreneurship Training",
                  "Government & Private Sector Workshops",
                  "Skill Development Programs",
                ],
              },
              {
                name: "Mr. Vignesh",
                role: "Marketing Head",
                emoji: "📣",
                body: "Leads marketing and sales at MYDISA — driving business development, customer acquisition, brand promotion, and partnerships with corporates, institutions, and distributors to expand our market presence.",
                skills: [
                  "Business Development",
                  "Customer Acquisition",
                  "Brand Promotion",
                  "Sales Strategy",
                  "Online Marketing Campaigns",
                  "Corporate & Institutional Partnerships",
                  "Bulk Order Opportunities",
                ],
              },

            ].map((m) => (
              <div key={m.name} className="rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-0.5 hover:shadow-soft">
                <div className="flex items-center gap-4">
                  <div className="grid h-14 w-14 place-items-center rounded-full bg-secondary text-2xl">{m.emoji}</div>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-foreground">{m.name}</h3>
                    <p className="text-xs font-medium uppercase tracking-wider text-clay">{m.role}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{m.body}</p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-foreground">Key expertise</p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {m.skills.map((s) => (
                    <li key={s} className="rounded-full border border-border bg-background px-3 py-1 text-xs text-foreground">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>




          {/* Three pillars */}
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {[
              {
                icon: "🌾",
                title: "Quality Millet Foods",
                body: "We supply high-quality millet-based foods and healthy snacks crafted with traditional wisdom and modern food safety.",
              },
              {
                icon: "🍲",
                title: "Doorstep Delivery",
                body: "Convenient online ordering and doorstep delivery for families, businesses, and institutions across India.",
              },
              {
                icon: "🎓",
                title: "Training & Workshops",
                body: "Professional training programs on millet processing, food preparation, nutrition, and entrepreneurship.",
              },
            ].map((p) => (
              <div key={p.title} className="rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-0.5 hover:shadow-soft">
                <div className="text-3xl">{p.icon}</div>
                <h3 className="mt-4 font-display text-xl font-semibold text-foreground">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              </div>
            ))}
          </div>

          {/* Vision & Mission */}
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-clay/30 bg-background p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-clay">Our Vision</p>
              <p className="mt-3 font-display text-xl leading-snug text-foreground">
                To become a leading millet food and nutrition brand that inspires healthier lifestyles through quality products, education, and innovation.
              </p>
            </div>
            <div className="rounded-2xl border border-burgundy/20 bg-background p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-burgundy">Our Mission</p>
              <p className="mt-3 font-display text-xl leading-snug text-foreground">
                To deliver nutritious millet-based foods, provide valuable training programs, and create awareness about sustainable and healthy eating for future generations.
              </p>
            </div>
          </div>

          <p className="mt-10 text-center font-display text-lg text-muted-foreground">
            <span className="font-semibold text-foreground">Millet Magic at Your Doorstep</span> — a movement for healthier homes, empowered communities, and a sustainable food future.
          </p>
        </div>
      </section>



      {/* SHREE ANNA — Indian millet names */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-clay">Shree Anna · श्री अन्न</p>
            <h2 className="mt-2 max-w-2xl font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
              The nine millets of the Indian kitchen.
            </h2>
          </div>
          <p className="max-w-sm text-sm text-muted-foreground">
            Known to your grandmother by name. Celebrated by the UN as the International Year of Millets — and the Government of India as Shree Anna, the mother of all grains.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5">
          {[
            { hi: "ज्वार", en: "Jowar", sub: "Sorghum" },
            { hi: "बाजरा", en: "Bajra", sub: "Pearl millet" },
            { hi: "रागी", en: "Ragi", sub: "Finger millet" },
            { hi: "कंगनी", en: "Kangni", sub: "Foxtail millet" },
            { hi: "कोदो", en: "Kodo", sub: "Kodo millet" },
            { hi: "सामा", en: "Sama", sub: "Little millet" },
            { hi: "चेना", en: "Cheena", sub: "Proso millet" },
            { hi: "कुटकी", en: "Kutki", sub: "Barnyard millet" },
            { hi: "रामदाना", en: "Ramdana", sub: "Amaranth" },
            { hi: "कुट्टू", en: "Kuttu", sub: "Buckwheat" },
          ].map((m) => (
            <div
              key={m.en}
              className="group rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-clay/50 hover:shadow-soft"
            >
              <p className="font-display text-2xl font-semibold text-burgundy">{m.hi}</p>
              <p className="mt-2 font-display text-base font-semibold text-foreground">{m.en}</p>
              <p className="text-xs text-muted-foreground">{m.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SOURCED FROM INDIA */}
      <section className="border-y border-border/60 bg-secondary/40 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <p className="text-sm font-medium uppercase tracking-wider text-clay">From Indian soil</p>
              <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
                Sourced from <span className="bg-gradient-warm bg-clip-text text-transparent">six millet belts</span> of India.
              </h2>
              <p className="mt-5 max-w-lg text-muted-foreground">
                Every pack carries a QR code that traces back to the farmer family, the village and the harvest month. Fair prices to farmers, fresher grain to you.
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                <span className="rounded-full bg-clay/10 px-3 py-1 text-xs font-medium text-clay">FSSAI certified</span>
                <span className="rounded-full bg-clay/10 px-3 py-1 text-xs font-medium text-clay">India Organic</span>
                <span className="rounded-full bg-clay/10 px-3 py-1 text-xs font-medium text-clay">APEDA registered</span>
                <span className="rounded-full bg-clay/10 px-3 py-1 text-xs font-medium text-clay">Made in Bharat 🇮🇳</span>
              </div>
            </div>
            <ul className="grid grid-cols-2 gap-4">
              {[
                { state: "Karnataka", crop: "Ragi & Foxtail", farms: 32 },
                { state: "Rajasthan", crop: "Bajra", farms: 24 },
                { state: "Maharashtra", crop: "Jowar", farms: 21 },
                { state: "Andhra Pradesh", crop: "Kodo & Little millet", farms: 18 },
                { state: "Tamil Nadu", crop: "Kambu & Thinai", farms: 15 },
                { state: "Uttarakhand", crop: "Mandua & Jhangora", farms: 10 },
              ].map((r) => (
                <li key={r.state} className="rounded-2xl border border-border bg-card p-5">
                  <p className="font-display text-lg font-semibold text-foreground">{r.state}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{r.crop}</p>
                  <p className="mt-3 text-xs font-medium uppercase tracking-wider text-clay">{r.farms} farmer families</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* INDIAN RECIPES */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-12">
          <p className="text-sm font-medium uppercase tracking-wider text-clay">From our rasoi</p>
          <h2 className="mt-2 max-w-2xl font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            Classics your dadi used to make.
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { dish: "Bajra Khichdi", region: "Rajasthan", time: "30 min", note: "Warming winter one-pot with ghee and gud." },
            { dish: "Ragi Mudde", region: "Karnataka", time: "20 min", note: "Soft ragi balls served with saaru and palya." },
            { dish: "Jowar Bhakri", region: "Maharashtra", time: "25 min", note: "Hand-patted flatbread, charred on a tava." },
            { dish: "Thinai Pongal", region: "Tamil Nadu", time: "35 min", note: "Foxtail millet pongal with curry leaves and pepper." },
            { dish: "Kodo Pulao", region: "Madhya Pradesh", time: "30 min", note: "Fragrant pilaf with whole spices and vegetables." },
            { dish: "Mandua Roti", region: "Uttarakhand", time: "20 min", note: "Pahadi ragi roti with bhang ki chutney." },
          ].map((r) => (
            <article
              key={r.dish}
              className="group flex flex-col rounded-3xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-clay/40 hover:shadow-soft"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-wider text-clay">{r.region}</span>
                <span className="text-xs text-muted-foreground">⏱ {r.time}</span>
              </div>
              <h3 className="mt-3 font-display text-2xl font-semibold text-foreground">{r.dish}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.note}</p>
              <span className="mt-5 text-sm font-medium text-burgundy transition-transform group-hover:translate-x-0.5">Get the recipe →</span>
            </article>
          ))}
        </div>
      </section>

      {/* DELIVERY LOCATIONS */}
      <section id="delivery" className="border-y border-border/60 bg-secondary/40 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-medium uppercase tracking-wider text-clay">🚚 Delivery network</p>
              <h2 className="mt-2 max-w-2xl font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
                Fresh millets, delivered across India.
              </h2>
            </div>
            <p className="max-w-sm text-sm text-muted-foreground">
              Same-day in our home city, next-day in metros, and 2–5 days pan-India. Cold-chain for ready-to-eat packs.
            </p>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { tier: "Same day", color: "bg-emerald-100 text-emerald-700", icon: "⚡", cities: ["Chennai"] },
              { tier: "Next day", color: "bg-amber-100 text-amber-700", icon: "🛵", cities: ["Bengaluru", "Hyderabad", "Coimbatore", "Madurai"] },
              { tier: "2–3 days", color: "bg-sky-100 text-sky-700", icon: "📦", cities: ["Mumbai", "Pune", "Delhi NCR", "Kochi", "Trivandrum", "Vijayawada"] },
              { tier: "3–5 days", color: "bg-violet-100 text-violet-700", icon: "✈️", cities: ["Kolkata", "Ahmedabad", "Jaipur", "Lucknow", "Bhubaneswar", "Guwahati", "Chandigarh"] },
            ].map((z) => (
              <div key={z.tier} className="rounded-2xl border border-border bg-card p-5">
                <div className="flex items-center justify-between">
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${z.color}`}>
                    <span>{z.icon}</span> {z.tier}
                  </span>
                  <span className="text-xs text-muted-foreground">{z.cities.length} cities</span>
                </div>
                <ul className="mt-4 space-y-1.5">
                  {z.cities.map((c) => (
                    <li key={c} className="flex items-center gap-2 text-sm text-foreground">
                      <span className="text-clay">📍</span> {c}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-clay/30 bg-background p-5">
            <p className="text-sm text-muted-foreground">
              Don't see your city? We ship pan-India via trusted partners.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:scale-[1.03]"
            >
              Check my pincode →
            </Link>
          </div>
        </div>
      </section>


      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-warm p-10 text-cream md:p-16">
          <div className="relative z-10 max-w-2xl">
            <h2 className="font-display text-4xl font-semibold leading-tight md:text-5xl">
              Ready to taste the magic?
            </h2>
            <p className="mt-4 text-lg text-cream/85">
              Start with our bestseller bundle — three millet varieties, one breakfast mix, free shipping.
            </p>
            <Link
              to="/products"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-cream px-7 py-3.5 text-sm font-semibold text-burgundy shadow-warm transition-transform hover:scale-[1.03]"
            >
              Shop the bundle →
            </Link>
          </div>
          <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-gold/40 blur-3xl" />
          <div className="pointer-events-none absolute -top-20 right-1/3 h-72 w-72 rounded-full bg-clay/40 blur-3xl" />
        </div>
      </section>
    </>
  );
}
