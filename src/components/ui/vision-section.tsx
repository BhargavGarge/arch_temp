import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const VISION_STATEMENT =
  "We do not build to impose forms on the landscape. We design to honor the micro-narratives of daily life—sculpting spaces that elevate biological well-being, restore physical dignity, and serve as hyper-local anchors for human connection.";

const SCALE_VISIONS = [
  {
    id: "urban",
    label: "Urban",
    subtitle: "The Human-Centric Anchor",
    body: 'We envision cities that heal rather than isolate. Our vision for large-scale development rejects fragmented urban sprawl in favor of "Urban Stitching"—creating high-performance, transit-oriented anchors that mend social deficits, invite community interaction, and serve as accessible centers for civic life.',
    tag: "Transit-Oriented Development",
  },
  {
    id: "residential",
    label: "Residential",
    subtitle: "The Fluid Sanctuary",
    body: "We envision homes that act as natural extensions of human rhythm. Driven by a Modern Mediterranean sensibility and sculptural, volumetric fluid design, our residential vision focuses on opening spaces to natural ventilation, maximizing passive daylight, and sculpting volumes that offer both sensory calmness and functional freedom.",
    tag: "Modern Mediterranean",
  },
  {
    id: "commercial",
    label: "Commercial",
    subtitle: "Psychology-Driven Environments",
    body: "We envision retail and corporate environments that communicate directly with human behavior. Our commercial vision integrates strategic, layered lighting design and acoustic science to subtly direct spatial circulation, reduce cognitive fatigue, and enhance the emotional comfort of every consumer and professional who steps inside.",
    tag: "Spatial Psychology",
  },
  {
    id: "educational",
    label: "Education",
    subtitle: "The Empathetic Vanguard",
    body: "Through the KAD Design Academy, our vision is to transform the future of design education. We are building an institutional ecosystem where technical software mastery is never separated from human empathy, ensuring the next generation enters the field ready to design for real-world impact.",
    tag: "KAD Design Academy",
  },
];

function splitToWords(text: string) {
  return text.split(/(\s+)/).map((part, i) => {
    if (/^\s+$/.test(part)) return part;
    return (
      <span key={i} className="vis-word inline-block">
        {part}
      </span>
    );
  });
}

export default function VisionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const el = quoteRef.current;
    if (!el) return;
    const words = el.querySelectorAll<HTMLElement>(".vis-word");
    const ctx = gsap.context(() => {
      gsap.set(words, { opacity: 0, y: 20 });
      ScrollTrigger.create({
        trigger: el,
        start: "top 78%",
        onEnter: () => {
          gsap.to(words, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.035,
            ease: "power3.out",
          });
        },
        onLeaveBack: () => {
          gsap.to(words, {
            opacity: 0,
            y: 20,
            duration: 0.32,
            stagger: 0.015,
            ease: "power2.in",
          });
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="vision-section"
      ref={sectionRef}
      className="w-full bg-white text-[#222A35] overflow-hidden"
    >
      <div className="container mx-auto max-w-7xl px-6 lg:px-12">
        {/* Manifesto */}
        <div className="pt-28 pb-20 border-b border-[#222A35]/[0.07]">
          <motion.span
            className="block text-[10px] tracking-[0.48em] uppercase text-[#222A35]/45 mb-14"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
          >
            Our Vision
          </motion.span>

          <p
            ref={quoteRef}
            className="text-[clamp(1.3rem,2.7vw,2.05rem)] font-extralight leading-[1.85] text-[#222A35] max-w-[860px]"
          >
            {splitToWords(VISION_STATEMENT)}
          </p>

          <motion.div
            className="mt-16 flex items-center gap-4"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.5 }}
          >
            <div className="w-10 h-px bg-[#222A35]" />
            <span className="text-[10px] tracking-[0.35em] uppercase text-[#222A35]/35">
              KAD Studio &amp; Infra Ventures
            </span>
          </motion.div>
        </div>

        {/* Scale Visions */}
        <div className="py-20">
          <motion.div
            className="flex items-center gap-6 mb-14"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[10px] tracking-[0.45em] uppercase text-[#222A35]/45 shrink-0">
              Segmented Visions
            </span>
            <motion.div
              className="flex-1 h-px bg-[#222A35]/[0.1]"
              initial={{ scaleX: 0, originX: "0%" }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            />
          </motion.div>

          {/* Tab pills */}
          <div className="flex flex-wrap gap-2.5 mb-14">
            {SCALE_VISIONS.map((v, i) => (
              <motion.button
                key={v.id}
                onClick={() => setActiveTab(i)}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`px-5 py-2.5 text-[10px] tracking-[0.3em] uppercase rounded-full border transition-all duration-300 cursor-pointer ${
                  activeTab === i
                    ? "bg-[#222A35] text-white border-[#222A35]"
                    : "bg-transparent text-[#222A35]/45 border-[#222A35]/20 hover:border-[#222A35]/50 hover:text-[#222A35]"
                }`}
              >
                {v.label}
              </motion.button>
            ))}
          </div>

          {/* Tab content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 lg:gap-24"
            >
              {/* Left: tag + subtitle + dots */}
              <div>
                <span className="text-[10px] tracking-[0.35em] uppercase text-[#222A35]/35 block mb-5">
                  {SCALE_VISIONS[activeTab].tag}
                </span>
                <h3 className="text-[clamp(1.8rem,4vw,2.85rem)] font-extralight leading-[1.12] text-[#222A35] tracking-[-0.02em]">
                  {SCALE_VISIONS[activeTab].subtitle}
                </h3>
                <div className="flex gap-2 mt-9">
                  {SCALE_VISIONS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveTab(i)}
                      className={`rounded-full transition-all duration-300 cursor-pointer ${
                        i === activeTab
                          ? "w-6 h-1.5 bg-[#222A35]"
                          : "w-1.5 h-1.5 bg-[#222A35]/22 hover:bg-[#222A35]/45"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Right: body */}
              <div className="flex items-start pt-1 lg:pt-2">
                <p className="text-[#222A35]/55 leading-[1.95] text-[0.975rem] font-light">
                  {SCALE_VISIONS[activeTab].body}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
