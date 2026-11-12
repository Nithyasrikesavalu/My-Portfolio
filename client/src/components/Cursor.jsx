import { useEffect, useRef } from "react";

// Desktop-class pointers only: fine pointer, hover support and a tablet-or-larger viewport.
const QUERY = "(hover: hover) and (pointer: fine) and (min-width: 768px)";
const REDUCED = "(prefers-reduced-motion: reduce)";
const INTERACTIVE = "a,button,summary,[role='button'],[data-cursor]";
const TEXTUAL = "input,textarea,select,[contenteditable='true']";

/** Attaches the cursor behaviour and returns a cleanup. Positions are written straight to the DOM (no React state). */
function enable(d, r, l) {
  const root = document.documentElement;
  root.classList.add("custom-cursor");

  let tx = 0, ty = 0, rx = 0, ry = 0, raf = 0, shown = false;
  const both = (key, val) => { d.dataset[key] = val; r.dataset[key] = val; };

  const loop = () => {
    rx += (tx - rx) * 0.18;
    ry += (ty - ry) * 0.18;
    r.style.transform = `translate3d(${rx}px,${ry}px,0)`;
    raf = Math.abs(tx - rx) > 0.1 || Math.abs(ty - ry) > 0.1 ? requestAnimationFrame(loop) : 0;
  };
  const onMove = (e) => {
    if (e.pointerType && e.pointerType !== "mouse") return;
    tx = e.clientX; ty = e.clientY;
    d.style.transform = `translate3d(${tx}px,${ty}px,0)`;
    if (!shown) { shown = true; rx = tx; ry = ty; both("show", "1"); }
    if (!raf) raf = requestAnimationFrame(loop);
  };
  const onOver = (e) => {
    const t = e.target;
    if (!(t instanceof Element)) return;
    if (t.closest(TEXTUAL)) return both("mode", "text");
    const tagged = t.closest("[data-cursor-label]");
    if (tagged) { l.textContent = tagged.dataset.cursorLabel; return both("mode", "label"); }
    both("mode", t.closest(INTERACTIVE) ? "hover" : "idle");
  };
  const onDown = () => { r.dataset.press = "1"; };
  const onUp = () => { r.dataset.press = "0"; };
  const onLeave = () => { shown = false; both("show", "0"); };

  window.addEventListener("pointermove", onMove, { passive: true });
  document.addEventListener("pointerover", onOver, { passive: true });
  document.addEventListener("pointerdown", onDown);
  document.addEventListener("pointerup", onUp);
  root.addEventListener("mouseleave", onLeave);

  return () => {
    window.removeEventListener("pointermove", onMove);
    document.removeEventListener("pointerover", onOver);
    document.removeEventListener("pointerdown", onDown);
    document.removeEventListener("pointerup", onUp);
    root.removeEventListener("mouseleave", onLeave);
    cancelAnimationFrame(raf);
    both("show", "0");
    root.classList.remove("custom-cursor");
  };
}

const Cursor = () => {
  const dot = useRef(null);
  const ring = useRef(null);
  const label = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia(QUERY);
    const reduced = window.matchMedia(REDUCED);
    let teardown = null;
    // Re-evaluated when the window is resized or the reduced-motion preference changes.
    const sync = () => {
      if (teardown) { teardown(); teardown = null; }
      if (fine.matches && !reduced.matches) teardown = enable(dot.current, ring.current, label.current);
    };
    sync();
    fine.addEventListener("change", sync);
    reduced.addEventListener("change", sync);
    return () => {
      fine.removeEventListener("change", sync);
      reduced.removeEventListener("change", sync);
      if (teardown) teardown();
    };
  }, []);

  return (
    <>
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
      <div ref={ring} className="cursor-ring" aria-hidden="true">
        <div className="cursor-ring-inner"><span ref={label} className="cursor-label" /></div>
      </div>
    </>
  );
};

export default Cursor;
