import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/** Types and deletes each phrase in turn. Reduced motion shows the first phrase statically. */
const TypingText = ({ phrases, className = "" }) => {
  const reduce = useReducedMotion();
  const [text, setText] = useState(reduce ? phrases[0] : "");

  useEffect(() => {
    if (reduce) { setText(phrases[0]); return; }
    let i = 0, c = 0, deleting = false, timer;
    const tick = () => {
      const cur = phrases[i];
      if (!deleting) {
        c += 1; setText(cur.slice(0, c));
        if (c === cur.length) { deleting = true; timer = setTimeout(tick, 1600); return; }
        timer = setTimeout(tick, 70);
      } else {
        c -= 1; setText(cur.slice(0, c));
        if (c === 0) { deleting = false; i = (i + 1) % phrases.length; timer = setTimeout(tick, 300); return; }
        timer = setTimeout(tick, 35);
      }
    };
    timer = setTimeout(tick, 600);
    return () => clearTimeout(timer);
  }, [reduce, phrases]);

  return (
    <span className={className}>
      <span className="sr-only">{phrases.join(", ")}</span>
      <span aria-hidden="true">{text}</span>
      {!reduce && <span aria-hidden="true" className="anim-blink ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.15em] bg-gold" />}
    </span>
  );
};

export default TypingText;
