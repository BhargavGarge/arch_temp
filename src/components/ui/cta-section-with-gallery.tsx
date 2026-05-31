import * as React from "react"
import type { ReactNode } from "react"
import { type Variants, motion } from "framer-motion"
import { cn } from "@/lib/utils"

// Simpler prop types that avoid motion/HTML onDrag conflict
interface ContainerProps {
  children?: ReactNode
  className?: string
}

interface GalleryGridCellProps {
  index: number
  children?: ReactNode
  className?: string
}

const filterVariants: Variants = {
  hidden: { opacity: 0, filter: "blur(10px)" },
  visible: { opacity: 1, filter: "blur(0px)" },
}

const SPRING = {
  type: "spring" as const,
  stiffness: 100,
  damping: 16,
  mass: 0.75,
}

const areaClasses = [
  "col-start-2 col-end-3 row-start-1 row-end-3",
  "col-start-1 col-end-2 row-start-2 row-end-4",
  "col-start-1 col-end-2 row-start-4 row-end-6",
  "col-start-2 col-end-3 row-start-3 row-end-5",
]

export const ContainerStagger = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ children, className }, ref) => (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ staggerChildren: 0.18, delayChildren: 0.15 }}
    >
      {children}
    </motion.div>
  )
)
ContainerStagger.displayName = "ContainerStagger"

export const ContainerAnimated = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ children, className }, ref) => (
    <motion.div
      ref={ref}
      className={className}
      variants={filterVariants}
      transition={{ ...SPRING, duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
)
ContainerAnimated.displayName = "ContainerAnimated"

export const GalleryGrid = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "grid grid-cols-2 grid-rows-[50px_150px_50px_150px_50px] gap-4",
      className
    )}
    {...props}
  />
))
GalleryGrid.displayName = "GalleryGrid"

export const GalleryGridCell = React.forwardRef<HTMLDivElement, GalleryGridCellProps>(
  ({ className, index, children }, ref) => (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.18, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "relative overflow-hidden rounded-xl shadow-2xl",
        areaClasses[index],
        className
      )}
    >
      {children}
    </motion.div>
  )
)
GalleryGridCell.displayName = "GalleryGridCell"
