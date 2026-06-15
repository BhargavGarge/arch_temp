import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, MapPin } from "lucide-react";
import { COMPANY_NAME } from "../../config/company";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  location: string;
  year: string;
  category: string;
  image: string;
}

const leftProjects: Project[] = [
  {
    id: 1,
    title: "Sharma Residence",
    location: "New Delhi",
    year: "2023",
    category: "Residential",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    title: "TechHub Headquarters",
    location: "Bangalore",
    year: "2022",
    category: "Corporate",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    title: "Birch & Stone Villa",
    location: "Chandigarh",
    year: "2021",
    category: "Residential",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: 4,
    title: "Meridian Offices",
    location: "Gurgaon",
    year: "2022",
    category: "Corporate",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: 5,
    title: "The Amber Retreat",
    location: "Jaipur",
    year: "2023",
    category: "Hospitality",
    image:
      "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=600&auto=format&fit=crop&q=80",
  },
];

const centerProjects: Project[] = [
  {
    id: 6,
    title: "Courtyard House",
    location: "Ahmedabad",
    year: "2020",
    category: "Residential",
    image:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: 7,
    title: "The Cedar Lounge",
    location: "New Delhi",
    year: "2022",
    category: "Hospitality",
    image:
      "https://images.unsplash.com/photo-1616137466211-f939a420be84?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: 8,
    title: "Emerald Heights",
    location: "Mumbai",
    year: "2023",
    category: "Residential",
    image:
      "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=600&auto=format&fit=crop&q=80",
  },
];

const rightProjects: Project[] = [
  {
    id: 9,
    title: "Heritage Haveli",
    location: "Rajasthan",
    year: "2021",
    category: "Hospitality",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: 10,
    title: "Oak & Glass House",
    location: "Noida",
    year: "2023",
    category: "Residential",
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: 11,
    title: "Arva Retail Hub",
    location: "Pune",
    year: "2022",
    category: "Retail",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: 12,
    title: "Sun Path House",
    location: "Rishikesh",
    year: "2023",
    category: "Sustainable",
    image:
      "https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: 13,
    title: "Metropolitan Complex",
    location: "New Delhi",
    year: "2021",
    category: "Mixed Use",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&auto=format&fit=crop&q=80",
  },
];

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);

  // Keep GSAP ScrollTrigger in sync with Lenis virtual scroll
  useLenis(() => {
    ScrollTrigger.update();
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Intro heading ──────────────────────────────────────────
      gsap.fromTo(
        ".port-eyebrow",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: { trigger: ".port-eyebrow", start: "top 85%" },
        },
      );

      gsap.fromTo(
        ".port-heading",
        { y: 70, opacity: 0, skewY: 2 },
        {
          y: 0,
          opacity: 1,
          skewY: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: ".port-heading", start: "top 82%" },
        },
      );

      gsap.fromTo(
        ".port-rule",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.4,
          ease: "power2.inOut",
          transformOrigin: "left center",
          scrollTrigger: { trigger: ".port-rule", start: "top 82%" },
        },
      );

      // ── Left column: stagger up ────────────────────────────────
      gsap.fromTo(
        ".port-left-item",
        { y: 64, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power2.out",
          stagger: { each: 0.13 },
          scrollTrigger: { trigger: ".port-left-col", start: "top 72%" },
        },
      );

      // ── Right column: stagger up (slight offset) ───────────────
      gsap.fromTo(
        ".port-right-item",
        { y: 64, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power2.out",
          stagger: { each: 0.13 },
          delay: 0.22,
          scrollTrigger: { trigger: ".port-right-col", start: "top 72%" },
        },
      );

      // ── Center column: scale-in ────────────────────────────────
      gsap.fromTo(
        ".port-center-item",
        { scale: 0.88, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.1,
          ease: "power3.out",
          stagger: 0.14,
          scrollTrigger: { trigger: ".port-center-col", start: "top 62%" },
        },
      );

      // ── Footer headline scrub ──────────────────────────────────
      gsap.fromTo(
        ".port-footer-text",
        { opacity: 0.08 },
        {
          opacity: 0.35,
          ease: "none",
          scrollTrigger: {
            trigger: ".port-footer-text",
            start: "top 90%",
            end: "bottom 30%",
            scrub: true,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="portfolio" className="bg-[#ffffff]">
      {/* ── Sticky intro ──────────────────────────────────────── */}
      <div>
        <div className="h-screen w-full grid place-content-center sticky top-0 relative overflow-hidden">
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

          {/* Floating ambient glow */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-[#222A35]/8 blur-[120px] pointer-events-none" />

          <div className="relative z-10 text-center px-8 max-w-5xl mx-auto">
            <span className="port-eyebrow block text-[#222A35] text-[10px] tracking-[0.4em] uppercase font-medium mb-6">
              {COMPANY_NAME} — Since 1997
            </span>

            <h2
              className="port-heading text-[#222A35] font-light tracking-tight leading-[1.05] mb-10"
              style={{ fontSize: "clamp(2rem, 8vw, 7rem)" }}
            >
              Spaces That
              <br />
              Define Tomorrow
            </h2>

            <div className="port-rule w-16 h-px bg-[#222A35] mx-auto origin-left" />

            <p className="text-white/25 text-[10px] tracking-[0.3em] uppercase mt-10 animate-bounce">
              ↓ scroll to explore
            </p>
          </div>
        </div>
      </div>

      {/* ── Gallery grid ──────────────────────────────────────── */}
      <div className="bg-[#080808] text-white">
        {/* Mobile: simple 2-column grid ─────────────────────── */}
        <div className="md:hidden grid grid-cols-2 gap-2 p-2">
          {[...leftProjects, ...centerProjects, ...rightProjects].map(
            (project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.07 }}
              >
                <ProjectCard project={project} className="h-44" />
              </motion.div>
            ),
          )}
        </div>

        {/* Desktop: original 3-column sticky layout ─────────── */}
        <div className="hidden md:block">
          <div className="grid grid-cols-12 gap-2 p-2">
            {/* Left: scrolls normally */}
            <div className="port-left-col col-span-4 grid gap-2">
              {leftProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  className="port-left-item"
                />
              ))}
            </div>

            {/* Center: sticky */}
            <div className="port-center-col col-span-4 sticky top-0 h-screen grid grid-rows-3 gap-2">
              {centerProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  className="port-center-item"
                  isCenter
                />
              ))}
            </div>

            {/* Right: scrolls normally */}
            <div className="port-right-col col-span-4 grid gap-2">
              {rightProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  className="port-right-item"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Footer ────────────────────────────────────────────── */}
      <footer className="bg-[#ffffff] overflow-hidden pb-0">
        {/* Large scrubbed text */}
        <h2
          className="port-footer-text select-none text-center font-light uppercase leading-none tracking-tighter text-[#222A35]"
          style={{
            fontSize: "clamp(4rem, 18vw, 18rem)",
            transform: "translateY(20%)",
          }}
        >
          KAD
        </h2>

        {/* CTA pill */}
        <div className="relative z-10 bg-[#222A35] rounded-tl-[1.5rem] rounded-tr-[1.5rem] md:rounded-tl-[2.5rem] md:rounded-tr-[2.5rem] h-44 grid place-content-center">
          <motion.button
            className="flex items-center gap-3 text-white border border-white/15 px-8 py-3.5 rounded-full text-sm tracking-wide hover:border-white/50 transition-colors duration-300"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            View Complete Portfolio
            <span className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </motion.button>
        </div>
      </footer>
    </section>
  );
}

// ── Project card ──────────────────────────────────────────────────

interface ProjectCardProps {
  project: Project;
  className?: string;
  isCenter?: boolean;
}

function ProjectCard({
  project,
  className = "",
  isCenter = false,
}: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.figure
      className={`relative overflow-hidden rounded-md cursor-pointer bg-[#111111] ${isCenter ? "h-full" : ""} ${className}`}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {/* Image */}
      <motion.img
        src={project.image}
        alt={project.title}
        className={`${isCenter ? "h-full" : "h-80"} w-full object-cover`}
        animate={{ scale: hovered ? 1.08 : 1 }}
        transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
      />

      {/* Category chip — always visible */}
      <div className="absolute top-3 left-3 z-10">
        <span className="text-[9px] tracking-[0.2em] uppercase text-white/80 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
          {project.category}
        </span>
      </div>

      {/* Project number — always visible, top-right */}
      <div className="absolute top-3 right-3 z-10">
        <span className="text-[10px] font-light text-white/30 tabular-nums">
          {String(project.id).padStart(2, "0")}
        </span>
      </div>

      {/* Hover overlay */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="absolute inset-0 flex flex-col justify-end p-4"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            <motion.div
              className="flex items-end justify-between gap-2"
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 8, opacity: 0 }}
              transition={{ duration: 0.22, delay: 0.04 }}
            >
              <div className="min-w-0">
                <h3 className="text-white font-medium text-sm leading-snug truncate">
                  {project.title}
                </h3>
                <div className="flex items-center gap-1 text-white/45 text-[11px] mt-0.5">
                  <MapPin className="w-2.5 h-2.5 flex-shrink-0" />
                  <span className="truncate">{project.location}</span>
                  <span className="text-white/20 flex-shrink-0">·</span>
                  <span className="flex-shrink-0">{project.year}</span>
                </div>
              </div>

              {/* Arrow button */}
              <motion.div
                className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 flex items-center justify-center flex-shrink-0"
                whileHover={{ backgroundColor: "rgba(255,255,255,0.2)" }}
              >
                <ArrowUpRight className="w-3.5 h-3.5 text-white" />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom edge shimmer on hover */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#222A35]/60 to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 0 }}
            transition={{ duration: 0.4 }}
          />
        )}
      </AnimatePresence>
    </motion.figure>
  );
}
