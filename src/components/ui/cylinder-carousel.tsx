import React from "react";
import { cn } from "@/lib/utils";

export interface CarouselImage {
  src: string;
  alt?: string;
}

export interface CylinderCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  images: CarouselImage[];
  containerClassName?: string;
  cardClassName?: string;
  animationDuration?: number; // seconds for one full rotation
  cardWidth?: number;         // px
}

export const CylinderCarousel = React.forwardRef<HTMLDivElement, CylinderCarouselProps>(
  (
    {
      images,
      className,
      containerClassName,
      cardClassName,
      animationDuration = 90,
      cardWidth = 340,
      ...props
    },
    ref
  ) => {
    // Cap at 12 unique images — no repetition
    const imgs = images.slice(0, 12);
    const N = imgs.length;

    // ── Fallback for very few images — horizontal row ──────────────────
    if (N < 5) {
      return (
        <div
          ref={ref}
          className={cn(
            "w-full py-8 flex items-center justify-center gap-4 overflow-x-auto no-scrollbar px-8",
            className
          )}
          {...props}
        >
          {imgs.map((img, i) => (
            <div
              key={i}
              className={cn(
                "shrink-0 rounded-2xl overflow-hidden shadow-xl",
                cardClassName
              )}
              style={{ width: cardWidth, aspectRatio: "7/10" }}
            >
              <img
                src={img.src}
                alt={img.alt ?? `Portfolio ${i + 1}`}
                loading="lazy"
                decoding="async"
                draggable={false}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      );
    }

    // ── Cylinder for 5–12 images ───────────────────────────────────────
    const customStyle = {
      "--n":        N,
      "--w":        `${cardWidth}px`,
      "--ba":       `calc(1turn / var(--n))`,
      "--anim-dur": `${animationDuration}s`,
    } as React.CSSProperties;

    return (
      <div
        ref={ref}
        className={cn(
          "w-full min-h-[560px] grid place-items-center overflow-hidden",
          className
        )}
        style={{
          perspective: "40em",
          maskImage:        "linear-gradient(90deg, transparent, #000 18% 82%, transparent)",
          WebkitMaskImage:  "linear-gradient(90deg, transparent, #000 18% 82%, transparent)",
        }}
        {...props}
      >
        <style>{`
          @keyframes ry {
            to { transform: rotateY(1turn); }
          }
        `}</style>

        <div
          className={cn(
            "grid place-items-center [transform-style:preserve-3d]",
            containerClassName
          )}
          style={{
            ...customStyle,
            animation: "ry var(--anim-dur) linear infinite",
          }}
        >
          {imgs.map((img, i) => (
            <img
              key={i}
              src={img.src}
              alt={img.alt ?? `Portfolio ${i + 1}`}
              loading="lazy"
              decoding="async"
              draggable={false}
              className={cn(
                "[grid-area:1/1] object-cover rounded-2xl [backface-visibility:hidden] shadow-xl",
                cardClassName
              )}
              style={{
                width:       "var(--w)",
                aspectRatio: "7/10",
                "--i": i,
                transform:
                  "rotateY(calc(var(--i) * var(--ba))) translateZ(calc(-1 * (0.5 * var(--w) + 0.5em) / tan(0.5 * var(--ba))))",
              } as React.CSSProperties}
            />
          ))}
        </div>
      </div>
    );
  }
);

CylinderCarousel.displayName = "CylinderCarousel";
