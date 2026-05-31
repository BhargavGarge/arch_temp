import { ArrowRight } from "lucide-react";
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
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn("relative my-16 flex flex-col justify-center", className)}
    >
      {/* Job position label */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <p
          className={cn(
            "mb-4 text-xs font-medium tracking-[0.3em] text-[#88734C] uppercase",
            isRight && "text-right",
          )}
        >
          {jobPosition}
        </p>
      </motion.div>

      <div className="flex items-center justify-end">
        {/* Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "relative h-[500px] w-[22.5rem] shrink-0 overflow-hidden rounded-sm",
            isRight && "order-1",
          )}
        >
          <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          <img
            src={imageUrl}
            alt={fullName}
            className="h-full w-full object-cover object-top transition-transform duration-500 hover:scale-105"
          />
        </motion.div>

        {/* Info block — overlaps image via negative margin */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "relative -left-8 z-[2] flex w-[calc(100%-350px)] flex-col gap-14",
            isRight && "left-8 items-end",
          )}
        >
          {/* Display name */}
          <div>
            <p className="text-5xl leading-[1.1] font-extralight tracking-tight text-[#ffffff]">
              {firstName}
              <br />
              <span className="font-normal">{lastName}</span>
            </p>
          </div>

          {/* Arrow button + bio */}
          <div className={cn("flex gap-8", isRight && "justify-end")}>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "group flex h-20 w-20 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[#88734C]/30 transition-colors duration-300 hover:border-[#88734C] hover:bg-[#88734C]",
                isRight && "order-1",
              )}
            >
              <ArrowRight
                size={22}
                className={cn(
                  "text-[#ffffff] transition-all duration-300 group-hover:-rotate-45 group-hover:text-white",
                  isRight && "rotate-180 group-hover:rotate-[225deg]",
                )}
              />
            </motion.div>

            {/* Bio */}
            <div className="w-[40%]">
              <p
                className={cn(
                  "text-sm leading-[1.8] text-[#e4e4e4]/60",
                  isRight && "text-right",
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
