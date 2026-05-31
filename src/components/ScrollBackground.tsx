import { useEffect, useState } from "react"

type Theme = "light" | "dark"

const SECTIONS: { id: string; theme: Theme }[] = [
  { id: "about-section",       theme: "light" },
  { id: "portfolio",           theme: "dark"  },
  { id: "testimonial-section", theme: "light" },
  { id: "cta-section",         theme: "dark"  },
  { id: "footer-section",      theme: "dark"  },
]

export default function ScrollBackground() {
  const [theme, setTheme] = useState<Theme>("dark")

  useEffect(() => {
    const update = () => {
      const mid = window.innerHeight * 0.5
      let active: Theme = "dark" // hero default

      for (const { id, theme } of SECTIONS) {
        const el = document.getElementById(id)
        if (!el) continue
        if (el.getBoundingClientRect().top <= mid) active = theme
      }

      setTheme(active)
    }

    window.addEventListener("scroll", update, { passive: true })
    update()
    return () => window.removeEventListener("scroll", update)
  }, [])

  return (
    <div
      className="fixed inset-0 -z-10"
      style={{
        backgroundColor: theme === "light" ? "#F2F2EB" : "#080808",
        transition: "background-color 750ms cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    />
  )
}
