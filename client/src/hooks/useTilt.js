import { useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";

const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

/**
 * Pointer-driven tilt with spring smoothing.
 * Rotation and parallax are clamped, and everything springs back to rest on leave.
 */
export default function useTilt({ max = 10, parallax = 10 } = {}) {
  const reduce = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spring = { stiffness: 140, damping: 16, mass: 0.5 };
  const sx = useSpring(px, spring);
  const sy = useSpring(py, spring);

  const rotateY = useTransform(sx, (v) => v * 2 * max);
  const rotateX = useTransform(sy, (v) => -v * 2 * max);
  const shiftX = useTransform(sx, (v) => -v * 2 * parallax);
  const shiftY = useTransform(sy, (v) => -v * 2 * parallax);
  const gx = useTransform(sx, (v) => `${(v + 0.5) * 100}%`);
  const gy = useTransform(sy, (v) => `${(v + 0.5) * 100}%`);

  const reset = () => { px.set(0); py.set(0); };
  const handlers = {
    onPointerMove(e) {
      if (reduce) return;
      const r = e.currentTarget.getBoundingClientRect();
      px.set(clamp((e.clientX - r.left) / r.width - 0.5, -0.5, 0.5));
      py.set(clamp((e.clientY - r.top) / r.height - 0.5, -0.5, 0.5));
    },
    onPointerLeave: reset,
    onPointerCancel: reset,
    onPointerUp(e) { if (e.pointerType !== "mouse") reset(); },
  };

  return { handlers, rotateX, rotateY, shiftX, shiftY, gx, gy, enabled: !reduce };
}
