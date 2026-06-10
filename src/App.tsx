import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import LoadingScreen from "./components/LoadingScreen";
import HeroSection from "./components/HeroSection";
import AboutUsSection from "./components/ui/about-us-section";
import { ServiceFeatureGrid } from "./components/ui/feature";
import Portfolio from "./components/ui/portfolio";
import ScrollGallery from "./components/ui/scroll-gallery";
import { Testimonial } from "./components/ui/design-testimonial";
import CTACallback from "./components/ui/cta-callback";
import { Footer } from "./components/ui/footer-section";

function App() {
  const [loading, setLoading] = useState(true);
  const [explored, setExplored] = useState(false);

  return (
    <>
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
          <HeroSection />

          {!explored && (
            <div className="flex justify-center py-12">
              <button
                onClick={() => {
                  setExplored(true);
                  setTimeout(() => {
                    document
                      .getElementById("explore-sections")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }, 50);
                }}
                className="px-8 py-3 text-sm font-semibold tracking-widest uppercase border border-white/30 text-white bg-white/5 hover:bg-white hover:text-black transition-all duration-300 rounded-sm"
              >
                Explore
              </button>
            </div>
          )}

          {explored && (
            <div id="explore-sections">
              <AboutUsSection />
              {/* <ServiceFeatureGrid /> */}
              <Portfolio />
              {/* <ScrollGallery /> */}
              <Testimonial />
              <CTACallback />
              <Footer />
            </div>
          )}
        </>
      )}
    </>
  );
}

export default App;
