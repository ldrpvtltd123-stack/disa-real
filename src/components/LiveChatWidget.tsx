import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";

const PHONE = "919884539288"; // MYDISA WhatsApp (no +)
const BUSINESS = "MYDISA";

const QUICK_REPLIES = [
  "I'd like to place an order",
  "Bulk / party order enquiry",
  "Delivery & shipping question",
  "Product / millet info",
];

export default function LiveChatWidget() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 150);
  }, [open]);

  const send = (msg?: string) => {
    const body = (msg ?? text).trim();
    if (!body) return;
    const prefix = name.trim() ? `Hi ${BUSINESS}, this is ${name.trim()}. ` : `Hi ${BUSINESS}, `;
    const url = `https://wa.me/${PHONE}?text=${encodeURIComponent(prefix + body)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setText("");
  };

  return (
    <>
      {/* Toggle button — bottom-left so it doesn't collide with the right-side action stack */}
      <button
        type="button"
        aria-label={open ? "Close live chat" : "Open live chat"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-24 left-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-burgundy text-cream shadow-xl ring-1 ring-black/10 transition-transform hover:scale-105 active:scale-95"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        {!open && (
          <span className="absolute -right-1 -top-1 flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
          </span>
        )}
      </button>

      {/* Chat panel */}
      <div
        role="dialog"
        aria-label="MYDISA live chat"
        aria-hidden={!open}
        className={`fixed bottom-44 left-4 z-50 w-[min(22rem,calc(100vw-2rem))] origin-bottom-left overflow-hidden rounded-2xl border border-border bg-background shadow-2xl transition-all duration-200 ${
          open ? "pointer-events-auto scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
        }`}
      >
        {/* Header */}
        <div className="bg-burgundy px-4 py-3 text-cream">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-2.5 w-2.5 animate-ping rounded-full bg-green-300 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-400" />
            </span>
            <h3 className="font-display text-base font-semibold">Chat with MYDISA</h3>
          </div>
          <p className="mt-0.5 text-xs text-cream/80">We're online 24×7 — reply usually within minutes</p>
        </div>

        {/* Body */}
        <div className="max-h-[60vh] space-y-3 overflow-y-auto bg-muted/30 px-4 py-3">
          <div className="flex">
            <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-background px-3 py-2 text-sm text-foreground shadow-sm">
              👋 Hi! Tell us what you need and we'll message you back on WhatsApp right away.
            </div>
          </div>

          <div className="space-y-1.5">
            <p className="px-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Quick options</p>
            {QUICK_REPLIES.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => send(q)}
                className="block w-full rounded-full border border-burgundy/30 bg-background px-3 py-1.5 text-left text-xs font-medium text-burgundy transition hover:bg-burgundy hover:text-cream"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Composer */}
        <div className="space-y-2 border-t border-border bg-background px-3 py-3">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value.slice(0, 60))}
            placeholder="Your name (optional)"
            className="w-full rounded-md border border-border bg-background px-3 py-1.5 text-xs outline-none focus:border-burgundy"
          />
          <div className="flex items-end gap-2">
            <textarea
              ref={inputRef}
              value={text}
              onChange={(e) => setText(e.target.value.slice(0, 500))}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              rows={2}
              placeholder="Type your message…"
              className="min-h-[40px] flex-1 resize-none rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-burgundy"
            />
            <button
              type="button"
              onClick={() => send()}
              disabled={!text.trim()}
              aria-label="Send message via WhatsApp"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white shadow transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
          <p className="text-center text-[10px] text-muted-foreground">Powered by WhatsApp · Available 24×7</p>
        </div>
      </div>
    </>
  );
}
