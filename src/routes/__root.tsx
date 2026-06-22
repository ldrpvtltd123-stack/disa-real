import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Menu, X, Phone, MessageSquare, ChevronDown, Instagram, Facebook } from "lucide-react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { I18nProvider, useI18n } from "../lib/i18n";
import { LanguageSwitcher } from "../components/LanguageSwitcher";
import { CookieBanner } from "../components/CookieBanner";
import { AiAssistant } from "../components/AiAssistant";
import LiveChatWidget from "../components/LiveChatWidget";
import CursorTrail from "../components/CursorTrail";
import BackToTop from "../components/BackToTop";
import { AccountButton } from "../components/AccountButton";
import { supabase } from "@/integrations/supabase/client";
import mydisaLogo from "../assets/mydisa-logo.png.asset.json";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Mydisa — Millet Magic at Your Doorstep" },
      { name: "description", content: "Mydisa delivers wholesome, farm-fresh millet foods — grains, flours, snacks and breakfast bowls — to your doorstep across India." },
      { name: "author", content: "Mydisa" },
      { name: "keywords", content: "millet, ragi, jowar, bajra, foxtail millet, millet flour, millet snacks, healthy food, Bengaluru, Karnataka, India" },
      { property: "og:site_name", content: "Mydisa" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_IN" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#6b1f1f" },
      // Local SEO geo signals
      { name: "geo.region", content: "IN-KA" },
      { name: "geo.placename", content: "Bengaluru" },
      { name: "geo.position", content: "12.9716;77.5946" },
      { name: "ICBM", content: "12.9716, 77.5946" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "default" },
      { name: "apple-mobile-web-app-title", content: "MYDISA" },
      { name: "mobile-web-app-capable", content: "yes" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: mydisaLogo.url },
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/icon-192.png" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "@id": "/#business",
          name: "Mydisa",
          image: mydisaLogo.url,
          description:
            "Farm-fresh millet grains, flours, snacks and breakfast bowls delivered across India.",
          url: "/",
          telephone: "+91-98845-39288",
          email: "hello@mydisa.com",
          priceRange: "₹₹",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Plot 14, Agro Park",
            addressLocality: "Bengaluru",
            addressRegion: "Karnataka",
            postalCode: "560100",
            addressCountry: "IN",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: 12.9716,
            longitude: 77.5946,
          },
          areaServed: [
            { "@type": "Country", name: "India" },
            { "@type": "City", name: "Bengaluru" },
            { "@type": "City", name: "Chennai" },
            { "@type": "City", name: "Hyderabad" },
            { "@type": "City", name: "Mumbai" },
            { "@type": "City", name: "Delhi" },
          ],
          openingHoursSpecification: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
              opens: "00:00",
              closes: "23:59",
            },
          ],
          sameAs: [
            "https://www.instagram.com/mydisa",
            "https://www.facebook.com/mydisa",
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "@id": "/#organization",
          name: "MYDISA Foods",
          alternateName: ["Mydisa", "MYDISA", "Mydisa Foods"],
          url: "/",
          logo: mydisaLogo.url,
          email: "hello@mydisa.com",
          telephone: "+91-98845-39288",
          description:
            "MYDISA is an Indian millet-foods brand offering farm-fresh whole millets, stone-milled flours, breakfast bowls, snacks and ready-to-eat mixes. FSSAI certified, 100% natural, naturally gluten-free.",
          foundingLocation: "Bengaluru, Karnataka, India",
          knowsAbout: [
            "Millet foods",
            "Ragi",
            "Jowar",
            "Bajra",
            "Foxtail millet",
            "Kodo millet",
            "Stone-milled flour",
            "Gluten-free Indian food",
            "Diabetic-friendly food",
            "Millet catering",
            "Millet cooking training",
          ],
          contactPoint: [
            {
              "@type": "ContactPoint",
              telephone: "+91-98845-39288",
              contactType: "customer service",
              email: "hello@mydisa.com",
              areaServed: "IN",
              availableLanguage: ["English", "Hindi", "Tamil", "Kannada"],
            },
            {
              "@type": "ContactPoint",
              email: "export@mydisa.com",
              contactType: "export sales",
              areaServed: "Worldwide",
              availableLanguage: ["English"],
            },
          ],
          sameAs: [
            "https://www.instagram.com/mydisa",
            "https://www.facebook.com/mydisa",
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "MYDISA",
          url: "/",
          inLanguage: "en-IN",
          publisher: { "@id": "/#organization" },
          potentialAction: {
            "@type": "SearchAction",
            target: "/products?q={search_term_string}",
            "query-input": "required name=search_term_string",
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "Where does MYDISA deliver?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "MYDISA offers same-week delivery in Bengaluru and 3–5 day shipping pan-India through trusted courier partners. Free shipping on orders over ₹599. We also export to importers worldwide.",
              },
            },
            {
              "@type": "Question",
              name: "Are MYDISA products gluten-free and diabetic-friendly?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. Millets are naturally gluten-free, low-GI and high-fibre, making them suitable for diabetic-friendly and kid-friendly diets. MYDISA products contain zero preservatives and are FSSAI certified.",
              },
            },
            {
              "@type": "Question",
              name: "How fresh are the products?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "MYDISA mills in small batches and dispatches within 7 days of milling, so the millet aroma is preserved when you open the pack.",
              },
            },
            {
              "@type": "Question",
              name: "Can I become a MYDISA dealer or import in bulk?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. Visit /dealers to apply as a retail or distribution partner in India, or /overseas to submit an export enquiry for FCL/LCL shipments worldwide.",
              },
            },
            {
              "@type": "Question",
              name: "How do I contact MYDISA?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Call or WhatsApp +91 98845 39288, email hello@mydisa.com, or visit Plot 14, Agro Park, Bengaluru, Karnataka 560100. Available 24×7.",
              },
            },
          ],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function SiteHeader() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const PHONE = "+919884539288";
  const primaryNav: { to: string; label: string; exact?: boolean }[] = [
    { to: "/", label: t("nav_home"), exact: true },
    { to: "/products", label: t("nav_products") },
    { to: "/order", label: "Order" },
    { to: "/party-orders", label: "Party" },
    { to: "/training", label: "Training" },
    { to: "/contact", label: t("nav_contact") },
  ];
  const moreNav: { to: string; label: string; exact?: boolean }[] = [
    { to: "/reviews", label: "Reviews" },
    { to: "/faq", label: "FAQ" },
    { to: "/suggestions", label: "Suggestions" },
    { to: "/dealers", label: "Become a dealer" },
    { to: "/sell-with-us", label: "Sell with us" },
    { to: "/backlinks", label: "Backlink partnership" },
  ];
  const navItems = [...primaryNav, ...moreNav];
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="border-b border-border/40 bg-secondary/40">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-4 gap-y-1 px-4 py-1.5 text-xs text-muted-foreground md:px-6">
          <a href="https://mydisa.food" className="font-medium hover:text-foreground">mydisa.food</a>
          <a href="mailto:hello@mydisa.food" className="hover:text-foreground">hello@mydisa.food</a>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 md:px-6 md:py-4">

        <Link to="/" className="flex shrink-0 items-center" aria-label="Mydisa — Millet Magic at Your Doorstep">
          <img
            src={mydisaLogo.url}
            alt="Mydisa logo"
            width={240}
            height={84}
            className="h-11 w-auto sm:h-14 md:h-20"
          />
        </Link>

        <nav className="hidden items-center gap-6 md:flex lg:gap-7">
          {primaryNav.map((n) => (
            <Link
              key={n.to}
              to={n.to as string}
              className="whitespace-nowrap text-sm text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "whitespace-nowrap text-sm text-foreground font-medium" }}
              activeOptions={n.exact ? { exact: true } : undefined}
            >
              {n.label}
            </Link>
          ))}
          <div className="relative group">
            <button type="button" className="inline-flex items-center gap-1 whitespace-nowrap text-sm text-muted-foreground transition-colors hover:text-foreground">
              More <ChevronDown className="h-4 w-4" />
            </button>
            <div className="invisible absolute right-0 top-full z-50 mt-2 w-48 rounded-xl border border-border bg-popover p-1 opacity-0 shadow-lg transition-all group-hover:visible group-hover:opacity-100">
              {moreNav.map((n) => (
                <Link
                  key={n.to}
                  to={n.to as string}
                  className="block rounded-md px-3 py-2 text-sm text-foreground hover:bg-accent"
                  activeProps={{ className: "block rounded-md px-3 py-2 text-sm font-medium bg-accent text-accent-foreground" }}
                >
                  {n.label}
                </Link>
              ))}
              <a href="/#story" className="block rounded-md px-3 py-2 text-sm text-foreground hover:bg-accent">{t("nav_story")}</a>
            </div>
          </div>
        </nav>

        <div className="flex shrink-0 items-center gap-1.5 md:gap-2">
          <LanguageSwitcher />
          <AccountButton />
          <Link
            to="/order"
            className="hidden items-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-soft transition-transform hover:scale-[1.03] md:inline-flex"
          >
            Order now
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

      </div>

      {open && (
        <div className="border-t border-border/60 bg-background md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-2">
            {navItems.map((n) => (
              <Link
                key={n.to}
                to={n.to as string}
                onClick={() => setOpen(false)}
                activeOptions={n.exact ? { exact: true } : undefined}
                className="rounded-md px-3 py-3 text-sm text-foreground hover:bg-accent"
                activeProps={{ className: "rounded-md px-3 py-3 text-sm font-medium bg-accent text-accent-foreground" }}
              >
                {n.label}
              </Link>
            ))}
            <a href="/#story" onClick={() => setOpen(false)} className="rounded-md px-3 py-3 text-sm text-foreground hover:bg-accent">{t("nav_story")}</a>
            <a href={`tel:${PHONE}`} className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-medium text-primary-foreground">
              <Phone className="h-4 w-4" /> Call {PHONE}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

function SiteFooter() {
  return (
    <footer id="contact" className="border-t border-border/60 bg-secondary/50">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <img src={mydisaLogo.url} alt="Mydisa logo" width={260} height={92} className="h-20 w-auto" />
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            Millet Magic at Your Doorstep. Sourced from small farms, milled with care, delivered fresh.
          </p>
          <div className="mt-5 flex items-center gap-3">
            {[
              { href: "https://instagram.com/mydisafoods", label: "Instagram", Icon: Instagram },
              { href: "https://facebook.com/mydisafoods", label: "Facebook", Icon: Facebook },
            ].map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Mydisa on ${label}`}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-background text-muted-foreground transition hover:border-primary hover:text-primary"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-foreground">Explore</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-foreground">Home</Link></li>
            <li><Link to="/products" className="hover:text-foreground">Products</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
            <li><Link to="/overseas" className="hover:text-foreground">Overseas Supply</Link></li>
            <li><Link to="/terms" className="hover:text-foreground">Terms & Conditions</Link></li>
            <li><a href="/#story" className="hover:text-foreground">Our Story</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-foreground">Contact</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><a href="https://mydisa.food" className="hover:text-foreground">mydisa.food</a></li>
            <li><a href="mailto:hello@mydisa.food" className="hover:text-foreground">hello@mydisa.food</a></li>

            <li><a href="tel:+919884539288" className="hover:text-foreground">+91 98845 39288</a></li>
            <li>Open 24×7</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Mydisa Foods. All rights reserved ·{" "}
        <a
          href="https://ldrsurveys.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground underline-offset-4 hover:underline"
        >
          ldrsurveys.com
        </a>
      </div>
    </footer>
  );
}

function FloatingActions() {
  const PHONE = "+919884539288";
  const WHATSAPP_URL = `https://wa.me/919884539288?text=${encodeURIComponent("Hi MYDISA, I'd like to know more about your millet products and services.")}`;
  const [open, setOpen] = useState(false);

  const WhatsAppIcon = (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
      <path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.5 0 .17 5.33.17 11.9c0 2.1.55 4.15 1.6 5.96L0 24l6.32-1.66a11.9 11.9 0 0 0 5.74 1.46h.01c6.56 0 11.89-5.33 11.89-11.9 0-3.18-1.24-6.17-3.44-8.42ZM12.07 21.3h-.01a9.86 9.86 0 0 1-5.03-1.38l-.36-.21-3.75.98 1-3.65-.23-.38a9.85 9.85 0 0 1-1.51-5.27c0-5.46 4.44-9.9 9.9-9.9 2.64 0 5.13 1.03 7 2.9a9.83 9.83 0 0 1 2.9 7c0 5.46-4.45 9.91-9.91 9.91Zm5.43-7.42c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49 0 1.47 1.07 2.89 1.22 3.09.15.2 2.1 3.2 5.07 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35Z"/>
    </svg>
  );

  return (
    <>
      {/* Desktop: always-visible vertical stack */}
      <div className="fixed right-5 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-2.5 md:flex">
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp"
           className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg ring-1 ring-black/5 transition-transform hover:scale-110 active:scale-95">
          {WhatsAppIcon}
          <span className="pointer-events-none absolute right-14 hidden whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-xs font-medium text-background group-hover:block">WhatsApp</span>
        </a>
        <a href={`tel:${PHONE}`} aria-label="Call us"
           className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg ring-1 ring-black/5 transition-transform hover:scale-110 active:scale-95">
          <Phone className="h-5 w-5" />
          <span className="pointer-events-none absolute right-14 hidden whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-xs font-medium text-background group-hover:block">Call us</span>
        </a>
        <Link to="/contact" aria-label="Send enquiry"
              className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-burgundy text-cream shadow-lg ring-1 ring-black/5 transition-transform hover:scale-110 active:scale-95">
          <MessageSquare className="h-5 w-5" />
          <span className="pointer-events-none absolute right-14 hidden whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-xs font-medium text-background group-hover:block">Enquiry</span>
        </Link>
      </div>

      {/* Mobile: tap-to-expand */}
      <div className="fixed bottom-5 right-4 z-50 flex flex-col items-end gap-2.5 md:hidden">
        <div
          className={`flex flex-col items-end gap-2.5 transition-all duration-200 ${
            open ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
          }`}
        >
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" onClick={() => setOpen(false)}
             className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg ring-1 ring-black/5 active:scale-95">
            {WhatsAppIcon}
          </a>
          <a href={`tel:${PHONE}`} aria-label="Call us" onClick={() => setOpen(false)}
             className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg ring-1 ring-black/5 active:scale-95">
            <Phone className="h-5 w-5" />
          </a>
          <Link to="/contact" aria-label="Send enquiry" onClick={() => setOpen(false)}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-burgundy text-cream shadow-lg ring-1 ring-black/5 active:scale-95">
            <MessageSquare className="h-5 w-5" />
          </Link>
        </div>
        <button
          type="button"
          aria-label={open ? "Close quick actions" : "Open quick actions"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl ring-1 ring-black/10 transition-transform active:scale-95"
        >
          {open ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
        </button>
      </div>
    </>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const router = useRouter();

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
      router.invalidate();
      if (event !== "SIGNED_OUT") queryClient.invalidateQueries();
    });
    return () => { sub.subscription.unsubscribe(); };
  }, [router, queryClient]);

  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">
            <Outlet />
          </main>
          <SiteFooter />
          <FloatingActions />
          <CookieBanner />
          <AiAssistant />
          <LiveChatWidget />
          <CursorTrail />
          <BackToTop />
        </div>
      </I18nProvider>
    </QueryClientProvider>
  );
}
