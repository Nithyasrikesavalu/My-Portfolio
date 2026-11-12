import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, FileText, ArrowUpRight, Server } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import ResumeModal from "./ResumeModal";
import { cvUrl, cvExt } from "../lib/assets";
import { site } from "../data/site";

// ids must match the section wrappers in App.jsx
const links = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Design", id: "design" },
  { label: "Projects", id: "projects" },
  { label: "Education", id: "education" },
  { label: "Contact", id: "contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [resumeOpen, setResumeOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleOpenResume = () => setResumeOpen(true);
    window.addEventListener("open-resume", handleOpenResume);
    return () => window.removeEventListener("open-resume", handleOpenResume);
  }, []);

  useEffect(() => {
    const els = links.map((l) => document.getElementById(l.id)).filter(Boolean);
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <nav aria-label="Primary" className={`nav-blur fixed top-0 z-50 w-full ${scrolled || open ? "is-scrolled" : ""}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 md:px-8">
        <a href="#home" className="flex items-center gap-3 font-display text-lg font-semibold text-ink" aria-label="Nithyasri K, back to top">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-gold text-sm font-bold text-[#17051F] shadow-md shadow-gold/30">NK</span>
          <span className="hidden sm:inline">Nithyasri K</span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={l.id} className="relative">
              <a
                href={`#${l.id}`}
                aria-current={active === l.id ? "true" : undefined}
                className={`relative block px-3.5 py-2 text-sm font-medium transition-colors after:absolute after:inset-x-3.5 after:bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-ink/40 after:transition-transform after:duration-300 hover:after:scale-x-100 ${active === l.id ? "text-ink" : "text-mute hover:text-ink"}`}
              >
                {l.label}
                {active === l.id && (
                  <motion.span layoutId="nav-indicator" className="absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-gold" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
                )}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2.5 sm:gap-3">
          {site.livePortfolio && (
            <a
              href={site.livePortfolio}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden xl:inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-400 transition-all hover:border-emerald-400 hover:bg-emerald-500/20"
              title="Live Portfolio on Vercel"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
              <span>Live</span>
              <ArrowUpRight size={12} aria-hidden="true" />
            </a>
          )}
          {site.backendApi && (
            <a
              href={site.backendApi}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden xl:inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1.5 text-xs font-semibold text-accent transition-all hover:border-accent hover:bg-accent/20"
              title="Backend API on Render"
            >
              <Server size={12} aria-hidden="true" />
              <span>API</span>
              <ArrowUpRight size={12} aria-hidden="true" />
            </a>
          )}
          {cvUrl && (
            <button
              type="button"
              onClick={() => setResumeOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-line bg-card/60 px-4 py-2 text-xs font-semibold text-ink transition-all hover:border-gold hover:text-gold hover:shadow-md hover:shadow-gold/15"
            >
              <FileText className="h-3.5 w-3.5 text-gold" />
              <span>Resume</span>
            </button>
          )}
          <ThemeToggle />
          <button
            className="grid h-10 w-10 place-items-center rounded-lg text-ink lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.ul
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mx-auto flex max-w-7xl flex-col px-4 pb-4 lg:hidden"
          >
            {links.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={() => setOpen(false)}
                  aria-current={active === l.id ? "true" : undefined}
                  className={`block rounded-lg px-3 py-3 text-lg ${active === l.id ? "bg-card text-gold" : "text-mute"}`}
                >
                  {l.label}
                </a>
              </li>
            ))}
            {cvUrl && (
              <li className="mt-2 pt-2 border-t border-line/40">
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    setResumeOpen(true);
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gold/15 border border-gold/30 py-3 text-base font-semibold text-gold transition-colors hover:bg-gold hover:text-[#17051F]"
                >
                  <FileText className="h-4 w-4" />
                  <span>View Resume</span>
                </button>
              </li>
            )}
            {(site.livePortfolio || site.backendApi) && (
              <li className="mt-2 pt-2 border-t border-line/40 grid grid-cols-2 gap-2">
                {site.livePortfolio && (
                  <a
                    href={site.livePortfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 py-2.5 text-xs font-semibold text-emerald-400 transition-colors hover:bg-emerald-500/20"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Live Portfolio</span>
                    <ArrowUpRight size={12} />
                  </a>
                )}
                {site.backendApi && (
                  <a
                    href={site.backendApi}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 rounded-xl border border-accent/30 bg-accent/10 py-2.5 text-xs font-semibold text-accent transition-colors hover:bg-accent/20"
                  >
                    <Server size={12} />
                    <span>Backend API</span>
                    <ArrowUpRight size={12} />
                  </a>
                )}
              </li>
            )}
          </motion.ul>
        )}
      </AnimatePresence>

      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </nav>
  );
};

export default Navbar;
