import { motion } from "framer-motion";
import TeamMemberCard from "@/components/ui/team-member-card";

export default function FounderSection() {
  return (
  <section
  id="founder-section"
  className="bg-white py-2  pt-20 overflow-hidden"
>
  <div className="max-w-7xl mx-auto px-6 lg:px-12">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="mb-20"
    >
      <span className="block text-xs uppercase tracking-[0.45em] text-[#222A35]/45 mb-6">
        FOUNDERS
      </span>

      <h2 className="text-[clamp(2rem,5vw,4rem)] font-extralight leading-tight tracking-[-0.03em] text-[#222A35] max-w-4xl">
        Meet the Leadership Behind KAD Studio
      </h2>
    </motion.div>

    <div className="space-y-32">
      <TeamMemberCard
        position="left"
        jobPosition="Founder & Executive Director"
        firstName="Rishi Raj"
        lastName="Khare"
        imageUrl="/assets/founder1.jpeg"
        description="With over 25 years of professional experience and more than 500 completed projects, Rishi Raj Khare forms the foundation of KAD Studio. His strategic leadership, technical expertise, and operational excellence ensure every project is executed with precision, structural integrity, and enduring value. Under his guidance, the studio has delivered distinguished residential, commercial, and institutional developments across diverse scales."
      />

      <TeamMemberCard
        position="right"
        jobPosition="Co-Founder & Design Principal"
        firstName="Hrithvika"
        lastName="Khare"
        imageUrl="/assets/founder2.jpeg"
        description="Hrithvika Khare leads the architectural vision and design philosophy of KAD Studio. Having worked with some of India's leading architectural firms, she brings a refined understanding of luxury spaces, urban planning, and contemporary architecture. Her work is defined by volumetric fluidity, climate-responsive planning, and lighting strategies that create memorable spatial experiences."
      />
    </div>
    {/* Architectural Separator */}

  </div>
  <motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8 }}
  className="flex justify-center pt-20"
>
  <img
    src="/assets/architectural-separator.svg"
    alt="Architectural Divider"
    className="w-32 md:w-40 opacity-70"
  />
</motion.div>
</section>
  );
}