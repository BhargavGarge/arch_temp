import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { useState } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import VisionSection from "./components/ui/vision-section";

import ServicesDetailSection from "./components/ui/services-detail-section";
import Portfolio from "./components/ui/portfolio";
import OurProjectsSection from "./components/ui/our-projects-section";
import { Testimonial } from "./components/ui/design-testimonial";
import CTACallback from "./components/ui/cta-callback";
import { Footer } from "./components/ui/footer-section";

gsap.registerPlugin(ScrollTrigger);

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 50,
    restDelta: 0.001,
  });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[9999] pointer-events-none"
      style={{ scaleX, backgroundColor: "#fff", mixBlendMode: "difference" }}
    />
  );
}

function LenisSync() {
  useLenis(ScrollTrigger.update);
  return null;
}

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <ReactLenis
      root
      options={{
        duration: 1.4,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        syncTouch: true,
      }}
    >
      <LenisSync />
      <ScrollProgress />
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="loader"
            className="fixed inset-0 z-[999]"
            exit={{ opacity: 0, scale: 1.03 }}
            transition={{ duration: 0.75, ease: [0.4, 0, 0.2, 1] }}
          >
            <LoadingScreen onComplete={() => setLoading(false)} />
          </motion.div>
        )}
      </AnimatePresence>
      {!loading && (
        <>
          <Navbar />
          <HeroSection />
          <div id="explore-sections">
            <VisionSection />

            <ServicesDetailSection />
            <Portfolio />
            <OurProjectsSection />
            <Testimonial />
            <CTACallback />
            <Footer />
          </div>
        </>
      )}
    </ReactLenis>
  );
}

export default App;
