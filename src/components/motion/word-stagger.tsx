"use client";

import { motion, useReducedMotion } from "motion/react";

const EDITORIAL_EASE = [0.22, 1, 0.36, 1] as const;

type WordStaggerProps = {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p";
};

export function WordStagger({
  text,
  className,
  delay = 0,
  as = "h1",
}: WordStaggerProps) {
  const reduce = useReducedMotion();
  const Tag = motion[as] as typeof motion.h1;
  const words = text.split(" ");

  return (
    <Tag
      className={className}
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: reduce ? 0 : 0.06, delayChildren: delay },
        },
      }}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-baseline">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: reduce ? 0 : "100%", opacity: reduce ? 1 : 0 },
              show: {
                y: 0,
                opacity: 1,
                transition: { duration: reduce ? 0 : 0.7, ease: EDITORIAL_EASE },
              },
            }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
