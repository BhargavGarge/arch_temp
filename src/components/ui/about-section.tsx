import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: "15+", label: "Years of Field Experience" },
  { value: "41+", label: "Projects Delivered" },
  { value: "3", label: "Core Disciplines" },
  { value: "1", label: "Unified Framework" },
];

const HEADING_LINES = [
  "The Intersection of",
  "Structural Precision",
  "& Radical Spatial",
  "Empathy.",
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const aboutTitleRef = useRef<HTMLDivElement>(null);
  const ruleMidRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── "About Us" char reveal — matches Services ── */
      const el = aboutTitleRef.current;
      if (el) {
        const chars = el.querySelectorAll<HTMLElement>(".about-char");
        gsap.set(chars, { y: "110%", opacity: 0 });
        ScrollTrigger.create({
          trigger: el,
          start: "top 80%",
          once: true,
          onEnter: () => {
            gsap.to(chars, {
              y: "0%",
              opacity: 1,
              duration: 1.1,
              stagger: 0.04,
              ease: "power4.out",
            });
          },
        });
      }

      /* ── sub-heading lines ── */
      gsap.from(headingRef.current?.querySelectorAll(".about-line") ?? [], {
        y: "108%",
        duration: 1.05,
        stagger: 0.09,
        ease: "power4.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 82%",
          once: true,
        },
      });

      /* ── mid rule ── */
      gsap.from(ruleMidRef.current, {
        scaleX: 0,
        transformOrigin: "left",
        duration: 1.2,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: ruleMidRef.current,
          start: "top 88%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about-section"
      ref={sectionRef}
      className="bg-white text-[#222A35] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* ── heading block — matches Services style ────────────── */}
        <div className="pt-12 sm:pt-16 md:pt-20 pb-10 sm:pb-14 md:pb-16">
          <motion.span
            className="block text-[10px] tracking-[0.48em] uppercase text-[#222A35]/45 mb-10"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
          >
            The Firm Narrative
          </motion.span>

          <div ref={aboutTitleRef}>
            <div className="overflow-hidden leading-[0.85] pb-1">
              <h2 className="text-[clamp(3.2rem,10vw,8rem)] font-extralight tracking-[-0.025em] text-[#222A35]">
                {"About Us".split("").map((c, i) => (
                  <span key={i} className="about-char inline-block">
                    {c === " " ? " " : c}
                  </span>
                ))}
              </h2>
            </div>
          </div>

          {/* <motion.p
            className="mt-8 text-[#222A35]/45 text-[0.95rem] font-light leading-[1.85] max-w-[480px]"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.28 }}
          >
            A full-spectrum architecture, turnkey development, and design
            education firm — operating at the intersection of structural
            precision and radical spatial empathy.
          </motion.p> */}
        </div>

        {/* ── main grid ────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[55fr_45fr] gap-12 lg:gap-24 py-14 sm:py-18 md:py-24">
          {/* Left — heading */}
          <div ref={headingRef}>
            {HEADING_LINES.map((line, i) => (
              <div key={i} className="overflow-hidden leading-[1.12]">
                <span
                  className="about-line block text-[#222A35] font-extralight tracking-[-0.025em]"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "clamp(2.2rem, 5vw, 4.2rem)",
                  }}
                >
                  {line}
                </span>
              </div>
            ))}

            <motion.div
              className="flex items-center gap-4 mt-10 sm:mt-12"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              <div className="w-8 h-px bg-[#222A35]/20" />
              <span
                className="text-[#222A35] uppercase font-semibold"
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: "clamp(8px, 0.9vw, 10px)",
                  letterSpacing: "0.4em",
                }}
              >
                Founded in Raipur, Chhattisgarh
              </span>
            </motion.div>
          </div>

          {/* Right — body */}
          <div className="flex flex-col justify-center gap-7">
            <motion.p
              className="text-[#222A35]/80 text-[0.925rem] leading-[1.9] font-light"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.15 }}
            >
              At KAD Studio &amp; Infra Ventures, we view the built environment
              as a living, breathing extension of human behavior. Founded as a
              full-spectrum architecture, turnkey development, and design
              education firm, we operate at the precise intersection of rigorous
              technical engineering and deep spatial empathy.
            </motion.p>

            {/* pull quote */}
            <motion.blockquote
              className="border-l border-[#222A35]/80 pl-5 sm:pl-6"
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.28 }}
            >
              <p
                className="text-[#222A35]/80 font-light italic leading-[1.55]"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "clamp(1.15rem, 2vw, 1.5rem)",
                }}
              >
                "A space succeeds not when it wins an aesthetic award, but when
                it seamlessly accommodates the rhythm of the people inside it."
              </p>
            </motion.blockquote>

            <motion.p
              className="text-[#222A35]/55 text-[0.925rem] leading-[1.9] font-light"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.38 }}
            >
              With over 15 years of practical field experience, our integrated
              framework unites architects, structural engineers, and interior
              specialists under a single line of communication — owning every
              phase from raw site microclimate analysis to precision material
              procurement, eliminating contractor friction from first sketch to
              final key handover.
            </motion.p>
          </div>
        </div>

        {/* ── mid rule ─────────────────────────────────────────── */}
        <div ref={ruleMidRef} className="h-px bg-[#222A35]/[0.08] w-full" />

        {/* ── stats row ────────────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-[#222A35]/[0.06]">
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              className="px-6 sm:px-8 md:px-10 py-10 sm:py-12 md:py-14 first:pl-0 last:pr-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: i * 0.1 }}
            >
              <span
                className="block text-[#222A35] font-extralight leading-none tracking-[-0.03em] mb-3"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "clamp(2.8rem, 5vw, 4rem)",
                }}
              >
                {stat.value}
              </span>
              <span
                className="block text-[#222A35]/35 uppercase font-light leading-relaxed"
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: "clamp(8px, 0.85vw, 10px)",
                  letterSpacing: "0.32em",
                }}
              >
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* ── bottom rule ──────────────────────────────────────── */}
        <motion.div
          className="h-px bg-[#222A35]/[0.06] w-full"
          initial={{ scaleX: 0, originX: "0%" }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* ── capabilities strip ───────────────────────────────── */}
        <div className="py-10 sm:py-12 md:py-14 flex flex-wrap items-center gap-x-8 gap-y-4">
          {[
            "Architecture & Master Planning",
            "Bespoke Interior Design",
            "Turnkey Project Management",
            "KAD Design Academy",
          ].map((cap, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <span className="w-1 h-1 rounded-full bg-[#222A35]/20 flex-shrink-0" />
              <span
                className="text-[#222A35]/35 uppercase font-light"
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: "clamp(8px, 0.85vw, 10px)",
                  letterSpacing: "0.3em",
                }}
              >
                {cap}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
