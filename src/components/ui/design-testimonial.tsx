import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion"
import type React from "react"

const testimonials = [
  {
    quote:
      "Every corner of our home now tells our story. Atrey & Associates translated a vision into spaces that feel genuinely alive.",
    author: "Rajiv Sharma",
    role: "Residential Client",
    company: "New Delhi",
  },
  {
    quote:
      "Our headquarters speaks our brand language before a single word is said. The transformation has redefined how our entire team thinks.",
    author: "Anand Mehta",
    role: "CEO · Nexus Technologies",
    company: "Bangalore",
  },
  {
    quote:
      "The courtyard breathes. The light moves. We never expected a building to feel this connected to nature — yet that's exactly what was delivered.",
    author: "Sunita Joshi",
    role: "Residential Client",
    company: "Ahmedabad",
  },
]

export function Testimonial() {
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springConfig = { damping: 25, stiffness: 200 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  const numberX = useTransform(x, [-200, 200], [-20, 20])
  const numberY = useTransform(y, [-200, 200], [-10, 10])

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (rect) {
      mouseX.set(e.clientX - (rect.left + rect.width / 2))
      mouseY.set(e.clientY - (rect.top + rect.height / 2))
    }
  }

  const goNext = () => setActiveIndex((p) => (p + 1) % testimonials.length)
  const goPrev = () => setActiveIndex((p) => (p - 1 + testimonials.length) % testimonials.length)

  useEffect(() => {
    const timer = setInterval(goNext, 6000)
    return () => clearInterval(timer)
  }, [])

  const current = testimonials[activeIndex]

  return (
    <section id="testimonial-section" className="overflow-hidden">
      {/* ── Section header ───────────────────────────────────────── */}
      <div className="container mx-auto max-w-6xl px-4 md:px-12 lg:px-16 pt-14 md:pt-24 pb-0">
        <motion.span
          className="block text-[#88734C] text-[10px] tracking-[0.4em] uppercase font-medium mb-5"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          What Our Clients Say
        </motion.span>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-0">
          <motion.h2
            className="text-[#202e44] font-light tracking-tight leading-[1.05]"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Customer Speak
          </motion.h2>

          <motion.p
            className="text-[#202e44]/50 text-sm md:text-base leading-relaxed max-w-xs md:text-right"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Together with our clients and partners,<br />
            we shape the cities of our future.
          </motion.p>
        </div>

        {/* Ruled separator */}
        <motion.div
          className="mt-10 h-px bg-[#202e44]/[0.1] w-full origin-left"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        />
      </div>

      {/* ── Testimonial widget ───────────────────────────────────── */}
      <div className="flex items-center justify-center py-10 md:py-20 px-4 md:px-12 lg:px-16">
        <div
          ref={containerRef}
          className="relative w-full max-w-5xl"
          onMouseMove={handleMouseMove}
        >
          {/* Oversized parallax index number — desktop only */}
          <motion.div
            className="hidden md:block absolute -left-8 top-1/2 -translate-y-1/2 text-[22rem] font-bold text-[#202e44]/[0.04] select-none pointer-events-none leading-none tracking-tighter"
            style={{ x: numberX, y: numberY }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="block"
              >
                {String(activeIndex + 1).padStart(2, "0")}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          {/* Asymmetric layout */}
          <div className="relative flex">
            {/* Left column — vertical label + progress */}
            <div className="hidden sm:flex flex-col items-center justify-center pr-4 md:pr-12 lg:pr-16 border-r border-[#202e44]/[0.1]">
              <motion.span
                className="text-[10px] font-mono text-[#202e44]/40 tracking-widest uppercase"
                style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Testimonials
              </motion.span>

              {/* Vertical progress track */}
              <div className="relative h-32 w-px bg-[#202e44]/[0.1] mt-8">
                <motion.div
                  className="absolute top-0 left-0 w-full bg-[#88734C] origin-top"
                  animate={{
                    height: `${((activeIndex + 1) / testimonials.length) * 100}%`,
                  }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>

            {/* Center — main content */}
            <div className="flex-1 pl-0 sm:pl-6 md:pl-12 lg:pl-16 py-6 md:py-12">
              {/* Location badge */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.4 }}
                  className="mb-8"
                >
                  <span className="inline-flex items-center gap-2 text-[10px] font-mono text-[#202e44]/50 border border-[#202e44]/[0.12] rounded-full px-3 py-1 tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#88734C]" />
                    {current.company}
                  </span>
                </motion.div>
              </AnimatePresence>

              {/* Quote — word-by-word reveal */}
              <div className="relative mb-12 min-h-[140px]">
                <AnimatePresence mode="wait">
                  <motion.blockquote
                    key={activeIndex}
                    className="text-xl md:text-3xl lg:text-4xl xl:text-5xl font-light text-[#202e44] leading-[1.2] tracking-tight"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    {current.quote.split(" ").map((word, i) => (
                      <motion.span
                        key={i}
                        className="inline-block mr-[0.25em]"
                        variants={{
                          hidden: { opacity: 0, y: 22, rotateX: 90 },
                          visible: {
                            opacity: 1,
                            y: 0,
                            rotateX: 0,
                            transition: {
                              duration: 0.5,
                              delay: i * 0.045,
                              ease: [0.22, 1, 0.36, 1],
                            },
                          },
                          exit: {
                            opacity: 0,
                            y: -10,
                            transition: { duration: 0.18, delay: i * 0.018 },
                          },
                        }}
                      >
                        {word}
                      </motion.span>
                    ))}
                  </motion.blockquote>
                </AnimatePresence>
              </div>

              {/* Author row */}
              <div className="flex items-end justify-between gap-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.4, delay: 0.15 }}
                    className="flex items-center gap-4"
                  >
                    <motion.div
                      className="w-8 h-px bg-[#88734C] flex-shrink-0"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      style={{ originX: 0 }}
                    />
                    <div>
                      <p className="text-sm md:text-base font-medium text-[#202e44] leading-tight">
                        {current.author}
                      </p>
                      <p className="text-xs md:text-sm text-[#202e44]/55 mt-0.5">{current.role}</p>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Prev / Next buttons */}
                <div className="flex items-center gap-3 flex-shrink-0">
                  <NavButton onClick={goPrev} direction="prev" />
                  <NavButton onClick={goNext} direction="next" />
                </div>
              </div>

              {/* Dot indicators */}
              <div className="flex gap-2 mt-8">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className="relative h-px overflow-hidden cursor-pointer"
                    style={{ width: i === activeIndex ? "32px" : "16px", transition: "width 0.4s ease" }}
                  >
                    <span className="absolute inset-0 bg-[#202e44]/[0.15]" />
                    {i === activeIndex && (
                      <motion.span
                        className="absolute inset-0 bg-[#88734C]"
                        layoutId="activeDot"
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom ticker */}
          <div className="relative mt-16 overflow-hidden opacity-[0.06] pointer-events-none h-14">
            <motion.div
              className="flex whitespace-nowrap text-5xl font-bold tracking-tight text-[#202e44] absolute top-0"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            >
              {[...Array(8)].map((_, i) => (
                <span key={i} className="mx-10">
                  {testimonials.map((t) => t.company).join("  ·  ")}  ·
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom rule */}
      <div className="container mx-auto max-w-6xl px-6 md:px-12 lg:px-16 pb-24">
        <div className="h-px bg-[#202e44]/[0.08]" />
      </div>
    </section>
  )
}

// ── Nav button (light-themed) ─────────────────────────────────────

interface NavButtonProps {
  onClick: () => void
  direction: "prev" | "next"
}

function NavButton({ onClick, direction }: NavButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className="group relative w-11 h-11 rounded-full border border-[#202e44]/[0.15] flex items-center justify-center overflow-hidden cursor-pointer"
      whileHover="hovered"
      whileTap={{ scale: 0.93 }}
    >
      {/* Fill slides in from the correct side */}
      <motion.span
        className="absolute inset-0 bg-[#202e44]"
        variants={{ hovered: { x: "0%" } }}
        initial={{ x: direction === "prev" ? "-100%" : "100%" }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Arrow icon */}
      <motion.svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        className="relative z-10"
        variants={{ hovered: { color: "#fff" } }}
        initial={{ color: "#202e44" }}
        transition={{ duration: 0.15 }}
      >
        {direction === "prev" ? (
          <path
            d="M10 12L6 8L10 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : (
          <path
            d="M6 4L10 8L6 12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </motion.svg>
    </motion.button>
  )
}
