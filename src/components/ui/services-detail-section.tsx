import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Plus, Minus } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const BELT_TEXT =
  "ARCHITECTURE • MASTER PLANNING • BESPOKE INTERIORS • TURNKEY DELIVERY • DESIGN ACADEMY • ";

const SERVICES = [
  {
    number: "01",
    title: "Architecture & Master Planning",
    tagline: "Sculpting Volume, Light & Passive Performance",
    image:
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=900&auto=format&fit=crop&q=80",
    imageAlt: "Modern volumetric architecture exterior",
    description:
      "We do not design static, box-like structures. Our architectural practice centers on volumetric fluid design—sculpting space to optimize microclimates, capture natural cross-ventilation, and follow the natural path of daylight. From high-end luxury villas with a Modern Mediterranean aesthetic to large-scale master planning, we build environments that are visually striking yet inherently logical.",
    bullets: [
      "Volumetric Fluid Architecture: Sculptural, continuous indoor-outdoor layouts that reject rigid boundaries.",
      "Urban Stitching & TOD: Designing multi-acre, transit-oriented developments that repair social infrastructure deficits and seamlessly integrate with local communities.",
      "Passive Bioclimatic Strategy: Orienting structures to optimize thermal performance, reduce energy dependency, and work with local site conditions.",
    ],
  },
  {
    number: "02",
    title: "Bespoke Interior Design",
    tagline: "Environments Tuned to Human Psychology",
    image:
      "https://images.unsplash.com/photo-1616137466211-f939a420be84?w=900&auto=format&fit=crop&q=80",
    imageAlt: "Luxury interior with layered ambient lighting",
    description:
      "An interior space should be a natural extension of human routine. We design custom residential and commercial environments that prioritize spatial dignity, tactile comfort, and biological well-being. Our commercial practice focuses heavily on sensory ergonomics—understanding how spatial volume, acoustics, and materials interact with human emotion and behavior.",
    bullets: [
      "Bespoke Luxury Residential: High-end villas and penthouses tailored to the specific spatial rituals and privacy needs of the family.",
      "Layered Lighting Strategy: Custom-engineered illumination plans combining ambient, task, and accent layers to reduce visual fatigue and create depth.",
      "Psychology-Driven Commercial Layouts: Using the \"moth effect\"—precise focal lighting to guide customer circulation, enhance product presentation, and drive retail engagement.",
    ],
  },
  {
    number: "03",
    title: "Turnkey Project Management",
    tagline: "Single-Source Accountability, Precision Delivery",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=900&auto=format&fit=crop&q=80",
    imageAlt: "Construction site with precision engineering detail",
    description:
      "Great design is meaningless without precise execution. Our turnkey construction division assumes total, single-source accountability for your investment. By managing the entire pipeline—from raw site analysis and regulatory clearances to structural detailing and fine fit-outs—we insulate our clients from subcontractor conflict and guarantee budget and schedule compliance.",
    bullets: [
      "Comprehensive Project Ownership: A single point of contact overseeing architects, engineers, and tier-1 material vendors.",
      "Rigorous Engineering & QC: ISO-aligned material testing, milestone tracking, and strict structural quality controls at every checkpoint.",
      "Material Procurement Control: Sourcing high-grade finishes and sustainable materials directly from a trusted vendor network to pass cost efficiencies to the client.",
    ],
  },
  {
    number: "04",
    title: "KAD Design Academy",
    tagline: "Incubating the Next Generation of Empathetic Vanguards",
    image:
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=900&auto=format&fit=crop&q=80",
    imageAlt: "Architecture design studio with students at work",
    description:
      "The KAD Design Academy is our firm's competitive, high-fidelity professional training incubator. Built and taught by our own practicing architects and senior specialists, our 12-Month Interior Design Advanced Pro Learner Course bridges the massive gap between academic theory and real-world execution. We don't just teach software; we train designers to think with deep empathy and execute with structural precision.",
    bullets: [
      "Live Studio Briefs: Students work directly on active firm projects, building a high-fidelity portfolio that commands immediate professional authority.",
      "Advanced Technical Workflow: Comprehensive mastery of AutoCAD, SketchUp, and advanced rendering engines coupled with real-world construction documentation.",
      "The Business of Design: Intensive training in material sourcing, client acquisition, detailed costing, project contracts, and independent studio management.",
    ],
  },
];

export default function ServicesDetailSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState<number | null>(null);

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;
    const chars = el.querySelectorAll<HTMLElement>(".svc-char");
    const ctx = gsap.context(() => {
      gsap.set(chars, { y: "110%", opacity: 0 });
      ScrollTrigger.create({
        trigger: el,
        start: "top 80%",
        onEnter: () => {
          gsap.to(chars, {
            y: "0%",
            opacity: 1,
            duration: 1.1,
            stagger: 0.04,
            ease: "power4.out",
          });
        },
        onLeaveBack: () => {
          gsap.to(chars, {
            y: "110%",
            opacity: 0,
            duration: 0.5,
            stagger: 0.02,
            ease: "power2.in",
          });
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services-detail"
      ref={sectionRef}
      className="w-full bg-white text-[#222A35] overflow-hidden"
    >
      {/* Marquee belt */}
      <div className="border-y border-[#222A35]/10 py-[10px] overflow-hidden">
        <MarqueeBelt />
      </div>

      <div className="container mx-auto max-w-7xl px-6 lg:px-12">
        {/* Heading */}
        <div className="pt-20 pb-16">
          <motion.span
            className="block text-[10px] tracking-[0.48em] uppercase text-[#222A35]/45 mb-10"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
          >
            Unified Capabilities
          </motion.span>

          <div ref={headingRef}>
            <div className="overflow-hidden leading-[0.85] pb-1">
              <h2 className="text-[clamp(3.2rem,10vw,8rem)] font-extralight tracking-[-0.025em] text-[#222A35]">
                {"Services".split("").map((c, i) => (
                  <span key={i} className="svc-char inline-block">
                    {c}
                  </span>
                ))}
              </h2>
            </div>
          </div>

          <motion.p
            className="mt-8 text-[#222A35]/45 text-[0.95rem] font-light leading-[1.85] max-w-[480px]"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.28 }}
          >
            Our practice operates as a single, cohesive ecosystem — integrating
            architectural design, turnkey engineering, and professional education
            under one firm, from first sketch to final key handover.
          </motion.p>
        </div>

        {/* Accordion */}
        <div className="pb-28">
          {SERVICES.map((svc, i) => (
            <ServiceRow
              key={svc.number}
              service={svc}
              index={i}
              isExpanded={expanded === i}
              onToggle={() => setExpanded(expanded === i ? null : i)}
            />
          ))}
          <div className="h-px bg-[#222A35]/[0.08]" />
        </div>
      </div>
    </section>
  );
}

// ── Service Row ─────────────────────────────────────────────────────

interface ServiceRowProps {
  service: (typeof SERVICES)[number];
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}

function ServiceRow({ service, index, isExpanded, onToggle }: ServiceRowProps) {
  const lineRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const line = lineRef.current;
    if (!line) return;
    const ctx = gsap.context(() => {
      gsap.set(line, { scaleX: 0, transformOrigin: "left" });
      ScrollTrigger.create({
        trigger: line,
        start: "top 90%",
        onEnter: () => {
          gsap.to(line, {
            scaleX: 1,
            duration: 1.1,
            delay: index * 0.04,
            ease: "power4.inOut",
          });
        },
      });
    });
    return () => ctx.revert();
  }, [index]);

  // GSAP clip-path reveal when image mounts
  useEffect(() => {
    const el = imgRef.current;
    if (!el || !isExpanded) return;
    gsap.fromTo(
      el,
      { clipPath: "inset(0 100% 0 0)" },
      { clipPath: "inset(0 0% 0 0)", duration: 0.85, ease: "power4.inOut", delay: 0.08 }
    );
  }, [isExpanded]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.7, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
    >
      <div ref={lineRef} className="h-px bg-[#222A35]/[0.08]" />

      {/* Header row */}
      <button
        className="w-full text-left py-8 md:py-10 group cursor-pointer"
        onClick={onToggle}
        aria-expanded={isExpanded}
      >
        <div className="grid grid-cols-[2rem_1fr_auto] md:grid-cols-[3rem_1fr_auto] gap-4 md:gap-8 items-center">
          <span className="text-[10px] tracking-[0.3em] text-[#222A35]/22 font-light self-start pt-1">
            {service.number}
          </span>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-8 min-w-0">
            <h3 className="text-[clamp(1.05rem,2.4vw,1.65rem)] font-extralight tracking-[-0.01em] text-[#222A35] group-hover:opacity-60 transition-opacity duration-300">
              {service.title}
            </h3>
            <span className="text-[#222A35]/28 text-[11px] tracking-[0.12em] font-light sm:text-right shrink-0 italic">
              {service.tagline}
            </span>
          </div>

          <div className="w-7 h-7 flex items-center justify-center border border-[#222A35]/12 rounded-full group-hover:border-[#222A35]/38 transition-colors duration-300">
            <AnimatePresence mode="wait" initial={false}>
              {isExpanded ? (
                <motion.div
                  key="minus"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <Minus className="w-3 h-3 text-[#222A35]" />
                </motion.div>
              ) : (
                <motion.div
                  key="plus"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <Plus className="w-3 h-3 text-[#222A35]" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </button>

      {/* Expanded content */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-14 pl-10 md:pl-14 grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-0 lg:gap-10">

              {/* Image — clip-path revealed via GSAP */}
              <div
                ref={imgRef}
                className="relative overflow-hidden mb-8 lg:mb-0 rounded-sm"
                style={{ clipPath: "inset(0 100% 0 0)" }}
              >
                <img
                  src={service.image}
                  alt={service.imageAlt}
                  className="w-full h-full object-cover object-center"
                  style={{ minHeight: "300px", maxHeight: "420px" }}
                />
                {/* Subtle dark vignette at bottom */}
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white/30 to-transparent pointer-events-none" />
                {/* Service number watermark */}
                <span className="absolute top-4 left-4 text-[10px] tracking-[0.3em] text-white/60 uppercase">
                  {service.number} / 04
                </span>
              </div>

              {/* Text: description + bullets */}
              <div className="flex flex-col justify-center lg:pl-4">
                <motion.p
                  className="text-[#222A35]/52 leading-[1.95] text-[0.94rem] font-light mb-8"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                >
                  {service.description}
                </motion.p>

                <ul className="space-y-4 border-t border-[#222A35]/[0.06] pt-6">
                  {service.bullets.map((b, bi) => (
                    <motion.li
                      key={bi}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + bi * 0.1, duration: 0.42 }}
                      className="flex items-start gap-3.5 text-[0.875rem] text-[#222A35]/48 leading-[1.75] font-light"
                    >
                      <span className="w-[3px] h-[3px] rounded-full bg-[#222A35]/30 flex-shrink-0 mt-[0.6rem]" />
                      {b}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Marquee Belt ─────────────────────────────────────────────────────

function MarqueeBelt() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const ctx = gsap.context(() => {
      gsap.delayedCall(0.05, () => {
        const w = track.scrollWidth / 2;
        gsap.fromTo(track, { x: 0 }, { x: -w, ease: "none", duration: 26, repeat: -1 });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="overflow-hidden">
      <div ref={trackRef} className="flex whitespace-nowrap">
        {[0, 1].map((i) => (
          <span
            key={i}
            className="shrink-0 text-[10px] tracking-[0.38em] text-[#222A35]/28 uppercase"
          >
            {BELT_TEXT.repeat(8)}
          </span>
        ))}
      </div>
    </div>
  );
}
