import { ArrowUp, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { site } from "../data/site";

const Footer = () => (
  <footer className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 border-t border-line px-6 py-12 text-sm text-mute md:flex-row md:px-8">
    <div className="text-center md:text-left">
      <p className="font-display text-lg font-semibold text-ink">{site.name}</p>
      <p className="mt-1">Building responsive, practical web applications.</p>
      <p className="mt-1">&copy; {new Date().getFullYear()} {site.name}</p>
    </div>

    <div className="flex items-center gap-5 text-xl">
      {site.github && <a href={site.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="transition-colors hover:text-gold"><FaGithub /></a>}
      {site.linkedin && <a href={site.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="transition-colors hover:text-gold"><FaLinkedin /></a>}
      {site.email && <a href={`mailto:${site.email}`} aria-label="Email" className="transition-colors hover:text-gold"><Mail size={21} /></a>}
      <a href="#home" className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm transition-colors hover:border-gold hover:text-ink">
        <ArrowUp aria-hidden="true" size={14} /> Back to top
      </a>
    </div>
  </footer>
);

export default Footer;
