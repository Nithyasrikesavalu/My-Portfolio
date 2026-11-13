import { useState, useEffect } from "react";
import { FaCheck, FaCopy, FaDownload, FaEnvelope, FaGithub, FaLinkedin, FaMapMarkerAlt, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import Reveal from "../components/Reveal";
import SuccessModal from "../components/SuccessModal";
import { cvUrl, cvExt } from "../lib/assets";
import { site } from "../data/site";
import { API_ENDPOINTS } from "../config/api";

const EMAIL = site.email || "nithyanithya3993@gmail.com";

const validate = (v) => {
  const e = {};
  if (v.name.trim().length < 2) e.name = "Enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) e.email = "Enter a valid email address.";
  if (v.message.trim().length < 10) e.message = "Write at least 10 characters.";
  return e;
};

const field = "w-full rounded-xl border border-line bg-page px-4 py-3.5 text-ink placeholder-mute/60 transition-colors focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/15";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [slowLoading, setSlowLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: "success",
    title: "",
    statusMessage: "",
    name: "",
    email: "",
    message: "",
  });

  // Silently ping backend in the background so it starts waking up if idle
  useEffect(() => {
    fetch(API_ENDPOINTS.health).catch(() => {});
  }, []);

  // Show a gentle notice if Render free instance takes a few seconds to spin up
  useEffect(() => {
    let t;
    if (loading) {
      t = setTimeout(() => setSlowLoading(true), 4000);
    } else {
      setSlowLoading(false);
    }
    return () => clearTimeout(t);
  }, [loading]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setStatus({ type: "error", message: `Couldn't copy automatically. My email is ${EMAIL}.` });
    }
  };

  const handleChange = (e) => {
    setFormData((f) => ({ ...f, [e.target.name]: e.target.value }));
    setErrors((er) => ({ ...er, [e.target.name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const found = validate(formData);
    setErrors(found);
    if (Object.keys(found).length) {
      setStatus({ type: "error", message: "Please fill in all required fields correctly before submitting." });
      return;
    }

    setLoading(true);
    setStatus({ type: "", message: "" });
    // Allow up to 75 seconds for Render free instance cold spin-up
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 75000);

    const submission = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      message: formData.message.trim(),
    };

    try {
      const response = await fetch(API_ENDPOINTS.contact, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submission),
        signal: controller.signal,
      });

      let data = null;
      try { data = await response.json(); } catch { /* non-JSON response */ }

      if (response.ok && data?.success) {
        setModalState({
          isOpen: true,
          type: "success",
          title: "Message Sent!",
          statusMessage: "Thank you! Your message has been sent successfully. I will get back to you shortly.",
          name: submission.name,
          email: submission.email,
          message: submission.message,
        });
        setStatus({ type: "success", message: "Message sent! I'll reply to the email address you gave." });
        setFormData({ name: "", email: "", message: "" });
      } else {
        const errorMsg = data?.message || `The server couldn't send your message (status ${response.status}). Please email me directly.`;
        setStatus({ type: "error", message: errorMsg });
        setModalState({
          isOpen: true,
          type: "error",
          title: "Message Couldn't Be Sent",
          statusMessage: errorMsg,
          name: submission.name,
          email: submission.email,
          message: submission.message,
        });
      }
    } catch (err) {
      console.error("Contact form error:", err);
      const isTimeout =
        err.name === "AbortError" ||
        (err.message && (err.message.includes("network") || err.message.includes("timed out") || err.message.includes("Failed to fetch")));
      const networkMsg = isTimeout
        ? "The cloud server was waking up from sleep. It is now active — please click 'Send message' again!"
        : "Couldn't reach the server, so your message was not sent. Please try again or email me directly.";
      setStatus({ type: "error", message: networkMsg });
      setModalState({
        isOpen: true,
        type: "error",
        title: isTimeout ? "Server Waking Up" : "Connection Failed",
        statusMessage: networkMsg,
        name: submission.name,
        email: submission.email,
        message: submission.message,
      });
    } finally {
      clearTimeout(timer);
      setLoading(false);
    }
  };

  const row = "group flex items-center gap-5 rounded-2xl p-3 transition-colors hover:bg-card";
  const icon = "grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-line bg-card text-mute transition-colors group-hover:border-accent group-hover:text-accent";

  return (
    <section aria-labelledby="contact-title" className="mx-auto max-w-7xl px-6 py-28 md:px-8">
      <div className="grid gap-16 lg:grid-cols-2">
        <Reveal>
          <h2 id="contact-title" className="text-4xl font-semibold leading-tight md:text-6xl">Let&apos;s Build Something <span className="hl">Great</span></h2>
          <p className="mt-5 max-w-md text-lg text-mute">
            I&apos;m looking for junior developer roles and open to freelance projects. If you have an opportunity or need a hand with a web application, get in touch.
          </p>

          <ul className="mt-10 space-y-2">
            <li>
              <a href={`mailto:${EMAIL}`} className={row}>
                <span className={icon}><FaEnvelope aria-hidden="true" /></span>
                <span><span className="block text-sm text-mute">Email</span><span className="break-all text-lg">{EMAIL}</span></span>
              </a>
            </li>
            <li>
              <a href="tel:+916369346836" className={row}>
                <span className={icon}><FaPhoneAlt aria-hidden="true" /></span>
                <span><span className="block text-sm text-mute">Phone</span><span className="text-lg">+91 6369346836</span></span>
              </a>
            </li>
            <li>
              <a href="https://wa.me/916369346836" target="_blank" rel="noopener noreferrer" className={row}>
                <span className={icon}><FaWhatsapp aria-hidden="true" /></span>
                <span><span className="block text-sm text-mute">WhatsApp</span><span className="text-lg">+91 6369346836</span></span>
              </a>
            </li>
            <li className={row}>
              <span className={icon}><FaMapMarkerAlt aria-hidden="true" /></span>
              <span><span className="block text-sm text-mute">Location</span><span className="text-lg">Chennai, Tamil Nadu</span></span>
            </li>
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {site.github && (
              <a href={site.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" title="GitHub profile" className="grid h-11 w-11 place-items-center rounded-xl border border-line text-mute transition-colors hover:border-accent hover:text-ink"><FaGithub size={18} /></a>
            )}
            {site.linkedin && (
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" title="LinkedIn profile" className="grid h-11 w-11 place-items-center rounded-xl border border-line text-mute transition-colors hover:border-accent hover:text-ink"><FaLinkedin size={18} /></a>
            )}
            <button type="button" onClick={copyEmail} className="inline-flex h-11 items-center gap-2 rounded-xl border border-line px-4 text-sm text-mute transition-colors hover:border-accent hover:text-ink">
              {copied ? <FaCheck aria-hidden="true" /> : <FaCopy aria-hidden="true" />} {copied ? "Copied" : "Copy email"}
            </button>
            {cvUrl && (
              <a
                href={cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                download={`Nithyasri_Resume${cvExt}`}
                className="inline-flex h-11 items-center gap-2 rounded-xl bg-gold px-4 text-sm font-semibold text-[#17051F] shadow-md shadow-gold/30 transition-colors hover:bg-[#ffe066]"
              >
                <FaDownload aria-hidden="true" /> Download CV
              </a>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={handleSubmit} noValidate className="surface flex flex-col gap-5 p-7 md:p-9">
            <div className="grid gap-5 md:grid-cols-2">
              <div className="group">
                <label htmlFor="c-name" className="mb-2 block text-sm text-mute transition-colors group-focus-within:text-accent">Name</label>
                <input id="c-name" name="name" type="text" autoComplete="name" value={formData.name} onChange={handleChange} aria-invalid={!!errors.name} aria-describedby={errors.name ? "c-name-err" : undefined} className={field} />
                {errors.name && <p id="c-name-err" className="mt-1.5 text-sm text-red-600 dark:text-red-300">{errors.name}</p>}
              </div>
              <div className="group">
                <label htmlFor="c-email" className="mb-2 block text-sm text-mute transition-colors group-focus-within:text-accent">Email</label>
                <input id="c-email" name="email" type="email" autoComplete="email" value={formData.email} onChange={handleChange} aria-invalid={!!errors.email} aria-describedby={errors.email ? "c-email-err" : undefined} className={field} />
                {errors.email && <p id="c-email-err" className="mt-1.5 text-sm text-red-600 dark:text-red-300">{errors.email}</p>}
              </div>
            </div>
            <div className="group">
              <label htmlFor="c-message" className="mb-2 block text-sm text-mute transition-colors group-focus-within:text-accent">Message</label>
              <textarea id="c-message" name="message" rows="6" value={formData.message} onChange={handleChange} aria-invalid={!!errors.message} aria-describedby={errors.message ? "c-message-err" : undefined} className={`${field} resize-none`} />
              {errors.message && <p id="c-message-err" className="mt-1.5 text-sm text-red-600 dark:text-red-300">{errors.message}</p>}
            </div>

            <div role="status" aria-live="polite">
              {status.message && (
                <p className={`rounded-xl border p-4 text-sm ${status.type === "success" ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300" : "border-red-500/40 bg-red-500/10 text-red-700 dark:text-red-300"}`}>
                  {status.message}
                </p>
              )}
            </div>

            <button type="submit" disabled={loading} className="inline-flex items-center justify-center gap-3 rounded-xl bg-gold py-4 font-semibold text-[#17051F] transition-colors hover:bg-[#ffe066] disabled:cursor-not-allowed disabled:opacity-60">
              {loading ? (<><span aria-hidden="true" className="h-5 w-5 animate-spin rounded-full border-2 border-[#17051F]/30 border-t-[#17051F]" /> Sending…</>) : (<><FaEnvelope aria-hidden="true" /> Send message</>)}
            </button>
            {slowLoading && (
              <p className="text-center text-xs text-mute animate-pulse">
                Connecting to cloud server (Render spin-up)... thank you for your patience!
              </p>
            )}
          </form>
        </Reveal>
      </div>

      <SuccessModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState((prev) => ({ ...prev, isOpen: false }))}
        type={modalState.type}
        title={modalState.title}
        statusMessage={modalState.statusMessage}
        name={modalState.name}
        email={modalState.email}
        message={modalState.message}
      />
    </section>
  );
};

export default Contact;
