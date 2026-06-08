import { useEffect, useRef } from "react";
import gsap from "gsap";

interface Props {
  onComplete: () => void;
}

const LETTERS = ["K", "A", "D"];

export default function LoadingScreen({ onComplete }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const studioRef = useRef<HTMLParagraphElement>(null);
  const lineTopRef = useRef<HTMLDivElement>(null);
  const lineBottomRef = useRef<HTMLDivElement>(null);
  const creditRef = useRef<HTMLParagraphElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      // Blueprint lines draw in (the SVG .plan-line elements)
      const planLines = containerRef.current?.querySelectorAll(".plan-line");
      if (planLines?.length) {
        tl.to(
          planLines,
          {
            strokeDashoffset: 0,
            duration: 1.4,
            stagger: 0.1,
            ease: "power2.inOut",
          },
          0
        );
      }

      // Corner accents snap in
      tl.to(
        containerRef.current?.querySelectorAll(".corner") ?? [],
        { opacity: 1, duration: 0.001, stagger: 0.06 },
        0.1
      );

      // Top line expands from center
      tl.from(
        lineTopRef.current,
        {
          scaleX: 0,
          transformOrigin: "center",
          duration: 0.85,
          ease: "power3.out",
        },
        0.5
      );

      // KAD letters — clip reveal stagger
      tl.from(
        lettersRef.current,
        {
          y: "108%",
          duration: 0.9,
          stagger: 0.09,
          ease: "power4.out",
        },
        0.75
      );

      // Design Studio tracks in
      tl.from(
        studioRef.current,
        {
          opacity: 0,
          letterSpacing: "1.2em",
          duration: 1.1,
          ease: "power3.out",
        },
        1.1
      );

      // Bottom line
      tl.from(
        lineBottomRef.current,
        {
          scaleX: 0,
          transformOrigin: "center",
          duration: 0.85,
          ease: "power3.out",
        },
        1.3
      );

      // Progress bar fills
      tl.to(
        progressRef.current,
        {
          scaleX: 1,
          duration: 2.2,
          ease: "power1.inOut",
        },
        0.8
      );

      // art by pheneron
      tl.from(
        creditRef.current,
        {
          opacity: 0,
          y: 8,
          duration: 0.7,
          ease: "power2.out",
        },
        1.6
      );

      // Hold then call complete — Framer Motion handles the exit
      tl.to({}, { duration: 0.7 }).call(onComplete);
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center select-none overflow-hidden"
      style={{ background: "#f4f1ec", fontFamily: "'Jost', sans-serif" }}
    >
      {/* Subtle grid lines */}
      {[20, 40, 60, 80].map((p) => (
        <div
          key={`h${p}`}
          className="absolute left-0 right-0 h-px"
          style={{ top: `${p}%`, background: "rgba(0,0,0,0.05)" }}
        />
      ))}
      {[15, 35, 65, 85].map((p) => (
        <div
          key={`v${p}`}
          className="absolute top-0 bottom-0 w-px"
          style={{ left: `${p}%`, background: "rgba(0,0,0,0.05)" }}
        />
      ))}

      {/* Blueprint floor plan SVG */}
      <svg
        viewBox="0 0 800 520"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.6 }}
      >
        <rect
          x="160" y="110" width="480" height="300"
          className="plan-line"
          style={{
            stroke: "rgba(184,147,90,0.18)",
            strokeWidth: 0.5,
            fill: "none",
            strokeDasharray: 1600,
            strokeDashoffset: 1600,
          }}
        />
        <line x1="160" y1="230" x2="400" y2="230"
          className="plan-line"
          style={{ stroke: "rgba(184,147,90,0.15)", strokeWidth: 0.5, fill: "none", strokeDasharray: 500, strokeDashoffset: 500 }}
        />
        <line x1="400" y1="110" x2="400" y2="410"
          className="plan-line"
          style={{ stroke: "rgba(184,147,90,0.15)", strokeWidth: 0.5, fill: "none", strokeDasharray: 600, strokeDashoffset: 600 }}
        />
        <line x1="400" y1="280" x2="640" y2="280"
          className="plan-line"
          style={{ stroke: "rgba(184,147,90,0.15)", strokeWidth: 0.5, fill: "none", strokeDasharray: 400, strokeDashoffset: 400 }}
        />
        <line x1="500" y1="110" x2="500" y2="230"
          className="plan-line"
          style={{ stroke: "rgba(184,147,90,0.12)", strokeWidth: 0.5, fill: "none", strokeDasharray: 300, strokeDashoffset: 300 }}
        />
        <line x1="160" y1="320" x2="280" y2="320"
          className="plan-line"
          style={{ stroke: "rgba(184,147,90,0.12)", strokeWidth: 0.5, fill: "none", strokeDasharray: 250, strokeDashoffset: 250 }}
        />
        <line x1="280" y1="320" x2="280" y2="410"
          className="plan-line"
          style={{ stroke: "rgba(184,147,90,0.12)", strokeWidth: 0.5, fill: "none", strokeDasharray: 200, strokeDashoffset: 200 }}
        />
      </svg>

      {/* Corner accents */}
      {[
        { cls: "top-5 left-5 border-t border-l", id: "cTL" },
        { cls: "top-5 right-5 border-t border-r", id: "cTR" },
        { cls: "bottom-5 left-5 border-b border-l", id: "cBL" },
        { cls: "bottom-5 right-5 border-b border-r", id: "cBR" },
      ].map(({ cls, id }) => (
        <div
          key={id}
          className={`corner absolute w-5 h-5 opacity-0 ${cls}`}
          style={{ borderColor: "rgba(184,147,90,0.4)" }}
        />
      ))}

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center">

        {/* Top line */}
        <div
          ref={lineTopRef}
          className="w-20 md:w-32 h-px mb-10 md:mb-12"
          style={{ background: "rgba(184,147,90,0.45)" }}
        />

        {/* K A D — clip reveal */}
        <div className="flex items-end mb-5 md:mb-6">
          {LETTERS.map((letter, i) => (
            <div key={letter} className="overflow-hidden">
              <span
                ref={(el) => { lettersRef.current[i] = el; }}
                style={{
                  display: "inline-block",
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 300,
                  fontSize: "clamp(5rem, 13vw, 10rem)",
                  color: "#1a1714",
                  letterSpacing: "0.1em",
                  lineHeight: 1,
                }}
              >
                {letter}
              </span>
            </div>
          ))}
        </div>

        {/* Design Studio */}
        <p
          ref={studioRef}
          style={{
            fontFamily: "'Jost', sans-serif",
            fontWeight: 200,
            fontSize: "clamp(8px, 1.2vw, 11px)",
            letterSpacing: "0.55em",
            textTransform: "uppercase",
            color: "rgba(120,90,40,0.75)",
            marginBottom: "clamp(2.5rem, 5vw, 3.5rem)",
          }}
        >
          Design Studio
        </p>

        {/* Bottom line */}
        <div
          ref={lineBottomRef}
          className="w-20 md:w-32 h-px mb-7 md:mb-9"
          style={{ background: "rgba(184,147,90,0.45)" }}
        />

        {/* art by pheneron */}
        <p
          ref={creditRef}
          style={{
            fontFamily: "'Jost', sans-serif",
            fontWeight: 200,
            fontSize: "clamp(7px, 1vw, 9px)",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "rgba(0,0,0,0.55)",
          }}
        >
          art by pheneron
        </p>
      </div>

      {/* Progress line — bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px overflow-hidden"
        style={{ background: "rgba(0,0,0,0.08)" }}
      >
        <div
          ref={progressRef}
          className="absolute inset-y-0 left-0 right-0"
          style={{
            background: "linear-gradient(90deg, rgba(184,147,90,0.3), rgba(184,147,90,0.8))",
            transformOrigin: "left",
            transform: "scaleX(0)",
          }}
        />
      </div>
    </div>
  );
}
