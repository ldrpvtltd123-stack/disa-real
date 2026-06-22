import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-24 right-5 z-40 inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background/90 text-foreground shadow-soft backdrop-blur transition-transform hover:scale-105 active:scale-95 md:bottom-28"
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}
