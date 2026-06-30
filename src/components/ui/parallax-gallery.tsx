import { useEffect, useRef, useState } from "react";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { useLenis } from "lenis/react";

// 4 columns × 3 images = 12 portfolio shots
const COL_IMAGES = [
  // Column 1 — slow drift
  ["/assets/TWILIGHT VILLA.webp", "/assets/KAD6.webp",  "/assets/PAB_0680.webp"],
  // Column 2 — fast drift
  ["/assets/LIVING LOBBY.webp",  "/assets/CHETTINAD RESIDENCE.webp", "/assets/PAB_0662.webp"],
  // Column 3 — medium-slow
  ["/assets/BEDROOM.webp",       "/assets/KAD3.webp",   "/assets/PAB_0672.webp"],
  // Column 4 — medium-fast
  ["/assets/RESIDENCE.webp",     "/assets/KAD2.webp",   "/assets/PAB_0689.webp"],
];

export default function ParallaxGallery() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [winH, setWinH] = useState(0);

  // read window height for transform range; update on resize
  useEffect(() => {
    const onResize = () => setWinH(window.innerHeight);
    onResize();
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: galleryRef,
    offset: ["start end", "end start"],
  });

  // Force framer-motion to stay in sync with Lenis virtual scroll
  useLenis(() => { /* Lenis tick — framer-motion picks up window.scrollY */ });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, winH * 2]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, winH * 3.3]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, winH * 1.25]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, winH * 3]);

  const yValues: MotionValue<number>[] = [y1, y2, y3, y4];

  return (
    <section className="w-full bg-white overflow-hidden">
      {/* ── Section header ──────────────────────── */}
      <div className="container mx-auto max-w-7xl px-6 lg:px-12 pt-24 pb-10">
        <motion.span
          className="block text-[10px] tracking-[0.48em] uppercase text-[#222A35]/40 mb-4"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
        >
          Visual Portfolio
        </motion.span>

        <div className="flex items-end justify-between gap-8">
          <motion.h2
            className="text-[clamp(2.4rem,6vw,5rem)] font-extralight tracking-[-0.025em] text-[#222A35] leading-[0.95]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            Work in
            <br />
            <em className="not-italic text-[#222A35]/45">motion.</em>
          </motion.h2>

          <motion.p
            className="hidden md:block max-w-[240px] text-[#222A35]/38 text-[0.85rem] font-light leading-[1.75] text-right"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            Scroll to witness the depth
            <br />of our curated portfolio.
          </motion.p>
        </div>

        {/* rule */}
        <motion.div
          className="h-px bg-[#222A35]/10 mt-10"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          style={{ originX: 0 }}
          transition={{ duration: 1.2, ease: [0.37, 0, 0.63, 1] }}
        />
      </div>

      {/* ── Parallax gallery — 4 columns, 175 vh ── */}
      <div
        ref={galleryRef}
        className="relative flex h-[175vh] gap-[1.5vw] overflow-hidden p-[1.5vw] bg-[#f8f7f5]"
      >
        {COL_IMAGES.map((imgs, colIdx) => (
          <ParallaxColumn
            key={colIdx}
            images={imgs}
            y={yValues[colIdx]}
            colIndex={colIdx}
          />
        ))}
      </div>

      {/* ── Bottom rule ─────────────────────────── */}
      <div className="h-px bg-[#222A35]/[0.06]" />
    </section>
  );
}

// ── Column ─────────────────────────────────────────────────────────

interface ColumnProps {
  images: string[];
  y: MotionValue<number>;
  colIndex: number;
}

// vertical offsets per column to stagger the initial position (same as original)
const COL_TOP_OFFSETS = ["-45%", "-95%", "-45%", "-75%"];

function ParallaxColumn({ images, y, colIndex }: ColumnProps) {
  return (
    <motion.div
      className="relative flex h-full w-1/4 flex-col gap-[1.5vw]"
      style={{
        y,
        top: COL_TOP_OFFSETS[colIndex],
        willChange: "transform",
      }}
    >
      {images.map((src, i) => (
        <div
          key={i}
          className="relative flex-1 overflow-hidden rounded-sm bg-[#ddd]"
          style={{ minHeight: "33.33%" }}
        >
          <img
            src={src}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ willChange: "transform" }}
          />
        </div>
      ))}
    </motion.div>
  );
}
