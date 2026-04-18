/**
 * HearWithHeart logo icon — heart shape with sound-wave arcs inside.
 * Renders as an inline SVG so it scales perfectly at any size and
 * looks great in both light and dark modes.
 */
export default function LogoIcon({ size = 32, className = '' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      {/* Outer heart path – teal */}
      <path
        d="M50 85 C50 85 12 60 12 35 C12 22 22 13 34 13 C42 13 48 18 50 22 C52 18 58 13 66 13 C78 13 88 22 88 35 C88 60 50 85 50 85Z"
        fill="none"
        stroke="#0d9488"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Sound wave arcs – rose, centered in right lobe */}
      <path
        d="M58 42 Q62 37 62 35 Q62 33 58 28"
        fill="none"
        stroke="#f43f5e"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      <path
        d="M64 47 Q71 39 71 35 Q71 31 64 23"
        fill="none"
        stroke="#f43f5e"
        strokeWidth="4.5"
        strokeLinecap="round"
        opacity="0.75"
      />
      <path
        d="M70 52 Q80 42 80 35 Q80 28 70 18"
        fill="none"
        stroke="#f43f5e"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.45"
      />
      {/* Small dot – source point of sound */}
      <circle cx="54" cy="35" r="3.5" fill="#f43f5e" />
    </svg>
  );
}
