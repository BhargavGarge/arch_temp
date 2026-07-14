import { useState, useEffect } from "react"
import { motion } from "framer-motion"

// ── Per-card animated previews ──────────────────────────────────────

function BlueprintLines() {
  const widths = [100, 60, 85, 45, 78, 55, 92]
  return (
    <div className="flex flex-col justify-center h-full px-2 gap-2">
      {widths.map((w, i) => (
        <motion.div
          key={i}
          className="h-px rounded-full bg-[#222A35]"
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: `${w}%`, opacity: i % 2 === 0 ? 0.65 : 0.28 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.85, delay: i * 0.07, ease: "easeOut" }}
        />
      ))}
    </div>
  )
}

function LightingLayers() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="relative w-[80px] h-[80px] flex items-center justify-center">
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-[#222A35]"
            style={{ width: 18 + i * 18, height: 18 + i * 18 }}
            animate={{ opacity: [0.7, 0.15, 0.7], scale: [1, 1.04, 1] }}
            transition={{
              duration: 2.8,
              delay: i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
        <motion.div
          className="w-3 h-3 rounded-full bg-[#222A35]"
          animate={{ scale: [1, 1.22, 1], opacity: [1, 0.7, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </div>
  )
}

function MilestoneTracker() {
  const [active, setActive] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setActive((p) => (p >= 4 ? 0 : p + 1)), 700)
    return () => clearInterval(id)
  }, [])

  const steps = ["Site Analysis", "Design Phase", "Engineering", "Construction", "Key Handover"]
  return (
    <div className="flex flex-col justify-center h-full gap-[9px] px-2">
      {steps.map((label, i) => (
        <div key={i} className="flex items-center gap-3">
          <motion.div
            className="w-2 h-2 rounded-full flex-shrink-0 border"
            animate={{
              backgroundColor: i <= active ? "#222A35" : "transparent",
              borderColor: i <= active ? "#222A35" : "rgba(34,42,53,0.25)",
              scale: i === active ? 1.3 : 1,
            }}
            transition={{ duration: 0.25 }}
          />
          <motion.span
            className="text-[10px] tracking-[0.1em] text-[#222A35] font-light"
            animate={{ opacity: i <= active ? 0.85 : 0.2 }}
            transition={{ duration: 0.25 }}
          >
            {label}
          </motion.span>
        </div>
      ))}
    </div>
  )
}

function DrawingTrace() {
  const [drawn, setDrawn] = useState(false)
  useEffect(() => {
    const timer = setTimeout(() => setDrawn(true), 250)
    const id = setInterval(() => {
      setDrawn(false)
      setTimeout(() => setDrawn(true), 420)
    }, 3800)
    return () => { clearTimeout(timer); clearInterval(id) }
  }, [])

  return (
    <div className="flex items-center justify-center h-full">
      <svg width="100" height="72" viewBox="0 0 100 72" fill="none" className="overflow-visible">
        <motion.polyline
          points="5,67 5,32 50,8 95,32 95,67"
          stroke="#222A35"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: drawn ? 1 : 0 }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
        />
        <motion.rect
          x="34" y="44" width="20" height="23"
          stroke="#222A35"
          strokeWidth="1.5"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: drawn ? 1 : 0 }}
          transition={{ duration: 1.3, delay: 0.9, ease: "easeInOut" }}
        />
        <motion.rect
          x="61" y="36" width="19" height="19"
          stroke="#222A35"
          strokeWidth="1.5"
          fill="rgba(34,42,53,0.07)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: drawn ? 1 : 0 }}
          transition={{ duration: 1.1, delay: 1.3, ease: "easeInOut" }}
        />
      </svg>
    </div>
  )
}

// ── Feature definitions ─────────────────────────────────────────────

const FEATURES = [
  {
    Preview: BlueprintLines,
    title: "Architecture & Master Planning",
    description:
      "Volumetric fluid design that sculpts space to optimize microclimates, capture cross-ventilation, and follow daylight — from luxury villas to transit-oriented master plans.",
  },
  {
    Preview: LightingLayers,
    title: "Bespoke Interior Design",
    description:
      "Custom environments that prioritize spatial dignity and biological well-being, with layered lighting strategy and psychology-driven commercial layouts.",
  },
  {
    Preview: MilestoneTracker,
    title: "Turnkey Project Management",
    description:
      "Single-source accountability across every phase — site analysis, regulatory clearances, structural engineering, and precision fit-out delivery.",
  },
  {
    Preview: DrawingTrace,
    title: "KAD Design Academy",
    description:
      "A 12-month professional training incubator built by practicing architects — bridging technical mastery with human empathy for the next generation of designers.",
  },
]

// ── Exported grid ───────────────────────────────────────────────────

export function ServiceFeatureGrid({ dark = false }: { dark?: boolean }) {
  const card = dark
    ? "bg-[#F2F2EB]/[0.04] backdrop-blur-sm rounded-2xl p-6 min-h-[280px] flex flex-col border border-[#F2F2EB]/[0.07] shadow-sm"
    : "bg-white/55 backdrop-blur-sm rounded-2xl p-6 min-h-[280px] flex flex-col border border-[#202e44]/[0.07] shadow-sm"

  const title = "text-[#222A35] font-medium text-base mb-1"
  const desc = "text-[#222A35]/55 text-sm leading-relaxed"
  const divider = dark ? "h-px bg-[#222A35]/20 mb-4" : "h-px bg-[#222A35]/15 mb-4"

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {FEATURES.map(({ Preview, title: t, description }, i) => (
        <motion.div
          key={t}
          className={card}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 0.985, transition: { duration: 0.2 } }}
          whileTap={{ scale: 0.97 }}
        >
          <div className="flex-1 min-h-[140px]">
            <Preview />
          </div>
          <div className={divider} />
          <div>
            <h3 className={title}>{t}</h3>
            <p className={desc}>{description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
