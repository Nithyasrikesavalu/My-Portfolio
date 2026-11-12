import { SiFigma } from "react-icons/si";
import Reveal from "../components/Reveal";
import TiltCard from "../components/TiltCard";

// Adobe tools are shown as the familiar two-letter app tiles in each app's colours (not official logo files).
const Tile = ({ bg, fg, children }) => (
  <span
    aria-hidden="true"
    className="grid h-16 w-16 place-items-center rounded-2xl text-2xl font-bold shadow-lg"
    style={{ background: bg, color: fg, fontFamily: "var(--font-display)" }}
  >
    {children}
  </span>
);

const tools = [
  {
    name: "Figma",
    use: "Interface design, wireframes and clickable prototypes.",
    mark: <span aria-hidden="true" className="grid h-16 w-16 place-items-center rounded-2xl bg-white text-4xl shadow-lg ring-1 ring-line"><SiFigma className="text-[#F24E1E]" /></span>,
  },
  {
    name: "Adobe XD",
    use: "UI layouts and prototypes for screens and user flows.",
    mark: <Tile bg="#470137" fg="#FF61F6">Xd</Tile>,
  },
  {
    name: "Adobe Illustrator",
    use: "Vector graphics, icons and logos that stay sharp at any size.",
    mark: <Tile bg="#330000" fg="#FF9A00">Ai</Tile>,
  },
  {
    name: "Adobe Photoshop",
    use: "Image editing and graphics for web visuals.",
    mark: <Tile bg="#001E36" fg="#31A8FF">Ps</Tile>,
  },
];

const Design = () => (
  <div role="region" aria-labelledby="design-title" className="relative mx-auto max-w-7xl overflow-hidden px-6 py-28 md:px-8">
    <Reveal>
      <h2 id="design-title" className="text-4xl font-bold md:text-5xl">UI/UX &amp; <span className="hl">Creative Design</span></h2>
      <p className="mt-4 max-w-2xl text-lg text-mute">
        Design tools I use alongside code: planning an interface, prototyping a flow, and producing graphics for the web.
      </p>
    </Reveal>

    <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {tools.map((t, i) => (
        <Reveal as="li" key={t.name} delay={i * 0.08}>
          <TiltCard className="group rounded-3xl border border-line bg-gradient-to-br from-card via-card to-tint p-7 shadow-[0_20px_50px_-30px_rgb(168_85_247/0.5)] transition-[box-shadow,border-color,transform] duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_30px_60px_-28px_rgb(168_85_247/0.6)]">
            <div className="anim-float inline-block" style={{ animationDelay: `${-i * 1.2}s` }}>
              <div className="transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">{t.mark}</div>
            </div>
            <h3 className="mt-6 text-xl font-bold">{t.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-mute">{t.use}</p>
          </TiltCard>
        </Reveal>
      ))}
    </ul>
  </div>
);

export default Design;
