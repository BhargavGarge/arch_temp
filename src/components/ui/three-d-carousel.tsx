import { memo, useEffect, useLayoutEffect, useMemo, useState } from "react";
import {
  AnimatePresence,
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion";

// ── SSR-safe layout effect ───────────────────────────────────────────
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  useIsomorphicLayoutEffect(() => {
    const mq = window.matchMedia(query);
    setMatches(mq.matches);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [query]);
  return matches;
}

// ── KAD portfolio images ─────────────────────────────────────────────
const KAD_IMAGES = [
  "/assets/TWILIGHT VILLA.webp",
  "/assets/LIVING LOBBY.webp",
  "/assets/CHETTINAD RESIDENCE.webp",
  "/assets/BEDROOM.webp",
  "/assets/BEDROOM 2.webp",
  "/assets/RESIDENCE.webp",
  "/assets/KAD2.webp",
  "/assets/KAD3.webp",
  "/assets/KAD6.webp",
  "/assets/SHS_9769.webp",
  "/assets/PAB_0662.webp",
  "/assets/PAB_0680.webp",
];

const transition    = { duration: 0.15, ease: [0.32, 0.72, 0, 1] as const };
const transitionOvl = { duration: 0.5,  ease: [0.32, 0.72, 0, 1] as const };

// ── Cylinder carousel ────────────────────────────────────────────────
const Carousel = memo(function Carousel({
  handleClick,
  controls,
  cards,
  isCarouselActive,
}: {
  handleClick: (imgUrl: string, index: number) => void;
  controls: ReturnType<typeof useAnimation>;
  cards: string[];
  isCarouselActive: boolean;
}) {
  const isSmall   = useMediaQuery("(max-width: 640px)");
  const faceCount = cards.length;
  // Keep each card ~150px (desktop) / 90px (mobile) wide — scales naturally with count
  const targetFaceWidth = isSmall ? 90 : 150;
  const cylinderWidth   = targetFaceWidth * faceCount;
  const faceWidth       = targetFaceWidth;
  const radius          = cylinderWidth / (2 * Math.PI);
  const rotation     = useMotionValue(0);
  const transform    = useTransform(rotation, v => `rotate3d(0,1,0,${v}deg)`);

  return (
    <div
      className="flex h-full items-center justify-center"
      style={{ perspective: "1000px", transformStyle: "preserve-3d", willChange: "transform" }}
    >
      <motion.div
        drag={isCarouselActive ? "x" : false}
        className="relative flex h-full origin-center cursor-grab justify-center active:cursor-grabbing"
        style={{ transform, rotateY: rotation, width: cylinderWidth, transformStyle: "preserve-3d" }}
        onDrag={(_, info) =>
          isCarouselActive && rotation.set(rotation.get() + info.offset.x * 0.05)
        }
        onDragEnd={(_, info) =>
          isCarouselActive &&
          controls.start({
            rotateY: rotation.get() + info.velocity.x * 0.05,
            transition: { type: "spring", stiffness: 100, damping: 30, mass: 0.1 },
          })
        }
        animate={controls}
      >
        {cards.map((imgUrl, i) => (
          <motion.div
            key={`${imgUrl}-${i}`}
            className="absolute flex h-full origin-center items-center justify-center rounded-2xl p-2"
            style={{
              width: `${faceWidth}px`,
              transform: `rotateY(${i * (360 / faceCount)}deg) translateZ(${radius}px)`,
              background: "#F4F3EC",
            }}
            onClick={() => handleClick(imgUrl, i)}
          >
            <motion.img
              src={imgUrl}
              alt={`KAD portfolio ${i + 1}`}
              layoutId={`carousel-img-${imgUrl}`}
              className="pointer-events-none w-full rounded-xl object-cover aspect-[3/4]"
              initial={{ filter: "blur(4px)" }}
              animate={{ filter: "blur(0px)" }}
              transition={transition}
              loading="lazy"
              decoding="async"
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
});

// ── Main export ──────────────────────────────────────────────────────
export default function ThreeDPhotoCarousel({ images }: { images?: string[] }) {
  const [activeImg, setActiveImg]         = useState<string | null>(null);
  const [isCarouselActive, setCarouselActive] = useState(true);
  const controls = useAnimation();
  const cards    = useMemo(() => {
    const src = images && images.length > 0 ? images : KAD_IMAGES;
    // Need at least 6 cards for a convincing cylinder; repeat if short
    if (src.length < 6) {
      const padded: string[] = [];
      while (padded.length < 6) padded.push(...src);
      return padded.slice(0, 6);
    }
    return src.slice(0, 12); // cap at 12 for perf
  }, [images]);

  const handleClick = (imgUrl: string) => {
    setActiveImg(imgUrl);
    setCarouselActive(false);
    controls.stop();
  };

  const handleClose = () => {
    setActiveImg(null);
    setCarouselActive(true);
  };

  return (
    <motion.div layout className="relative w-full">
      {/* ── Lightbox overlay ── */}
      <AnimatePresence mode="sync">
        {activeImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#222A35]/85 backdrop-blur-sm cursor-pointer"
            transition={transitionOvl}
          >
            <motion.img
              layoutId={`carousel-img-${activeImg}`}
              src={activeImg}
              alt="KAD portfolio"
              className="max-h-[85vh] max-w-[90vw] rounded-2xl shadow-2xl object-contain"
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ willChange: "transform" }}
              onClick={e => e.stopPropagation()}
            />
            <button
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 border border-white/20 text-white/70 hover:bg-white/20 transition-colors flex items-center justify-center text-lg leading-none"
              onClick={handleClose}
              aria-label="Close"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Cylinder ── */}
      <div className="relative h-[520px] w-full overflow-hidden">
        <Carousel
          handleClick={handleClick}
          controls={controls}
          cards={cards}
          isCarouselActive={isCarouselActive}
        />
      </div>

      <p className="text-center text-[#222A35]/35 text-[10px] tracking-[0.3em] uppercase mt-4 pb-2">
        Drag to rotate · Click to expand
      </p>
    </motion.div>
  );
}
