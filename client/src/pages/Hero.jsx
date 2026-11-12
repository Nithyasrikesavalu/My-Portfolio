import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronDown, MapPin } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import MagneticButton from "../components/MagneticButton";
import PortraitAnimation from "../components/PortraitAnimation";
import TypingText from "../components/TypingText";
import Stars from "../components/Stars";
import { site } from "../data/site";

const PHRASES = ["Full Stack Developer", "React.js Developer", "Software Developer"];
const LINE1 = [{ t: "Hi," }, { t: "I'm" }, { t: "Nithyasri", hl: true }];
const LINE2 = [{ t: "Full" }, { t: "Stack" }, { t: "Developer" }];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } } };
const word = { hidden: { y: "110%" }, show: { y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } } };
const fade = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };

const Words = ({ words }) =>
  words.map((w) => (
    <span key={w.t} className="relative inline-block overflow-hidden pb-[0.16em] align-bottom">
      <motion.span variants={word} className={`inline-block ${w.hl ? "hl" : ""}`}>{w.t}&nbsp;</motion.span>
      {w.hl && (
        <svg aria-hidden="true" viewBox="0 0 100 8" preserveAspectRatio="none" className="absolute bottom-0 left-0 hidden h-[0.14em] w-[92%] dark:block">
          <path d="M0 5 Q 12 0 25 4 T 50 4 T 75 4 T 100 3" stroke="#FFD629" strokeWidth="3" fill="none" strokeLinecap="round" />
        </svg>
      )}
    </span>
  ));

const Hero = () => {
  const reduce = useReducedMotion();
  return (
    <div aria-labelledby="hero-title" role="region" className="cosmos relative isolate flex min-h-screen items-center overflow-hidden px-6 pb-24 pt-28 md:px-8">
      <Stars count={90} particles={10} seed={7} />
      <div aria-hidden="true" className="dots-bg pointer-events-none absolute inset-0 -z-10" />
      <svg aria-hidden="true" viewBox="0 0 800 800" className="pointer-events-none absolute -right-40 top-1/2 -z-10 hidden h-[900px] w-[900px] -translate-y-1/2 lg:block" fill="none">
        <ellipse cx="400" cy="400" rx="380" ry="300" transform="rotate(-20 400 400)" stroke="rgb(168 85 247 / 0.28)" strokeWidth="1.2" />
        <ellipse cx="400" cy="400" rx="300" ry="220" transform="rotate(25 400 400)" stroke="rgb(255 214 41 / 0.2)" strokeWidth="1" strokeDasharray="2 9" />
      </svg>

      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[1.1fr_1fr]">
        <motion.div variants={container} initial={reduce ? "show" : "hidden"} animate="show">
          <motion.p variants={fade} className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-mute">
            <span>{site.role}</span>
            <span className="inline-flex items-center gap-1"><MapPin size={14} aria-hidden="true" /> {site.location}</span>
          </motion.p>

          <h1 id="hero-title" className="text-[2.6rem] font-bold leading-[1.05] text-ink sm:text-6xl lg:text-7xl">
            <span className="block"><Words words={LINE1} /></span>
            <span className="block"><Words words={LINE2} /></span>
          </h1>

          <motion.p variants={fade} className="mt-5 min-h-[2rem] font-display text-xl font-semibold text-accent sm:text-2xl">
            <TypingText phrases={PHRASES} />
          </motion.p>

          <motion.p variants={fade} className="mt-5 max-w-xl text-lg leading-relaxed text-mute">
            I build responsive web applications and intuitive digital experiences using modern frontend and backend technologies.
          </motion.p>

          <motion.div variants={fade} className="mt-9 flex flex-wrap items-center gap-4">
            <MagneticButton href="#about" className="group inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 font-semibold text-[#17051F] shadow-lg shadow-gold/25 transition-[background-color,box-shadow] hover:bg-[#ffe066] hover:shadow-xl hover:shadow-gold/40">
              Get Started <ArrowRight size={18} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1.5" />
            </MagneticButton>
            <MagneticButton href="#projects" className="group inline-flex items-center gap-2 rounded-full border border-line bg-card/50 px-7 py-3.5 font-semibold text-ink backdrop-blur transition-[border-color,box-shadow] hover:border-gold hover:shadow-lg hover:shadow-accent/20">
              View Projects <ArrowRight size={18} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1.5" />
            </MagneticButton>
          </motion.div>

          <motion.div variants={fade} className="mt-8 flex items-center gap-3">
            {site.github && (
              <a href={site.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" className="grid h-11 w-11 place-items-center rounded-full border border-line bg-card/50 text-ink transition-colors hover:border-gold hover:text-gold"><FaGithub size={18} /></a>
            )}
            {site.linkedin && (
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" className="grid h-11 w-11 place-items-center rounded-full border border-line bg-card/50 text-ink transition-colors hover:border-gold hover:text-gold"><FaLinkedin size={18} /></a>
            )}
          </motion.div>
        </motion.div>

        <motion.div initial={reduce ? false : { opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
          <PortraitAnimation />
        </motion.div>
      </div>

      <a href="#about" aria-label="Scroll to About section" className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-xs text-mute transition-colors hover:text-gold md:flex">
        Scroll
        <ChevronDown size={20} aria-hidden="true" className="anim-nudge" />
      </a>
    </div>
  );
};

export default Hero;
