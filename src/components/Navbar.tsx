import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "About", href: "#about-section" },
  { label: "Vision", href: "#vision-section" },
  { label: "Services", href: "#services-detail" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Contact", href: "#cta-section" },
];

export default function Navbar() {
  const [visible, setVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () =>
      setVisible(window.scrollY < window.innerHeight * 0.75);
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
        animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -14 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ pointerEvents: visible ? "auto" : "none" }}
        initial={{ opacity: 0, y: -14 }}
      >
        <div className="relative flex items-center px-6 md:px-12 lg:px-16 py-6 md:py-8">

          {/* Left — logo */}
          <a href="#" className="shrink-0 z-10">
            <img
              src="/logo.png"
              alt="KAD Studio & Infra Ventures"
              className="h-9 md:h-10 w-auto object-contain brightness-0 invert"
            />
          </a>

          {/* Center — brand text (absolute so it's truly centered on any screen) */}
          <div className="absolute inset-x-0 flex flex-col items-center pointer-events-none">
            <span className="text-white text-2xl md:text-3xl font-light tracking-[0.2em] uppercase leading-none">
              KAD
            </span>
            <span className="text-white/45 text-[9px] md:text-[10px] tracking-[0.35em] uppercase font-light mt-1">
              Infra Ventures
            </span>
          </div>

          {/* Right — hamburger, mobile only */}
          <button
            onClick={() => setMenuOpen(true)}
            className="ml-auto z-10 md:hidden text-white p-1"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>

        </div>
      </motion.nav>

      {/* Mobile full-screen menu */}
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
            {/* Close */}
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

            {/* Nav links */}
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

            {/* Bottom label */}
            <p className="px-8 pb-10 text-[10px] tracking-[0.35em] uppercase text-[#222A35]/30">
              KAD Studio &amp; Infra Ventures
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
