/**
 * Faceted origami crest used as a decorative motif inside sections.
 *
 * The nav and footer carry the real Wolfpack logo; this geometric mark is
 * the sectional counterpart — no eyes, no pupils, so it reads as a crest
 * rather than a cartoon. Symmetric about x = 200 in a 400 × 400 box.
 */

export const PTS = {
  earLOuter: "74,168 96,30 178,116",
  earROuter: "326,168 304,30 222,116",
  earLInner: "98,156 108,72 156,120",
  earRInner: "302,156 292,72 244,120",
  tuftL: "74,168 104,266 24,220",
  tuftR: "326,168 296,266 376,220",
  faceL: "74,168 200,124 200,352 104,266",
  faceR: "200,124 326,168 296,266 200,352",
  blaze: "200,124 228,184 200,240 172,184",
  cheekL: "74,168 104,266 158,244 128,186",
  cheekR: "326,168 296,266 242,244 272,186",
  muzzle: "158,244 242,244 200,340",
  muzzleL: "158,244 200,244 200,340",
  nose: "184,296 216,296 200,324",
};

export function FoxDefs({ id }) {
  return (
    <defs>
      <linearGradient id={`${id}-l`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#F3DCA0" />
        <stop offset="45%" stopColor="#D9AE45" />
        <stop offset="100%" stopColor="#B3841F" />
      </linearGradient>
      <linearGradient id={`${id}-r`} x1="1" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#C08F22" />
        <stop offset="55%" stopColor="#9A6F16" />
        <stop offset="100%" stopColor="#7D5A10" />
      </linearGradient>
      <linearGradient id={`${id}-ear`} x1="0.5" y1="0" x2="0.5" y2="1">
        <stop offset="0%" stopColor="#7D5A10" />
        <stop offset="100%" stopColor="#C08F22" />
      </linearGradient>
      <linearGradient id={`${id}-inner`} x1="0.5" y1="0" x2="0.5" y2="1">
        <stop offset="0%" stopColor="#C9501F" />
        <stop offset="100%" stopColor="#F6E6BC" />
      </linearGradient>
      <linearGradient id={`${id}-muzzle`} x1="0.5" y1="0" x2="0.5" y2="1">
        <stop offset="0%" stopColor="#FBF8F1" />
        <stop offset="100%" stopColor="#E9DFC9" />
      </linearGradient>
      <linearGradient id={`${id}-blaze`} x1="0.5" y1="0" x2="0.5" y2="1">
        <stop offset="0%" stopColor="#F6E6BC" />
        <stop offset="100%" stopColor="#F6E6BC" stopOpacity="0" />
      </linearGradient>
    </defs>
  );
}

export function FoxLayerHead({ id }) {
  return (
    <g>
      <polygon points={PTS.tuftL} fill={`url(#${id}-ear)`} opacity="0.85" />
      <polygon points={PTS.tuftR} fill={`url(#${id}-ear)`} opacity="0.85" />
      <polygon points={PTS.earLOuter} fill={`url(#${id}-ear)`} />
      <polygon points={PTS.earROuter} fill={`url(#${id}-ear)`} />
      <polygon points={PTS.earLInner} fill={`url(#${id}-inner)`} />
      <polygon points={PTS.earRInner} fill={`url(#${id}-inner)`} />
      <polygon points={PTS.faceL} fill={`url(#${id}-l)`} />
      <polygon points={PTS.faceR} fill={`url(#${id}-r)`} />
      <polygon points={PTS.cheekL} fill="#14100B" opacity="0.07" />
      <polygon points={PTS.cheekR} fill="#FBF8F1" opacity="0.07" />
      <polyline
        points="200,124 200,352"
        stroke="#7D5A10"
        strokeWidth="1"
        opacity="0.35"
        fill="none"
      />
    </g>
  );
}

export function FoxLayerMuzzle({ id }) {
  return (
    <g>
      <polygon points={PTS.blaze} fill={`url(#${id}-blaze)`} opacity="0.75" />
      <polygon points={PTS.muzzle} fill={`url(#${id}-muzzle)`} />
      <polygon points={PTS.muzzleL} fill="#14100B" opacity="0.06" />
    </g>
  );
}

export function FoxLayerSnout() {
  return (
    <g>
      <polygon points={PTS.nose} fill="#14100B" />
      <polyline
        points="128,186 158,244"
        stroke="#7D5A10"
        strokeWidth="1.2"
        opacity="0.4"
        fill="none"
      />
      <polyline
        points="272,186 242,244"
        stroke="#7D5A10"
        strokeWidth="1.2"
        opacity="0.4"
        fill="none"
      />
    </g>
  );
}

export function FoxMark({ className = "", id = "fx" }) {
  return (
    <svg viewBox="0 0 400 400" className={className} aria-hidden="true">
      <FoxDefs id={id} />
      <FoxLayerHead id={id} />
      <FoxLayerMuzzle id={id} />
      <FoxLayerSnout />
    </svg>
  );
}
