

import {
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({
  data,
  heading = "Our Process",
  intro = "A single, cohesive journey — from first sketch to final key handover.",
}: {
  data: TimelineEntry[];
  heading?: string;
  intro?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const updateHeight = () => {
      setHeight(el.getBoundingClientRect().height);
    };

    // Initial measure
    updateHeight();

    // Recompute whenever the content resizes (e.g. images finishing loading,
    // larger images, responsive reflow) so the beam matches real height.
    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(el);

    // Also catch late-loading images that change layout height.
    const images = Array.from(el.querySelectorAll("img"));
    images.forEach((img) => {
      if (!img.complete) {
        img.addEventListener("load", updateHeight);
        img.addEventListener("error", updateHeight);
      }
    });

    window.addEventListener("resize", updateHeight);

    return () => {
      resizeObserver.disconnect();
      images.forEach((img) => {
        img.removeEventListener("load", updateHeight);
        img.removeEventListener("error", updateHeight);
      });
      window.removeEventListener("resize", updateHeight);
    };
  }, [data]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full bg-white text-[#222A35] font-jost md:px-10"
      ref={containerRef}
    >
     <div className="max-w-7xl mx-auto pt-20 pb-10 px-4 md:px-8 lg:px-10">
        <span className="block text-[10px] tracking-[0.48em] uppercase text-[#222A35]/45 mb-8">
          Unified Capabilities
        </span>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 sm:gap-6">

        <h2
         className="op-heading text-[#222A35] font-light tracking-tight leading-[1.03] mb-4"
                style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)" }}
                >
          {heading}
        </h2>
        <p className="text-[#222A35]/60 text-sm md:text-base font-light leading-[1.85] max-w-md">
          {intro}
        </p>
        </div>
            <div className="mt-8 md:mt-10 h-px bg-[#222A35]/10 w-full" />

      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-40 md:gap-10"
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-neutral-200 border border-neutral-300 p-2" />
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-extralight tracking-[-0.02em] text-[#222A35]/30">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-extralight tracking-[-0.02em] text-[#222A35]/40">
                {item.title}
              </h3>
              {item.content}
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-[#222A35]/15 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-[#222A35] via-black to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};