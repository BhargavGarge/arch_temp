import { Timeline } from "@/components/ui/timeline";

const IMG_SHADOW =
  "shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]";

function ServiceImage({ src, alt }: { src: string; alt: string }) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={`rounded-lg object-cover aspect-[4/3]  ${IMG_SHADOW}`}
    />
  );
}

export function ServicesTimelineSection() {
  const data = [
    {
      title: "01",
      content: (
        <div>
          <h4 className="text-[#222A35] text-3xl  font-medium tracking-[-0.01em] mb-3">
            Architecture & Master Planning
          </h4>
          <p className="text-[#222A35]/80 text-md  font-medium leading-[1.85] mb-8 max-w-xl">
            We sculpt volumetric, fluid architecture — optimizing microclimates,
            capturing cross-ventilation, and following the natural path of
            daylight, from luxury villas to multi-acre master plans.
          </p>
          <div className="grid grid-cols-1 ">
            <ServiceImage src="/assets/arch2.webp" alt="Architectural study" />
          </div>
        </div>
      ),
    },
    {
      title: "02",
      content: (
        <div>
          <h4 className="text-[#222A35] text-3xl font-medium tracking-[-0.01em] mb-3">
            Bespoke Interior Design
          </h4>
          <p className="text-[#222A35]/80 text-md  font-medium leading-[1.85] mb-8 max-w-xl">
            Interiors tuned to human psychology — prioritizing spatial dignity,
            tactile comfort, and sensory ergonomics through layered lighting and
            precise material choices.
          </p>
          <div className="grid grid-cols-1">
            <ServiceImage src="/assets/RESIDENCE.webp" alt="Interior detail" />
          </div>
        </div>
      ),
    },
    {
      title: "03",
      content: (
        <div>
          <h4 className="text-[#222A35] text-3xl font-medium tracking-[-0.01em] mb-3">
            Turnkey Project Management
          </h4>
          <p className="text-[#222A35]/80 text-md  font-medium leading-[1.85] mb-4 max-w-xl">
            Single-source accountability across the entire pipeline — insulating
            clients from subcontractor conflict and guaranteeing budget and
            schedule compliance.
          </p>
          <div className="mb-8">
            {[
              "Comprehensive project ownership, one point of contact",
              "ISO-aligned material testing & milestone tracking",
              "Direct procurement from a trusted vendor network",
              "Rigorous structural quality control",
            ].map((item) => (
              <div
                key={item}
                className="flex gap-2 items-center text-[#222A35]/55 text-md  font-medium py-1"
              >
                <span className="w-[3px] h-[3px] rounded-full bg-[#8a7a5c] flex-shrink-0" />
                {item}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1">
            <ServiceImage
              src="/assets/TWILIGHT VILLA.webp"
              alt="Construction detailing"
            />
          </div>
        </div>
      ),
    },
    {
      title: "04",
      content: (
        <div>
          <h4 className="text-[#222A35] text-3xl font-medium tracking-[-0.01em] mb-3">
            KAD Design Academy
          </h4>
          <p className="text-[#222A35]/80 text-md md:text-sm font-medium leading-[1.85] mb-8 max-w-xl">
            Our professional training incubator — a 12-month advanced course
            that bridges academic theory and real-world execution, taught by our
            own practicing architects on live studio briefs.
          </p>
          <div className="grid grid-cols-1">
            <ServiceImage src="/assets/kad_d.webp" alt="Design academy" />
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="services-timeline" className="w-full">
      <Timeline
        data={data}
        heading="Our Services"
        intro="Our practice operates as a single, cohesive ecosystem — integrating architectural design, turnkey engineering, and professional education under one firm, from first sketch to final key handover."
      />
    </section>
  );
}
