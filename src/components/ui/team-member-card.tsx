import { motion } from "framer-motion";
import { cn } from "../../lib/utils";
import img from "../../../public/img1.png";

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
  jobPosition = "Principal Architect",
  firstName = "Arun",
  lastName = "Sharma",
  imageUrl = img,
  description = "With over 25 years of practice, Ar. Arun Sharma leads every project with an unwavering commitment to craft, context, and the human experience of space.",
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
        <p
          className={cn(
            "mb-4 text-xs font-medium tracking-[0.3em] text-[#222A35] uppercase",
            isRight && "md:text-right",
          )}
        >
          {jobPosition}
        </p>
      </motion.div>

      {/*
        Mobile:  flex-col  → portrait on top, info stacked below
        Desktop: flex-row  → original overlap layout (portrait + info side-by-side)
        isRight: portrait pushed last via md:order-1 (same as original order-1)
      */}
      <div
        className={cn(
          "flex flex-col",
          "md:flex-row md:items-center md:justify-end",
        )}
      >
        {/* ── Portrait ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "relative overflow-hidden rounded-sm",
            "h-[260px] w-full", // mobile
            "md:h-[500px] md:w-[22.5rem] md:shrink-0", // desktop
            isRight && "md:order-1",
          )}
        >
          <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          <img
            src={imageUrl}
            alt={fullName}
            className="h-full w-full object-cover object-top transition-transform duration-500 hover:scale-105"
          />
        </motion.div>

        {/* ── Info block ───────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "relative z-[2] flex flex-col",
            "gap-6 mt-6 w-full", // mobile
            "md:mt-0 md:-left-8 md:w-[calc(100%-350px)] md:gap-14", // desktop
            isRight && "md:left-8 md:items-end",
          )}
        >
          {/* Display name */}
          <div className={cn("flex flex-col gap-1 md:items-center")}>
            <p className="text-3xl md:text-5xl leading-[1.1] font-extralight tracking-tight text-[#222A35] ">
              {firstName} {lastName}
              <br />
            </p>
          </div>

          <div
            className={cn("flex gap-6 md:gap-8", isRight && "md:justify-end")}
          >
            {/* Bio */}
            <div className="flex-1 md:flex-none md:w-[80%] md:ml-auto">
              <p
                className={cn(
                  "text-lg leading-[2] text-[#222A35]/60",
                  isRight && "md:text-right",
                )}
              >
                {description}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
