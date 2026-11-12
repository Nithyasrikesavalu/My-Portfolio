import { useCallback, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ArrowUpRight, Eye, Server } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Reveal from "../components/Reveal";
import TiltCard from "../components/TiltCard";
import ProjectPreview from "../components/ProjectPreview";
import ProjectModal from "../components/ProjectModal";
import { projects } from "../data/projects";
import { projectImages } from "../lib/assets";

const Projects = () => {
  const [selected, setSelected] = useState(null);
  const close = useCallback(() => setSelected(null), []);
  const btn = "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors";

  return (
    <div role="region" aria-labelledby="projects-title" className="mx-auto max-w-7xl px-6 py-28 md:px-8">
      <Reveal>
        <h2 id="projects-title" className="text-4xl font-bold md:text-5xl">Featured <span className="hl">Projects</span></h2>
        <p className="mt-4 max-w-2xl text-lg text-mute">Web applications built with React.js on the frontend and Node.js and Express.js on the backend.</p>
      </Reveal>

      <ul className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => {
          const img = projectImages[p.imageKey] ?? null;
          return (
            <Reveal as="li" key={p.id} delay={(i % 3) * 0.08} className="group flex">
              <TiltCard className="flex w-full flex-col rounded-2xl border border-line bg-card shadow-[var(--shadow-card)] transition-[box-shadow,border-color,transform] duration-300 hover:-translate-y-1.5 hover:border-accent/60 hover:shadow-[0_0_0_1px_rgb(168_85_247/0.4),0_30px_70px_-28px_rgb(168_85_247/0.6)]">
                <div className="flex h-full flex-col">
                  {/* mouse/touch shortcut; the labelled View Details button below is the accessible control */}
                  <button type="button" tabIndex={-1} aria-hidden="true" onClick={() => setSelected(p)} className="relative block aspect-[16/10] w-full overflow-hidden border-b border-line">
                    <ProjectPreview src={img} title={p.title} />
                  </button>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-xs font-medium text-accent">{p.category}</p>
                    <h3 className="mt-1.5 text-xl font-bold leading-tight">{p.title}</h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-mute">{p.desc}</p>
                    <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies used">
                      {p.tags.slice(0, 5).map((t) => <li key={t} className="rounded-md border border-line px-2 py-0.5 text-xs text-mute">{t}</li>)}
                      {p.tags.length > 5 && <li className="rounded-md border border-line px-2 py-0.5 text-xs text-mute">+{p.tags.length - 5}</li>}
                    </ul>
                    <div className="mt-6 flex flex-1 flex-wrap items-end gap-2">
                      <button type="button" onClick={() => setSelected(p)} className={`${btn} bg-gold text-[#17051F] hover:bg-[#ffe066]`}>
                        <Eye size={15} aria-hidden="true" /> View Details<span className="sr-only"> for {p.title}</span>
                      </button>
                      {p.liveLink && (
                        <a href={p.liveLink} target="_blank" rel="noopener noreferrer" className={`${btn} group/b border border-line text-ink hover:border-gold`}>
                          Live Demo <ArrowUpRight size={14} aria-hidden="true" className="transition-transform duration-300 group-hover/b:-translate-y-0.5 group-hover/b:translate-x-0.5" /><span className="sr-only"> for {p.title} (opens in a new tab)</span>
                        </a>
                      )}
                      {(p.apiLink || p.backendLink) && (
                        <a href={p.apiLink || p.backendLink} target="_blank" rel="noopener noreferrer" className={`${btn} group/b border border-line text-ink hover:border-gold`}>
                          <Server size={14} aria-hidden="true" /> Backend API <ArrowUpRight size={14} aria-hidden="true" className="transition-transform duration-300 group-hover/b:-translate-y-0.5 group-hover/b:translate-x-0.5" /><span className="sr-only"> for {p.title} (opens in a new tab)</span>
                        </a>
                      )}
                      {p.githubLink && (
                        <a href={p.githubLink} target="_blank" rel="noopener noreferrer" className={`${btn} group/b border border-line text-ink hover:border-gold`}>
                          <FaGithub size={14} aria-hidden="true" /> GitHub Repository<span className="sr-only"> for {p.title} (opens in a new tab)</span>
                        </a>
                      )}
                    </div>
                    {!p.githubLink && !p.liveLink && !p.apiLink && !p.backendLink && <p className="mt-3 text-xs text-mute">Links coming soon.</p>}
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          );
        })}
      </ul>

      <AnimatePresence>
        {selected && <ProjectModal key={selected.id} project={selected} image={projectImages[selected.imageKey] ?? null} onClose={close} />}
      </AnimatePresence>
    </div>
  );
};

export default Projects;
