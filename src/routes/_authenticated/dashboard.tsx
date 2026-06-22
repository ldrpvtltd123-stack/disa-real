import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { User as UserIcon, Package, Heart, MessageSquare, LogOut, Trash2 } from "lucide-react";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "My Account — Mydisa" },
      { name: "description", content: "Your Mydisa dashboard: orders, profile, favourites and reviews." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: DashboardPage,
});

type Profile = {
  id: string;
  full_name: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  pincode: string | null;
};

type Order = {
  id: string;
  total: number;
  shipping: number;
  status: string;
  payment: string;
  ref_code: string | null;
  created_at: string;
  order_items: { id: string; name: string; qty: number; price: number }[];
};

type Favourite = { product_id: string; name: string; price: number | null; pack: string | null };

const TABS = [
  { id: "orders", label: "My Orders", Icon: Package },
  { id: "profile", label: "My Profile", Icon: UserIcon },
  { id: "favourites", label: "Favourites", Icon: Heart },
  { id: "reviews", label: "Reviews & Suggestions", Icon: MessageSquare },
] as const;
type TabId = (typeof TABS)[number]["id"];

function DashboardPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<TabId>("orders");
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? ""));
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out");
    navigate({ to: "/" });
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-semibold text-foreground md:text-4xl">My Account</h1>
          <p className="mt-1 text-sm text-muted-foreground">{email}</p>
        </div>
        <button
          onClick={handleSignOut}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-accent"
        >
          <LogOut className="h-4 w-4" /> Sign out
        </button>
      </div>

      <div className="mt-8 flex flex-wrap gap-2 border-b border-border">
        {TABS.map(({ id, label, Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`inline-flex items-center gap-2 rounded-t-xl px-4 py-2.5 text-sm font-medium transition ${
              tab === id
                ? "bg-card text-foreground border border-b-0 border-border"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon className="h-4 w-4" /> {label}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {tab === "orders" && <OrdersTab />}
        {tab === "profile" && <ProfileTab />}
        {tab === "favourites" && <FavouritesTab />}
        {tab === "reviews" && <ReviewsTab />}
      </div>
    </section>
  );
}

function OrdersTab() {
  const { data, isLoading } = useQuery({
    queryKey: ["my-orders"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("id,total,shipping,status,payment,ref_code,created_at,order_items(id,name,qty,price)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Order[];
    },
  });

  if (isLoading) return <p className="text-sm text-muted-foreground">Loading your orders…</p>;
  if (!data || data.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-card p-8 text-center">
        <Package className="mx-auto h-8 w-8 text-muted-foreground" />
        <p className="mt-3 text-sm text-foreground">No orders yet.</p>
        <Link to="/order" className="mt-4 inline-flex rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground">
          Place your first order
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {data.map((o) => (
        <article key={o.id} className="rounded-2xl border border-border bg-card p-5">
          <header className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="font-display text-sm font-semibold text-foreground">
                Order #{o.ref_code ?? o.id.slice(0, 8).toUpperCase()}
              </p>
              <p className="text-xs text-muted-foreground">
                {new Date(o.created_at).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
              </p>
            </div>
            <span className={`rounded-full px-3 py-1 text-xs font-medium ${
              o.status === "delivered" ? "bg-green-100 text-green-800"
              : o.status === "cancelled" ? "bg-red-100 text-red-800"
              : "bg-amber-100 text-amber-800"
            }`}>{o.status}</span>
          </header>
          <ul className="mt-3 divide-y divide-border/60 text-sm">
            {o.order_items.map((it) => (
              <li key={it.id} className="flex items-center justify-between py-2">
                <span className="text-foreground">{it.name} <span className="text-muted-foreground">× {it.qty}</span></span>
                <span className="text-foreground">₹{(it.qty * Number(it.price)).toFixed(0)}</span>
              </li>
            ))}
          </ul>
          <footer className="mt-3 flex items-center justify-between border-t border-border/60 pt-3 text-sm">
            <span className="text-muted-foreground">Payment: {o.payment.toUpperCase()}</span>
            <span className="font-semibold text-foreground">Total ₹{Number(o.total).toFixed(0)}</span>
          </footer>
        </article>
      ))}
    </div>
  );
}

function ProfileTab() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["my-profile"],
    queryFn: async () => {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) throw new Error("no user");
      const { data, error } = await supabase.from("profiles").select("*").eq("id", user.user.id).maybeSingle();
      if (error) throw error;
      return (data as Profile) ?? { id: user.user.id, full_name: "", phone: "", email: user.user.email ?? "", address: "", city: "", state: "", pincode: "" };
    },
  });
  const [form, setForm] = useState<Profile | null>(null);
  useEffect(() => { if (data) setForm(data); }, [data]);

  const save = useMutation({
    mutationFn: async (p: Profile) => {
      const { error } = await supabase.from("profiles").upsert({
        id: p.id, full_name: p.full_name, phone: p.phone, email: p.email,
        address: p.address, city: p.city, state: p.state, pincode: p.pincode,
      });
      if (error) throw error;
    },
    onSuccess: () => { toast.success("Profile saved"); qc.invalidateQueries({ queryKey: ["my-profile"] }); },
    onError: (e) => toast.error("Save failed", { description: e instanceof Error ? e.message : "" }),
  });

  if (isLoading || !form) return <p className="text-sm text-muted-foreground">Loading…</p>;

  const field = (key: keyof Profile, label: string, props: React.InputHTMLAttributes<HTMLInputElement> = {}) => (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-muted-foreground">{label}</span>
      <input
        value={(form[key] as string) ?? ""}
        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
        className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
        {...props}
      />
    </label>
  );

  return (
    <form onSubmit={(e) => { e.preventDefault(); save.mutate(form); }} className="rounded-2xl border border-border bg-card p-6">
      <div className="grid gap-4 md:grid-cols-2">
        {field("full_name", "Full name", { maxLength: 80 })}
        {field("phone", "Phone", { type: "tel", inputMode: "numeric", maxLength: 15 })}
        {field("email", "Email", { type: "email", maxLength: 120 })}
        {field("pincode", "Pincode", { inputMode: "numeric", maxLength: 6 })}
        <div className="md:col-span-2">{field("address", "Address", { maxLength: 300 })}</div>
        {field("city", "City", { maxLength: 60 })}
        {field("state", "State", { maxLength: 60 })}
      </div>
      <button
        type="submit"
        disabled={save.isPending}
        className="mt-6 inline-flex rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft disabled:opacity-60"
      >
        {save.isPending ? "Saving…" : "Save profile"}
      </button>
    </form>
  );
}

function FavouritesTab() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["my-favourites"],
    queryFn: async () => {
      const { data, error } = await supabase.from("favourites").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data as Favourite[];
    },
  });

  const remove = useMutation({
    mutationFn: async (product_id: string) => {
      const { error } = await supabase.from("favourites").delete().eq("product_id", product_id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["my-favourites"] }),
  });

  if (isLoading) return <p className="text-sm text-muted-foreground">Loading…</p>;
  if (!data || data.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-card p-8 text-center">
        <Heart className="mx-auto h-8 w-8 text-muted-foreground" />
        <p className="mt-3 text-sm text-foreground">No favourites yet.</p>
        <Link to="/products" className="mt-4 inline-flex rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground">
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-3 md:grid-cols-2">
      {data.map((f) => (
        <div key={f.product_id} className="flex items-center justify-between rounded-2xl border border-border bg-card p-4">
          <div>
            <p className="font-medium text-foreground">{f.name}</p>
            {f.pack && <p className="text-xs text-muted-foreground">{f.pack}{f.price ? ` · ₹${f.price}` : ""}</p>}
          </div>
          <div className="flex items-center gap-2">
            <Link to="/order" className="rounded-full bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground">Reorder</Link>
            <button
              onClick={() => remove.mutate(f.product_id)}
              aria-label="Remove favourite"
              className="rounded-full border border-border p-2 text-muted-foreground hover:text-foreground"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function ReviewsTab() {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-card p-8 text-center">
      <MessageSquare className="mx-auto h-8 w-8 text-muted-foreground" />
      <p className="mt-3 text-sm text-foreground">Share a review or a suggestion any time.</p>
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        <Link to="/reviews" className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground">Write a review</Link>
        <Link to="/suggestions" className="rounded-full border border-border bg-background px-5 py-2 text-sm font-medium text-foreground">Send a suggestion</Link>
      </div>
    </div>
  );
}
