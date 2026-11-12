import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, ExternalLink, FileText } from "lucide-react";
import { cvUrl } from "../lib/assets";

const ResumeModal = ({ isOpen, onClose }) => {
  const panelRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-3 sm:p-6">
          {/* Backdrop */}
          <motion.div
            aria-hidden="true"
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal Container */}
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="resume-modal-title"
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="surface relative flex h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-line/80 bg-card/95 shadow-2xl backdrop-blur-2xl"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-line/60 px-5 py-3.5 sm:px-6">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-gold/15 text-gold border border-gold/30">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <h3 id="resume-modal-title" className="text-base sm:text-lg font-bold text-ink">
                    Nithyasri K — Resume
                  </h3>
                  <p className="text-xs text-mute hidden sm:block">Junior Software Developer | MERN Stack</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <a
                  href={cvUrl || "/Nithyasri_resume.pdf"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-line bg-page/80 px-3.5 py-1.5 text-xs font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Open in New Tab</span>
                </a>

                <a
                  href={cvUrl || "/Nithyasri_resume.pdf"}
                  download="Nithyasri_Resume.pdf"
                  className="inline-flex items-center gap-1.5 rounded-full bg-gold px-4 py-1.5 text-xs font-semibold text-[#17051F] shadow-sm transition-colors hover:bg-[#ffe066]"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download</span>
                </a>

                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close resume preview"
                  className="ml-1 grid h-9 w-9 place-items-center rounded-full text-mute transition-colors hover:bg-page hover:text-ink"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Modal Body / PDF Viewer */}
            <div className="relative flex-1 w-full bg-neutral-900/40 p-2 sm:p-4">
              <iframe
                src={`${cvUrl || "/Nithyasri_resume.pdf"}#toolbar=1&navpanes=0`}
                title="Nithyasri K Resume Preview"
                className="h-full w-full rounded-2xl border border-line/40 bg-white"
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ResumeModal;
