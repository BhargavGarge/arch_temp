import { useEffect, useRef } from "react";
import gsap from "gsap";
import { COMPANY_SHORT } from "../config/company";

interface LoadingScreenProps {
  isLoading: boolean;
  onLoadingComplete?: () => void;
}

export default function LoadingScreen({
  isLoading,
  onLoadingComplete,
}: LoadingScreenProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!isLoading) return;

    const wrap = wrapRef.current;
    if (!wrap) return;

    // Reset state
    gsap.set(wrap, { opacity: 1 });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    const ease2 = "power2.inOut";

    const planLines = wrap.querySelectorAll(".plan-line");
    const junctions = [
      wrap.querySelector("#jt1"),
      wrap.querySelector("#jt2"),
      wrap.querySelector("#jt3"),
      wrap.querySelector("#jt4"),
    ];
    const bar = wrap.querySelector("#progressBar") as HTMLElement;
    const num = wrap.querySelector("#progressNum") as HTMLElement;
    const statusEl = wrap.querySelector("#statusText") as HTMLElement;

    const statuses = [
      "Initialising workspace",
      "Loading materials",
      "Rendering spaces",
      "Calibrating light",
      "Almost ready",
    ];
    let sIdx = 0;

    function cycleStatus() {
      gsap.to(statusEl, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          sIdx = Math.min(sIdx + 1, statuses.length - 1);
          statusEl.textContent = statuses[sIdx];
          gsap.to(statusEl, { opacity: 1, duration: 0.4 });
        },
      });
    }

    let prog = { val: 0 };
    function updateProgress(target: number, dur: number) {
      gsap.to(prog, {
        val: target,
        duration: dur,
        ease: "none",
        onUpdate: () => {
          const v = Math.round(prog.val);
          if (bar) bar.style.width = v + "%";
          if (num) num.textContent = v + "%";
        },
      });
    }

    tl.set(wrap.querySelector("#blueprint"), { opacity: 0 })
      .set(statusEl, { opacity: 0 })

      /* corners snap in */
      .to(
        [
          wrap.querySelector("#cTL"),
          wrap.querySelector("#cTR"),
          wrap.querySelector("#cBL"),
          wrap.querySelector("#cBR"),
        ],
        { opacity: 1, duration: 0.001, stagger: 0.08 },
      )

      /* logo mark */
      .to(
        wrap.querySelector("#logoMark"),
        { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.4)" },
        0.3,
      )

      /* brand name */
      .to(
        wrap.querySelector("#brand"),
        { opacity: 1, y: 0, duration: 0.7, ease: ease2 },
        0.55,
      )
      .to(wrap.querySelector("#tagline"), { opacity: 1, duration: 0.5 }, 0.85)
      .to(
        wrap.querySelector("#progressNum"),
        { opacity: 1, duration: 0.4 },
        0.9,
      )

      /* status */
      .to(statusEl, { opacity: 1, duration: 0.4 }, 1.0)

      /* blueprint fades in */
      .to(
        wrap.querySelector("#blueprint"),
        { opacity: 1, duration: 0.8, ease: "power1.inOut" },
        1.1,
      )

      /* draw floor plan lines one by one */
      .add(() => {
        planLines.forEach((l, i) => {
          const len = parseFloat(l.getAttribute("stroke-dasharray") || "1000");
          gsap.to(l, {
            strokeDashoffset: 0,
            duration: 1.2 + i * 0.15,
            ease: "power2.inOut",
            delay: i * 0.12,
          });
        });
      }, 1.2)

      /* junction dots appear */
      .to(
        junctions,
        { opacity: 1, duration: 0.3, stagger: 0.15, ease: "power1.out" },
        2.0,
      )

      /* side labels */
      .to(
        [
          wrap.querySelector("#sLeft"),
          wrap.querySelector("#sRight"),
          wrap.querySelector("#sBottom"),
        ],
        { opacity: 1, duration: 0.6, stagger: 0.15 },
        1.8,
      )

      /* progress 0→100 */
      .add(() => {
        updateProgress(100, 2.5);
      }, 1.2)

      /* cycle status messages */
      .add(() => {
        cycleStatus();
      }, 1.6)
      .add(() => {
        cycleStatus();
      }, 2.2)
      .add(() => {
        cycleStatus();
      }, 2.8)
      .add(() => {
        cycleStatus();
      }, 3.3)
      .add(() => {
        cycleStatus();
      }, 3.7)

      /* curtain reveal */
      .add(() => {
        gsap.to(wrap.querySelector("#loaderCenter"), {
          opacity: 0,
          duration: 0.4,
          ease: "power2.in",
        });
        gsap.to(statusEl, { opacity: 0, duration: 0.3 });
        gsap.to(
          [
            wrap.querySelector("#sLeft"),
            wrap.querySelector("#sRight"),
            wrap.querySelector("#sBottom"),
          ],
          { opacity: 0, duration: 0.3 },
        );

        gsap.to(wrap.querySelector("#blueprint"), {
          opacity: 0.6,
          duration: 0.2,
          yoyo: true,
          repeat: 1,
          ease: "power1.inOut",
        });

        const n = 5;
        for (let i = 0; i < n; i++) {
          const panel = document.createElement("div");
          panel.style.cssText = `
            position:absolute;
            top:0;bottom:0;
            left:${(i / n) * 100}%;
            width:${(1 / n) * 100}%;
            background:#f5f0e8;
            z-index:60;
            transform:translateY(100%);
          `;
          wrap.appendChild(panel);
          gsap.to(panel, {
            y: "-100%",
            duration: 0.8,
            ease: "power4.inOut",
            delay: i * 0.06,
            onComplete: () => {
              if (i === n - 1) {
                gsap.to(wrap, {
                  opacity: 0,
                  duration: 0.5,
                  delay: 0.1,
                  onComplete: onLoadingComplete,
                });
              }
            },
          });
        }
      }, 4.2);

    tlRef.current = tl;

    return () => {
      if (tlRef.current) {
        tlRef.current.kill();
      }
    };
  }, [isLoading, onLoadingComplete]);

  if (!isLoading) return null;

  return (
    <div
      className="loader-wrap"
      id="loaderWrap"
      ref={wrapRef}
      style={styles.loaderWrap}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,300&family=Jost:wght@200;300;400&display=swap');

        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}

        .loader-wrap{
          width:100%;
          height:100vh;
          background:#0e0d0b;
          overflow:hidden;
          position:fixed;
          top:0;
          left:0;
          z-index:999;
          display:flex;
          flex-direction:column;
          align-items:center;
          justify-content:center;
          font-family:'Jost',sans-serif;
        }

        /* Grid lines */
        .grid-h, .grid-v{position:absolute;inset:0;pointer-events:none}
        .grid-line{position:absolute;background:rgba(255,255,255,0.04)}
        .grid-line.h{left:0;right:0;height:1px}
        .grid-line.v{top:0;bottom:0;width:1px}

        /* Blueprint SVG */
        #blueprint{
          position:absolute;
          inset:0;
          opacity:0;
        }

        /* Floor plan lines drawn via SVG stroke-dashoffset */
        .plan-line{
          stroke:rgba(184,147,90,0.25);
          stroke-width:0.5;
          fill:none;
          stroke-dasharray:1000;
          stroke-dashoffset:1000;
        }
        .plan-line.fast{ stroke-dasharray:400; stroke-dashoffset:400; }

        /* Center content */
        .loader-center{
          position:relative;
          z-index:10;
          display:flex;
          flex-direction:column;
          align-items:center;
          gap:0;
        }

        /* Logo mark */
        .logo-mark{
          width:48px;height:48px;
          border:1px solid rgba(184,147,90,0.5);
          position:relative;
          margin-bottom:28px;
          opacity:0;
          transform:scale(0.85);
        }
        .logo-mark::before{
          content:'';position:absolute;
          inset:5px;border:1px solid rgba(184,147,90,0.25);
        }
        .logo-mark::after{
          content:'';position:absolute;
          top:50%;left:0;right:0;height:1px;
          background:rgba(184,147,90,0.4);
        }
        .logo-inner{
          position:absolute;
          left:50%;top:0;bottom:0;width:1px;
          background:rgba(184,147,90,0.4);
        }

        /* Brand name */
        .brand{
          font-family:'Cormorant Garamond',serif;
          font-size:32px;
          font-weight:300;
          letter-spacing:0.18em;
          color:#f5f0e8;
          opacity:0;
          transform:translateY(8px);
          margin-bottom:6px;
        }

        .tagline{
          font-size:10px;
          font-weight:200;
          letter-spacing:0.35em;
          text-transform:uppercase;
          color:rgba(184,147,90,0.7);
          opacity:0;
          margin-bottom:40px;
        }

        /* Progress bar */
        .progress-wrap{
          width:200px;
          height:1px;
          background:rgba(255,255,255,0.08);
          position:relative;
          overflow:hidden;
        }
        .progress-bar{
          height:100%;
          width:0%;
          background:linear-gradient(90deg, rgba(184,147,90,0.4), #b8935a);
          transition:width 0.05s linear;
        }

        .progress-num{
          position:absolute;
          right:0;
          top:-20px;
          font-size:10px;
          font-weight:300;
          letter-spacing:0.1em;
          color:rgba(184,147,90,0.6);
          font-variant-numeric:tabular-nums;
          opacity:0;
        }

        /* Side labels */
        .side-label{
          position:absolute;
          font-size:9px;
          font-weight:200;
          letter-spacing:0.3em;
          text-transform:uppercase;
          color:rgba(255,255,255,0.15);
          opacity:0;
        }
        .side-label.left{ left:28px; top:50%; transform:rotate(-90deg) translateY(-50%); transform-origin:left center; writing-mode:vertical-rl; letter-spacing:0.4em;}
        .side-label.right{ right:28px; top:50%; transform:rotate(90deg) translateY(-50%); transform-origin:right center; writing-mode:vertical-rl; letter-spacing:0.4em;}
        .side-label.bottom{ bottom:28px; left:50%; transform:translateX(-50%);}

        /* Corner accents */
        .corner{
          position:absolute;
          width:20px; height:20px;
          opacity:0;
        }
        .corner.tl{top:20px;left:20px; border-top:1px solid rgba(184,147,90,0.4); border-left:1px solid rgba(184,147,90,0.4);}
        .corner.tr{top:20px;right:20px; border-top:1px solid rgba(184,147,90,0.4); border-right:1px solid rgba(184,147,90,0.4);}
        .corner.bl{bottom:20px;left:20px; border-bottom:1px solid rgba(184,147,90,0.4); border-left:1px solid rgba(184,147,90,0.4);}
        .corner.br{bottom:20px;right:20px; border-bottom:1px solid rgba(184,147,90,0.4); border-right:1px solid rgba(184,147,90,0.4);}

        /* Status text cycling */
        .status-text{
          position:absolute;
          bottom:48px;
          left:50%;
          transform:translateX(-50%);
          font-size:9px;
          font-weight:200;
          letter-spacing:0.3em;
          text-transform:uppercase;
          color:rgba(255,255,255,0.2);
          white-space:nowrap;
          opacity:0;
          z-index:10;
        }
      `}</style>

      {/* Grid */}
      <div className="grid-h">
        <div className="grid-line h" style={{ top: "20%" }}></div>
        <div className="grid-line h" style={{ top: "40%" }}></div>
        <div className="grid-line h" style={{ top: "60%" }}></div>
        <div className="grid-line h" style={{ top: "80%" }}></div>
      </div>
      <div className="grid-v">
        <div className="grid-line v" style={{ left: "15%" }}></div>
        <div className="grid-line v" style={{ left: "35%" }}></div>
        <div className="grid-line v" style={{ left: "65%" }}></div>
        <div className="grid-line v" style={{ left: "85%" }}></div>
      </div>

      {/* Blueprint floor plan SVG */}
      <svg
        id="blueprint"
        viewBox="0 0 800 520"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          inset: 0,
        }}
      >
        <rect
          x="160"
          y="110"
          width="480"
          height="300"
          className="plan-line"
          rx="0"
        />
        <line x1="160" y1="230" x2="400" y2="230" className="plan-line" />
        <line x1="400" y1="110" x2="400" y2="410" className="plan-line" />
        <line x1="400" y1="280" x2="640" y2="280" className="plan-line" />
        <line x1="500" y1="110" x2="500" y2="230" className="plan-line fast" />
        <line x1="160" y1="320" x2="280" y2="320" className="plan-line fast" />
        <line x1="280" y1="320" x2="280" y2="410" className="plan-line fast" />
        <line
          x1="140"
          y1="110"
          x2="140"
          y2="410"
          stroke="rgba(184,147,90,0.12)"
          strokeWidth="0.5"
          fill="none"
          strokeDasharray="4 4"
        />
        <line
          x1="160"
          y1="90"
          x2="640"
          y2="90"
          stroke="rgba(184,147,90,0.12)"
          strokeWidth="0.5"
          fill="none"
          strokeDasharray="4 4"
        />
        <circle
          id="jt1"
          cx="400"
          cy="230"
          r="3"
          fill="none"
          stroke="rgba(184,147,90,0.3)"
          strokeWidth="0.5"
          opacity="0"
        />
        <circle
          id="jt2"
          cx="400"
          cy="280"
          r="3"
          fill="none"
          stroke="rgba(184,147,90,0.3)"
          strokeWidth="0.5"
          opacity="0"
        />
        <circle
          id="jt3"
          cx="280"
          cy="320"
          r="3"
          fill="none"
          stroke="rgba(184,147,90,0.3)"
          strokeWidth="0.5"
          opacity="0"
        />
        <circle
          id="jt4"
          cx="500"
          cy="230"
          r="3"
          fill="none"
          stroke="rgba(184,147,90,0.3)"
          strokeWidth="0.5"
          opacity="0"
        />
      </svg>

      {/* Corner accents */}
      <div className="corner tl" id="cTL"></div>
      <div className="corner tr" id="cTR"></div>
      <div className="corner bl" id="cBL"></div>
      <div className="corner br" id="cBR"></div>

      {/* Side labels */}
      <div className="side-label left" id="sLeft">
        Architecture · Interior
      </div>
      <div className="side-label right" id="sRight">
        Est. MMXXIV
      </div>
      <div className="side-label bottom" id="sBottom">
        Studio · Design · Space
      </div>

      {/* Center content */}
      <div className="loader-center" id="loaderCenter">
        <div className="logo-mark" id="logoMark">
          <div className="logo-inner"></div>
        </div>
        <div className="brand" id="brand">
          {COMPANY_SHORT}
        </div>
        <div className="tagline" id="tagline">
          Architecture & Interior Design
        </div>
        <div className="progress-wrap">
          <div className="progress-bar" id="progressBar"></div>
          <div className="progress-num" id="progressNum">
            0%
          </div>
        </div>
      </div>

      {/* Status text */}
      <div className="status-text" id="statusText">
        Initialising workspace
      </div>
    </div>
  );
}

const styles = {
  loaderWrap: {
    width: "100%",
    height: "100vh",
    background: "#0e0d0b",
    overflow: "hidden",
    position: "fixed" as const,
    top: 0,
    left: 0,
    zIndex: 999,
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Jost',sans-serif",
  },
};
