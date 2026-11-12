import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { X, ArrowUpRight, Server } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import ProjectPreview from "./ProjectPreview";

const ProjectModal = ({ project, image, onClose }) => {
  const closeRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    const previous = document.activeElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key !== "Tab" || !panelRef.current) return;
      const f = panelRef.current.querySelectorAll("a[href],button:not([disabled])");
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      previous?.focus?.();
    };
  }, [onClose]);

  const btn = "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors";

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
      <motion.div aria-hidden="true" onClick={onClose} className="absolute inset-0 bg-black/70 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.97 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="surface relative max-h-[90vh] w-full max-w-2xl overflow-y-auto"
      >
        <button ref={closeRef} type="button" onClick={onClose} aria-label="Close project details" className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-full bg-black/60 text-white backdrop-blur transition-colors hover:bg-black/80">
          <X size={20} aria-hidden="true" />
        </button>
        <div className="aspect-[16/9] overflow-hidden rounded-t-[1.25rem]"><ProjectPreview src={image} title={project.title} /></div>
        <div className="p-6 md:p-8">
          <p className="text-sm font-medium text-accent">{project.category}</p>
          <h3 id="project-modal-title" className="mt-1 text-2xl font-bold md:text-3xl">{project.title}</h3>
          <p className="mt-4 leading-relaxed text-mute">{project.desc}</p>

          <h4 className="mt-6 text-sm font-semibold">Features</h4>
          <ul className="mt-2 grid grid-cols-1 gap-x-4 gap-y-1.5 text-sm text-mute sm:grid-cols-2">
            {project.features.map((f) => <li key={f} className="flex gap-2"><span aria-hidden="true" className="text-gold">•</span>{f}</li>)}
          </ul>

          <h4 className="mt-6 text-sm font-semibold">Technologies</h4>
          <ul className="mt-2 flex flex-wrap gap-2">
            {project.tags.map((t) => <li key={t} className="rounded-md border border-line px-2.5 py-1 text-xs text-mute">{t}</li>)}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {project.liveLink && (
              <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className={`${btn} bg-gold text-[#17051F] hover:bg-[#ffe066]`}>
                Live Demo <ArrowUpRight size={16} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span>
              </a>
            )}
            {(project.apiLink || project.backendLink) && (
              <a href={project.apiLink || project.backendLink} target="_blank" rel="noopener noreferrer" className={`${btn} border border-line text-ink hover:border-gold`}>
                <Server size={15} aria-hidden="true" /> Backend API <ArrowUpRight size={15} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span>
              </a>
            )}
            {project.githubLink && (
              <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className={`${btn} border border-line text-ink hover:border-gold`}>
                <FaGithub size={15} aria-hidden="true" /> GitHub Repository<span className="sr-only"> (opens in a new tab)</span>
              </a>
            )}
            {(!project.liveLink && !project.githubLink && !project.apiLink && !project.backendLink) && (
              <p className="text-sm text-mute">Links coming soon.</p>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectModal;
