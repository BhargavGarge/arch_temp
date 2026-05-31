import { ReactLenis } from "lenis/react";
import { useEffect, useState } from "react";
import HeroSection from "./components/HeroSection";
import AboutUsSection from "./components/ui/about-us-section";
import Portfolio from "./components/ui/portfolio";
import { Testimonial } from "./components/ui/design-testimonial";
import CTACallback from "./components/ui/cta-callback";
import { Footer } from "./components/ui/footer-section";
import ScrollBackground from "./components/ScrollBackground";
import LoadingScreen from "./components/LoadingScreen";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LoadingScreen
        isLoading={isLoading}
        onLoadingComplete={() => setIsLoading(false)}
      />
      {!isLoading && (
        <>
          <ScrollBackground />
          <ReactLenis
            root
            options={{ lerp: 0.08, duration: 1.4, smoothWheel: true }}
          >
            <HeroSection />
            <AboutUsSection />
            <Portfolio />
            <Testimonial />
            <CTACallback />
            <Footer />
          </ReactLenis>
        </>
      )}
    </>
  );
}

export default App;
