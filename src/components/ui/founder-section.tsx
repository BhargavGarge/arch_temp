import { motion } from "framer-motion";
import TeamMemberCard from "@/components/ui/team-member-card";

export default function FounderSection() {
  return (
    <section
      id="founder-section"
      className="bg-white text-[#222A35] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* ── heading — matches About / Services editorial style ── */}
        <div className="pt-8 sm:pt-12 md:pt-16 pb-4 sm:pb-8">
          <motion.span
            className="block text-[10px] tracking-[0.48em] uppercase text-[#222A35]/45 mb-6"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
          >
            Leadership
          </motion.span>
          <motion.h2
            className="text-[clamp(1.8rem,5vw,3.5rem)] font-extralight tracking-[-0.025em] text-[#222A35] leading-[1.05] max-w-3xl"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.1 }}
          >
            The Visionary Behind KAD Studio
          </motion.h2>
        </div>

        <TeamMemberCard
          position="left"
          jobPosition="Principal Architect · Founder"
          firstName="Ar. Hrithvika"
          lastName="Khare"
          imageUrl="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=900&q=80"
          description="Trained with India's leading luxury firms in Delhi and Mumbai, Hrithvika founds every KAD project on one belief — spaces should be luxurious yet livable. Her work blends natural textures and warm neutrals with sustainable, modern function, always led by a client-first approach."
        />
      </div>
    </section>
  );
}
