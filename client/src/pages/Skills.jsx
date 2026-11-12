import { useState } from "react";
import {
  SiHtml5, SiJavascript, SiReact, SiAngular, SiVite, SiNodedotjs, SiExpress, SiMysql, SiMongodb,
  SiJsonwebtokens, SiTailwindcss, SiNpm, SiGit, SiGithub, SiBootstrap,
} from "react-icons/si";
import { VscCode } from "react-icons/vsc";
import { FaCss3Alt, FaMicrosoft } from "react-icons/fa6";
import {
  Database, Code, Smartphone, Server, Globe, FileJson, RefreshCw, Link as LinkIcon,
  Search, Pencil, Layers, Monitor, Layout, Wrench, Sparkles, Terminal, CheckCircle2,
} from "lucide-react";
import Reveal from "../components/Reveal";

const groups = [
  {
    id: "frontend",
    title: "Frontend Development",
    subtitle: "Client-side interfaces, responsive layouts & interactive web apps",
    icon: <Layout className="h-5 w-5 text-[#3FC8EE]" />,
    badgeColor: "border-[#3FC8EE]/30 text-[#3FC8EE] bg-[#3FC8EE]/10",
    glowGradient: "from-[#3FC8EE]/20 via-[#A855F7]/10 to-transparent",
    accentBorder: "group-hover:border-[#3FC8EE]/50",
    items: [
      { icon: <SiHtml5 className="text-[#E34F26]" />, name: "HTML5" },
      { icon: <FaCss3Alt className="text-[#2D8CE0]" />, name: "CSS3" },
      { icon: <SiJavascript className="text-[#F7DF1E]" />, name: "JavaScript (ES6+)" },
      { icon: <SiReact className="text-[#3FC8EE]" />, name: "React.js" },
      { icon: <SiAngular className="text-[#EE3A4F]" />, name: "Angular" },
      { icon: <SiTailwindcss className="text-[#22C3DD]" />, name: "Tailwind CSS" },
      { icon: <Monitor className="text-gold" />, name: "Responsive Design" },
      { icon: <Code className="text-gold" />, name: "DOM Manipulation" },
    ],
  },
  {
    id: "backend",
    title: "Backend Development",
    subtitle: "Server architecture, RESTful API endpoints & secure authentication",
    icon: <Server className="h-5 w-5 text-[#5FB04E]" />,
    badgeColor: "border-[#5FB04E]/30 text-[#5FB04E] bg-[#5FB04E]/10",
    glowGradient: "from-[#5FB04E]/20 via-[#A855F7]/10 to-transparent",
    accentBorder: "group-hover:border-[#5FB04E]/50",
    items: [
      { icon: <SiNodedotjs className="text-[#5FB04E]" />, name: "Node.js" },
      { icon: <SiExpress className="text-ink" />, name: "Express.js" },
      { icon: <Server className="text-gold" />, name: "REST APIs" },
      { icon: <LinkIcon className="text-gold" />, name: "API Integration" },
      { icon: <SiJsonwebtokens className="text-[#D63AFF]" />, name: "JWT Auth" },
      { icon: <Globe className="text-gold" />, name: "HTTP / HTTPS" },
      { icon: <FileJson className="text-gold" />, name: "JSON" },
      { icon: <RefreshCw className="text-gold" />, name: "AJAX" },
    ],
  },
  {
    id: "database",
    title: "Database Management",
    subtitle: "Relational & NoSQL data models with full CRUD operations",
    icon: <Database className="h-5 w-5 text-[#4F9BC8]" />,
    badgeColor: "border-[#4F9BC8]/30 text-[#4F9BC8] bg-[#4F9BC8]/10",
    glowGradient: "from-[#4F9BC8]/20 via-[#4FAA4F]/10 to-transparent",
    accentBorder: "group-hover:border-[#4F9BC8]/50",
    items: [
      { icon: <Database className="text-gold" />, name: "SQL" },
      { icon: <SiMysql className="text-[#4F9BC8]" />, name: "MySQL" },
      { icon: <Search className="text-gold" />, name: "SQL Queries" },
      { icon: <SiMongodb className="text-[#4FAA4F]" />, name: "MongoDB" },
      { icon: <Pencil className="text-gold" />, name: "CRUD Operations" },
      { icon: <Layers className="text-gold" />, name: "Data Architecture" },
    ],
  },
  {
    id: "tools",
    title: "Tools & Workflow",
    subtitle: "Version control, build bundlers & modern developer utilities",
    icon: <Wrench className="h-5 w-5 text-[#F05032]" />,
    badgeColor: "border-[#F05032]/30 text-[#F05032] bg-[#F05032]/10",
    glowGradient: "from-[#F05032]/20 via-[#A855F7]/10 to-transparent",
    accentBorder: "group-hover:border-[#F05032]/50",
    items: [
      { icon: <SiGit className="text-[#F05032]" />, name: "Git" },
      { icon: <SiGithub className="text-ink" />, name: "GitHub" },
      { icon: <SiVite className="text-[#A78BFA]" />, name: "Vite" },
      { icon: <VscCode className="text-[#3FA0F0]" />, name: "VS Code" },
      { icon: <SiNpm className="text-[#E24544]" />, name: "NPM" },
      { icon: <FaMicrosoft className="text-[#00A4EF]" />, name: "MS Office" },
      { icon: <SiBootstrap className="text-[#9B72E0]" />, name: "Bootstrap" },
    ],
  },
  {
    id: "mobile",
    title: "Mobile Development",
    subtitle: "Cross-platform mobile applications for iOS & Android",
    icon: <Smartphone className="h-5 w-5 text-[#A855F7]" />,
    badgeColor: "border-[#A855F7]/30 text-[#A855F7] bg-[#A855F7]/10",
    glowGradient: "from-[#A855F7]/25 via-[#C084FC]/10 to-transparent",
    accentBorder: "group-hover:border-[#A855F7]/50",
    isFeatured: true,
    items: [
      { icon: <Smartphone className="text-gold" />, name: "React Native", note: "Learning" },
    ],
  },
];

const Skills = () => {
  const [filter, setFilter] = useState("all");

  const filteredGroups = filter === "all" ? groups : groups.filter((g) => g.id === filter);

  return (
    <section role="region" aria-labelledby="skills-title" className="mx-auto max-w-7xl px-6 py-28 md:px-8">
      {/* Header */}
      <Reveal>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-line bg-card/60 px-3.5 py-1 text-xs font-semibold text-accent backdrop-blur-md mb-4 shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-gold animate-pulse" />
              <span>Technical Capabilities</span>
            </div>
            <h2 id="skills-title" className="text-4xl font-bold tracking-tight md:text-5xl">
              My <span className="hl">Skills</span> & Tech Stack
            </h2>
            <p className="mt-3 max-w-xl text-base text-mute md:text-lg">
              A comprehensive toolkit of languages, frameworks, databases, and workflows applied across full-stack applications.
            </p>
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-line bg-card/80 p-1.5 backdrop-blur-md self-start md:self-end">
            <button
              onClick={() => setFilter("all")}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 ${
                filter === "all"
                  ? "bg-accent text-white shadow-md shadow-accent/25"
                  : "text-mute hover:text-ink hover:bg-page/60"
              }`}
            >
              All Skills ({groups.reduce((acc, g) => acc + g.items.length, 0)})
            </button>
            {groups.map((g) => (
              <button
                key={g.id}
                onClick={() => setFilter(g.id)}
                className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${
                  filter === g.id
                    ? "bg-accent text-white shadow-md shadow-accent/25"
                    : "text-mute hover:text-ink hover:bg-page/60"
                }`}
              >
                {g.title.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Skills Grid */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {filteredGroups.map((grp, gi) => {
          const isTools = grp.id === "tools" && filter === "all";
          const isMobile = grp.id === "mobile" && filter === "all";

          return (
            <Reveal
              key={grp.id}
              delay={(gi % 3) * 0.06}
              className={`h-full ${isTools ? "lg:col-span-2" : ""} ${isMobile ? "lg:col-span-1" : ""}`}
            >
              <div
                className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-line/80 bg-gradient-to-b from-card/90 via-card/75 to-card/95 p-6 backdrop-blur-xl shadow-xl transition-all duration-300 hover:-translate-y-1.5 ${grp.accentBorder} hover:shadow-[0_22px_50px_-15px_rgba(168,85,247,0.35)]`}
              >
                {/* Top Radiant Light Bar */}
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-accent/80 to-transparent opacity-30 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Subtle Ambient Nebula Glow in Corner */}
                <div
                  className={`pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-gradient-to-br ${grp.glowGradient} blur-3xl opacity-30 transition-opacity duration-500 group-hover:opacity-75`}
                />

                {/* Card Header */}
                <div>
                  <div className="relative mb-5 flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-line bg-page/90 shadow-sm transition-transform duration-300 group-hover:scale-105 group-hover:border-accent/40">
                        {grp.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold tracking-tight text-ink group-hover:text-accent transition-colors">
                          {grp.title}
                        </h3>
                        <p className="text-xs text-mute mt-0.5 line-clamp-1">{grp.subtitle}</p>
                      </div>
                    </div>
                    <span className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold border ${grp.badgeColor}`}>
                      {grp.items.length} {grp.items.length === 1 ? "skill" : "skills"}
                    </span>
                  </div>

                  {/* Skill Items List */}
                  {isMobile ? (
                    <div className="mt-4 flex flex-col justify-between h-[calc(100%-80px)]">
                      <div className="group/item flex items-center justify-between gap-3 rounded-2xl border border-line/80 bg-page/70 p-4 transition-all duration-300 hover:border-accent/60 hover:bg-tint hover:shadow-md">
                        <div className="flex items-center gap-3.5">
                          <span
                            aria-hidden="true"
                            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line/60 bg-card/90 text-2xl text-accent shadow-inner transition-transform duration-300 group-hover/item:scale-110 group-hover/item:-rotate-6"
                          >
                            <Smartphone className="h-6 w-6 text-[#A855F7]" />
                          </span>
                          <div>
                            <span className="text-base font-bold text-ink group-hover/item:text-accent transition-colors block">
                              React Native
                            </span>
                            <span className="text-xs text-mute">Cross-Platform iOS & Android</span>
                          </div>
                        </div>

                        <span className="shrink-0 inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/15 px-3 py-1 text-xs font-semibold text-gold shadow-sm">
                          <span className="h-2 w-2 rounded-full bg-gold animate-pulse" />
                          Learning
                        </span>
                      </div>

                      <div className="mt-4 rounded-2xl border border-line/50 bg-page/40 p-4">
                        <div className="flex items-center gap-2 text-xs font-semibold text-mute mb-2">
                          <Terminal className="h-3.5 w-3.5 text-accent" />
                          <span>Current Focus:</span>
                        </div>
                        <p className="text-xs text-mute leading-relaxed">
                          Expanding web fundamentals into mobile interfaces, state navigation, and component architectures.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <ul className={`relative grid gap-2.5 ${isTools ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1 sm:grid-cols-2"}`}>
                      {grp.items.map((t) => (
                        <li
                          key={t.name}
                          className="group/item flex items-center justify-between gap-2.5 rounded-xl border border-line/75 bg-page/60 px-3.5 py-2.5 transition-all duration-200 hover:border-accent/60 hover:bg-tint hover:shadow-sm"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <span
                              aria-hidden="true"
                              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-line/50 bg-card/90 text-lg shadow-inner transition-transform duration-200 group-hover/item:scale-115 group-hover/item:-rotate-3"
                            >
                              {t.icon}
                            </span>
                            <span className="truncate text-sm font-medium text-ink group-hover/item:text-accent transition-colors">
                              {t.name}
                            </span>
                          </div>

                          {t.note && (
                            <span className="shrink-0 inline-flex items-center gap-1 rounded-full border border-gold/40 bg-gold/15 px-2 py-0.5 text-[10px] font-semibold text-gold">
                              <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
                              {t.note}
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Card Footer Accent bar */}
                <div className="mt-5 pt-3 border-t border-line/40 flex items-center justify-between text-[11px] text-mute">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-accent" />
                    <span>Production Ready</span>
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-mute/80">
                    {grp.id}
                  </span>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
};

export default Skills;
