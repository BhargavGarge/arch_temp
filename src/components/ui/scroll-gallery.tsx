import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

const GAP = 30
function getItemWidth() {
  if (typeof window === "undefined") return 368
  return Math.min(400, window.innerWidth - 32)
}

const items = [
  {
    id: 1,
    color: "#222A35",
    label: "Residences",
    category: "01",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    color: "#A9BBC8",
    label: "Corporate",
    category: "02",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    color: "#5C6E7E",
    label: "Hospitality",
    category: "03",
    image:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 4,
    color: "#6B5B45",
    label: "Retail",
    category: "04",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 5,
    color: "#3D5A6C",
    label: "Landscape",
    category: "05",
    image:
      "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&auto=format&fit=crop&q=80",
  },
]

export default function ScrollGallery() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const ITEM_WIDTH = getItemWidth()
  const totalDistance = (items.length - 1) * (ITEM_WIDTH + GAP)
  const x = useTransform(scrollYProgress, [0, 1], [0, -totalDistance])

  return (
    <div id="portfolio" style={{ overflowX: "hidden" }}>
      {/* Intro */}
      <section
        style={{
          height: "50vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "center",
          textAlign: "center",
          padding: "0 1.5rem 40px",
          background: "#F8F8F2",
        }}
      >
        <span
          style={{
            fontSize: "11px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#222A35",
            fontWeight: 500,
            marginBottom: "12px",
            display: "block",
          }}
        >
          Our Work
        </span>
        <h2
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(36px, 8vw, 64px)",
            color: "#202e44",
            margin: 0,
            fontWeight: 300,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
          }}
        >
          Selected Projects
        </h2>
        <div
          style={{
            width: "60px",
            height: "1px",
            background: "#222A35",
            margin: "20px auto 0",
          }}
        />
      </section>

      {/* Scroll container */}
      <div
        ref={containerRef}
        style={{ height: "300vh", position: "relative" }}
      >
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            width: `${ITEM_WIDTH}px`,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            overflow: "visible",
          }}
        >
          <motion.div
            style={{
              display: "flex",
              gap: `${GAP}px`,
              x,
              willChange: "transform",
            }}
          >
            {items.map((item) => (
              <GalleryItem key={item.id} item={item} width={ITEM_WIDTH} />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Outro */}
      <section
        style={{
          height: "60vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#202e44",
          padding: "0 1.5rem",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(28px, 5vw, 52px)",
            color: "#fff",
            fontWeight: 300,
            letterSpacing: "-0.03em",
            margin: "0 0 20px",
          }}
        >
          Every space tells a story.
        </p>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px", margin: "0 0 32px" }}>
          Let us tell yours.
        </p>
        <button
          style={{
            background: "#222A35",
            color: "#fff",
            border: "none",
            padding: "14px 32px",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: 500,
            fontFamily: "'Inter', sans-serif",
            cursor: "pointer",
            letterSpacing: "0.02em",
          }}
        >
          Start a Conversation
        </button>
      </section>
    </div>
  )
}

function GalleryItem({ item, width }: { item: (typeof items)[0]; width: number }) {
  return (
    <div
      style={{
        flexShrink: 0,
        width: `${width}px`,
        height: `${Math.min(500, Math.round(width * 1.3))}px`,
        borderRadius: "12px",
        position: "relative",
        overflow: "hidden",
        backgroundImage: `url(${item.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(to bottom, transparent 40%, ${item.color}cc)`,
        }}
      />
      {/* Text */}
      <div
        style={{
          position: "absolute",
          bottom: "30px",
          left: "30px",
          zIndex: 1,
        }}
      >
        <span
          style={{
            fontSize: "12px",
            color: "rgba(255,255,255,0.7)",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
            display: "block",
            marginBottom: "8px",
            letterSpacing: "0.15em",
          }}
        >
          {item.category}
        </span>
        <h3
          style={{
            fontSize: "28px",
            fontWeight: 400,
            color: "#fff",
            margin: 0,
            fontFamily: "'Inter', sans-serif",
            letterSpacing: "-0.02em",
          }}
        >
          {item.label}
        </h3>
      </div>
    </div>
  )
}
