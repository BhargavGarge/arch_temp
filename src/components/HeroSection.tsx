import { motion, useScroll, useTransform, useSpring, useMotionValue, type MotionValue } from "framer-motion";
import { useRef } from "react";
import type { MouseEvent } from "react";

const DISCIPLINES = [
  "Architectural Designs",
  "Luxury Villas",
  "Interior Design",
  "Farmhouses",
  "Hospitality Spaces",
];
const HEADLINE = ["Designing Spaces,", "Building Legacies."];

const ease = [0.16, 1, 0.3, 1] as const;
const easeSmooth = [0.25, 0.1, 0.25, 1] as const;

function ScrollIndicator({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0, 0.12], [1, 0]);
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none z-10 flex flex-col items-center gap-1"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.8, duration: 1 }}
      style={{ opacity }}
    >
      <motion.div
        className="w-px bg-white/30 origin-top"
        style={{ height: 40 }}
        animate={{ scaleY: [0, 1, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.4 }}
      />
    </motion.div>
  );
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgScrollY = useTransform(scrollYProgress, [0, 1], [0, 130]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -70]);

  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);
  const bgMouseX = useSpring(rawMouseX, { stiffness: 35, damping: 20 });
  const bgMouseY = useSpring(rawMouseY, { stiffness: 35, damping: 20 });

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawMouseX.set(((e.clientX - rect.left - rect.width / 2) / rect.width) * 22);
    rawMouseY.set(((e.clientY - rect.top - rect.height / 2) / rect.height) * 14);
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen flex flex-col overflow-hidden"
      style={{ background: "#222A35" }}
      onMouseMove={handleMouseMove}
    >
      {/* Background — scroll parallax + mouse parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -inset-[8%]"
          style={{ y: bgScrollY, x: bgMouseX }}
        >
          <motion.img
            className="w-full h-full object-cover"
            style={{ y: bgMouseY }}
            src="/bg"
            alt=""
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2.4, ease: easeSmooth }}
          />
        </motion.div>
      </div>

      {/* Dark overlay */}
      <motion.div
        className="absolute inset-0 bg-black/35"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.8, ease: easeSmooth }}
      />

      {/* Content — fades + lifts as you scroll */}
      <motion.div
        className="relative z-10 flex flex-col h-full px-6 md:px-14 lg:px-20"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        {/* Main content — pushed to bottom */}
        <div className="flex-1 flex flex-col justify-end pb-24 md:pb-14 lg:pb-16">
          {/* Headline */}
          <div className="mb-7 md:mb-10">
            {HEADLINE.map((line, i) => (
              <div key={i} className="overflow-hidden">
                <motion.h1
                className="md:text-8xl text-4xl font-light  "
                  // className="text-[2.6rem] md:text-6xl lg:text-7xl xl:text-[5.5rem] font-light text-white tracking-[-0.02em] md:tracking-[-0.03em] leading-[1.05] md:leading-[1.02]"
                  style={{ letterSpacing: "-0.03em" , lineHeight: "1.2"}}
                  initial={{ y: "102%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1.0, delay: 1.2 + i * 0.13, ease }}
                >
                  {line}
                </motion.h1>
              </div>
            ))}
          </div>

          {/* Horizontal rule */}
          <motion.div
            className="h-px bg-white/20 mb-7 md:mb-10"
            style={{ transformOrigin: "left" }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.1, delay: 1.6, ease: easeSmooth }}
          />

          {/* Bottom row */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-7 md:gap-12">
            {/* <motion.div
              className="max-w-sm lg:max-w-md"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.85, ease: easeSmooth }}
            >
              <p className="text-white/60 text-sm md:text-[15px] font-light leading-[1.75] mb-5">
                From luxury villas to landmark infrastructure — we craft spaces
                that inspire, endure, and define the future of living.
              </p>
              <a
                href="mailto:kad@studio.com"
                className="text-white/90 text-sm md:text-[15px] font-light tracking-wide border-b border-white/30 hover:border-white hover:text-white transition-all duration-300 pb-px"
              >
                kad@studio.com
              </a>
            </motion.div> */}

            <motion.div
              className="flex flex-wrap items-center gap-x-3 gap-y-1"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 2.05, ease: easeSmooth }}
            >
              {DISCIPLINES.map((d, i) => (
                <span key={d} className="flex items-center gap-3">
                  <span className="text-white/45 text-[10px] md:text-[11px] tracking-[0.2em] uppercase font-light">
                    {d}
                  </span>
                  {i < DISCIPLINES.length - 1 && (
                    <span className="text-white/25 text-xs select-none">—</span>
                  )}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>

      <ScrollIndicator progress={scrollYProgress} />
    </section>
  );
}
