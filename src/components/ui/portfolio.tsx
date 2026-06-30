import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, MapPin, X } from "lucide-react";
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

// ── All portfolio photos ─────────────────────────────────────────────
const ALL_PHOTOS: Project[] = [
  {
    id: 1,
    title: "Twilight Villa",
    location: "Chhattisgarh",
    year: "2024",
    category: "Residential",
    image: "/assets/TWILIGHT VILLA.webp",
  },
  {
    id: 2,
    title: "Chettinad Residence",
    location: "Central India",
    year: "2023",
    category: "Residential",
    image: "/assets/CHETTINAD RESIDENCE.webp",
  },
  {
    id: 3,
    title: "Bedroom Suite",
    location: "Raipur",
    year: "2024",
    category: "Interior",
    image: "/assets/BEDROOM.webp",
  },
  {
    id: 4,
    title: "Master Bedroom",
    location: "Chhattisgarh",
    year: "2023",
    category: "Interior",
    image: "/assets/BEDROOM 2.webp",
  },
  {
    id: 5,
    title: "Living Lobby",
    location: "Raipur",
    year: "2024",
    category: "Hospitality",
    image: "/assets/LIVING LOBBY.webp",
  },
  {
    id: 6,
    title: "Private Residence",
    location: "Central India",
    year: "2023",
    category: "Residential",
    image: "/assets/RESIDENCE.webp",
  },
  {
    id: 7,
    title: "KAD Signature II",
    location: "Raipur",
    year: "2023",
    category: "Interior",
    image: "/assets/KAD2.webp",
  },
  {
    id: 8,
    title: "KAD Signature III",
    location: "Raipur",
    year: "2022",
    category: "Interior",
    image: "/assets/KAD3.webp",
  },
  {
    id: 9,
    title: "KAD Signature VI",
    location: "Chhattisgarh",
    year: "2024",
    category: "Design",
    image: "/assets/KAD6.webp",
  },
  {
    id: 10,
    title: "KAD Signature VII",
    location: "Raipur",
    year: "2023",
    category: "Design",
    image: "/assets/KAD7.webp",
  },
  {
    id: 11,
    title: "KAD Signature VIII",
    location: "Chhattisgarh",
    year: "2023",
    category: "Interior",
    image: "/assets/KAD8.webp",
  },
  {
    id: 12,
    title: "KAD Signature X",
    location: "Raipur",
    year: "2024",
    category: "Interior",
    image: "/assets/KAD10.webp",
  },
  {
    id: 13,
    title: "Studio Work I",
    location: "Raipur",
    year: "2023",
    category: "Interior",
    image: "/assets/IMG_4033.webp",
  },
  {
    id: 14,
    title: "Studio Work II",
    location: "Raipur",
    year: "2023",
    category: "Interior",
    image: "/assets/IMG_4034.webp",
  },
  {
    id: 15,
    title: "Detail Study I",
    location: "Chhattisgarh",
    year: "2023",
    category: "Design",
    image: "/assets/IMG_4036.webp",
  },
  {
    id: 16,
    title: "Material Study",
    location: "Raipur",
    year: "2022",
    category: "Design",
    image: "/assets/IMG_4037.webp",
  },
  {
    id: 17,
    title: "Project Detail",
    location: "Central India",
    year: "2023",
    category: "Interior",
    image: "/assets/IMG_4060.webp",
  },
  {
    id: 18,
    title: "Space Study",
    location: "Raipur",
    year: "2024",
    category: "Interior",
    image: "/assets/IMG_4066.webp",
  },
  {
    id: 19,
    title: "Luxury Interior",
    location: "Chhattisgarh",
    year: "2024",
    category: "Interior",
    image: "/assets/IMG_4880.webp",
  },
  {
    id: 20,
    title: "Modern Living",
    location: "Raipur",
    year: "2023",
    category: "Residential",
    image: "/assets/IMG_4896.webp",
  },
  {
    id: 21,
    title: "Contemporary Space",
    location: "Central India",
    year: "2024",
    category: "Design",
    image: "/assets/IMG_4900.webp",
  },
  {
    id: 22,
    title: "Curated Interiors I",
    location: "Raipur",
    year: "2022",
    category: "Commercial",
    image: "/assets/PAB_0662.webp",
  },
  {
    id: 23,
    title: "Curated Interiors II",
    location: "Raipur",
    year: "2023",
    category: "Commercial",
    image: "/assets/PAB_0667.webp",
  },
  {
    id: 24,
    title: "Office Interior",
    location: "Chhattisgarh",
    year: "2023",
    category: "Commercial",
    image: "/assets/PAB_0668.webp",
  },
  {
    id: 25,
    title: "Corporate Space",
    location: "Raipur",
    year: "2022",
    category: "Corporate",
    image: "/assets/PAB_0670.webp",
  },
  {
    id: 26,
    title: "Modern Office",
    location: "Central India",
    year: "2023",
    category: "Corporate",
    image: "/assets/PAB_0672.webp",
  },
  {
    id: 27,
    title: "Luxury Suite",
    location: "Chhattisgarh",
    year: "2024",
    category: "Hospitality",
    image: "/assets/PAB_0680.webp",
  },
  {
    id: 28,
    title: "Premium Lounge",
    location: "Raipur",
    year: "2023",
    category: "Hospitality",
    image: "/assets/PAB_0681.webp",
  },
  {
    id: 29,
    title: "Elite Space",
    location: "Central India",
    year: "2022",
    category: "Design",
    image: "/assets/PAB_0682.webp",
  },
  {
    id: 30,
    title: "Crafted Interior",
    location: "Raipur",
    year: "2023",
    category: "Interior",
    image: "/assets/PAB_0683.webp",
  },
  {
    id: 31,
    title: "Signature Design",
    location: "Chhattisgarh",
    year: "2024",
    category: "Design",
    image: "/assets/PAB_0688.webp",
  },
  {
    id: 32,
    title: "KAD Residence",
    location: "Raipur",
    year: "2023",
    category: "Residential",
    image: "/assets/PAB_0689.webp",
  },
  {
    id: 33,
    title: "Modern Villa",
    location: "Central India",
    year: "2024",
    category: "Residential",
    image: "/assets/PAB_0692.webp",
  },
  {
    id: 34,
    title: "Luxury Home",
    location: "Raipur",
    year: "2023",
    category: "Residential",
    image: "/assets/PAB_0693.webp",
  },
  {
    id: 35,
    title: "Contemporary Living",
    location: "Chhattisgarh",
    year: "2024",
    category: "Residential",
    image: "/assets/PAB_0694.webp",
  },
  {
    id: 36,
    title: "Interior Craft",
    location: "Raipur",
    year: "2023",
    category: "Interior",
    image: "/assets/PAB_0695.webp",
  },
  {
    id: 37,
    title: "Design Study",
    location: "Central India",
    year: "2022",
    category: "Design",
    image: "/assets/PAB_0698.webp",
  },
  {
    id: 38,
    title: "Space Planning",
    location: "Raipur",
    year: "2023",
    category: "Design",
    image: "/assets/PAB_0699.webp",
  },
  {
    id: 39,
    title: "Bespoke Interior",
    location: "Chhattisgarh",
    year: "2024",
    category: "Interior",
    image: "/assets/PAB_0701.webp",
  },
  {
    id: 40,
    title: "Architectural Study I",
    location: "Central India",
    year: "2023",
    category: "Architecture",
    image: "/assets/SHS_9769.webp",
  },
  {
    id: 41,
    title: "Architectural Study II",
    location: "Raipur",
    year: "2022",
    category: "Architecture",
    image: "/assets/SHS_9779.webp",
  },
];

// Parallax intro columns — different images from the main grid for variety
const INTRO_COL_IMAGES = [
  ["/assets/TWILIGHT VILLA.webp", "/assets/KAD6.webp", "/assets/PAB_0680.webp"],
  [
    "/assets/LIVING LOBBY.webp",
    "/assets/CHETTINAD RESIDENCE.webp",
    "/assets/PAB_0662.webp",
  ],
  ["/assets/BEDROOM.webp", "/assets/KAD3.webp", "/assets/PAB_0672.webp"],
  ["/assets/RESIDENCE.webp", "/assets/KAD2.webp", "/assets/PAB_0689.webp"],
];
const INTRO_COL_OFFSETS = ["-45%", "-95%", "-45%", "-75%"];
const INTRO_COL_OFFSETS_MOBILE = ["-18%", "-40%", "-18%", "-35%"];

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [showAll, setShowAll] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(10);
  const [isChangingCat, setIsChangingCat] = useState(false);
  const [winH, setWinH] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const onResize = () => {
      setWinH(window.innerHeight);
      setIsMobile(window.innerWidth < 768);
    };
    onResize();
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const { scrollYProgress: introProgress } = useScroll({
    target: parallaxRef,
    offset: ["start end", "end start"],
  });

  const py1 = useTransform(introProgress, [0, 1], [0, winH * (isMobile ? 0.8 : 2)]);
  const py2 = useTransform(introProgress, [0, 1], [0, winH * (isMobile ? 1.1 : 3.3)]);
  const py3 = useTransform(introProgress, [0, 1], [0, winH * (isMobile ? 0.5 : 1.25)]);
  const py4 = useTransform(introProgress, [0, 1], [0, winH * (isMobile ? 1.0 : 3)]);

  const CATEGORIES = [
    "All",
    "Residential",
    "Interior",
    "Design",
    "Hospitality",
    "Commercial",
  ] as const;

  const filteredPhotos = useMemo(() => {
    if (activeCategory === "All") return ALL_PHOTOS;
    if (activeCategory === "Commercial")
      return ALL_PHOTOS.filter(
        (p) => p.category === "Commercial" || p.category === "Corporate",
      );
    return ALL_PHOTOS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  // Keep GSAP ScrollTrigger in sync with Lenis virtual scroll
  useLenis(() => {
    ScrollTrigger.update();
  });

  // Show skeleton when category changes — hide only after first images actually load
  useEffect(() => {
    setVisibleCount(10);
    setIsChangingCat(true);
    let cancelled = false;

    // Preload first 6 images (carousel + first grid cards)
    const srcs = filteredPhotos.slice(0, 6).map((p) => p.image);
    let loaded = 0;
    const done = () => {
      if (cancelled) return;
      loaded++;
      if (loaded >= srcs.length) setIsChangingCat(false);
    };

    if (srcs.length === 0) {
      setIsChangingCat(false);
    } else {
      srcs.forEach((src) => {
        const img = new window.Image();
        img.onload = done;
        img.onerror = done; // don't hang on broken images
        img.src = src;
      });
    }

    // Fallback: never stay in skeleton more than 1.5s
    const fallback = setTimeout(() => {
      if (!cancelled) setIsChangingCat(false);
    }, 1500);

    return () => {
      cancelled = true;
      clearTimeout(fallback);
    };
  }, [activeCategory]);

  // Infinite scroll — load 10 more cards when sentinel enters view
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || visibleCount >= filteredPhotos.length) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting)
          setVisibleCount((c) => Math.min(c + 10, filteredPhotos.length));
      },
      { rootMargin: "300px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [filteredPhotos.length, visibleCount]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".port-eyebrow",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".port-eyebrow",
            start: "top 88%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        ".port-heading",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".port-heading",
            start: "top 84%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        ".port-rule",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.3,
          ease: "power2.inOut",
          transformOrigin: "left center",
          scrollTrigger: {
            trigger: ".port-rule",
            start: "top 84%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        ".port-footer-text",
        { opacity: 0.04 },
        {
          opacity: 0.36,
          ease: "none",
          scrollTrigger: {
            trigger: ".port-footer-text",
            start: "top 95%",
            end: "bottom 25%",
            scrub: 1,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="portfolio" className="bg-[#ffffff]">
      {/* ── Complete Portfolio Overlay ─────────────────────── */}
      <AnimatePresence>
        {showAll && (
          <motion.div
            key="gallery"
            className="fixed inset-0 z-[9998] flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            onWheel={(e) => e.stopPropagation()}
          >
            {/* ── Header ──────────────────────────────────── */}
            <motion.div
              className="shrink-0 bg-[#0E1118] z-20"
              initial={{ y: -28, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Meta bar */}
              <div className="flex items-center justify-between px-6 md:px-10 pt-5 pb-4 border-b border-white/[0.05]">
                <div className="flex items-center gap-3">
                  <span className="text-white/20 text-[9px] tracking-[0.52em] uppercase font-light">
                    {COMPANY_NAME}
                  </span>
                  <span className="w-px h-3 bg-white/10" />
                  <span className="text-white/50 text-[9px] tracking-[0.4em] uppercase font-light">
                    Complete Portfolio
                  </span>
                </div>
                <div className="flex items-center gap-5">
                  <motion.span
                    key={filteredPhotos.length}
                    className="text-white/18 text-[9px] font-mono tracking-[0.28em] hidden sm:block"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    {Math.min(visibleCount, filteredPhotos.length)}&thinsp;
                    <span className="text-white/10">/</span>&thinsp;
                    {filteredPhotos.length}
                  </motion.span>
                  <button
                    onClick={() => {
                      setShowAll(false);
                      setActiveCategory("All");
                    }}
                    className="group w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/25 hover:text-white hover:border-white/40 transition-all duration-250"
                    aria-label="Close"
                  >
                    <X className="w-3.5 h-3.5 transition-transform duration-250 group-hover:rotate-90" />
                  </button>
                </div>
              </div>

              {/* Category tabs — animated underline */}
              <div className="flex overflow-x-auto no-scrollbar">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`relative px-5 md:px-7 py-3.5 text-[9px] tracking-[0.34em] uppercase shrink-0 transition-colors duration-200 ${
                      activeCategory === cat
                        ? "text-white"
                        : "text-white/22 hover:text-white/50"
                    }`}
                  >
                    {cat}
                    {activeCategory === cat && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-px bg-white/60"
                        layoutId="portfolio-tab-indicator"
                        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* ── Scrollable grid ──────────────────────────── */}
            <div className="flex-1 overflow-y-auto bg-[#F5F4EE] overscroll-contain">
              <AnimatePresence mode="wait">
                {isChangingCat ? (
                  <motion.div
                    key="skeleton"
                    className="grid grid-cols-2 md:grid-cols-3 gap-[2px] p-[2px]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    {[...Array(9)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="aspect-[2/3] bg-[#E3E1D8]"
                        animate={{ opacity: [0.45, 0.75, 0.45] }}
                        transition={{
                          duration: 1.3,
                          repeat: Infinity,
                          delay: i * 0.08,
                          ease: "easeInOut",
                        }}
                      />
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key={activeCategory}
                    className="grid grid-cols-2 md:grid-cols-3 gap-[2px] p-[2px]"
                    variants={{
                      visible: {
                        transition: { staggerChildren: 0.042, delayChildren: 0.06 },
                      },
                    }}
                    initial="hidden"
                    animate="visible"
                  >
                    {filteredPhotos.slice(0, visibleCount).map((photo) => (
                      <GalleryCard key={photo.id} photo={photo} />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Load more */}
              {visibleCount < filteredPhotos.length ? (
                <div
                  ref={sentinelRef}
                  className="py-12 flex flex-col items-center gap-3"
                >
                  <motion.div
                    className="w-px h-8 bg-[#222A35]/12 origin-top"
                    animate={{ scaleY: [0.25, 1, 0.25] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <span className="text-[#222A35]/20 text-[9px] tracking-[0.42em] uppercase">
                    Loading more
                  </span>
                  <button
                    onClick={() =>
                      setVisibleCount((c) =>
                        Math.min(c + 10, filteredPhotos.length),
                      )
                    }
                    className="text-[#222A35]/35 text-[9px] tracking-[0.3em] uppercase border border-[#222A35]/10 px-6 py-2.5 rounded-full hover:border-[#222A35]/28 hover:text-[#222A35]/65 transition-all mt-1"
                  >
                    Show more ({filteredPhotos.length - visibleCount} remaining)
                  </button>
                </div>
              ) : (
                <p className="text-center text-[#222A35]/15 text-[9px] tracking-[0.48em] uppercase py-14">
                  All {filteredPhotos.length} works · {COMPANY_NAME}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Parallax intro — images behind "Spaces That Define Tomorrow" ── */}
      <div
        ref={parallaxRef}
        className="relative h-[175vh] overflow-hidden bg-[#080808]"
        style={{ contain: "layout paint" }}
      >
        {/* 4-column parallax image strips — 2 columns on mobile, 4 on md+ */}
        <div className="absolute inset-0 flex gap-[1.5vw] p-[1.5vw]">
          {INTRO_COL_IMAGES.map((imgs, colIdx) => {
            const yVals = [py1, py2, py3, py4];
            const hiddenOnMobile = colIdx === 1 || colIdx === 3;
            return (
              <motion.div
                key={colIdx}
                className={`relative flex h-full flex-col gap-[1.5vw] ${hiddenOnMobile ? "hidden md:flex w-1/4" : "w-1/2 md:w-1/4"}`}
                style={{
                  y: yVals[colIdx],
                  top: isMobile ? INTRO_COL_OFFSETS_MOBILE[colIdx] : INTRO_COL_OFFSETS[colIdx],
                  willChange: "transform",
                }}
              >
                {imgs.map((src, i) => (
                  <div
                    key={i}
                    className="relative flex-1 overflow-hidden rounded-sm"
                    style={{ minHeight: "33.33%" }}
                  >
                    <img
                      src={src}
                      alt=""
                      loading={i === 0 ? "eager" : "lazy"}
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                ))}
              </motion.div>
            );
          })}
        </div>

        {/* Dark overlay */}

        {/* Sticky heading */}
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center text-center z-10 px-8 pointer-events-none">
          <span className="port-eyebrow block text-white/55 text-[10px] tracking-[0.4em] uppercase font-medium mb-6">
            {COMPANY_NAME} — Raipur, Chhattisgarh
          </span>

          <h2
            className="port-heading text-white font-light tracking-tight leading-[1.05] mb-10"
            style={{ fontSize: "clamp(2rem, 8vw, 7rem)" }}
          >
            Spaces That
            <br />
            Define Tomorrow
          </h2>

          <div className="port-rule w-16 h-px bg-white/40 mx-auto origin-left" />

          <p className="text-white/30 text-[10px] tracking-[0.3em] uppercase mt-10 animate-bounce">
            ↓ scroll to explore
          </p>
        </div>
      </div>

      {/* ── Footer ────────────────────────────────────────── */}
      <footer className="bg-[#ffffff] overflow-hidden pb-0">
        <div className="relative overflow-hidden">
          <h2
            className="port-footer-text select-none text-center font-extralight uppercase leading-none text-[#222A35]"
            style={{
              fontSize: "clamp(5rem, 20vw, 22rem)",
              transform: "translateY(22%)",
            }}
          >
            KAD
          </h2>
        </div>

        <div className="relative z-10 bg-[#222A35] rounded-tl-[2rem] rounded-tr-[2rem] md:rounded-tl-[3.5rem] md:rounded-tr-[3.5rem] overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

          <div className="relative z-10 max-w-6xl mx-auto px-8 md:px-14 lg:px-20">
            <div className="pt-16 md:pt-20 pb-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 border-b border-white/[0.06]">
              <div>
                <motion.span
                  className="text-white/28 text-[10px] tracking-[0.48em] uppercase block mb-8"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.65 }}
                >
                  Selected Works
                </motion.span>

                <div className="overflow-hidden">
                  <motion.h3
                    className="text-white font-extralight leading-[1.04] tracking-[-0.03em]"
                    style={{ fontSize: "clamp(2.2rem, 5.5vw, 4.2rem)" }}
                    initial={{ y: "106%" }}
                    whileInView={{ y: "0%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
                  >
                    Our complete
                  </motion.h3>
                </div>
                <div className="overflow-hidden">
                  <motion.h3
                    className="text-white/38 font-extralight leading-[1.04] tracking-[-0.03em] italic"
                    style={{ fontSize: "clamp(2.2rem, 5.5vw, 4.2rem)" }}
                    initial={{ y: "106%" }}
                    whileInView={{ y: "0%" }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 1.05,
                      delay: 0.1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    portfolio.
                  </motion.h3>
                </div>
              </div>

              <motion.button
                onClick={() => setShowAll(true)}
                className="group flex items-center gap-5 self-start lg:self-end mb-1 cursor-pointer"
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.75, delay: 0.25 }}
                whileHover="hover"
              >
                <div className="relative w-16 h-16 rounded-full border border-white/18 flex items-center justify-center overflow-hidden group-hover:border-white/50 transition-colors duration-300">
                  <motion.div
                    className="absolute inset-0 bg-white rounded-full"
                    initial={{ scale: 0 }}
                    variants={{ hover: { scale: 1 } }}
                    transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <ArrowUpRight className="relative z-10 w-5 h-5 text-white group-hover:text-[#222A35] transition-colors duration-200" />
                </div>
                <span className="text-white/55 text-[11px] font-light tracking-[0.22em] uppercase group-hover:text-white transition-colors duration-300">
                  View All
                </span>
              </motion.button>
            </div>

            <div className="py-8 md:py-10 grid grid-cols-3 gap-6">
              {[
                { value: "100+", label: "Projects Completed" },
                { value: "15+", label: "Years of Practice" },
                { value: "98%", label: "Client Satisfaction" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.65 }}
                >
                  <div
                    className="text-white font-extralight tracking-[-0.02em]"
                    style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)" }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-white/22 text-[10px] tracking-[0.28em] uppercase mt-1.5">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
}

// ── Gallery card — for View All overlay ─────────────────────────────

function GalleryCard({ photo }: { photo: Project }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.figure
      className="relative overflow-hidden cursor-pointer bg-[#E0DFD7] aspect-[2/3]"
      variants={{
        hidden: { opacity: 0, y: 22 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      whileHover="hover"
    >
      {/* Shimmer */}
      <motion.div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, #d8d7cf 0%, #e8e7df 50%, #d8d7cf 100%)",
          backgroundSize: "200% 100%",
        }}
        animate={
          loaded
            ? { opacity: 0 }
            : { backgroundPosition: ["200% 0%", "-200% 0%"] }
        }
        transition={
          loaded
            ? { duration: 0.35 }
            : { duration: 1.4, repeat: Infinity, ease: "linear" }
        }
      />

      {/* Image — scales on parent hover via variant propagation */}
      <motion.img
        src={photo.image}
        alt={photo.title}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`absolute inset-0 w-full h-full object-cover ${loaded ? "opacity-100" : "opacity-0"}`}
        variants={{
          hover: {
            scale: 1.07,
            transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
          },
        }}
      />

      {/* Category chip — fades away on hover */}
      <motion.div
        className="absolute top-3 left-3 z-20"
        variants={{
          hover: { opacity: 0, transition: { duration: 0.18 } },
        }}
      >
        <span className="text-[8px] tracking-[0.24em] uppercase text-white/78 bg-black/28 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/8">
          {photo.category}
        </span>
      </motion.div>

      {/* Project number */}
      <div className="absolute top-3 right-3 z-20 text-white/18 text-[9px] font-mono tabular-nums select-none">
        {String(photo.id).padStart(2, "0")}
      </div>

      {/* Hover reveal — gradient + text slides up */}
      <motion.div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to top, rgba(8,10,16,0.92) 0%, rgba(8,10,16,0.28) 42%, transparent 100%)",
        }}
        variants={{
          hover: { opacity: 1, transition: { duration: 0.28 } },
        }}
        initial={{ opacity: 0 }}
      >
        <motion.div
          className="absolute bottom-0 left-0 right-0 p-4"
          variants={{
            hover: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.42,
                delay: 0.06,
                ease: [0.22, 1, 0.36, 1],
              },
            },
          }}
          initial={{ y: 14, opacity: 0 }}
        >
          <h3 className="text-white text-sm font-light leading-snug tracking-tight">
            {photo.title}
          </h3>
          <div className="flex items-center gap-1.5 text-white/35 text-[10px] mt-1.5">
            <MapPin className="w-2.5 h-2.5 flex-shrink-0" />
            <span>{photo.location}</span>
            <span className="text-white/15 mx-0.5">·</span>
            <span>{photo.year}</span>
          </div>
        </motion.div>
      </motion.div>
    </motion.figure>
  );
}
