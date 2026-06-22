import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useRef, useState } from "react";
import { X, Send, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";

const SUGGESTIONS = [
  "What products do you sell?",
  "How long does delivery take?",
  "Book catering for 100 guests",
  "Benefits of ragi?",
];

const transport = new DefaultChatTransport({ api: "/api/chat" });

export function AiAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status, error } = useChat({
    id: "mydisa-assistant",
    transport,
  });

  const busy = status === "submitted" || status === "streaming";

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, status]);

  const send = async (text: string) => {
    const value = text.trim();
    if (!value || busy) return;
    setInput("");
    await sendMessage({ text: value });
  };

  return (
    <>
      {/* Floating launcher (bottom-left so it doesn't clash with FloatingActions on the right) */}
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open Mydisa AI assistant"
          className="fixed bottom-5 left-4 z-50 inline-flex items-center gap-2 rounded-full bg-burgundy px-4 py-3 text-sm font-semibold text-cream shadow-lg ring-1 ring-black/5 transition-transform hover:scale-105 active:scale-95"
        >
          <Sparkles className="h-4 w-4" />
          <span className="hidden sm:inline">Ask Mydisa AI</span>
          <span className="sm:hidden">AI</span>
        </button>
      )}

      {/* Panel */}
      {open && (
        <div
          role="dialog"
          aria-label="Mydisa AI assistant"
          className="fixed inset-x-3 bottom-3 z-50 flex max-h-[85vh] flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-2xl sm:inset-x-auto sm:bottom-5 sm:left-5 sm:h-[600px] sm:w-[400px]"
        >
          {/* Header */}
          <div className="flex items-center justify-between gap-2 border-b border-border bg-gradient-warm px-4 py-3 text-cream">
            <div className="flex items-center gap-2">
              <div className="grid h-8 w-8 place-items-center rounded-full bg-cream/20">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-semibold leading-tight">Mydisa Assistant</p>
                <p className="text-[11px] opacity-80">Powered by AI · Replies in seconds</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close assistant"
              className="grid h-8 w-8 place-items-center rounded-full bg-cream/10 hover:bg-cream/20"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-background px-4 py-4">
            {messages.length === 0 && (
              <div className="space-y-3">
                <div className="rounded-2xl rounded-tl-sm bg-secondary px-3 py-2 text-sm text-foreground">
                  👋 Hi! I'm the Mydisa Assistant. Ask me about millet products, orders, recipes, catering, or training.
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => send(s)}
                      className="rounded-full border border-border bg-card px-3 py-1.5 text-xs text-foreground hover:bg-accent"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m) => {
              const text = m.parts
                .map((p) => (p.type === "text" ? p.text : ""))
                .join("");
              const isUser = m.role === "user";
              return (
                <div key={m.id} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                  {isUser ? (
                    <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-primary px-3 py-2 text-sm text-primary-foreground">
                      {text}
                    </div>
                  ) : (
                    <div className="max-w-[90%] rounded-2xl rounded-tl-sm bg-secondary px-3 py-2 text-sm text-foreground">
                      <div className="prose prose-sm max-w-none prose-p:my-1 prose-a:text-burgundy prose-ul:my-1 prose-ol:my-1">
                        <ReactMarkdown>{text || "…"}</ReactMarkdown>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {busy && messages[messages.length - 1]?.role !== "assistant" && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-tl-sm bg-secondary px-3 py-2 text-sm text-muted-foreground">
                  <span className="inline-flex gap-1">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current [animation-delay:-0.3s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current [animation-delay:-0.15s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current" />
                  </span>
                </div>
              </div>
            )}

            {error && (
              <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
                Something went wrong. Please try again or call +91 98845 39288.
              </div>
            )}
          </div>

          {/* Composer */}
          <form
            onSubmit={(e) => { e.preventDefault(); send(input); }}
            className="flex items-center gap-2 border-t border-border bg-card px-3 py-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about products, orders, recipes…"
              maxLength={500}
              disabled={busy}
              className="flex-1 rounded-full border border-border bg-background px-4 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={busy || !input.trim()}
              aria-label="Send"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
