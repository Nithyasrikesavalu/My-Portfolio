import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, Sparkles, X, Mail, ArrowRight, MessageSquare } from "lucide-react";

const SuccessModal = ({
  isOpen,
  onClose,
  type = "success",
  title,
  statusMessage,
  name,
  email,
  message,
}) => {
  const modalRef = useRef(null);
  const isSuccess = type === "success";

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
        <div className="fixed inset-0 z-[600] flex items-center justify-center p-4">
          {/* Backdrop with blur */}
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
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
            initial={{ opacity: 0, scale: 0.88, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 20 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="surface relative w-full max-w-md overflow-hidden rounded-3xl border border-line/80 bg-card/95 p-6 sm:p-8 text-center shadow-2xl backdrop-blur-2xl"
          >
            {/* Top Light Accent Streak */}
            <div
              className={`absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent ${
                isSuccess ? "via-emerald-400" : "via-rose-500"
              } to-transparent`}
            />

            {/* Close button (X) */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close popup"
              className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full text-mute transition-colors hover:bg-page hover:text-ink"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Glowing Badge */}
            <div className="relative mx-auto mb-4 flex h-20 w-20 items-center justify-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 320, damping: 18, delay: 0.08 }}
                className={`flex h-16 w-16 items-center justify-center rounded-2xl border ${
                  isSuccess
                    ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400 shadow-[0_0_35px_rgba(16,185,129,0.35)]"
                    : "bg-rose-500/15 border-rose-500/30 text-rose-400 shadow-[0_0_35px_rgba(244,63,94,0.35)]"
                }`}
              >
                {isSuccess ? (
                  <CheckCircle2 className="h-9 w-9 text-emerald-400" />
                ) : (
                  <AlertCircle className="h-9 w-9 text-rose-400" />
                )}
              </motion.div>
              {isSuccess && (
                <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-gold/20 text-gold border border-gold/40 animate-pulse">
                  <Sparkles className="h-3 w-3" />
                </span>
              )}
            </div>

            {/* Title & Description */}
            <h3 id="contact-modal-title" className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              {title || (isSuccess ? "Message Sent!" : "Couldn't Send Message")}
            </h3>
            <p className="mt-2 text-sm text-mute leading-relaxed">
              {statusMessage ||
                (isSuccess
                  ? `Thank you${name ? `, ${name}` : ""}! Your message has been successfully delivered.`
                  : "Something went wrong. Please try again or reach out directly.")}
            </p>

            {/* Submitted Message Box */}
            {message && (
              <div className="mt-4 rounded-2xl border border-line/70 bg-page/70 p-3.5 text-left text-xs">
                <div className="flex items-center gap-1.5 text-mute mb-1 font-medium">
                  <MessageSquare className="h-3.5 w-3.5 text-accent" />
                  <span>Your Message:</span>
                </div>
                <p className="text-ink text-sm italic font-normal pl-5 max-h-24 overflow-y-auto whitespace-pre-wrap leading-relaxed">
                  &ldquo;{message}&rdquo;
                </p>
              </div>
            )}

            {/* Destination Email Info Card */}
            {email && (
              <div className="mt-3 rounded-2xl border border-line/60 bg-page/60 p-3 text-left text-xs">
                <div className="flex items-center gap-1.5 text-mute mb-1">
                  <Mail className="h-3.5 w-3.5 text-accent" />
                  <span className="font-medium">{isSuccess ? "I will reply to:" : "Sender email:"}</span>
                </div>
                <p className="font-semibold text-ink break-all pl-5">{email}</p>
              </div>
            )}

            {/* Note for Success */}
            {isSuccess && (
              <p className="mt-3 text-xs text-mute/80">
                I usually respond within 24 hours. Looking forward to speaking with you!
              </p>
            )}

            {/* Action Buttons */}
            {isSuccess ? (
              <button
                type="button"
                onClick={onClose}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gold py-3.5 text-sm font-semibold text-[#17051F] shadow-lg shadow-gold/20 transition-all hover:bg-[#ffe066] hover:shadow-xl hover:shadow-gold/30"
              >
                <span>Great, thanks!</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-line bg-page px-4 py-3 text-sm font-semibold text-ink transition-colors hover:border-accent"
                >
                  Close
                </button>
                <a
                  href={`mailto:nithyanithya3993@gmail.com?subject=Portfolio%20Contact%20from%20${encodeURIComponent(name || "Visitor")}&body=${encodeURIComponent(message || "")}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gold px-4 py-3 text-sm font-semibold text-[#17051F] shadow-lg shadow-gold/20 transition-all hover:bg-[#ffe066]"
                >
                  <Mail className="h-4 w-4" />
                  <span>Email Directly</span>
                </a>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SuccessModal;
