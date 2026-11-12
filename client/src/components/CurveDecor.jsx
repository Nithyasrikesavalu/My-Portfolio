/** Abstract curved orbit lines used as quiet section decoration. */
const CurveDecor = ({ flip = false }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 1200 700"
    preserveAspectRatio="none"
    className={`pointer-events-none absolute inset-0 -z-10 h-full w-full ${flip ? "-scale-x-100" : ""}`}
    fill="none"
  >
    <path d="M-50 560 C 250 380, 520 700, 900 420 S 1200 200, 1280 260" stroke="rgb(168 85 247 / 0.28)" strokeWidth="1.5" />
    <path d="M-50 620 C 300 460, 560 740, 940 480 S 1200 280, 1280 330" stroke="rgb(168 85 247 / 0.14)" strokeWidth="1.5" />
    <ellipse cx="1000" cy="150" rx="260" ry="90" transform="rotate(-18 1000 150)" stroke="rgb(255 214 41 / 0.22)" strokeWidth="1.2" strokeDasharray="3 8" />
  </svg>
);

export default CurveDecor;
