/** Real screenshot when one exists, otherwise a CSS mock-up labelled as such (never a fake screenshot). */
const ProjectPreview = ({ src, title }) =>
  src ? (
    <img src={src} alt={`${title} preview`} loading="lazy" decoding="async" className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-110" />
  ) : (
    <div role="img" aria-label={`${title}: screenshot not added yet`} className="relative h-full w-full overflow-hidden bg-gradient-to-br from-[#260936] via-[#17051F] to-[#080A12] transition-transform duration-700 ease-out group-hover:scale-110">
      <div className="absolute inset-4 rounded-xl border border-white/10 bg-white/[0.03] p-3">
        <div className="flex gap-1.5"><span className="h-2 w-2 rounded-full bg-white/20" /><span className="h-2 w-2 rounded-full bg-white/20" /><span className="h-2 w-2 rounded-full bg-white/20" /></div>
        <div className="mt-3 grid grid-cols-[28%_1fr] gap-3">
          <div className="space-y-2"><div className="h-2 rounded bg-[#A855F7]/60" /><div className="h-2 w-4/5 rounded bg-white/15" /><div className="h-2 w-3/5 rounded bg-white/15" /></div>
          <div className="space-y-2"><div className="h-6 rounded bg-[#FFD629]/80" /><div className="h-2 rounded bg-white/15" /><div className="h-2 w-5/6 rounded bg-white/15" /><div className="h-10 rounded bg-[#A855F7]/25" /></div>
        </div>
        <p className="absolute bottom-3 right-3 text-[10px] text-white/50">Screenshot placeholder</p>
      </div>
    </div>
  );

export default ProjectPreview;
