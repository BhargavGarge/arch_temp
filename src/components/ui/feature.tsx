import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Home, Building2, ShoppingBag, Leaf, Ruler, Droplets } from "lucide-react"

// ── Per-card animated previews ────────────────────────────────────

function BlueprintLines() {
  const widths = [100, 65, 85, 50, 78, 90]
  return (
    <div className="flex flex-col justify-center h-full px-2 gap-2.5">
      {widths.map((w, i) => (
        <motion.div
          key={i}
          className="h-px rounded-full bg-[#88734C]"
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: `${w}%`, opacity: i % 2 === 0 ? 0.7 : 0.35 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.8, delay: i * 0.08, ease: "easeOut" }}
        />
      ))}
    </div>
  )
}

function OfficeGrid() {
  const [active, setActive] = useState(-1)
  useEffect(() => {
    setActive(0)
    const id = setInterval(() => setActive(p => (p + 1) % 9), 350)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="flex items-center justify-center h-full">
      <div className="grid grid-cols-3 gap-2">
        {Array.from({ length: 9 }).map((_, i) => (
          <motion.div
            key={i}
            className="w-7 h-7 rounded-sm"
            animate={{
              backgroundColor:
                i <= active ? "rgba(136,115,76,0.85)" : "rgba(136,115,76,0.1)",
              scale: i === active ? 1.25 : 1,
            }}
            transition={{ duration: 0.2 }}
          />
        ))}
      </div>
    </div>
  )
}

function StarRating() {
  const [filled, setFilled] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setFilled(p => (p >= 5 ? 0 : p + 1)), 550)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="flex flex-col items-center justify-center h-full gap-3">
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map(s => (
          <motion.svg
            key={s}
            width="22"
            height="22"
            viewBox="0 0 24 24"
            animate={{ scale: s === filled ? [1, 1.45, 1] : 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.path
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              animate={{
                fill: s <= filled ? "#88734C" : "rgba(136,115,76,0.12)",
                stroke: s <= filled ? "#88734C" : "rgba(136,115,76,0.4)",
              }}
              transition={{ duration: 0.25 }}
            />
          </motion.svg>
        ))}
      </div>
      <span className="text-[10px] tracking-[0.25em] text-[#88734C]/60 uppercase">Client Satisfaction</span>
    </div>
  )
}

function EcoProgress() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const t = setTimeout(() => setProgress(100), 400)
    const id = setInterval(() => {
      setProgress(0)
      setTimeout(() => setProgress(100), 200)
    }, 3200)
    return () => { clearTimeout(t); clearInterval(id) }
  }, [])
  const r = 32
  const circ = 2 * Math.PI * r
  return (
    <div className="flex items-center justify-center h-full">
      <div className="relative">
        <svg width="84" height="84" viewBox="0 0 84 84">
          <circle cx="42" cy="42" r={r} fill="none" stroke="rgba(136,115,76,0.1)" strokeWidth="4" />
          <motion.circle
            cx="42" cy="42" r={r}
            fill="none" stroke="#88734C" strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circ}
            animate={{ strokeDashoffset: circ * (1 - progress / 100) }}
            transition={{ duration: 1.6, ease: "easeOut" }}
            style={{ transform: "rotate(-90deg)", transformOrigin: "42px 42px" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-[#88734C] font-medium text-base leading-tight">{progress}%</span>
          <span className="text-[#202e44]/40 text-[8px] tracking-widest uppercase">Eco</span>
        </div>
      </div>
    </div>
  )
}

function SpaceLayout() {
  const [layout, setLayout] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setLayout(p => (p + 1) % 3), 2200)
    return () => clearInterval(id)
  }, [])
  const configs = [
    { cols: "grid-cols-2", rows: "grid-rows-2", spans: [1, 1, 2, 1] },
    { cols: "grid-cols-3", rows: "grid-rows-1", spans: [1, 1, 1, 1] },
    { cols: "grid-cols-2", rows: "grid-rows-2", spans: [2, 1, 1, 1] },
  ]
  const cfg = configs[layout]
  return (
    <div className="flex items-center justify-center h-full">
      <motion.div
        className={`grid ${cfg.cols} ${cfg.rows} gap-1.5 w-[120px] h-[80px]`}
        layout
      >
        {cfg.spans.map((span, i) => (
          <motion.div
            key={i}
            className="bg-[#88734C]/20 rounded-sm border border-[#88734C]/15 min-h-[20px]"
            style={{ gridColumn: `span ${span}` }}
            layout
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
      </motion.div>
    </div>
  )
}

function RippleCircles() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="relative w-20 h-20 flex items-center justify-center">
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-[#88734C]"
            animate={{
              width: ["20px", "72px"],
              height: ["20px", "72px"],
              opacity: [0.8, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.65,
              ease: "easeOut",
            }}
          />
        ))}
        <Droplets className="w-6 h-6 text-[#88734C]" strokeWidth={1.5} />
      </div>
    </div>
  )
}

// ── Feature definitions ───────────────────────────────────────────

const FEATURES = [
  {
    Icon: Home,
    Preview: BlueprintLines,
    title: "Residences",
    description:
      "Crafting homes that merge bold contemporary aesthetics with the warmth of lived experience — unconventional, striking and deeply personal.",
  },
  {
    Icon: Building2,
    Preview: OfficeGrid,
    title: "Corporate Offices",
    description:
      "Designing workspaces that inspire productivity and reflect brand identity — minimalist yet bold, purpose-built for the modern enterprise.",
  },
  {
    Icon: ShoppingBag,
    Preview: StarRating,
    title: "Retail & Hospitality",
    description:
      "Creating immersive environments that captivate customers and elevate the brand experience at every touchpoint.",
  },
  {
    Icon: Leaf,
    Preview: EcoProgress,
    title: "Sustainable Design",
    description:
      "Using bamboo, ash wood and mud bricks alongside sun path–oriented planning, rainwater recycling and indigenous planting.",
  },
  {
    Icon: Ruler,
    Preview: SpaceLayout,
    title: "Space Planning",
    description:
      "Bridging all technical and non-technical specifications through a broad design approach — comfort, luxury and environmental responsibility in one.",
  },
  {
    Icon: Droplets,
    Preview: RippleCircles,
    title: "Courtyards & Green",
    description:
      "Integrating courtyards, greenery and water management systems that lessen heat load and create living connections between architecture and landscape.",
  },
]

// ── Exported grid ─────────────────────────────────────────────────

export function ServiceFeatureGrid({ dark = false }: { dark?: boolean }) {
  const card = dark
    ? "bg-[#F2F2EB]/[0.04] backdrop-blur-sm rounded-2xl p-6 min-h-[280px] flex flex-col border border-[#F2F2EB]/[0.07] shadow-sm"
    : "bg-white/55 backdrop-blur-sm rounded-2xl p-6 min-h-[280px] flex flex-col border border-[#202e44]/[0.07] shadow-sm"

  const title = dark ? "text-[#F2F2EB] font-medium text-base mb-1" : "text-[#202e44] font-medium text-base mb-1"
  const desc = dark ? "text-[#F2F2EB]/45 text-sm leading-relaxed" : "text-[#202e44]/55 text-sm leading-relaxed"
  const divider = dark ? "h-px bg-[#88734C]/20 mb-4" : "h-px bg-[#88734C]/15 mb-4"

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {FEATURES.map(({ Preview, title: t, description }, i) => (
        <motion.div
          key={t}
          className={card}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 0.985, transition: { duration: 0.2 } }}
          whileTap={{ scale: 0.97 }}
        >
          {/* Animated preview area */}
          <div className="flex-1 min-h-[130px]">
            <Preview />
          </div>

          {/* Divider */}
          <div className={divider} />

          {/* Text */}
          <div>
            <h3 className={title}>{t}</h3>
            <p className={desc}>{description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
