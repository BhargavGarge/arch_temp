import { motion } from "framer-motion";

const DISCIPLINES = [
  "Architectural Designs",
  "Luxury Villas",
  "Interior Design",
  "Farmhouses",
  "Hospitality Spaces",
];
const HEADLINE = ["We're building", "something great."];

const ease = [0.16, 1, 0.3, 1] as const;
const easeSmooth = [0.25, 0.1, 0.25, 1] as const;

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen flex flex-col overflow-hidden bg-black">
      {/* Background image */}
      <motion.img
        className="absolute inset-0 w-full h-full object-cover"
        src="/bg"
        alt=""
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.4, ease: easeSmooth }}
      />

      {/* Dark overlay */}
      <motion.div
        className="absolute inset-0 bg-black/35"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.8, ease: easeSmooth }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full px-6 md:px-14 lg:px-20">
        {/* Top bar */}
        <motion.header
          className="pt-8 md:pt-10 flex flex-col items-center"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6, ease: easeSmooth }}
        >
          <span className="text-white text-2xl md:text-3xl font-light tracking-[0.2em] uppercase">
            KAD
          </span>
          <span className="text-white/45 text-[9px] md:text-[10px] tracking-[0.35em] uppercase font-light mt-1">
            Design Studio
          </span>
        </motion.header>

        {/* Main content — pushed to bottom */}
        <div className="flex-1 flex flex-col justify-end pb-10 md:pb-14 lg:pb-16">
          {/* Status label */}
          <motion.p
            className="text-white/50 text-[10px] md:text-xs tracking-[0.35em] uppercase mb-5 md:mb-7"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0, ease: easeSmooth }}
          >
            Website under development
          </motion.p>

          {/* Headline — line by line reveal */}
          <div className="mb-7 md:mb-10">
            {HEADLINE.map((line, i) => (
              <div key={i} className="overflow-hidden">
                <motion.h1
                  className="text-[2.6rem] md:text-6xl lg:text-7xl xl:text-[5.5rem] font-light text-white leading-[1.05]"
                  style={{ letterSpacing: "-0.03em" }}
                  initial={{ y: "102%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 1.0,
                    delay: 1.2 + i * 0.13,
                    ease,
                  }}
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

          {/* Bottom row: body + disciplines */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-7 md:gap-12">
            {/* Body text + email */}
            <motion.div
              className="max-w-sm lg:max-w-md"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.85, ease: easeSmooth }}
            >
              <p className="text-white/60 text-sm md:text-[15px] font-light leading-[1.75] mb-5">
                Our new website is currently under development. In the meantime,
                feel free to reach out to us directly — we'd love to hear about
                your project.
              </p>
              <a
                href="mailto:hello@aastudio.com"
                className="text-white/90 text-sm md:text-[15px] font-light tracking-wide border-b border-white/30 hover:border-white hover:text-white transition-all duration-300 pb-px"
              >
                kad@studio.com
              </a>
            </motion.div>

            {/* Disciplines */}
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
      </div>
    </section>
  );
}
