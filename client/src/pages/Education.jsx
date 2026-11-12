import { motion, useReducedMotion } from "framer-motion";
import { FaGraduationCap, FaSchool, FaBookOpen, FaUniversity } from "react-icons/fa";
import Reveal from "../components/Reveal";

const educationData = [
  { year: "Present", status: "Currently pursuing", degree: "Master of Computer Applications (MCA)", institution: "University of Madras", percentage: null, icon: <FaUniversity /> },
  { year: "2024", degree: "B.Sc. Electronics and Communication Science", institution: "Shree Chandraprabhu Jain College, Minjur", percentage: "91%", icon: <FaGraduationCap /> },
  { year: "2021", degree: "HSC, Maths & Computer Science", institution: "Government High School, Padhirivadu, Madharapakam", percentage: "71.5%", icon: <FaSchool /> },
  { year: "2019", degree: "SSLC", institution: "R.M.T Matric Higher Secondary School", percentage: "58%", icon: <FaBookOpen /> },
];

const certifications = [
  { title: "Full Stack Development Certification (MERN Stack)", issuer: "SLA Institute", year: "2025" },
  { title: "JavaScript Certification", issuer: "IBM Developer Skills Network", year: "2025" },
];

const Education = () => {
  const reduce = useReducedMotion();
  return (
    <div className="mx-auto max-w-5xl px-6 py-28 md:px-8" aria-labelledby="education-title" role="region">
      <Reveal>
        <h2 id="education-title" className="text-4xl font-bold md:text-5xl">My <span className="hl">Education</span></h2>
      </Reveal>

      <ol className="relative mt-14 space-y-10 pl-12 md:pl-16">
        <motion.span
          aria-hidden="true"
          className="absolute bottom-4 left-[17px] top-4 w-px origin-top bg-gradient-to-b from-accent to-sky"
          initial={reduce ? false : { scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.3, ease: "easeOut" }}
        />
        {educationData.map((e, i) => (
          <Reveal as="li" key={e.year} delay={i * 0.06} className="relative">
            <motion.span
              aria-hidden="true"
              className="absolute -left-12 top-5 grid h-9 w-9 place-items-center rounded-full border border-accent/30 bg-card text-accent shadow-md shadow-accent/20 md:-left-16"
              initial={reduce ? false : { scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.2 + i * 0.12 }}
            >
              {e.icon}
            </motion.span>
            <div className="surface p-6 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_24px_50px_-24px_rgb(168_85_247/0.5)] md:p-7">
              <p className="text-sm font-medium text-accent">{e.year}{e.status && <span className="ml-2 rounded-full border border-gold/50 px-2.5 py-0.5 text-xs text-ink">{e.status}</span>}</p>
              <h3 className="mt-1 text-xl font-bold md:text-2xl">{e.degree}</h3>
              <p className="mt-1 text-mute">{e.institution}</p>
              {e.percentage && (
                <p className="mt-3 inline-block rounded-full border border-line bg-tint px-3.5 py-1 text-sm text-ink">Score: {e.percentage}</p>
              )}
            </div>
          </Reveal>
        ))}
      </ol>

      <div id="certifications" className="mt-28">
        <Reveal>
          <h2 className="text-4xl font-bold md:text-5xl">My <span className="hl">Certifications</span></h2>
        </Reveal>
        <ul className="mt-10 grid gap-5 md:grid-cols-2">
          {certifications.map((c, i) => (
            <Reveal as="li" key={c.title} delay={i * 0.06} className="surface p-7 transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-accent/40">
              <p className="text-sm font-medium text-accent">{c.year}</p>
              <h3 className="mt-2 text-xl font-bold leading-snug">{c.title}</h3>
              <p className="mt-2 text-mute">{c.issuer}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Education;
