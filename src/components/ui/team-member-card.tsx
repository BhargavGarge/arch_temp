import { motion } from "framer-motion";
import { cn } from "../../lib/utils";
// import img from "../../../public/img1.png";

interface TeamMemberCardProps {
  position?: "left" | "right";
  jobPosition?: string;
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
  description?: string;
  className?: string;
}

export default function TeamMemberCard({
  position = "left",
  jobPosition ,
  firstName, 
  lastName,
  imageUrl,
  description,
  className,
}: TeamMemberCardProps) {
  const fullName = `${firstName} ${lastName}`;
  const isRight = position === "right";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "relative my-10 md:my-16 flex flex-col justify-center",
        className,
      )}
    >
      {/* Job position label */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {/* <p
          className={cn(
            "mb-4 text-xs font-medium tracking-[0.3em] text-[#222A35] uppercase",
            isRight && "md:text-right",
          )}
        >
          {jobPosition}
        </p> */}
      </motion.div>

      {/*
        Mobile:  flex-col  → portrait on top, info stacked below
        Desktop: flex-row  → original overlap layout (portrait + info side-by-side)
        isRight: portrait pushed last via md:order-1 (same as original order-1)
      */}
    <div
  className={`grid lg:grid-cols-2 gap-14 lg:gap-20 items-center ${
    position === "right" ? "lg:[&>*:first-child]:order-2" : ""
  }`}
>
  {/* Image */}
  <div className="relative w-full flex justify-center">
  <div className="w-full max-w-[420px] aspect-[7/9] overflow-hidden">
    <img
      src={imageUrl}
      alt={`${firstName} ${lastName}`}
      className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
    />
  </div>
</div>

  {/* Content */}
  <div className="max-w-xl">
  {/* Job Position */}
  <p className="mb-3 text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.35em] text-[#8D735B]">
    {jobPosition}
  </p>

  {/* Name */}
  <h3 className="text-[2rem] sm:text-[2.5rem] lg:text-5xl font-extralight leading-[1.05] tracking-[-0.03em] text-[#222A35]">
    {firstName}
    <br />
    <span className="font-light">{lastName}</span>
  </h3>

  {/* Divider */}
  <div className="w-12 sm:w-16 h-px bg-[#8D735B] my-6 sm:my-8" />

  {/* Description */}
  <p className="text-[15px] sm:text-base lg:text-lg leading-7 sm:leading-8 lg:leading-9 text-[#222A35]/75">
    {description}
  </p>
</div>
</div>
    </motion.div>
  );
}
