import { useEffect, useRef } from "react";
import gsap from "gsap";

interface Props {
  onComplete: () => void;
}

const KHARE_LETTERS = ["K", "H", "A", "R", "E"];
const KAD_LETTERS   = ["K", "A", "D"];

export default function LoadingScreen({ onComplete }: Props) {
  const containerRef  = useRef<HTMLDivElement>(null);
  const khareWrapRef  = useRef<HTMLDivElement>(null);
  const kadWrapRef    = useRef<HTMLDivElement>(null);
  const khareRefs     = useRef<(HTMLSpanElement | null)[]>([]);
  const kadRefs       = useRef<(HTMLSpanElement | null)[]>([]);
  const sub1Ref       = useRef<HTMLParagraphElement>(null);
  const sub2Ref       = useRef<HTMLParagraphElement>(null);
  const lineTopRef    = useRef<HTMLDivElement>(null);
  const lineBottomRef = useRef<HTMLDivElement>(null);
  const creditRef     = useRef<HTMLParagraphElement>(null);
  const progressRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const khare = khareRefs.current.filter(Boolean) as HTMLSpanElement[];
    const kad   = kadRefs.current.filter(Boolean) as HTMLSpanElement[];

    // initialise hidden states
    gsap.set(kad,             { y: "110%" });
    gsap.set(kadWrapRef.current,  { autoAlpha: 1 });   // wrapper always visible
    gsap.set(sub2Ref.current, { autoAlpha: 0, letterSpacing: "0.8em" });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 });

      /* ── blueprint lines ─────────────────────── */
      const lines = containerRef.current?.querySelectorAll(".plan-line");
      if (lines?.length)
        tl.to(lines, { strokeDashoffset: 0, duration: 1.4, stagger: 0.1, ease: "power2.inOut" }, 0);

      /* ── corner accents ──────────────────────── */
      tl.to(containerRef.current?.querySelectorAll(".corner") ?? [],
        { opacity: 1, duration: 0.001, stagger: 0.07 }, 0.1);

      /* ── top gold line ───────────────────────── */
      tl.from(lineTopRef.current,
        { scaleX: 0, transformOrigin: "center", duration: 0.8, ease: "power3.out" }, 0.45);

      /* ══ PHASE 1 — KHARE ═══════════════════════ */
      tl.addLabel("p1", 0.7);

      // clip-reveal each KHARE letter from below
      tl.from(khare,
        { y: "110%", duration: 0.85, stagger: 0.07, ease: "power4.out" }, "p1");

      // subtitle1 tracks in
      tl.from(sub1Ref.current,
        { autoAlpha: 0, letterSpacing: "0.9em", duration: 0.95, ease: "power3.out" }, "p1+=0.32");

      // progress to 40 %
      tl.to(progressRef.current,
        { scaleX: 0.4, duration: 1.7, ease: "power1.inOut" }, "p1");

      /* ── hold so user reads the name ─────────── */
      tl.addLabel("p1End", 2.55);

      /* ══ TRANSITION  ════════════════════════════ */
      // fade + compress KHARE group out
      tl.to(khareWrapRef.current,
        { autoAlpha: 0, scaleY: 0.92, transformOrigin: "center bottom",
          duration: 0.38, ease: "power2.in" }, "p1End");

      // fade subtitle1 out simultaneously
      tl.to(sub1Ref.current,
        { autoAlpha: 0, y: -6, duration: 0.28, ease: "power2.in" }, "p1End");

      // progress to 65 %
      tl.to(progressRef.current,
        { scaleX: 0.65, duration: 0.5, ease: "power1.inOut" }, "p1End");

      /* ══ PHASE 2 — KAD ══════════════════════════ */
      tl.addLabel("p2", "p1End+=0.32");

      // clip-reveal KAD letters from below
      tl.to(kad,
        { y: "0%", duration: 0.9, stagger: 0.1, ease: "power4.out" }, "p2");

      // subtitle2 tracks in
      tl.to(sub2Ref.current,
        { autoAlpha: 1, letterSpacing: "0.45em", duration: 1.0, ease: "power3.out" }, "p2+=0.38");

      // bottom gold line
      tl.from(lineBottomRef.current,
        { scaleX: 0, transformOrigin: "center", duration: 0.8, ease: "power3.out" }, "p2+=0.52");

      // progress to 100 %
      tl.to(progressRef.current,
        { scaleX: 1, duration: 1.1, ease: "power1.inOut" }, "p2+=0.38");

      // credit
      tl.from(creditRef.current,
        { autoAlpha: 0, y: 7, duration: 0.6, ease: "power2.out" }, "p2+=0.9");

      /* ── hold then exit ──────────────────────── */
      tl.to({}, { duration: 0.45 }).call(onComplete);
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  /* ─── font style shared between phases ─────────────────────────── */
  const letterStyle = (size: string, spacing: string): React.CSSProperties => ({
    display: "inline-block",
    fontFamily: "'Cormorant Garamond', serif",
    fontWeight: 300,
    fontSize: size,
    color: "#FFFFFF",
    letterSpacing: spacing,
    lineHeight: 1,
  });

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center select-none overflow-hidden"
      style={{ background: "#222A35" }}
    >
      {/* ── grid lines ─────────────────────────────────────── */}
      {[20, 40, 60, 80].map(p => (
        <div key={`h${p}`} className="absolute left-0 right-0 h-px"
          style={{ top: `${p}%`, background: "rgba(255,255,255,0.035)" }} />
      ))}
      {[15, 35, 65, 85].map(p => (
        <div key={`v${p}`} className="absolute top-0 bottom-0 w-px"
          style={{ left: `${p}%`, background: "rgba(255,255,255,0.035)" }} />
      ))}

      {/* ── blueprint SVG ──────────────────────────────────── */}
      <svg viewBox="0 0 800 520" className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.55 }}>
        {[
          { d: "M160,110 h480 v300 h-480 Z",    da: 1600 },
          { d: "M160,230 H400",                  da: 500  },
          { d: "M400,110 V410",                  da: 600  },
          { d: "M400,280 H640",                  da: 400  },
          { d: "M500,110 V230",                  da: 300  },
          { d: "M160,320 H280",                  da: 250  },
          { d: "M280,320 V410",                  da: 200  },
        ].map(({ d, da }, i) => (
          <path key={i} d={d} className="plan-line"
            style={{ stroke: "rgba(184,147,90,0.18)", strokeWidth: 0.5, fill: "none",
              strokeDasharray: da, strokeDashoffset: da }} />
        ))}
      </svg>

      {/* ── corner accents ─────────────────────────────────── */}
      {[
        { cls: "top-6 left-6 border-t border-l",   id: "cTL" },
        { cls: "top-6 right-6 border-t border-r",  id: "cTR" },
        { cls: "bottom-6 left-6 border-b border-l", id: "cBL" },
        { cls: "bottom-6 right-6 border-b border-r", id: "cBR" },
      ].map(({ cls, id }) => (
        <div key={id} className={`corner absolute w-6 h-6 opacity-0 ${cls}`}
          style={{ borderColor: "rgba(255,255,255,0.22)" }} />
      ))}

      {/* ── centre content ─────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center w-full px-6">

        {/* top gold rule */}
        <div ref={lineTopRef} className="mb-10 md:mb-14 h-px w-24 md:w-36"
          style={{ background: "rgba(184,147,90,0.5)" }} />

        {/* ══ letter stage ══════════════════════════════════ */}
        {/*
          Fixed-height container so both KHARE and KAD sit in the same
          vertical slot. overflow-hidden on the inner wrapper clips the
          y-translated letters (the clip-reveal trick).
        */}
        <div className="relative w-full flex items-end justify-center"
          style={{ height: "clamp(4.2rem, 11vw, 8.5rem)", marginBottom: "clamp(1rem, 2vw, 1.4rem)" }}>

          {/* Phase 1 — KHARE */}
          <div ref={khareWrapRef}
            className="absolute inset-x-0 bottom-0 flex items-end justify-center gap-0">
            {KHARE_LETTERS.map((l, i) => (
              <div key={`kh-${i}`} className="overflow-hidden">
                <span ref={el => { khareRefs.current[i] = el; }}
                  style={letterStyle("clamp(4.2rem, 11vw, 8.5rem)", "0.1em")}>
                  {l}
                </span>
              </div>
            ))}
          </div>

          {/* Phase 2 — KAD */}
          <div ref={kadWrapRef}
            className="absolute inset-x-0 bottom-0 flex items-end justify-center gap-0">
            {KAD_LETTERS.map((l, i) => (
              <div key={`kd-${i}`} className="overflow-hidden">
                <span ref={el => { kadRefs.current[i] = el; }}
                  style={letterStyle("clamp(4.2rem, 11vw, 8.5rem)", "0.28em")}>
                  {l}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ══ subtitle stage ════════════════════════════════ */}
        {/* fixed height holds either subtitle without reflow */}
        <div className="relative w-full flex items-center justify-center"
          style={{ height: 20, marginBottom: "clamp(2rem, 4.5vw, 3.2rem)" }}>

          {/* Phase 1 subtitle */}
          <p ref={sub1Ref}
            className="absolute text-center whitespace-nowrap"
            style={{
              fontFamily: "'Jost', sans-serif",
              fontWeight: 200,
              fontSize: "clamp(9px, 1.1vw, 12px)",
              letterSpacing: "0.48em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.5)",
            }}>
            Khare Architecture &amp; Design Studio
          </p>

          {/* Phase 2 subtitle */}
          <p ref={sub2Ref}
            className="absolute text-center whitespace-nowrap"
            style={{
              fontFamily: "'Jost', sans-serif",
              fontWeight: 200,
              fontSize: "clamp(9px, 1.1vw, 12px)",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.5)",
            }}>
            Architecture &amp; Design Studio
          </p>
        </div>

        {/* bottom gold rule */}
        <div ref={lineBottomRef} className="mb-7 md:mb-9 h-px w-24 md:w-36"
          style={{ background: "rgba(184,147,90,0.5)" }} />

        {/* credit */}
        <p ref={creditRef}
          style={{
            fontFamily: "'Jost', sans-serif",
            fontWeight: 200,
            fontSize: "clamp(7px, 0.85vw, 9px)",
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.3)",
          }}>
          KAD Studio · Raipur, Chhattisgarh
        </p>
      </div>

      {/* ── progress bar ───────────────────────────────────── */}
      <div className="absolute bottom-0 inset-x-0 h-[2px]"
        style={{ background: "rgba(255,255,255,0.07)" }}>
        <div ref={progressRef} className="absolute inset-y-0 left-0 right-0"
          style={{
            background: "linear-gradient(90deg, rgba(184,147,90,0.25), rgba(184,147,90,0.85))",
            transformOrigin: "left",
            transform: "scaleX(0)",
          }} />
      </div>
    </div>
  );
}
