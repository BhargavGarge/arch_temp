 import { useState, type ComponentProps, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  ArrowUpRight,
} from "lucide-react";

import ContactActionModal from "../ContactActionModal";

const NAV_COLUMNS = [
  {
    heading: "Explore",
    links: [
      { label: "About", href: "#about-section" },
      { label: "Vision", href: "#vision-section" },
      { label: "Projects", href: "#our-projects" },
      { label: "Services", href: "#services-timeline" },
      { label: "Contact", href: "#cta-section" },
    ],
  },
  {
    heading: "Services",
    links: [
      { label: "Architecture", href: "#services-timeline" },
      { label: "Interiors", href: "#services-timeline" },
      { label: "Turnkey Projects", href: "#services-timeline" },
      { label: "Design Academy", href: "#services-timeline" },
    ],
  },
];

const BG_IMAGE =
  "https://images.adsttc.com/media/images/6037/0ec7/f91c/8122/3000/03d3/large_jpg/_FI_2_EXTERIOR_2.jpg?1614220985";

export function Footer() {
  const [open, setOpen] = useState(false);
  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer
        id="footer-section"
        className="relative overflow-hidden bg-[#080808]"
      >
        {/* ================= HERO CTA ================= */}

        <div className="relative h-[58vh] min-h-[420px] overflow-hidden">
          <img
            src={BG_IMAGE}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/60" />

          <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-b from-transparent to-[#080808]" />

          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: .8 }}
              className="font-thin leading-[1.05] text-white font-[eb-g] "
              style={{
                fontSize: "clamp(2.5rem,5vw,5rem)",
              }}
            >
              Ready to Build
              <br />
              Something Exceptional?
            </motion.h2>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: .2 }}
              onClick={() => setOpen(true)}
              className="group mt-10 inline-flex items-center gap-3 rounded-full bg-white px-7 py-3.5 text-sm font-medium text-[#080808] transition-all duration-300 hover:bg-[#222A35] hover:text-white"
            >
              Start a Project

              <ArrowUpRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </motion.button>
          </div>
        </div>

        <ContactActionModal
          open={open}
          onClose={() => setOpen(false)}
        />

        {/* ================= FOOTER CARD ================= */}

        <div className="relative z-20 -mt-8 px-5 pb-8 md:px-8 lg:px-12">

          <div
            className="
            rounded-3xl
            border
            border-white/10
            bg-[#111111]
            shadow-[0_-20px_80px_rgba(0,0,0,.55)]
          "
          >

            <div
              className="
              grid
              gap-10
              px-6
              py-10
              md:px-10
              lg:grid-cols-5
              lg:px-14
            "
            >

              {/* ================= BRAND ================= */}

              <AnimatedContainer
                delay={0.05}
                className="lg:col-span-2"
              >

                <img
                  src="/logo.png"
                  alt="KAD Studio"
                  className="h-14 w-auto"
                />

                <p className="mt-7 max-w-md text-sm leading-7 text-white/55">
                  KAD Studio is a multidisciplinary architecture,
                  interior design and turnkey execution practice
                  crafting timeless spaces through thoughtful
                  planning, innovation and precision.
                </p>

                <div className="mt-10 space-y-8">

                  <div>

                    <h3 className="mb-3 text-xs font-medium uppercase tracking-[0.28em] text-white/70">
                      Bilaspur Office
                    </h3>

                    <div className="flex gap-3">

                      <MapPin
                        size={16}
                        className="mt-1 text-[#8D735B]"
                      />

                      <p className="text-sm leading-6 text-white/35">
                        1st Floor GS Plaza
                        <br />
                        Navbharat Press Road
                        <br />
                        Bilaspur
                        <br />
                        Chhattisgarh
                      </p>

                    </div>

                  </div>

                  <div>

                    <h3 className="mb-3 text-xs font-medium uppercase tracking-[0.28em] text-white/70">
                      Raipur Office
                    </h3>

                    <div className="flex gap-3">

                      <MapPin
                        size={16}
                        className="mt-1 text-[#8D735B]"
                      />

                      <p className="text-sm leading-6 text-white/35">
                        Raipur
                        <br />
                        Chhattisgarh
                        <br />
                        India
                      </p>

                    </div>

                  </div>

                </div>

              </AnimatedContainer>
                            {/* ================= CONTACT ================= */}

              <AnimatedContainer delay={0.12}>
                <h3 className="mb-6 text-[10px] font-medium uppercase tracking-[0.3em] text-white/45">
                  Contact
                </h3>

                <div className="space-y-5">
                  <a
                    href="tel:+919826235711"
                    className="group flex items-start gap-3"
                  >
                    <Phone
                      size={16}
                      className="mt-0.5 text-[#8D735B]"
                    />

                    <span className="text-sm text-white/35 transition-colors group-hover:text-white">
                      +91 98262 35711
                    </span>
                  </a>

                  <a
                    href="tel:+918839461534"
                    className="group flex items-start gap-3"
                  >
                    <Phone
                      size={16}
                      className="mt-0.5 text-[#8D735B]"
                    />

                    <span className="text-sm text-white/35 transition-colors group-hover:text-white">
                      +91 88394 61534
                    </span>
                  </a>

                  <a
                    href="mailto:kadstudio1011@gmail.com"
                    className="group flex items-start gap-3 break-all"
                  >
                    <Mail
                      size={16}
                      className="mt-0.5 text-[#8D735B]"
                    />

                    <span className="text-sm text-white/35 transition-colors group-hover:text-white">
                      kadstudio1011@gmail.com
                    </span>
                  </a>
                </div>
              </AnimatedContainer>

              {/* ================= NAVIGATION ================= */}

              {NAV_COLUMNS.map((column, index) => (
                <AnimatedContainer
                  key={column.heading}
                  delay={0.18 + index * 0.08}
                >
                  <h3 className="mb-6 text-[10px] font-medium uppercase tracking-[0.3em] text-white/45">
                    {column.heading}
                  </h3>

                  <ul className="space-y-4">
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="text-sm text-white/35 transition-colors duration-300 hover:text-white"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </AnimatedContainer>
              ))}
            </div>

            {/* ================= BOTTOM BAR ================= */}

            <div className="border-t border-white/5 px-6 py-5 md:px-10 lg:px-14">
              <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                <p className="text-center text-[11px] text-white/25">
                  ©{currentYear}  KAD Studio. All Rights Reserved.
                </p>

                <a
                  href="https://pheneron.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[11px] text-white/25 transition-colors hover:text-white"
                >
                  Designed & Developed by
                  <span className="font-medium">Pheneron</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

/* ================= Animated Container ================= */

type AnimatedContainerProps = {
  delay?: number;
  className?: ComponentProps<typeof motion.div>["className"];
  children: ReactNode;
};

function AnimatedContainer({
  children,
  className,
  delay = 0.1,
}: AnimatedContainerProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        y: 20,
        filter: "blur(6px)",
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
      }}
      viewport={{ once: true }}
      transition={{
        duration: 0.75,
        delay,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
}