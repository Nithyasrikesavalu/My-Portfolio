import { motion, useSpring, useReducedMotion } from "framer-motion";

const clamp = (v, limit) => Math.max(-limit, Math.min(limit, v));

/** Button/link that leans toward a mouse cursor, capped at `limit` px. Mouse only. */
const MagneticButton = ({ as = "a", strength = 0.25, limit = 10, className = "", children, ...rest }) => {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  const cfg = { stiffness: 220, damping: 18, mass: 0.4 };
  const x = useSpring(0, cfg);
  const y = useSpring(0, cfg);

  const move = (e) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set(clamp((e.clientX - (r.left + r.width / 2)) * strength, limit));
    y.set(clamp((e.clientY - (r.top + r.height / 2)) * strength, limit));
  };
  const leave = () => { x.set(0); y.set(0); };

  return (
    <Tag style={{ x, y }} onPointerMove={move} onPointerLeave={leave} className={className} {...rest}>
      {children}
    </Tag>
  );
};

export default MagneticButton;
