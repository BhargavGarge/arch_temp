import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  MapPin,
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  ArrowUpRight,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { COMPANY_NAME } from "../../config/company";

gsap.registerPlugin(ScrollTrigger);

interface FeaturedProject {
  id: number;
  title: string;
  subtitle: string;
  location: string;
  year: string;
  category: string;
  coverImage: string;
  images: string[];
  description: string;
}

const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    id: 1,
    title: "Residence of Subtle Grandeur",
    subtitle: "Modern Design Meets Rooted Identity",
    location: "Chhattisgarh",
    year: "2024",
    category: "Residential",
    coverImage: "/assets/TWILIGHT VILLA.webp",
    // keep first + last-two of original; add 3rd from Living Room (KAD3)
    images: [
      "/assets/BEDROOM.webp",
      "/assets/BEDROOM 2.webp",
      "/assets/KAD3.webp",
    ],
    description:
      "A home where modern design meets rooted identity, redefining luxury as an experience rather than mere visual opulence. Conceived by Ar. Hrithvika Khare during her final year of architecture and realized soon after graduation, the project blends a fresh perspective with mature thought. Its striking north-facing façade—a sculptural composition of exposed brick, textured stone, and laser-cut metal screens—balances bold presence with climate-responsive design through shaded balconies and landscaped pockets. Inside, luxury is expressed through restraint: Italian marble floors, custom walnut and oak veneers, hand-finished stucco, and curated Italian furniture create a palette of enduring elegance. Open layouts, muted tones, and clean lines provide calm, while art, sculptural décor, and tailored lighting infuse warmth and character, resulting in a residence that is both timeless and deeply personal.",
  },
  {
    id: 2,
    title: "Chettinad Residence",
    subtitle: "Classical Charm with Contemporary Elegance",
    location: "Central India",
    year: "2023",
    category: "Residential",
    coverImage: "/assets/CHETTINAD RESIDENCE.webp",
    // only first image
    images: ["/assets/CHETTINAD RESIDENCE.webp"],
    description:
      "This luxury villa beautifully blends classical charm with contemporary elegance, creating a timeless residence that feels both grand and welcoming. Defined by its pitched terracotta-toned roof, white stucco walls, exposed brick skirting, and expansive French windows framed in wood, the villa radiates warmth and sophistication. A landscaped garden and paved driveway lead to a majestic entrance porch adorned with carved wooden columns and a gabled roof. Inside, wide openings and full-height glazing ensure bright, airy interiors, while balconies with green creepers and lantern-style lighting enhance the evening ambience. Crafted with a palette of natural stone, wood, and earthy finishes, the design balances luxury and homeliness — a true reflection of KAD Studio's philosophy of harmonizing modern comforts with timeless architecture.",
  },
  {
    id: 3,
    title: "Living Room Residence",
    subtitle: "Modern Elegance and Timeless Functionality",
    location: "Raipur",
    year: "2024",
    category: "Interior",
    coverImage: "/assets/LIVING LOBBY.webp",
    // first + last-two from Subtle Grandeur (TWILIGHT VILLA, LIVING LOBBY, RESIDENCE) + remaining (KAD2, KAD6, KAD7)
    images: ["/assets/LIVING LOBBY.webp", "/assets/RESIDENCE.webp"],
    description:
      "The architectural composition embodies a refined balance of modern elegance and timeless functionality, where clean lines, thoughtful materiality, and spatial fluidity come together to create a striking yet harmonious environment. Each element—from the subtle interplay of textures to the seamless integration of natural light—reflects a meticulous design language that prioritizes both aesthetics and human experience. The design captures a sense of sophistication through its bold geometry while maintaining warmth and intimacy through carefully chosen finishes, ultimately showcasing an architectural narrative that is both innovative and enduring.",
  },
];

export default function OurProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeProject, setActiveProject] = useState<FeaturedProject | null>(
    null,
  );
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".op-eyebrow",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".op-eyebrow",
            start: "top 88%",
            once: true,
          },
        },
      );
      gsap.fromTo(
        ".op-heading",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".op-heading",
            start: "top 84%",
            once: true,
          },
        },
      );
      gsap.fromTo(
        ".op-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power2.out",
          stagger: 0.15,
          scrollTrigger: { trigger: ".op-card", start: "top 82%", once: true },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const openProject = (project: FeaturedProject) => {
    setActiveProject(project);
    setActiveImageIdx(0);
    document.body.style.overflow = "hidden";
  };

  const closeProject = () => {
    setActiveProject(null);
    document.body.style.overflow = "";
  };

  const prevImage = () =>
    setActiveImageIdx(
      (i) =>
        (i - 1 + (activeProject?.images.length ?? 1)) %
        (activeProject?.images.length ?? 1),
    );

  const nextImage = () =>
    setActiveImageIdx((i) => (i + 1) % (activeProject?.images.length ?? 1));

  return (
    <>
      <section
        ref={sectionRef}
        id="our-projects"
        className="bg-[#ffffff] py-16 sm:py-20 md:py-32 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20">
          {/* ── Header ──────────────────────────────── */}
          <div className="mb-10 sm:mb-14 md:mb-20">
            <span className="op-eyebrow block text-[#222A35]/50 text-[10px] tracking-[0.44em] uppercase font-medium mb-4 sm:mb-5">
              {COMPANY_NAME} — Selected Works
            </span>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 sm:gap-6">
              <h2
                className="op-heading text-[#222A35] font-light tracking-tight leading-[1.03]"
                style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)" }}
              >
                Our Projects
              </h2>
              <p className="text-[#222A35]/60 text-sm leading-relaxed max-w-xs md:text-right">
                Each space crafted with intention —<br />
                timeless in form, personal in soul.
              </p>
            </div>
            <div className="mt-8 md:mt-10 h-px bg-[#222A35]/10 w-full" />
          </div>

          {/* ── Cards grid ──────────────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 md:gap-5">
            {/* Large left card */}
            <ProjectCard
              project={FEATURED_PROJECTS[0]}
              className="op-card md:col-span-7 h-[340px] sm:h-[420px] md:h-[620px]"
              index={0}
              onClick={() => openProject(FEATURED_PROJECTS[0])}
            />

            {/* Right column — two stacked */}
            <div className="md:col-span-5 grid grid-cols-2 md:grid-cols-1 gap-3 sm:gap-4 md:gap-5">
              <ProjectCard
                project={FEATURED_PROJECTS[1]}
                className="op-card h-[220px] sm:h-[260px] md:h-[298px]"
                index={1}
                onClick={() => openProject(FEATURED_PROJECTS[1])}
              />
              <ProjectCard
                project={FEATURED_PROJECTS[2]}
                className="op-card h-[220px] sm:h-[260px] md:h-[298px]"
                index={2}
                onClick={() => openProject(FEATURED_PROJECTS[2])}
              />
            </div>
          </div>

          {/* ── View all → opens the complete portfolio ──────── */}
          <div className="mt-12 sm:mt-16 md:mt-20 flex justify-center">
            <motion.button
              onClick={() =>
                window.dispatchEvent(new CustomEvent("kad:open-portfolio"))
              }
              className="group flex items-center gap-5 cursor-pointer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              whileHover="hover"
            >
              <div className="relative w-16 h-16 rounded-full border border-[#222A35]/20 flex items-center justify-center overflow-hidden group-hover:border-[#222A35]/50 transition-colors duration-300">
                <motion.div
                  className="absolute inset-0 bg-[#222A35] rounded-full"
                  initial={{ scale: 0 }}
                  variants={{ hover: { scale: 1 } }}
                  transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                />
                <ArrowUpRight className="relative z-10 w-5 h-5 text-[#222A35] group-hover:text-white transition-colors duration-200" />
              </div>
              <span className="text-[#222A35]/90 text-[11px] font-light tracking-[0.22em] uppercase group-hover:text-[#222A35] transition-colors duration-300">
                View All Projects
              </span>
            </motion.button>
          </div>
        </div>
      </section>

      {/* ── Project detail modal ─────────────────── */}
      <AnimatePresence>
        {activeProject && (
          <ProjectModal
            project={activeProject}
            activeImageIdx={activeImageIdx}
            onClose={closeProject}
            onPrev={prevImage}
            onNext={nextImage}
            onThumb={setActiveImageIdx}
          />
        )}
      </AnimatePresence>
    </>
  );
}

// ── Project Card ─────────────────────────────────────────────────────

interface ProjectCardProps {
  project: FeaturedProject;
  className?: string;
  index: number;
  onClick: () => void;
}

function ProjectCard({
  project,
  className = "",
  index,
  onClick,
}: ProjectCardProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.figure
      className={`group relative overflow-hidden rounded-none cursor-pointer bg-[#1a1a1a] ${className}`}
      onClick={onClick}
      whileHover="hover"
    >
      {/* Shimmer */}
      <motion.div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, #1a1a1a 0%, #252525 50%, #1a1a1a 100%)",
          backgroundSize: "200% 100%",
        }}
        animate={
          loaded
            ? { opacity: 0 }
            : { backgroundPosition: ["200% 0%", "-200% 0%"] }
        }
        transition={
          loaded
            ? { duration: 0.4 }
            : { duration: 1.4, repeat: Infinity, ease: "linear" }
        }
      />

      <img
        src={project.coverImage}
        alt={project.title}
        loading={index === 0 ? "eager" : "lazy"}
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`absolute inset-0 w-full h-full object-cover transition-[transform,opacity] duration-700 ease-out group-hover:scale-[1.06] ${loaded ? "opacity-100" : "opacity-0"}`}
        style={{ willChange: "transform" }}
      />

      {/* Bottom gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.15) 45%, transparent 100%)",
        }}
      />

      {/* Category chip */}
      <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10">
        <span className="text-[8px] sm:text-[9px] tracking-[0.22em] uppercase text-white/90 bg-black/35 backdrop-blur-md px-2.5 sm:px-3 py-1 rounded-full border border-white/10">
          {project.category}
        </span>
      </div>

      {/* Project number */}
      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10">
        <span className="text-[10px] sm:text-[11px] font-light text-white/25 tabular-nums">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 p-3.5 sm:p-5 z-10">
        <motion.div
          variants={{ hover: { y: -4 } }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-black/45 text-[9px] sm:text-[10px] tracking-[0.22em] uppercase mb-1 sm:mb-1.5 font-light hidden sm:block">
            {project.subtitle}
          </p>
          <div className="flex items-end justify-between gap-2 sm:gap-3">
            <div className="min-w-0">
              <h3
                className="text-white font-light leading-tight tracking-tight truncate"
                style={{ fontSize: "clamp(0.85rem, 2.5vw, 1.5rem)" }}
              >
                {project.title}
              </h3>
              <div className="flex items-center gap-1 sm:gap-1.5 text-white/38 text-[9px] sm:text-[11px] mt-1 sm:mt-1.5">
                <MapPin className="w-2.5 h-2.5 flex-shrink-0" />
                <span className="truncate">{project.location}</span>
                <span className="text-white/18 flex-shrink-0">·</span>
                <span className="flex-shrink-0">{project.year}</span>
              </div>
            </div>

            {/* CTA pill */}
            <motion.div
              className="flex items-center gap-1.5 sm:gap-2 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full px-2.5 sm:px-3.5 py-1.5 sm:py-2 flex-shrink-0"
              variants={{
                hover: {
                  backgroundColor: "rgba(255,255,255,0.22)",
                  borderColor: "rgba(255,255,255,0.35)",
                },
              }}
              transition={{ duration: 0.25 }}
            >
              <span className="text-white text-[9px] sm:text-[10px] tracking-[0.18em] uppercase font-light">
                View
              </span>
              <ChevronRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.figure>
  );
}

// ── Project detail modal ─────────────────────────────────────────────

interface ProjectModalProps {
  project: FeaturedProject;
  activeImageIdx: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onThumb: (i: number) => void;
}

function ProjectModal({
  project,
  activeImageIdx,
  onClose,
  onPrev,
  onNext,
  onThumb,
}: ProjectModalProps) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  useEffect(() => {
    setImgLoaded(false);
  }, [activeImageIdx]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onPrev, onNext]);

  const hasMultiple = project.images.length > 1;

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col md:flex-row bg-[#0d0d0d] overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* ── Fixed close button — always visible ──── */}
      <motion.button
        onClick={onClose}
        className="fixed top-4 right-4 z-[10001] w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/50 backdrop-blur-md border border-white/15 flex items-center justify-center text-white/55 hover:text-white hover:border-white/40 transition-all duration-200"
        aria-label="Close"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ delay: 0.15, duration: 0.3 }}
        whileTap={{ scale: 0.9 }}
      >
        <X className="w-4 h-4" />
      </motion.button>

      {/* ── Left: image panel ────────────────────── */}
      <motion.div
        className="relative h-[48vh] flex-shrink-0 md:h-auto md:flex-[0_0_58%] bg-[#0d0d0d] flex flex-col"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Main image with swipe support */}
        <div
          className="relative flex-1 overflow-hidden"
          onTouchStart={(e) => {
            touchStartX.current = e.targetTouches[0].clientX;
            touchStartY.current = e.targetTouches[0].clientY;
          }}
          onTouchEnd={(e) => {
            const dx = touchStartX.current - e.changedTouches[0].clientX;
            const dy = touchStartY.current - e.changedTouches[0].clientY;
            if (
              hasMultiple &&
              Math.abs(dx) > 44 &&
              Math.abs(dx) > Math.abs(dy)
            ) {
              dx > 0 ? onNext() : onPrev();
            }
          }}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={activeImageIdx}
              src={project.images[activeImageIdx]}
              alt={project.title}
              loading="eager"
              decoding="async"
              onLoad={() => setImgLoaded(true)}
              className={`absolute inset-0 w-full h-full object-cover ${imgLoaded ? "opacity-100" : "opacity-0"}`}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            />
          </AnimatePresence>

          {/* Image count */}
          {hasMultiple && (
            <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-10">
              <span className="text-white/35 text-[9px] sm:text-[10px] tracking-[0.3em] uppercase font-mono">
                {String(activeImageIdx + 1).padStart(2, "0")}&thinsp;/&thinsp;
                {String(project.images.length).padStart(2, "0")}
              </span>
            </div>
          )}

          {/* Prev / Next — only if multiple images */}
          {hasMultiple && (
            <>
              <button
                onClick={onPrev}
                className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-black/35 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/55 hover:text-white hover:bg-black/60 active:scale-95 transition-all"
                aria-label="Previous"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={onNext}
                className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-black/35 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/55 hover:text-white hover:bg-black/60 active:scale-95 transition-all"
                aria-label="Next"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </>
          )}
        </div>

        {/* Thumbnail strip — hide when only 1 image */}
        {hasMultiple && (
          <div className="flex gap-1.5 sm:gap-2 p-2 sm:p-3 bg-[#111] overflow-x-auto no-scrollbar flex-shrink-0">
            {project.images.map((src, i) => (
              <button
                key={i}
                onClick={() => onThumb(i)}
                className={`relative flex-shrink-0 rounded overflow-hidden transition-all duration-200 ${
                  i === activeImageIdx
                    ? "ring-2 ring-white/65 opacity-100"
                    : "opacity-35 hover:opacity-60"
                }`}
                style={{ width: 52, height: 44 }}
              >
                <img
                  src={src}
                  alt=""
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </motion.div>

      {/* ── Right: info panel ────────────────────── */}
      <motion.div
        className="relative flex-1 md:flex-[0_0_42%] bg-[#F4F3EC] flex flex-col overflow-y-auto overscroll-contain"
        data-lenis-prevent
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.45, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Sticky studio name */}
        <div className="sticky top-0 z-20 bg-[#F4F3EC]/96 backdrop-blur-sm px-5 sm:px-8 pt-5 pb-3.5 border-b border-[#222A35]/[0.07]">
          <span className="text-[#222A35]/65 text-[9px] tracking-[0.44em] uppercase font-medium">
            {COMPANY_NAME}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 px-5 sm:px-8 pt-7 sm:pt-10 pb-10 sm:pb-12">
          {/* Category + location */}
          <motion.div
            className="flex flex-wrap items-center gap-2 sm:gap-3 mb-5 sm:mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.45 }}
          >
            <span className="text-[8px] sm:text-[9px] tracking-[0.28em] uppercase text-white bg-[#222A35] px-2.5 sm:px-3 py-1.5 rounded-full">
              {project.category}
            </span>
            <div className="flex items-center gap-1.5 text-[#222A35]/65 text-[10px] sm:text-[11px]">
              <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0" />
              <span>{project.location}</span>
              <span className="text-[#222A35]/20">·</span>
              <span>{project.year}</span>
            </div>
          </motion.div>

          {/* Title */}
          <div className="overflow-hidden mb-2">
            <motion.h2
              className="text-[#222A35] font-light leading-[1.04] tracking-tight"
              style={{ fontSize: "clamp(1.55rem, 4.5vw, 3rem)" }}
              initial={{ y: "105%" }}
              animate={{ y: "0%" }}
              transition={{
                delay: 0.22,
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {project.title}
            </motion.h2>
          </div>

          {/* Subtitle */}
          <motion.p
            className="text-[#222A35]/65 text-xs sm:text-sm tracking-wide mb-6 sm:mb-8 font-light italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.55 }}
          >
            {project.subtitle}
          </motion.p>

          {/* Divider */}
          <motion.div
            className="h-px bg-[#222A35]/10 mb-6 sm:mb-8 origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              delay: 0.35,
              duration: 0.75,
              ease: [0.22, 1, 0.36, 1],
            }}
          />

          {/* Description */}
          <motion.p
            className="text-[#222A35]/75 text-[13px] sm:text-[14.5px] leading-[1.8] font-light"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {project.description}
          </motion.p>

          {/* Stats row */}
          <motion.div
            className="mt-8 sm:mt-10 grid grid-cols-3 gap-3 sm:gap-4 pt-6 sm:pt-8 border-t border-[#222A35]/[0.07]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.55 }}
          >
            {[
              { label: "Location", value: project.location },
              { label: "Year", value: project.year },
              { label: "Type", value: project.category },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-[#222A35]/50 text-[8px] sm:text-[9px] tracking-[0.3em] uppercase mb-1">
                  {s.label}
                </p>
                <p className="text-[#222A35] text-xs sm:text-sm font-light leading-snug">
                  {s.value}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
