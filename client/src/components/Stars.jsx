import { useMemo } from "react";

// Small seeded RNG so the layout is stable between renders.
const rng = (seed) => () => {
  seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

/** CSS-only twinkling stars and slow drifting glow particles. Put inside a `relative isolate` parent. */
const Stars = ({ count = 60, particles = 0, seed = 1 }) => {
  const stars = useMemo(() => {
    const r = rng(seed);
    return Array.from({ length: count }, () => ({
      x: r() * 100, y: r() * 100,
      s: r() < 0.14 ? 3 : r() < 0.5 ? 2 : 1,
      d: 3 + r() * 4, dl: -r() * 6, gold: r() < 0.12,
    }));
  }, [count, seed]);
  const glow = useMemo(() => {
    const r = rng(seed + 99);
    return Array.from({ length: particles }, () => ({ x: r() * 100, y: 40 + r() * 60, d: 12 + r() * 10, dl: -r() * 12 }));
  }, [particles, seed]);

  return (
    <div aria-hidden="true" className="cosmos-layer pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {stars.map((s, i) => (
        <span key={i} className="star" style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.s, height: s.s, background: s.gold ? "#FFD629" : undefined, "--d": `${s.d}s`, "--dl": `${s.dl}s` }} />
      ))}
      {glow.map((p, i) => (
        <span key={`p${i}`} className="particle" style={{ left: `${p.x}%`, top: `${p.y}%`, "--d": `${p.d}s`, "--dl": `${p.dl}s` }} />
      ))}
    </div>
  );
};

export default Stars;
