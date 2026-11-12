import { ArrowUp, ArrowUpRight, Mail, Server } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { site } from "../data/site";

const Footer = () => (
  <footer className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 border-t border-line px-6 py-12 text-sm text-mute md:flex-row md:px-8">
    <div className="text-center md:text-left">
      <p className="font-display text-lg font-semibold text-ink">{site.name}</p>
      <p className="mt-1">Building responsive, practical web applications.</p>
      <div className="mt-3.5 flex flex-wrap items-center justify-center gap-2.5 text-xs md:justify-start">
        {site.livePortfolio && (
          <a
            href={site.livePortfolio}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-line bg-card/60 px-3 py-1 text-ink transition-colors hover:border-gold hover:text-gold"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
            Live Portfolio
            <ArrowUpRight size={12} aria-hidden="true" />
          </a>
        )}
        {site.backendApi && (
          <a
            href={site.backendApi}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-line bg-card/60 px-3 py-1 text-ink transition-colors hover:border-gold hover:text-gold"
          >
            <Server size={12} aria-hidden="true" />
            Backend API
            <ArrowUpRight size={12} aria-hidden="true" />
          </a>
        )}
        {site.portfolioRepo && (
          <a
            href={site.portfolioRepo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-line bg-card/60 px-3 py-1 text-ink transition-colors hover:border-gold hover:text-gold"
          >
            <FaGithub size={12} aria-hidden="true" />
            GitHub Repository
            <ArrowUpRight size={12} aria-hidden="true" />
          </a>
        )}
      </div>
      <p className="mt-3 text-xs text-mute/80">&copy; {new Date().getFullYear()} {site.name}</p>
    </div>

    <div className="flex items-center gap-5 text-xl">
      {site.github && <a href={site.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" className="transition-colors hover:text-gold"><FaGithub /></a>}
      {site.linkedin && <a href={site.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" className="transition-colors hover:text-gold"><FaLinkedin /></a>}
      {site.email && <a href={`mailto:${site.email}`} aria-label="Email" className="transition-colors hover:text-gold"><Mail size={21} /></a>}
      <a href="#home" className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm transition-colors hover:border-gold hover:text-ink">
        <ArrowUp aria-hidden="true" size={14} /> Back to top
      </a>
    </div>
  </footer>
);

export default Footer;
