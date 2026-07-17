import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "About", href: "#about-section" },
  { label: "Vision", href: "#vision-section" },
  { label: "Projects", href: "#our-projects" },
  { label: "Services", href: "#services-timeline" },
  { label: "Contact", href: "#cta-section" },
];

export default function Navbar() {
  const [navVisible, setNavVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [brandHover, setBrandHover] = useState(false);

  useEffect(() => {
    const onScroll = () =>
      setNavVisible(window.scrollY < window.innerHeight * 0.75);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-[200]"
        animate={{ opacity: navVisible ? 1 : 0, y: navVisible ? 0 : -14 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ pointerEvents: navVisible ? "auto" : "none" }}
        initial={{ opacity: 0, y: -14 }}
      >
        <div className="relative flex items-center px-6 md:px-12 lg:px-16 py-6 md:py-8">
          {/* Left — logo */}
          <a href="#" className="shrink-0 z-10">
            <img
              src="/logo.png"
              alt="KAD Studio"
              className="h-12 md:h-10 w-auto object-contain brightness-0 invert"
            />
          </a>

          {/* Center — brand text with KAD ↔ KHARE hover */}
          <div className="absolute inset-x-0 flex justify-center pointer-events-none">
            <motion.div
              className="flex flex-col items-center pointer-events-auto cursor-default"
              style={{ minWidth: 110 }}
              onHoverStart={() => setBrandHover(true)}
              onHoverEnd={() => setBrandHover(false)}
            >
              <AnimatePresence mode="wait">
                {!brandHover ? (
                  /* ── default: KAD ─────────────────────────────── */
                  <motion.div
                    key="kad"
                    className="flex flex-col items-center"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span
                      className="text-white uppercase leading-none text-4xl md:text-5xl "
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        // fontfamily: "'Inter', sans-serif",
                        fontWeight: 500,
                        // fontSize: "clamp(1.2rem, 2.2vw, 3.5rem)",
                        letterSpacing: "0.05em",
                      }}
                    >
                      KAD
                    </span>
                    <span
                      className="text-white/80 uppercase font-light mt-[3px]"
                      style={{
                        fontFamily: "'Jost', sans-serif",
                        fontSize: "clamp(7px, 0.85vw, 20px)",
                        letterSpacing: "0.38em",
                      }}
                    >
                      Infra Ventures
                    </span>
                  </motion.div>
                ) : (
                  /* ── hover: KHARE ──────────────────────────────── */
                  <motion.div
                    key="khare"
                    className="flex flex-col items-center"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span
                      className="text-white font-light uppercase leading-none"
                      style={{
                                                fontFamily: "'Inter', sans-serif",

                        fontSize: "clamp(2.1rem, 2vw, 5rem)",
                        letterSpacing: "0em",
                      }}
                    >
                      KHARE
                    </span>
                    <span
                      className="text-white/80 uppercase font-light mt-[3px] text-center"
                      style={{
                        fontFamily: "'Jost', sans-serif",
                        fontSize: "clamp(8px, 0.75vw, 10px)",
                        letterSpacing: "0.3em",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Architecture &amp; Design Studio
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Right — hamburger (mobile only) */}
          <button
            onClick={() => setMenuOpen(true)}
            className="ml-auto z-10 text-white p-1"
            aria-label="Open menu"
          >
            <Menu className="w-8 h-8" />
          </button>
        </div>
      </motion.nav>

      {/* ── Mobile full-screen menu ─────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            className="fixed inset-0 z-[300] bg-white flex flex-col"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between px-6 py-6 border-b border-[#222A35]/[0.06]">
              <img
                src="/logo.png"
                alt="KAD Studio"
                className="h-8 w-auto object-contain"
              />
              <button
                onClick={() => setMenuOpen(false)}
                className="text-[#222A35] p-1"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex flex-col flex-1 justify-center px-8">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-[#222A35] font-extralight tracking-[-0.02em] py-4 border-b border-[#222A35]/[0.06] hover:opacity-50 transition-opacity"
                  style={{ fontSize: "clamp(1.8rem, 6vw, 2.5rem)" }}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.07, duration: 0.45 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            <p className="px-8 pb-10 text-[10px] tracking-[0.35em] uppercase text-[#222A35]/30">
              Khare Architecture &amp; Design Studio
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
