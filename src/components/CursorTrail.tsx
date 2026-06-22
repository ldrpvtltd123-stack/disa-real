import { useEffect, useRef } from "react";

// Food/smoke trail that follows the mouse for a playful entertaining effect.
// Disabled on touch devices and when the user prefers reduced motion.
const EMOJIS = ["🌾", "🍚", "🥣", "💨", "✨", "🌽"];

export default function CursorTrail() {
  const layerRef = useRef<HTMLDivElement | null>(null);
  const lastSpawn = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isTouch = window.matchMedia("(hover: none)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || reduced) return;

    const layer = layerRef.current;
    if (!layer) return;

    let i = 0;
    const onMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastSpawn.current < 55) return; // throttle
      lastSpawn.current = now;

      const el = document.createElement("span");
      const isSmoke = i % 2 === 0;
      el.textContent = isSmoke ? "💨" : EMOJIS[i % EMOJIS.length];
      el.className = "cursor-trail-puff";
      const drift = (Math.random() - 0.5) * 40;
      el.style.left = `${e.clientX}px`;
      el.style.top = `${e.clientY}px`;
      el.style.setProperty("--drift", `${drift}px`);
      el.style.fontSize = `${14 + Math.random() * 10}px`;
      layer.appendChild(el);
      i++;
      setTimeout(() => el.remove(), 900);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={layerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden"
    />
  );
}
