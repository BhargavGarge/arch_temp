import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedHeading from "./AnimatedHeading";
import FadeIn from "./FadeIn";

const NAV_LINKS = ["Services", "Portfolio", "About Us", "Contact Us"];

export default function HeroSection() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <section className="relative w-full h-screen flex flex-col overflow-hidden">
      {/* Video background */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/hero.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="absolute inset-0 bg-black/30" aria-hidden="true" />

      {/* Content layer */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Navbar */}
        <div className="px-4 md:px-12 lg:px-16 pt-6">
          <nav className="liquid-glass rounded-xl px-4 py-2 flex items-center justify-between">
            {/* Brand */}
            <div className="flex items-center gap-3">
              <span className="text-2xl font-semibold tracking-tight text-white">
                Nexus
              </span>
            </div>

            {/* Desktop centre links */}
            <div className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-sm text-white hover:text-gray-300 transition-colors duration-200"
                >
                  {link}
                </a>
              ))}
            </div>

            {/* Desktop CTA */}
            <button className="hidden md:block bg-white text-black px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors duration-200">
              Start a Chat
            </button>

            {/* Mobile: hamburger */}
            <button
              className="md:hidden text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </nav>

          {/* Mobile dropdown */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="md:hidden mt-2 rounded-xl overflow-hidden liquid-glass border border-white/10"
              >
                {NAV_LINKS.map((link, i) => (
                  <a
                    key={link}
                    href="#"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center px-5 py-3.5 text-sm text-white/90 hover:bg-white/10 transition-colors border-b border-white/[0.06] last:border-0"
                    style={{ animationDelay: `${i * 40}ms` }}
                  >
                    {link}
                  </a>
                ))}
                <div className="px-4 py-3">
                  <button className="w-full bg-white text-black py-2.5 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors duration-200">
                    Start a Chat
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Hero content */}
        <div className="px-4 md:px-12 lg:px-16 flex-1 flex flex-col justify-end pb-10 md:pb-12 lg:pb-16">
          <div className="lg:grid lg:grid-cols-2 lg:items-end">
            {/* Left column */}
            <div>
              <AnimatedHeading
                text={"Shaping tomorrow\nwith vision and action."}
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal text-white mb-4"
                style={{ letterSpacing: "-0.04em" }}
                initialDelay={200}
                charDelay={30}
              />

              <FadeIn delay={800} duration={1000}>
                <p className="text-sm md:text-base lg:text-lg text-gray-300 mb-5 max-w-lg">
                  Nexus is dedicated to creating architectural masterpieces that
                  seamlessly blend luxury with sustainability, working closely
                  with each client to reflect their vision.
                </p>
              </FadeIn>

              <FadeIn delay={1200} duration={1000}>
                <div className="flex flex-wrap gap-3">
                  <button className="bg-white text-black px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors duration-200">
                    Start a Chat
                  </button>
                  <button className="liquid-glass border border-white/20 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-white hover:text-black transition-colors duration-200">
                    Explore Now
                  </button>
                </div>
              </FadeIn>
            </div>

            {/* Right column */}
            <FadeIn
              delay={1400}
              duration={1000}
              className="flex items-end justify-start lg:justify-end mt-6 lg:mt-0"
            >
              <div className="liquid-glass border border-white/20 px-5 py-2.5 rounded-xl">
                <span className="text-base md:text-xl lg:text-2xl font-light text-white">
                  Investing. Building. Advisory.
                </span>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
