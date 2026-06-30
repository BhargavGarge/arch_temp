import { useRef, useEffect, useState } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
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
  "KAD STUDIO • ARCHITECTURE & INTERIORS • MODERN LUXURY • MEDITERRANEAN DESIGN • CHHATTISGARH • ";

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
          { x: -w, ease: "none", duration: 30, repeat: -1 },
        );
      });
    });

    return () => ctx.revert();
  }, []);

  const stats = [
    { value: 15, label: "Years of\nExperience", suffix: "+" },
    { value: 4, label: "Core\nDisciplines", suffix: "" },
    { value: 100, label: "Projects\nCompleted", suffix: "+" },
    { value: 98, label: "Client\nSatisfaction", suffix: "%" },
  ];

  return (
    <section
      id="about-section"
      ref={sectionRef}
      className="w-full bg-white text-[#222A35] overflow-hidden relative"
    >
      {/* ── MARQUEE BELT ──────────────────────────────────────────── */}
      <div
        ref={marqueeRef}
        className="border-y border-[#222A35]/20 py-[11px] overflow-hidden"
      >
        <div className="marquee-track flex whitespace-nowrap">
          {[0, 1].map((i) => (
            <span
              key={i}
              className="shrink-0 text-[10px] tracking-[0.38em] text-[#222A35]/45 uppercase"
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
            className="block text-[#222A35] text-[10px] tracking-[0.48em] uppercase mb-10"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
          >
            Full-Spectrum Practice
          </motion.span>

          {/* "About" — overflow-hidden keeps chars clipped while offscreen */}
          <div className="overflow-hidden leading-[0.85] pb-1">
            <h2 className="text-[clamp(3.2rem,11vw,9rem)] font-extralight tracking-[-0.025em] text-[#222A35]">
              <SplitWord word="About" />
            </h2>
          </div>

          {/* "Us" with extending gold rule */}
          <div className="overflow-hidden leading-[0.85] flex items-end gap-8 pb-1">
            <h2 className="text-[clamp(3.2rem,11vw,9rem)] font-extralight tracking-[-0.025em] text-[#222A35]">
              <SplitWord word="Us" />
            </h2>
            <motion.div
              className="flex-1 h-px mb-5 bg-gradient-to-r from-[#222A35]/50 to-transparent"
              initial={{ scaleX: 0, originX: "0%" }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 1.5,
                delay: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          </div>
        </div>

        {/* ── TWO-COLUMN INTRO ──────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8 lg:gap-16 pb-16 md:pb-24 border-b border-[#222A35]/[0.05]">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[clamp(1.4rem,2.8vw,2rem)] font-extralight leading-[1.2] text-[#222A35]/88 mb-8">
              Luxury from
              <br />
              the inside
              <br />
              <em className="not-italic text-[#222A35]">out.</em>
            </p>
            <motion.div
              className="w-12 h-px bg-[#222A35] mb-7"
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
            <span className="text-[#222A35]/28 text-[10px] tracking-[0.38em] uppercase">
              Architecture & Interiors
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.9,
              delay: 0.16,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex flex-col justify-center"
          >
            <p className="text-[#222A35]/50 leading-[1.95] text-[0.94rem]">
              <span className="text-[#222A35]/80">{COMPANY_NAME}</span> is a
              contemporary architecture and interior design practice redefining
              luxury living in Central India. Founded by architect{" "}
              <span className="text-[#222A35]/80">Ar. Hrithvika Khare</span>,
              the studio is celebrated for its modern luxury and
              Mediterranean-inspired design language that seamlessly blends
              understated elegance with functional sophistication. Based in
              Chhattisgarh and drawing on rich design exposure from leading
              firms in Delhi and Mumbai, KAD Studio positions itself as a
              premium, cosmopolitan design house — bringing world-class
              detailing, refined material palettes, and sustainable practices
              to every project. From bespoke residences to high-end commercial
              spaces, KAD Studio delivers spaces that embody comfort,
              craftsmanship, and character.
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
            <span className="text-[#222A35] text-[10px] tracking-[0.45em] uppercase shrink-0">
              Our Services
            </span>
            <div className="flex-1 h-px bg-[#222A35]/[0.05]" />
          </motion.div>
          <ServiceFeatureGrid dark />
        </div>

        {/* ── STATS ─────────────────────────────────────────────── */}
        <div className="border-t border-[#222A35]/[0.05]">
          <div className="grid grid-cols-2 sm:grid-cols-4">
            {stats.map((stat, i) => (
              <LuxuryStatCounter key={i} {...stat} index={i} />
            ))}
          </div>
          <div className="border-t border-[#222A35]/[0.05]" />
        </div>

        {/* ── PHILOSOPHY QUOTE ──────────────────────────────────── */}
        <motion.div
          className="py-28 flex flex-col items-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="font-serif text-[4rem] md:text-[8rem] leading-none text-[#222A35]/18 select-none pointer-events-none -mb-4">
            &#8220;
          </span>
          <blockquote className="max-w-[780px] text-center">
            <p className="text-[clamp(1rem,2.3vw,1.45rem)] font-extralight leading-[1.95] text-[#222A35]/60 italic mb-10">
              True luxury is not loud — it is the quiet confidence of a space
              that knows exactly who it is. Whether crafting a bespoke
              Mediterranean-inspired villa, a refined hospitality suite, or a
              high-end commercial environment, our objective remains unchanged:
              to create spaces that narrate their own timeless story of beauty,
              comfort, and character.
            </p>
            <div className="flex items-center justify-center gap-5">
              <div className="h-px w-10 bg-[#222A35]/55" />
              <footer className="text-[#222A35] text-[10px] tracking-[0.42em] uppercase not-italic">
                {COMPANY_NAME}
              </footer>
              <div className="h-px w-10 bg-[#222A35]/55" />
            </div>
          </blockquote>
        </motion.div>

        {/* ── LEADERSHIP ────────────────────────────────────────── */}
        <div className="border-t border-[#222A35]/[0.05] pt-24 pb-20">
          <motion.div
            className="flex flex-col items-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-[#222A35] text-[10px] tracking-[0.42em] uppercase mb-7">
              The People Behind the Work
            </span>
            <div className="overflow-hidden">
              <motion.h2
                className="text-[clamp(2.5rem,7vw,4.75rem)] font-extralight tracking-[-0.025em] text-center text-[#222A35]"
                initial={{ y: "108%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
              >
                Our Leadership
              </motion.h2>
            </div>
            <motion.div
              className="h-px bg-[#222A35] mt-5"
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
            description={`An architect with a keen eye for refined aesthetics, Ar. ${FOUNDER_NAME.first} ${FOUNDER_NAME.last} brings the perfect balance of creativity, technical expertise, and global sensibility to her work. Honing her craft at India's top luxury design firms in Delhi and Mumbai, her philosophy is rooted in creating spaces that are luxurious yet livable — marrying natural textures, warm neutrals, and modern functionality with an unwavering commitment to quality and sustainability.`}
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
}

function LuxuryStatCounter({
  value,
  label,
  suffix,
  index,
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

  return (
    <motion.div
      ref={ref}
      className={`py-7 px-4 sm:py-10 sm:px-6 md:py-12 md:px-8 relative group cursor-default${
        /* hide right border on even columns (mobile 2-col) and last cell */
        index % 2 === 1 ? "" : " border-r border-[#222A35]/[0.05] sm:border-r"
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
      <div className="absolute inset-0 bg-[#222A35]/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative">
        <div className="flex items-end gap-1 mb-3">
          <motion.span className="text-[clamp(2.8rem,5.5vw,4.25rem)] font-extralight leading-none text-[#222A35] tracking-[-0.02em]">
            {displayValue}
          </motion.span>
          {suffix && (
            <span className="text-[clamp(1.6rem,3vw,2.4rem)] font-extralight leading-none text-[#222A35] pb-[2px]">
              {suffix}
            </span>
          )}
        </div>

        <p className="text-[#222A35]/32 text-[10px] tracking-[0.28em] uppercase leading-relaxed whitespace-pre-line">
          {label}
        </p>

        <motion.div
          className="mt-5 h-px bg-[#222A35]"
          initial={{ width: 0 }}
          whileInView={{ width: 28 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: index * 0.12 + 0.45 }}
        />
      </div>
    </motion.div>
  );
}
