import { useRef, useEffect, useState } from "react";
import {
  motion,
  useInView,
  useSpring,
  useTransform,
} from "framer-motion";
import type React from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TeamMemberCard from "./team-member-card";
import { ServiceFeatureGrid } from "./feature";
import {
  COMPANY_NAME,
  FOUNDER_NAME,
  FOUNDER_IMAGE,
} from "../../config/company";

gsap.registerPlugin(ScrollTrigger);

const MARQUEE_TEXT =
  "NEXUS DESIGN STUDIO • ARCHITECTURE & INTERIORS • SINCE 1997 • ";

// Split a word into individually animated char spans
function SplitWord({ word, className }: { word: string; className?: string }) {
  return (
    <>
      {word.split("").map((c, i) => (
        <span
          key={i}
          className={`abt-char inline-block${className ? ` ${className}` : ""}`}
        >
          {c === " " ? " " : c}
        </span>
      ))}
    </>
  );
}

export default function AboutUsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  // GSAP: character curtain reveal
  useEffect(() => {
    const heading = headingRef.current;
    if (!heading) return;

    const chars = heading.querySelectorAll<HTMLElement>(".abt-char");
    const ctx = gsap.context(() => {
      gsap.set(chars, { y: "115%", opacity: 0 });

      ScrollTrigger.create({
        trigger: heading,
        start: "top 82%",
        onEnter: () => {
          gsap.to(chars, {
            y: "0%",
            opacity: 1,
            duration: 1.15,
            stagger: 0.038,
            ease: "power4.out",
            overwrite: true,
          });
        },
        onLeaveBack: () => {
          gsap.to(chars, {
            y: "115%",
            opacity: 0,
            duration: 0.55,
            stagger: 0.018,
            ease: "power2.in",
            overwrite: true,
          });
        },
      });
    });

    return () => ctx.revert();
  }, []);

  // GSAP: marquee belt
  useEffect(() => {
    const container = marqueeRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const track = container.querySelector<HTMLElement>(".marquee-track");
      if (!track) return;

      gsap.delayedCall(0.05, () => {
        const w = track.scrollWidth / 2;
        gsap.fromTo(
          track,
          { x: 0 },
          { x: -w, ease: "none", duration: 30, repeat: -1 }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  const stats = [
    { value: 25, label: "Years of\nExcellence", suffix: "+" },
    { value: 300, label: "Projects\nDelivered", suffix: "+" },
    { value: 1997, label: "Year\nEstablished", suffix: "" },
    { value: 98, label: "Client\nSatisfaction", suffix: "%" },
  ];

  return (
    <section
      id="about-section"
      ref={sectionRef}
      className="w-full bg-[#0d0d0b] text-[#F2F2EB] overflow-hidden relative"
    >
      {/* ── MARQUEE BELT ──────────────────────────────────────────── */}
      <div
        ref={marqueeRef}
        className="border-y border-[#88734C]/20 py-[11px] overflow-hidden"
      >
        <div className="marquee-track flex whitespace-nowrap">
          {[0, 1].map((i) => (
            <span
              key={i}
              className="shrink-0 text-[10px] tracking-[0.38em] text-[#88734C]/45 uppercase"
            >
              {MARQUEE_TEXT.repeat(14)}
            </span>
          ))}
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-6 lg:px-12">
        {/* ── EDITORIAL HEADING ─────────────────────────────────── */}
        <div ref={headingRef} className="pt-20 pb-14">
          <motion.span
            className="block text-[#88734C] text-[10px] tracking-[0.48em] uppercase mb-10"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
          >
            Established 1997
          </motion.span>

          {/* "About" — overflow-hidden keeps chars clipped while offscreen */}
          <div className="overflow-hidden leading-[0.85] pb-1">
            <h2 className="text-[clamp(4.5rem,11vw,9rem)] font-extralight tracking-[-0.025em] text-[#F2F2EB]">
              <SplitWord word="About" />
            </h2>
          </div>

          {/* "Us" with extending gold rule */}
          <div className="overflow-hidden leading-[0.85] flex items-end gap-8 pb-1">
            <h2 className="text-[clamp(4.5rem,11vw,9rem)] font-extralight tracking-[-0.025em] text-[#88734C]">
              <SplitWord word="Us" />
            </h2>
            <motion.div
              className="flex-1 h-px mb-5 bg-gradient-to-r from-[#88734C]/50 to-transparent"
              initial={{ scaleX: 0, originX: "0%" }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>

        {/* ── TWO-COLUMN INTRO ──────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-16 pb-24 border-b border-[#F2F2EB]/[0.05]">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[clamp(1.4rem,2.8vw,2rem)] font-extralight leading-[1.2] text-[#F2F2EB]/88 mb-8">
              Unconventional,
              <br />
              striking, minimalist
              <br />
              yet <em className="not-italic text-[#88734C]">bold.</em>
            </p>
            <motion.div
              className="w-12 h-px bg-[#88734C] mb-7"
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
            <span className="text-[#F2F2EB]/28 text-[10px] tracking-[0.38em] uppercase">
              Architecture & Interiors
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col justify-center"
          >
            <p className="text-[#F2F2EB]/50 leading-[1.95] text-[0.94rem]">
              With a versatile body of work ranging from the architecture and
              interiors of residences, corporate offices to retail and
              hospitality spaces,{" "}
              <span className="text-[#F2F2EB]/80">{COMPANY_NAME}</span> is a
              force to reckon with. The firm's design statement is
              unconventional, striking, minimalist yet bold and contemporary —
              entrenched in practice for more than two decades and winning many
              accolades along the way.
            </p>
          </motion.div>
        </div>

        {/* ── SERVICES ──────────────────────────────────────────── */}
        <div className="py-24">
          <motion.div
            className="flex items-center gap-6 mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-[#88734C] text-[10px] tracking-[0.45em] uppercase shrink-0">
              Our Services
            </span>
            <div className="flex-1 h-px bg-[#F2F2EB]/[0.05]" />
          </motion.div>
          <ServiceFeatureGrid dark />
        </div>

        {/* ── STATS ─────────────────────────────────────────────── */}
        <div className="border-t border-[#F2F2EB]/[0.05]">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <LuxuryStatCounter
                key={i}
                {...stat}
                index={i}
                total={stats.length}
              />
            ))}
          </div>
          <div className="border-t border-[#F2F2EB]/[0.05]" />
        </div>

        {/* ── PHILOSOPHY QUOTE ──────────────────────────────────── */}
        <motion.div
          className="py-28 flex flex-col items-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="font-serif text-[8rem] leading-none text-[#88734C]/18 select-none pointer-events-none -mb-4">
            &#8220;
          </span>
          <blockquote className="max-w-[780px] text-center">
            <p className="text-[clamp(1rem,2.3vw,1.45rem)] font-extralight leading-[1.95] text-[#F2F2EB]/60 italic mb-10">
              A sustainable building must maintain the luxury and comfort
              required by clients, and this is very important. By sun
              path-oriented planning, we bridge this gap. In the gardens and
              courtyards, we use indigenous plants, while rainwater is recycled
              for landscaping and other purposes.
            </p>
            <div className="flex items-center justify-center gap-5">
              <div className="h-px w-10 bg-[#88734C]/55" />
              <footer className="text-[#88734C] text-[10px] tracking-[0.42em] uppercase not-italic">
                {COMPANY_NAME}
              </footer>
              <div className="h-px w-10 bg-[#88734C]/55" />
            </div>
          </blockquote>
        </motion.div>

        {/* ── LEADERSHIP ────────────────────────────────────────── */}
        <div className="border-t border-[#F2F2EB]/[0.05] pt-24 pb-20">
          <motion.div
            className="flex flex-col items-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-[#88734C] text-[10px] tracking-[0.42em] uppercase mb-7">
              The People Behind the Work
            </span>
            <div className="overflow-hidden">
              <motion.h2
                className="text-[clamp(2.5rem,7vw,4.75rem)] font-extralight tracking-[-0.025em] text-center text-[#F2F2EB]"
                initial={{ y: "108%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
              >
                Our Leadership
              </motion.h2>
            </div>
            <motion.div
              className="h-px bg-[#88734C] mt-5"
              initial={{ width: 0 }}
              whileInView={{ width: 52 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.45 }}
            />
          </motion.div>

          <TeamMemberCard
            position="left"
            jobPosition="Principal Architect & Founder"
            firstName={FOUNDER_NAME.first}
            lastName={FOUNDER_NAME.last}
            imageUrl={FOUNDER_IMAGE}
            description={`With over 25 years at the helm of ${COMPANY_NAME}, ${FOUNDER_NAME.first} ${FOUNDER_NAME.last} leads every project with an unwavering commitment to craft, context, and the human experience of space.`}
          />
          <TeamMemberCard
            position="right"
            jobPosition="Senior Design Architect"
            firstName="Priya"
            lastName="Mehra"
            imageUrl="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80"
            description="Priya brings a rigorous attention to material honesty and spatial flow, translating complex briefs into environments that feel both inevitable and surprising."
          />
        </div>
      </div>
    </section>
  );
}

// ── Luxury Stat Counter ────────────────────────────────────────────────────

interface LuxuryStatCounterProps {
  value: number;
  label: string;
  suffix: string;
  index: number;
  total: number;
}

function LuxuryStatCounter({
  value,
  label,
  suffix,
  index,
  total,
}: LuxuryStatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });
  const [hasAnimated, setHasAnimated] = useState(false);

  const springValue = useSpring(0, { stiffness: 32, damping: 12 });
  const displayValue = useTransform(springValue, (v) => Math.floor(v));

  useEffect(() => {
    if (isInView && !hasAnimated) {
      springValue.set(value);
      setHasAnimated(true);
    } else if (!isInView && hasAnimated) {
      springValue.set(0);
      setHasAnimated(false);
    }
  }, [isInView, value, springValue, hasAnimated]);

  const isLast = index === total - 1;

  return (
    <motion.div
      ref={ref}
      className={`py-12 px-8 relative group cursor-default${
        !isLast ? " border-r border-[#F2F2EB]/[0.05]" : ""
      }`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.75,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* hover accent */}
      <div className="absolute inset-0 bg-[#88734C]/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative">
        <div className="flex items-end gap-1 mb-3">
          <motion.span className="text-[clamp(2.8rem,5.5vw,4.25rem)] font-extralight leading-none text-[#F2F2EB] tracking-[-0.02em]">
            {displayValue}
          </motion.span>
          {suffix && (
            <span className="text-[clamp(1.6rem,3vw,2.4rem)] font-extralight leading-none text-[#88734C] pb-[2px]">
              {suffix}
            </span>
          )}
        </div>

        <p className="text-[#F2F2EB]/32 text-[10px] tracking-[0.28em] uppercase leading-relaxed whitespace-pre-line">
          {label}
        </p>

        <motion.div
          className="mt-5 h-px bg-[#88734C]"
          initial={{ width: 0 }}
          whileInView={{ width: 28 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: index * 0.12 + 0.45 }}
        />
      </div>
    </motion.div>
  );
}
