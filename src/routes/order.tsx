import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";
import { makeRefCode } from "../lib/reference-code";
import { RefCodeBadge } from "../components/RefCodeBadge";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/order")({
  head: () => ({
    meta: [
      { title: "Place an Order — Mydisa" },
      { name: "description", content: "Order farm-fresh millet grains, flours, snacks and breakfast bowls from Mydisa, delivered to your doorstep across India." },
      { property: "og:title", content: "Place an Order — Mydisa" },
      { property: "og:description", content: "Order farm-fresh millet foods from Mydisa, delivered to your doorstep." },
      { property: "og:url", content: "/order" },
    ],
    links: [{ rel: "canonical", href: "/order" }],
  }),
  component: OrderPage,
});

type Product = {
  id: string;
  name: string;
  hindi: string;
  pack: string;
  price: number;
};

const PRODUCTS: Product[] = [
  { id: "jowar-flour", name: "Jowar Flour", hindi: "ज्वार आटा", pack: "1 kg", price: 120 },
  { id: "bajra-grains", name: "Bajra Whole Grains", hindi: "बाजरा", pack: "1 kg", price: 110 },
  { id: "ragi-flour", name: "Ragi Flour", hindi: "रागी आटा", pack: "1 kg", price: 140 },
  { id: "foxtail", name: "Foxtail Millet (Kangni)", hindi: "कंगनी", pack: "500 g", price: 95 },
  { id: "kodo", name: "Kodo Millet", hindi: "कोदो", pack: "500 g", price: 90 },
  { id: "little", name: "Little Millet (Sama)", hindi: "सामा", pack: "500 g", price: 95 },
  { id: "porridge", name: "Multi-Millet Porridge Mix", hindi: "दलिया", pack: "500 g", price: 180 },
  { id: "cookies", name: "Ragi-Jaggery Cookies", hindi: "बिस्किट", pack: "200 g", price: 150 },
];

const STATES = [
  "Andhra Pradesh","Assam","Bihar","Chhattisgarh","Delhi","Goa","Gujarat","Haryana",
  "Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra",
  "Odisha","Punjab","Rajasthan","Tamil Nadu","Telangana","Uttar Pradesh","Uttarakhand","West Bengal",
];

const orderSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name").max(80),
  phone: z.string().trim().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile"),
  email: z.string().trim().email("Enter a valid email").max(120),
  address: z.string().trim().min(8, "Address looks too short").max(300),
  city: z.string().trim().min(2).max(60),
  state: z.string().trim().min(2),
  pincode: z.string().trim().regex(/^\d{6}$/, "Enter a valid 6-digit PIN"),
  payment: z.enum(["cod", "upi"]),
  notes: z.string().trim().max(400).optional(),
});

function OrderPage() {
  const [qty, setQty] = useState<Record<string, number>>({});
  const [form, setForm] = useState({
    name: "", phone: "", email: "", address: "", city: "",
    state: "Tamil Nadu", pincode: "", payment: "cod" as "cod" | "upi", notes: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [placed, setPlaced] = useState<null | { id: string; total: number }>(null);

  const lines = useMemo(
    () => PRODUCTS.map((p) => ({ ...p, qty: qty[p.id] ?? 0 })).filter((l) => l.qty > 0),
    [qty],
  );
  const subtotal = lines.reduce((s, l) => s + l.qty * l.price, 0);
  const shipping = subtotal === 0 ? 0 : subtotal >= 999 ? 0 : 60;
  const total = subtotal + shipping;

  const updateQty = (id: string, v: number) =>
    setQty((q) => ({ ...q, [id]: Math.max(0, Math.min(20, v || 0)) }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (lines.length === 0) {
      setErrors({ cart: "Please add at least one product." });
      return;
    }
    const parsed = orderSchema.safeParse(form);
    if (!parsed.success) {
      const map: Record<string, string> = {};
      parsed.error.issues.forEach((i) => { map[i.path[0] as string] = i.message; });
      setErrors(map);
      return;
    }
    setErrors({});
    const id = makeRefCode("ORD");
    try {
      const existing = JSON.parse(localStorage.getItem("mydisa_orders") || "[]");
      existing.push({ id, at: new Date().toISOString(), lines, total, customer: parsed.data });
      localStorage.setItem("mydisa_orders", JSON.stringify(existing));
    } catch {}

    // Persist to account if signed in
    try {
      const { data: userRes } = await supabase.auth.getUser();
      if (userRes.user) {
        const { data: order, error: orderErr } = await supabase
          .from("orders")
          .insert({
            user_id: userRes.user.id,
            total,
            shipping,
            payment: parsed.data.payment,
            ref_code: id,
            notes: parsed.data.notes ?? null,
            address: {
              name: parsed.data.name,
              phone: parsed.data.phone,
              email: parsed.data.email,
              address: parsed.data.address,
              city: parsed.data.city,
              state: parsed.data.state,
              pincode: parsed.data.pincode,
            },
          })
          .select("id")
          .single();
        if (!orderErr && order) {
          await supabase.from("order_items").insert(
            lines.map((l) => ({ order_id: order.id, product_id: l.id, name: l.name, qty: l.qty, price: l.price })),
          );
        }
      }
    } catch {}

    setPlaced({ id, total });
    setQty({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (placed) {
    return (
      <section className="mx-auto max-w-2xl px-4 py-20 md:py-28 text-center">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary text-3xl">✓</div>
        <h1 className="mt-6 font-display text-3xl md:text-4xl font-semibold tracking-tight">Order placed!</h1>
        <p className="mt-3 text-muted-foreground">
          Thank you. Your order for{" "}
          <span className="font-semibold text-foreground">₹{placed.total}</span> has been received.
          Our team will call you on the number provided to confirm delivery.
        </p>
        <RefCodeBadge code={placed.id} label="Order code" />
        <div className="mt-8 flex justify-center gap-3">
          <Link to="/products" className="inline-flex items-center rounded-full border border-input px-5 py-2 text-sm hover:bg-accent">Continue browsing</Link>
          <button onClick={() => setPlaced(null)} className="inline-flex items-center rounded-full bg-primary px-5 py-2 text-sm text-primary-foreground hover:opacity-90">Place another order</button>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Order</p>
        <h1 className="mt-2 font-display text-4xl md:text-5xl font-semibold tracking-tight">Place your millet order</h1>
        <p className="mt-3 text-muted-foreground">
          Pick your packs, share delivery details, and we'll dispatch fresh from the mill. Free shipping on orders over ₹999.
        </p>
      </div>

      <form onSubmit={submit} className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
        {/* Products + customer */}
        <div className="space-y-8">
          <div className="rounded-2xl border border-border/60 bg-card p-5 md:p-6">
            <h2 className="font-display text-xl font-semibold">1. Choose your packs</h2>
            <div className="mt-5 divide-y divide-border/60">
              {PRODUCTS.map((p) => {
                const q = qty[p.id] ?? 0;
                return (
                  <div key={p.id} className="flex items-center justify-between gap-4 py-3">
                    <div>
                      <div className="font-medium text-foreground">{p.name}</div>
                      <div className="text-xs text-muted-foreground">{p.hindi} · {p.pack} · ₹{p.price}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button type="button" onClick={() => updateQty(p.id, q - 1)} className="h-8 w-8 rounded-full border border-input text-sm hover:bg-accent" aria-label={`Decrease ${p.name}`}>−</button>
                      <input
                        type="number" min={0} max={20} value={q}
                        onChange={(e) => updateQty(p.id, parseInt(e.target.value))}
                        className="h-8 w-12 rounded-md border border-input bg-background text-center text-sm"
                      />
                      <button type="button" onClick={() => updateQty(p.id, q + 1)} className="h-8 w-8 rounded-full border border-input text-sm hover:bg-accent" aria-label={`Increase ${p.name}`}>+</button>
                    </div>
                  </div>
                );
              })}
            </div>
            {errors.cart && <p className="mt-3 text-sm text-destructive">{errors.cart}</p>}
          </div>

          <div className="rounded-2xl border border-border/60 bg-card p-5 md:p-6">
            <h2 className="font-display text-xl font-semibold">2. Delivery details</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <Field label="Full name" error={errors.name}>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} />
              </Field>
              <Field label="Mobile (10-digit)" error={errors.phone}>
                <input inputMode="numeric" maxLength={10} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputCls} />
              </Field>
              <Field label="Email" error={errors.email}>
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputCls} />
              </Field>
              <Field label="PIN code" error={errors.pincode}>
                <input inputMode="numeric" maxLength={6} value={form.pincode} onChange={(e) => setForm({ ...form, pincode: e.target.value })} className={inputCls} />
              </Field>
              <Field label="Address" error={errors.address} className="md:col-span-2">
                <textarea rows={2} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className={inputCls} />
              </Field>
              <Field label="City" error={errors.city}>
                <input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className={inputCls} />
              </Field>
              <Field label="State" error={errors.state}>
                <select value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} className={inputCls}>
                  {STATES.map((s) => <option key={s}>{s}</option>)}
                </select>
              </Field>
              <Field label="Notes (optional)" className="md:col-span-2">
                <textarea rows={2} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className={inputCls} placeholder="Landmark, preferred delivery time, etc." />
              </Field>
            </div>
          </div>

          <div className="rounded-2xl border border-border/60 bg-card p-5 md:p-6">
            <h2 className="font-display text-xl font-semibold">3. Payment</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                { v: "cod", label: "Cash on Delivery", sub: "Pay when your order arrives" },
                { v: "upi", label: "UPI on confirmation", sub: "We'll share a UPI link" },
              ].map((o) => (
                <label key={o.v} className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition ${form.payment === o.v ? "border-primary bg-primary/5" : "border-border/60 hover:bg-accent/40"}`}>
                  <input type="radio" name="payment" value={o.v} checked={form.payment === o.v} onChange={() => setForm({ ...form, payment: o.v as "cod" | "upi" })} className="mt-1" />
                  <div>
                    <div className="font-medium text-foreground">{o.label}</div>
                    <div className="text-xs text-muted-foreground">{o.sub}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Summary */}
        <aside className="lg:sticky lg:top-24 self-start rounded-2xl border border-border/60 bg-secondary/40 p-5 md:p-6">
          <h2 className="font-display text-xl font-semibold">Order summary</h2>
          {lines.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">No items yet. Add packs on the left to see your total.</p>
          ) : (
            <ul className="mt-4 space-y-2 text-sm">
              {lines.map((l) => (
                <li key={l.id} className="flex justify-between gap-3">
                  <span className="text-foreground">{l.name} <span className="text-muted-foreground">× {l.qty}</span></span>
                  <span className="font-medium">₹{l.qty * l.price}</span>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-5 space-y-1 border-t border-border/60 pt-4 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>₹{subtotal}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{shipping === 0 ? "Free" : `₹${shipping}`}</span></div>
            <div className="mt-2 flex justify-between text-base font-semibold"><span>Total</span><span>₹{total}</span></div>
          </div>
          <button type="submit" className="mt-6 w-full rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-soft transition hover:opacity-95">
            Place order
          </button>
          <p className="mt-3 text-xs text-muted-foreground">By placing the order you agree to our delivery terms. We'll call to confirm.</p>
        </aside>
      </form>
    </section>
  );
}

const inputCls =
  "w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20";

function Field({
  label, error, children, className = "",
}: { label: string; error?: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={`block text-sm ${className}`}>
      <span className="mb-1 block font-medium text-foreground">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}
