import { useState } from "react";
import type { ComponentProps, ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Building2, MapPin, ArrowUpRight, Send } from "lucide-react";
import type { FormEvent } from "react";
import { COMPANY_NAME, COMPANY_ADDRESS } from "../../config/company";

// ── Social SVGs ───────────────────────────────────────────────────
function IconFacebook({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}
function IconInstagram({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}
function IconYoutube({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon fill="white" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
    </svg>
  );
}
function IconLinkedin({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const SOCIAL = [
  { Icon: IconFacebook, label: "Facebook" },
  { Icon: IconInstagram, label: "Instagram" },
  { Icon: IconYoutube, label: "YouTube" },
  { Icon: IconLinkedin, label: "LinkedIn" },
];

const NAV_COLUMNS = [
  {
    heading: "Explore",
    links: ["Services", "Portfolio", "Videos", "Media"],
  },
  {
    heading: "Company",
    links: ["About Us", "Careers", "Contact Us", "Privacy Policy"],
  },
  {
    heading: "Services",
    links: ["Architecture", "Interiors", "Landscape", "Sustainability"],
  },
];

const BG_IMAGE =
  "https://images.adsttc.com/media/images/6037/0ec7/f91c/8122/3000/03d3/large_jpg/_FI_2_EXTERIOR_2.jpg?1614220985";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  return (
    <footer
      id="footer-section"
      className="relative bg-[#080808] overflow-hidden"
    >
      {/* ── Background image + CTA ──────────────────────────────── */}
      <div className="relative h-[58vh] min-h-[400px] overflow-hidden">
        {/* Photo */}
        <img
          src={BG_IMAGE}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/55" />

        {/* Gradient fade to card below */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent to-[#080808]" />

        {/* CTA copy */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pb-10">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: "easeOut" }}
            className="text-white font-light tracking-tight leading-[1.1] mb-8"
            style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.8rem)" }}
          >
            Ready to build for
            <br />
            the real world?
          </motion.h2>

          <motion.a
            href="#contact"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.2, ease: "easeOut" }}
            className="inline-flex items-center gap-2 bg-white text-[#080808] rounded-full px-7 py-3.5 text-sm font-medium hover:bg-[#88734C] hover:text-white transition-all duration-300 group"
          >
            Start a Project
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.a>
        </div>
      </div>

      {/* ── Floating footer card ────────────────────────────────── */}
      <div className="relative z-10 px-4 md:px-8 lg:px-12 -mt-6 pb-6">
        <div className="bg-[#111111] border border-white/[0.07] rounded-2xl overflow-hidden shadow-[0_-8px_60px_rgba(0,0,0,0.6)]">
          {/* Main grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-10 px-5 md:px-10 lg:px-14 pt-8 md:pt-12 pb-8 md:pb-10">
            {/* Brand + newsletter */}
            <AnimatedContainer delay={0.05} className="lg:col-span-2">
              <div className="flex items-center gap-2.5 mb-3">
                <Building2 className="w-4 h-4 text-[#88734C] flex-shrink-0" />
                <span className="text-white font-light tracking-[0.18em] text-xs uppercase">
                  {COMPANY_NAME}
                </span>
              </div>

              <div className="flex items-start gap-2 mb-7">
                <MapPin className="w-3.5 h-3.5 text-[#88734C] flex-shrink-0 mt-0.5" />
                <address className="not-italic text-white/30 text-xs leading-relaxed">
                  {COMPANY_ADDRESS.line1}
                  <br />
                  {COMPANY_ADDRESS.line2}
                  <br />
                  {COMPANY_ADDRESS.line3}
                </address>
              </div>

              {/* Newsletter */}
              <p className="text-white/50 text-[10px] tracking-[0.3em] uppercase font-medium mb-1">
                Sign up for email updates
              </p>
              <p className="text-white/25 text-xs mb-4">
                Stay current with our latest projects and insights.
              </p>

              {subscribed ? (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[#88734C] text-xs flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#88734C]" />
                  Subscribed. Thank you!
                </motion.p>
              ) : (
                <form
                  onSubmit={handleSubscribe}
                  className="flex items-center gap-2"
                >
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="flex-1 bg-white/[0.05] border border-white/[0.08] rounded-lg px-3.5 py-2.5 text-white text-xs placeholder:text-white/20 focus:outline-none focus:border-[#88734C]/50 transition-all duration-300"
                  />
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 bg-[#88734C] hover:bg-[#7a6640] text-white text-[11px] font-medium tracking-wide px-4 py-2.5 rounded-lg transition-colors duration-300 whitespace-nowrap cursor-pointer"
                  >
                    Subscribe <Send className="w-3 h-3" />
                  </button>
                </form>
              )}
            </AnimatedContainer>

            {/* Nav columns */}
            {NAV_COLUMNS.map((col, ci) => (
              <AnimatedContainer key={col.heading} delay={0.1 + ci * 0.08}>
                <h3 className="text-white/45 text-[10px] tracking-[0.3em] uppercase font-medium mb-5">
                  {col.heading}
                </h3>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                        className="text-white/35 text-sm hover:text-white transition-colors duration-300"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </AnimatedContainer>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/[0.05] px-5 md:px-10 lg:px-14 py-4 md:py-5">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-white/20 text-[11px]">
                © 2025 {COMPANY_NAME}. All Rights Reserved.
              </p>
              <a
                className="flex items-center gap-3 text-white/20 text-[11px]"
                href="https://pheneron.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Art by</span>
                Pheneron{" "}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── Animated container ─────────────────────────────────────────────
type AnimatedContainerProps = {
  delay?: number;
  className?: ComponentProps<typeof motion.div>["className"];
  children: ReactNode;
};

function AnimatedContainer({
  className,
  delay = 0.1,
  children,
}: AnimatedContainerProps) {
  const reduced = useReducedMotion();
  if (reduced) return <>{children}</>;
  return (
    <motion.div
      initial={{ filter: "blur(4px)", y: -6, opacity: 0 }}
      whileInView={{ filter: "blur(0px)", y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.75, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
