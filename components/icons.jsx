/** Small candlestick glyph — used wherever a decorative divider is needed. */
export function CandleGlyph({ className = "", stroke = "currentColor" }) {
  return (
    <svg viewBox="0 0 28 28" className={className} aria-hidden="true">
      <g stroke={stroke} strokeWidth="1.4" fill="none">
        <line x1="6" y1="4" x2="6" y2="24" />
        <rect x="3" y="9" width="6" height="9" fill={stroke} />
        <line x1="14" y1="7" x2="14" y2="26" />
        <rect x="11" y="13" width="6" height="8" />
        <line x1="22" y1="2" x2="22" y2="22" />
        <rect x="19" y="6" width="6" height="10" fill={stroke} />
      </g>
    </svg>
  );
}

/** Up-trend arrow, for inline accents. */
export function TrendGlyph({ className = "", stroke = "currentColor" }) {
  return (
    <svg viewBox="0 0 28 28" className={className} aria-hidden="true">
      <polyline
        points="3,21 10,13 15,17 25,6"
        fill="none"
        stroke={stroke}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polyline
        points="18,6 25,6 25,13"
        fill="none"
        stroke={stroke}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
