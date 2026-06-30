import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BELT_TEXT =
  "ARCHITECTURE • MASTER PLANNING • BESPOKE INTERIORS • TURNKEY DELIVERY • DESIGN ACADEMY • ";

const SERVICES = [
  {
    number: "01",
    title: "Architecture & Master Planning",
    tagline: "Sculpting Volume, Light & Passive Performance",
    image: "/assets/SHS_9769.webp",
    imageAlt: "Architectural study",
    description:
      "We do not design static, box-like structures. Our architectural practice centers on volumetric fluid design—sculpting space to optimize microclimates, capture natural cross-ventilation, and follow the natural path of daylight. From high-end luxury villas with a Modern Mediterranean aesthetic to large-scale master planning, we build environments that are visually striking yet inherently logical.",
    bullets: [
      "Volumetric Fluid Architecture: Sculptural, continuous indoor-outdoor layouts that reject rigid boundaries.",
      "Urban Stitching & TOD: Designing multi-acre, transit-oriented developments that repair social infrastructure deficits.",
      "Passive Bioclimatic Strategy: Orienting structures to optimize thermal performance and reduce energy dependency.",
    ],
  },
  {
    number: "02",
    title: "Bespoke Interior Design",
    tagline: "Environments Tuned to Human Psychology",
    image: "/assets/LIVING LOBBY.webp",
    imageAlt: "Luxury interior living lobby",
    description:
      "An interior space should be a natural extension of human routine. We design custom residential and commercial environments that prioritize spatial dignity, tactile comfort, and biological well-being. Our practice focuses heavily on sensory ergonomics—understanding how spatial volume, acoustics, and materials interact with human emotion and behavior.",
    bullets: [
      "Bespoke Luxury Residential: High-end villas tailored to the specific spatial rituals and privacy needs of the family.",
      "Layered Lighting Strategy: Custom-engineered illumination combining ambient, task, and accent layers.",
      "Psychology-Driven Commercial Layouts: Precise focal lighting to guide circulation and drive retail engagement.",
    ],
  },
  {
    number: "03",
    title: "Turnkey Project Management",
    tagline: "Single-Source Accountability, Precision Delivery",
    image: "/assets/KAD2.webp",
    imageAlt: "KAD project management",
    description:
      "Great design is meaningless without precise execution. Our turnkey construction division assumes total, single-source accountability for your investment. By managing the entire pipeline—from raw site analysis and regulatory clearances to structural detailing and fine fit-outs—we insulate our clients from subcontractor conflict and guarantee budget and schedule compliance.",
    bullets: [
      "Comprehensive Project Ownership: A single point of contact overseeing architects, engineers, and tier-1 material vendors.",
      "Rigorous Engineering & QC: ISO-aligned material testing, milestone tracking, and strict structural quality controls.",
      "Material Procurement Control: Sourcing high-grade finishes and sustainable materials directly from a trusted vendor network.",
    ],
  },
  {
    number: "04",
    title: "KAD Design Academy",
    tagline: "Incubating the Next Generation of Empathetic Vanguards",
    image: "/assets/KAD3.webp",
    imageAlt: "KAD Design Academy",
    description:
      "The KAD Design Academy is our firm's competitive, high-fidelity professional training incubator. Built and taught by our own practicing architects and senior specialists, our 12-Month Interior Design Advanced Pro Learner Course bridges the massive gap between academic theory and real-world execution. We don't just teach software; we train designers to think with deep empathy and execute with structural precision.",
    bullets: [
      "Live Studio Briefs: Students work directly on active firm projects, building a high-fidelity portfolio.",
      "Advanced Technical Workflow: Mastery of AutoCAD, SketchUp, and advanced rendering engines with real-world construction documentation.",
      "The Business of Design: Training in material sourcing, client acquisition, detailed costing, and independent studio management.",
    ],
  },
];

export default function ServicesDetailSection() {
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;
    const chars = el.querySelectorAll<HTMLElement>(".svc-char");
    const ctx = gsap.context(() => {
      gsap.set(chars, { y: "110%", opacity: 0 });
      ScrollTrigger.create({
        trigger: el,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.to(chars, {
            y: "0%", opacity: 1, duration: 1.1, stagger: 0.04, ease: "power4.out",
          });
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services-detail"
      className="w-full bg-white text-[#222A35] overflow-hidden"
    >
      {/* Marquee belt */}
      <div className="border-y border-[#222A35]/10 py-[10px] overflow-hidden">
        <MarqueeBelt />
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">

        {/* ── Section heading ──────────────────────────────── */}
        <div className="pt-12 sm:pt-16 md:pt-20 pb-10 sm:pb-14 md:pb-16">
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
                  <span key={i} className="svc-char inline-block">{c}</span>
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

        {/* ── Service cards — flat, always visible ────────── */}
        <div className="pb-16 sm:pb-24 md:pb-28 space-y-0">
          {SERVICES.map((svc, i) => (
            <ServiceCard key={svc.number} service={svc} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Flat service card ────────────────────────────────────────────────

type Service = (typeof SERVICES)[number];

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      className="grid grid-cols-1 lg:grid-cols-2 gap-0 border-t border-[#222A35]/[0.07] py-10 sm:py-14 md:py-24"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* ── Image ─────────────────────────────────────────── */}
      <div
        className={`relative overflow-hidden rounded-sm mb-10 lg:mb-0 group
          ${isEven ? "lg:order-2 lg:pl-10" : "lg:order-1 lg:pr-10"}`}
      >
        <div className="overflow-hidden rounded-sm">
          <img
            src={service.image}
            alt={service.imageAlt}
            loading="lazy"
            decoding="async"
            className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            style={{ height: "clamp(280px, 40vw, 500px)", willChange: "transform" }}
          />
        </div>
        {/* service number watermark */}
        <span className="absolute top-4 left-4 text-[10px] tracking-[0.32em] text-white/55 uppercase pointer-events-none">
          {service.number} / 04
        </span>
        {/* bottom shimmer */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/15 to-transparent pointer-events-none rounded-b-sm" />
      </div>

      {/* ── Content ───────────────────────────────────────── */}
      <div
        className={`flex flex-col justify-center
          ${isEven ? "lg:order-1 lg:pr-16" : "lg:order-2 lg:pl-16"}`}
      >
        <motion.span
          className="text-[10px] tracking-[0.4em] text-[#222A35]/22 uppercase mb-5 font-light"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {service.number}
        </motion.span>

        <motion.h3
          className="text-[clamp(1.6rem,3.2vw,2.5rem)] font-extralight tracking-[-0.02em] text-[#222A35] leading-[1.1] mb-3"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, delay: 0.15 }}
        >
          {service.title}
        </motion.h3>

        <motion.p
          className="text-[#222A35]/35 text-[11px] tracking-[0.12em] italic mb-9 font-light"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.22 }}
        >
          {service.tagline}
        </motion.p>

        <motion.div
          className="w-8 h-px bg-[#222A35]/20 mb-7"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          style={{ originX: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
        />

        <motion.p
          className="text-[#222A35]/50 leading-[1.9] text-[0.92rem] font-light mb-8"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, delay: 0.28 }}
        >
          {service.description}
        </motion.p>

        <motion.ul
          className="space-y-4 border-t border-[#222A35]/[0.06] pt-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.35 }}
        >
          {service.bullets.map((b, bi) => (
            <li
              key={bi}
              className="flex items-start gap-3.5 text-[0.875rem] text-[#222A35]/45 leading-[1.78] font-light"
            >
              <span className="w-[3px] h-[3px] rounded-full bg-[#222A35]/30 flex-shrink-0 mt-[0.58rem]" />
              {b}
            </li>
          ))}
        </motion.ul>
      </div>
    </motion.div>
  );
}

// ── Marquee belt ─────────────────────────────────────────────────────

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
        {[0, 1].map(i => (
          <span key={i} className="shrink-0 text-[10px] tracking-[0.38em] text-[#222A35]/28 uppercase">
            {BELT_TEXT.repeat(8)}
          </span>
        ))}
      </div>
    </div>
  );
}
