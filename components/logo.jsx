import Image from "next/image";
import markSrc from "@/public/logo-mark.png";
import fullSrc from "@/public/logo.webp";

/**
 * Brand assets.
 *
 * `logo.webp` carries a white "WOLF PACK" wordmark, so it only reads on dark
 * surfaces — use <LogoFull /> there. `logo-mark.png` is the gold W crest cut
 * out of the same file; it works on any background, so light surfaces pair
 * <LogoMark /> with a typeset wordmark.
 */

export function LogoMark({ className = "", priority = false }) {
  return (
    <Image
      src={markSrc}
      alt=""
      aria-hidden="true"
      priority={priority}
      className={className}
    />
  );
}

export function LogoFull({ className = "", alt = "Wolfpack Wealth Academy" }) {
  return <Image src={fullSrc} alt={alt} className={className} />;
}
