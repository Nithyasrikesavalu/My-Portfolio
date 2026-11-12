import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Download, GraduationCap, Eye } from "lucide-react";
import Reveal from "../components/Reveal";
import MagneticButton from "../components/MagneticButton";
import { profileAboutImg, cvUrl, cvExt } from "../lib/assets";

const interests = [
  "Frontend development with React.js",
  "Backend APIs with Node.js and Express.js",
  "SQL and MongoDB data handling",
  "Responsive web design",
  "Connecting interfaces to backend services",
  "Learning React Native",
];

const facts = [
  { k: "Based in", v: "Chennai, India" },
  { k: "Languages", v: "English, Tamil, Telugu" },
  { k: "Certifications", v: "MERN Full Stack (SLA Institute), JavaScript (IBM)" },
];

const About = () => {
  const reduce = useReducedMotion();
  return (
    <div role="region" aria-labelledby="about-title" className="mx-auto max-w-7xl px-6 py-28 md:px-8">
      <div className="grid items-center gap-16 lg:grid-cols-12">
        <motion.figure
          initial={reduce ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-sm lg:max-w-md lg:col-span-5 flex items-center justify-center"
        >
          {profileAboutImg ? (
            <div className="relative w-full aspect-[4/5] max-w-[420px]">
              <img
                src={profileAboutImg}
                alt="Nithyasri K"
                loading="lazy"
                decoding="async"
                width="800"
                height="1000"
                className="w-full h-full object-contain filter drop-shadow-[0_20px_45px_rgba(168,85,247,0.3)] transition-transform duration-500 hover:scale-[1.02]"
              />
            </div>
          ) : (
            <div className="rounded-[28px] border border-line bg-card p-6 text-center">
              <span className="block font-display text-5xl font-bold text-gold">NK</span>
              <p className="mt-2 text-sm text-mute">Photo placeholder</p>
            </div>
          )}
        </motion.figure>

        <div className="lg:col-span-7">
          <Reveal>
            <h2 id="about-title" className="text-4xl font-bold md:text-5xl">About <span className="hl">Nithyasri</span></h2>
          </Reveal>

          <div className="mt-6 max-w-[62ch] space-y-4 text-lg leading-relaxed text-mute">
            <Reveal as="p" delay={0.05}>
              I&apos;m an aspiring software developer focused on building clean, responsive, and practical web applications. I work with
              modern frontend technologies and backend APIs to create complete user experiences.
            </Reveal>
            <Reveal as="p" delay={0.1}>
              My projects include a robotics course platform, a multi-vendor service booking app and a coffee shop store, built with React.js,
              Node.js, Express.js and MongoDB, with work on SQL-backed applications as well.
            </Reveal>
          </div>

          <Reveal delay={0.11}>
            <p className="mt-5 font-serif italic text-2xl tracking-wide text-sky drop-shadow-[0_0_12px_rgba(192,132,252,0.5)]">
              Nithyasri K
            </p>
          </Reveal>

          <Reveal delay={0.12} className="mt-8">
            <div className="surface flex items-start gap-4 p-5">
              <span aria-hidden="true" className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gold/15 text-gold"><GraduationCap size={24} /></span>
              <div>
                <h3 className="text-lg font-bold">Master of Computer Applications (MCA)</h3>
                <p className="text-mute">University of Madras</p>
                <p className="mt-2 inline-block rounded-full border border-gold/50 px-3 py-0.5 text-xs font-medium text-ink">Currently pursuing</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.13} className="mt-8">
            <h3 className="mb-3 text-sm font-medium text-mute">Technical interests</h3>
            <ul className="flex flex-wrap gap-2">
              {interests.map((t) => (
                <li key={t} className="rounded-full border border-line bg-card/60 px-3.5 py-1.5 text-sm text-ink">{t}</li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.14} className="mt-8">
            <dl className="surface divide-y divide-line">
              {facts.map((f) => (
                <div key={f.k} className="grid grid-cols-[7.5rem_1fr] gap-4 px-6 py-3.5">
                  <dt className="text-sm text-mute">{f.k}</dt>
                  <dd className="text-ink">{f.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.16} className="mt-9 flex flex-wrap items-center gap-4">
            <MagneticButton href="#contact" className="group inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 font-semibold text-[#17051F] shadow-lg shadow-gold/25 transition-[background-color,box-shadow] hover:bg-[#ffe066] hover:shadow-xl hover:shadow-gold/40">
              Hire Me <ArrowRight size={18} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1.5" />
            </MagneticButton>
            {cvUrl && (
              <>
                <MagneticButton
                  as="button"
                  type="button"
                  onClick={() => window.dispatchEvent(new CustomEvent("open-resume"))}
                  className="group inline-flex items-center gap-2 rounded-full border border-line bg-card/60 px-6 py-3.5 font-semibold text-ink transition-[border-color,box-shadow] hover:border-gold hover:text-gold hover:shadow-lg hover:shadow-accent/20"
                >
                  <Eye size={18} aria-hidden="true" /> View Resume
                </MagneticButton>
                <MagneticButton
                  href={cvUrl}
                  download={`Nithyasri_Resume${cvExt}`}
                  className="group inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-6 py-3.5 font-semibold text-gold transition-[border-color,box-shadow,background-color] hover:bg-gold hover:text-[#17051F] hover:shadow-md hover:shadow-gold/25"
                >
                  <Download size={18} aria-hidden="true" /> Download CV
                </MagneticButton>
              </>
            )}
          </Reveal>
        </div>
      </div>
    </div>
  );
};

export default About;
