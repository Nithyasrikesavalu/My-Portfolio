import { motion, useMotionTemplate } from "framer-motion";
import useTilt from "../hooks/useTilt";
import { profileHeroImg, profileImg } from "../lib/assets";

// Labels hidden on small screens keep the mobile composition uncluttered.
const labels = [
  { t: "React.js", pos: "top-[8%] -left-1 sm:-left-8", z: 70, d: "0s" },
  { t: "Node.js", pos: "top-[40%] -right-1 sm:-right-10", z: 90, d: "-1.5s" },
  { t: "MongoDB", pos: "bottom-[10%] -left-2 sm:-left-10 hidden sm:block", z: 60, d: "-3s" },
  { t: "SQL", pos: "bottom-[2%] right-[10%] hidden sm:block", z: 80, d: "-4.5s" },
];

const dot = "absolute h-3 w-3 rounded-full";

const PortraitAnimation = () => {
  const { handlers, rotateX, rotateY, shiftX, shiftY, gx, gy, enabled } = useTilt({ max: 8, parallax: 10 });
  const spot = useMotionTemplate`radial-gradient(200px circle at ${gx} ${gy}, rgb(255 255 255 / 0.22), rgb(168 85 247 / 0.14) 55%, transparent 75%)`;

  return (
    // touch-action keeps vertical scrolling working; on phones the card tilts while held
    <div className="relative mx-auto aspect-square w-full max-w-[360px] [perspective:1100px] [touch-action:pan-y] sm:max-w-[480px]" {...handlers}>
      <motion.div style={enabled ? { rotateX, rotateY, transformStyle: "preserve-3d" } : undefined} className="absolute inset-0">
        {/* outer orbit: slow, reverse direction, with travelling particles */}
        <div aria-hidden="true" className="anim-spin-rev absolute inset-0 rounded-full border border-dashed border-accent/40 pointer-events-none">
          <span className={`${dot} -top-1.5 left-1/2 -translate-x-1/2 bg-gold shadow-[0_0_14px_#FFD629]`} />
          <span className={`${dot} -bottom-1.5 left-[30%] h-2 w-2 bg-accent shadow-[0_0_12px_#A855F7]`} />
        </div>
        
        {!profileHeroImg && (
          <>
            {/* middle orbit */}
            <div aria-hidden="true" className="anim-spin-slow absolute inset-[7%] rounded-full border border-accent/25">
              <span className={`${dot} top-[18%] -left-1.5 h-2 w-2 bg-gold shadow-[0_0_12px_#FFD629]`} />
            </div>
            {/* neon border */}
            <div aria-hidden="true" className="neon-ring anim-spin absolute inset-[13%] rounded-full" />
          </>
        )}

        {/* portrait */}
        <div className="absolute inset-0 flex items-center justify-center">
          {profileHeroImg ? (
            <motion.img
              src={profileHeroImg}
              alt="Portrait of Nithyasri K"
              width="1000"
              height="1000"
              fetchpriority="high"
              style={enabled ? { x: shiftX, y: shiftY, scale: 1.05 } : undefined}
              className="h-full w-full object-contain filter drop-shadow-[0_15px_45px_rgba(168,85,247,0.35)]"
            />
          ) : profileImg ? (
            <div className="absolute inset-[16%] overflow-hidden rounded-full bg-tint shadow-[0_0_70px_rgb(168_85_247/0.45)] ring-1 ring-line">
              <motion.img
                src={profileImg}
                alt="Portrait of Nithyasri K"
                width="720"
                height="720"
                fetchpriority="high"
                style={enabled ? { x: shiftX, y: shiftY, scale: 1.12 } : undefined}
                className="h-full w-full object-cover object-top"
              />
              <motion.div aria-hidden="true" style={{ background: spot }} className="pointer-events-none absolute inset-0" />
            </div>
          ) : (
            <div className="grid h-[70%] w-[70%] place-items-center rounded-full bg-tint p-4 text-center ring-1 ring-line">
              <div>
                <p className="font-display text-5xl font-bold text-gold sm:text-6xl">NK</p>
                <p className="mt-2 text-xs text-mute">Portrait placeholder</p>
              </div>
            </div>
          )}
        </div>

        {labels.map((l) => (
          <div key={l.t} aria-hidden="true" className={`absolute ${l.pos}`} style={{ transform: `translateZ(${l.z}px)` }}>
            <div className="anim-float glass rounded-full px-3.5 py-1.5 text-sm font-medium text-ink shadow-lg" style={{ animationDelay: l.d }}>{l.t}</div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default PortraitAnimation;
