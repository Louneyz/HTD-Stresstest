// Vector Headtrash Dojo logo, the same one used in the pipeline PDF.
export function Logo({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 560 290" role="img" aria-label="The Headtrash Dojo">
      <defs>
        <symbol id="htd-emblem" viewBox="-64 -64 128 128">
          <path d="M-46,-4 A46,46 0 1 1 46,-4" fill="none" stroke="currentColor" strokeWidth="9" />
          <path d="M-49,6 A50,50 0 0 0 49,6 A76,76 0 0 1 -49,6 Z" fill="#eb2427" />
          <g fill="currentColor" stroke="#fff" strokeWidth="3" strokeLinejoin="round">
            <rect x="-26" y="-20" width="10" height="52" />
            <rect x="16" y="-20" width="10" height="52" />
            <rect x="-44" y="-4" width="88" height="8" />
            <rect x="-4" y="-18" width="8" height="14" />
            <rect x="-50" y="-22" width="100" height="6" />
            <path d="M-60,-34 Q0,-22 60,-34 L57,-24 Q0,-14 -57,-24 Z" />
          </g>
        </symbol>
      </defs>
      <text x="14" y="34" fontFamily="Poppins" fontWeight="900" fontSize="26" fill="currentColor" letterSpacing="1">THE</text>
      <text x="4" y="122" fontFamily="Poppins" fontWeight="800" fontSize="104" fill="#eb2427" letterSpacing="-3" textLength="548" lengthAdjust="spacingAndGlyphs">HEADTRASH</text>
      <text x="2" y="274" fontFamily="Poppins" fontWeight="300" fontSize="176" fill="currentColor">D</text>
      <use href="#htd-emblem" x="128" y="131" width="164" height="164" />
      <text x="298" y="274" fontFamily="Poppins" fontWeight="300" fontSize="176" fill="currentColor">J</text>
      <text x="390" y="274" fontFamily="Poppins" fontWeight="300" fontSize="176" fill="currentColor">O</text>
    </svg>
  );
}
