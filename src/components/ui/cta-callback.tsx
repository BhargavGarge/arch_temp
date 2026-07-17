import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import {
  ContainerStagger,
  ContainerAnimated,
  GalleryGrid,
  GalleryGridCell,
} from "./cta-section-with-gallery";
import { Button } from "./button";

const IMAGES = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1616137466211-f939a420be84?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&auto=format&fit=crop&q=80",
];

export default function CTACallback() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    accepted: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = (e: { preventDefault(): void }) => {
    e.preventDefault();
    if (!formData.accepted) return;
    setSubmitted(true);
  };

  return (
    <section id="cta-section" className="relative overflow-hidden">
      {/* Transition gradient from testimonial */}
      {/* <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-br from-[#222A35] to-transparent pointer-events-none z-10" /> */}

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#222A35]/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full bg-[#222A35]/3 blur-[100px] pointer-events-none" />

      <div className="container mx-auto max-w-6xl px-4 sm:px-6 md:px-12 lg:px-16 py-12 sm:py-16 md:py-28 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 sm:gap-16 lg:gap-20">
          {/* ── Left: text + form ─────────────────────────────── */}
          <ContainerStagger>
            <ContainerAnimated>
              <span className="block text-white/50 text-[10px] tracking-[0.4em] uppercase font-medium mb-5">
                Start Your Project
              </span>
            </ContainerAnimated>

            <ContainerAnimated>
              <h2
                className="text-white font-light tracking-tight leading-[1.05] mb-5"
                style={{ fontSize: "clamp(2.8rem, 5.5vw, 4.5rem)" }}
              >
                Request a<br />
                <em className="not-italic text-[#ffffff]">Callback</em>
              </h2>
            </ContainerAnimated>

            <ContainerAnimated>
              <p className="text-white/45 text-sm leading-relaxed mb-10 max-w-sm">
                Leave your details and our team will reach out to discuss your
                vision — from the first sketch to the final build.
              </p>
            </ContainerAnimated>

            {/* Form or success state */}
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-start gap-4 p-6 rounded-xl border border-[#222A35]/30 bg-[#222A35]/5"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#222A35] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white text-sm font-medium mb-1">
                      Thank you, {formData.name || "there"}.
                    </p>
                    <p className="text-white/50 text-xs leading-relaxed">
                      We'll be in touch shortly to discuss your project.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <ContainerAnimated>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      {/* Name */}
                      <div>
                        <label className="block text-[10px] tracking-[0.25em] uppercase text-white/35 mb-2 font-medium">
                          Your Name
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onFocus={() => setFocused("name")}
                            onBlur={() => setFocused(null)}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                name: e.target.value,
                              }))
                            }
                            className="w-full bg-white/[0.04] border rounded-lg px-4 py-3.5 text-white text-sm placeholder:text-white/20 focus:outline-none transition-all duration-300"
                            style={{
                              borderColor:
                                focused === "name"
                                  ? "rgba(34,42,53,0.6)"
                                  : "rgba(255,255,255,0.08)",
                              boxShadow:
                                focused === "name"
                                  ? "0 0 0 3px rgba(34,42,53,0.08)"
                                  : "none",
                            }}
                            placeholder="Rajiv Sharma"
                          />
                        </div>
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-[10px] tracking-[0.25em] uppercase text-white/35 mb-2 font-medium">
                          Phone
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onFocus={() => setFocused("phone")}
                          onBlur={() => setFocused(null)}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              phone: e.target.value,
                            }))
                          }
                          className="w-full bg-white/[0.04] border rounded-lg px-4 py-3.5 text-white text-sm placeholder:text-white/20 focus:outline-none transition-all duration-300"
                          style={{
                            borderColor:
                              focused === "phone"
                                ? "rgba(34,42,53,0.6)"
                                : "rgba(255,255,255,0.08)",
                            boxShadow:
                              focused === "phone"
                                ? "0 0 0 3px rgba(34,42,53,0.08)"
                                : "none",
                          }}
                          placeholder="+91 98765 43210"
                        />
                      </div>

                      {/* Consent checkbox */}
                      <label className="flex items-start gap-3 cursor-pointer group/check mt-2">
                        <div
                          className="relative mt-0.5 flex-shrink-0 w-4 h-4 rounded border transition-all duration-200 flex items-center justify-center"
                          style={{
                            background: formData.accepted
                              ? "#222A35"
                              : "transparent",
                            borderColor: formData.accepted
                              ? "#222A35"
                              : "rgba(255,255,255,0.2)",
                          }}
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              accepted: !prev.accepted,
                            }))
                          }
                        >
                          <AnimatePresence>
                            {formData.accepted && (
                              <motion.svg
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
                                transition={{ duration: 0.15 }}
                                className="w-2.5 h-2.5 text-white"
                                viewBox="0 0 10 8"
                                fill="none"
                              >
                                <path
                                  d="M1 4L3.5 6.5L9 1"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </motion.svg>
                            )}
                          </AnimatePresence>
                        </div>
                        <input
                          type="checkbox"
                          required
                          className="sr-only"
                          checked={formData.accepted}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              accepted: e.target.checked,
                            }))
                          }
                        />
                        <span className="text-xs text-white/35 leading-relaxed group-hover/check:text-white/55 transition-colors duration-200 select-none">
                          I Accept the terms for Processing Personal Data
                        </span>
                      </label>

                      <div className="pt-2">
                        <Button
                          type="submit"
                          size="lg"
                          className="flex items-center gap-2 bg-[#222A35] hover:bg-[#7a6640] text-white font-light tracking-wide"
                        >
                          Request Callback
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </form>
                  </ContainerAnimated>
                </motion.div>
              )}
            </AnimatePresence>
          </ContainerStagger>

          {/* ── Right: gallery ────────────────────────────────── */}
          <div className="hidden lg:block">
            <GalleryGrid>
              {IMAGES.map((url, i) => (
                <GalleryGridCell key={i} index={i}>
                  <img
                    src={url}
                    alt=""
                    className="size-full object-cover object-center transition-transform duration-700 hover:scale-105"
                  />
                  {/* Subtle tint overlay */}
                  <div className="absolute inset-0 bg-[#222A35]/10 mix-blend-multiply pointer-events-none" />
                </GalleryGridCell>
              ))}
            </GalleryGrid>
          </div>
        </div>
      </div>
    </section>
  );
}
