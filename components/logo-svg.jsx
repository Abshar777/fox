/**
 * Vector clone of the Wolfpack crest.
 *
 * Traced from public/logo-mark.png (alpha contour → Chaikin smoothing →
 * Douglas-Peucker), normalised into a 400 × 400 box. `SOLID` is the closed
 * outline; `SEGMENTS` is the same outline cut into five open runs of roughly
 * equal arc length, so the preloader can draw it on with a stagger.
 */

const SOLID =
  "M88.3 94.1 L73.4 95.2 L31.8 95.2 L30.0 97.1 L47.0 114.4 L48.1 118.5 L53.9 128.8 L57.2 137.6 L62.9 148.0 L63.5 150.9 L67.3 158.4 L69.3 160.7 L70.5 165.3 L88.5 201.2 L89.6 205.7 L94.3 213.9 L95.5 218.5 L101.3 229.4 L105.0 239.3 L108.2 244.3 L108.8 247.2 L117.8 266.9 L123.6 277.3 L124.7 281.8 L130.6 294.6 L134.9 303.1 L138.8 305.4 L171.5 304.7 L175.2 297.2 L175.8 293.8 L177.9 290.9 L184.8 272.5 L187.5 268.0 L188.0 265.1 L190.7 260.5 L198.2 240.6 L199.4 239.4 L201.2 239.4 L203.4 242.7 L207.7 254.7 L213.5 266.1 L226.4 297.8 L230.7 305.3 L231.9 305.9 L255.9 305.4 L265.1 304.2 L266.7 302.6 L274.8 283.7 L277.4 279.7 L278.0 276.7 L280.6 272.8 L281.2 269.8 L283.8 265.9 L284.4 262.9 L287.0 258.9 L293.4 243.2 L299.7 231.3 L300.3 228.3 L302.9 224.4 L303.5 221.4 L315.7 196.7 L316.3 193.8 L318.9 189.8 L319.5 186.8 L321.5 183.9 L322.7 179.9 L327.9 170.1 L328.5 167.1 L331.1 163.2 L331.7 160.2 L334.3 156.3 L335.4 152.2 L337.5 149.3 L348.7 123.5 L351.4 119.2 L370.0 97.6 L368.7 95.2 L307.5 95.2 L304.1 97.9 L302.4 103.6 L296.6 114.5 L289.6 131.8 L281.2 148.5 L280.6 151.4 L274.2 164.0 L271.0 172.7 L267.9 177.8 L264.6 186.6 L262.0 190.6 L260.9 195.1 L258.3 199.1 L257.7 202.0 L246.1 225.7 L245.5 228.6 L242.9 232.6 L241.7 236.6 L239.1 240.6 L238.5 243.5 L231.9 255.3 L229.6 254.2 L219.4 232.3 L217.8 226.9 L218.4 223.6 L220.5 213.5 L222.6 210.0 L223.2 207.0 L226.3 202.5 L226.9 200.1 L232.2 193.2 L241.9 185.1 L255.5 177.6 L258.8 174.3 L258.8 172.5 L251.9 158.8 L255.1 135.4 L255.1 129.4 L257.7 116.2 L258.2 103.8 L256.2 103.2 L250.3 109.1 L245.4 115.3 L236.5 124.0 L225.7 137.7 L218.2 145.2 L187.2 145.7 L183.9 144.1 L181.2 141.4 L151.8 108.6 L145.9 102.7 L144.5 102.7 L143.9 103.4 L144.4 112.0 L146.5 120.9 L150.8 160.4 L146.5 170.1 L144.4 172.4 L144.4 174.3 L146.1 176.5 L156.0 182.0 L165.6 188.9 L171.5 194.2 L178.4 204.9 L184.8 224.7 L184.8 229.0 L183.7 232.3 L175.3 248.5 L174.2 253.1 L170.7 255.9 L168.4 253.1 L162.5 238.4 L156.1 225.9 L155.5 223.0 L150.3 213.2 L149.7 210.2 L137.0 183.4 L136.4 180.4 L128.4 164.7 L126.8 159.2 L117.8 141.4 L117.2 138.4 L108.2 118.2 L105.6 114.2 L105.0 110.7 L102.4 106.7 L98.1 95.3 L95.2 94.1 L88.3 94.1 Z";

const SEGMENTS = [
  "M88.3 94.1 L73.4 95.2 L31.8 95.2 L30.0 97.1 L47.0 114.4 L48.1 118.5 L53.9 128.8 L57.2 137.6 L62.9 148.0 L63.5 150.9 L67.3 158.4 L69.3 160.7 L70.5 165.3 L88.5 201.2 L89.6 205.7 L94.3 213.9 L95.5 218.5 L101.3 229.4 L105.0 239.3 L108.2 244.3 L108.8 247.2 L117.8 266.9 L123.6 277.3 L124.7 281.8 L130.6 294.6 L134.9 303.1 L138.8 305.4 L171.5 304.7 L175.2 297.2",
  "M175.2 297.2 L175.8 293.8 L177.9 290.9 L184.8 272.5 L187.5 268.0 L188.0 265.1 L190.7 260.5 L198.2 240.6 L199.4 239.4 L201.2 239.4 L203.4 242.7 L207.7 254.7 L213.5 266.1 L226.4 297.8 L230.7 305.3 L231.9 305.9 L255.9 305.4 L265.1 304.2 L266.7 302.6 L274.8 283.7 L277.4 279.7 L278.0 276.7 L280.6 272.8 L281.2 269.8 L283.8 265.9 L284.4 262.9 L287.0 258.9 L293.4 243.2 L299.7 231.3 L300.3 228.3 L302.9 224.4 L303.5 221.4 L315.7 196.7 L316.3 193.8 L318.9 189.8 L319.5 186.8 L321.5 183.9 L322.7 179.9 L327.9 170.1 L328.5 167.1 L331.1 163.2 L331.7 160.2 L334.3 156.3",
  "M334.3 156.3 L335.4 152.2 L337.5 149.3 L348.7 123.5 L351.4 119.2 L370.0 97.6 L368.7 95.2 L307.5 95.2 L304.1 97.9 L302.4 103.6 L296.6 114.5 L289.6 131.8 L281.2 148.5 L280.6 151.4 L274.2 164.0 L271.0 172.7 L267.9 177.8 L264.6 186.6 L262.0 190.6 L260.9 195.1 L258.3 199.1 L257.7 202.0 L246.1 225.7 L245.5 228.6 L242.9 232.6 L241.7 236.6 L239.1 240.6 L238.5 243.5 L231.9 255.3 L229.6 254.2 L219.4 232.3",
  "M219.4 232.3 L217.8 226.9 L218.4 223.6 L220.5 213.5 L222.6 210.0 L223.2 207.0 L226.3 202.5 L226.9 200.1 L232.2 193.2 L241.9 185.1 L255.5 177.6 L258.8 174.3 L258.8 172.5 L251.9 158.8 L255.1 135.4 L255.1 129.4 L257.7 116.2 L258.2 103.8 L256.2 103.2 L250.3 109.1 L245.4 115.3 L236.5 124.0 L225.7 137.7 L218.2 145.2 L187.2 145.7 L183.9 144.1 L181.2 141.4 L151.8 108.6 L145.9 102.7 L144.5 102.7 L143.9 103.4 L144.4 112.0 L146.5 120.9 L150.8 160.4",
  "M150.8 160.4 L146.5 170.1 L144.4 172.4 L144.4 174.3 L146.1 176.5 L156.0 182.0 L165.6 188.9 L171.5 194.2 L178.4 204.9 L184.8 224.7 L184.8 229.0 L183.7 232.3 L175.3 248.5 L174.2 253.1 L170.7 255.9 L168.4 253.1 L162.5 238.4 L156.1 225.9 L155.5 223.0 L150.3 213.2 L149.7 210.2 L137.0 183.4 L136.4 180.4 L128.4 164.7 L126.8 159.2 L117.8 141.4 L117.2 138.4 L108.2 118.2 L105.6 114.2 L105.0 110.7 L102.4 106.7 L98.1 95.3 L95.2 94.1 L88.3 94.1",
];

export function LogoSvgDefs({ id }) {
  return (
    <defs>
      <linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#F3DCA0" />
        <stop offset="35%" stopColor="#D9AE45" />
        <stop offset="70%" stopColor="#B3841F" />
        <stop offset="100%" stopColor="#7D5A10" />
      </linearGradient>
    </defs>
  );
}

/**
 * Solid crest, gold filled.
 *
 * With `sheen`, a highlight band is added *inside* a clip of the crest, so the
 * gloss only ever touches the mark itself — a plain overlay would paint a
 * visible rectangle across the background behind it.
 */
export function LogoSvgSolid({
  className = "",
  id = "lg",
  sheen = false,
  style,
}) {
  return (
    <svg
      viewBox="0 0 400 400"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <LogoSvgDefs id={id} />
      {sheen && (
        <defs>
          <clipPath id={`${id}-clip`}>
            <path d={SOLID} />
          </clipPath>
          <linearGradient id={`${id}-sheen`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
        </defs>
      )}

      <path d={SOLID} fill={`url(#${id}-g)`} />

      {sheen && (
        <g clipPath={`url(#${id}-clip)`}>
          <rect
            className="logo-sheen"
            x="-170"
            y="-20"
            width="150"
            height="440"
            fill={`url(#${id}-sheen)`}
            opacity="0"
          />
        </g>
      )}
    </svg>
  );
}

/**
 * Stroke-only crest. Each run carries pathLength=1 so a dash tween maps
 * straight onto progress, and the runs are contiguous — drawn back to back
 * they read as one continuous pen stroke. The trailing circle is the pen tip.
 */
export function LogoSvgLine({ className = "", strokeClass = "logo-stroke" }) {
  return (
    <svg viewBox="0 0 400 400" className={className} aria-hidden="true">
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        {/* dash state is baked into the markup so the very first painted
            frame is already blank — GSAP's own set only lands on tick one */}
        {SEGMENTS.map((d, i) => (
          <path
            key={i}
            d={d}
            pathLength="1"
            strokeDasharray="1"
            strokeDashoffset="1"
            className={strokeClass}
          />
        ))}
      </g>
      <g className="logo-pen" opacity="0">
        <circle r="14" fill="#B3841F" opacity="0.16" />
        <circle r="7" fill="#F6E6BC" />
        <circle r="4.4" fill="#C9501F" />
      </g>
    </svg>
  );
}
