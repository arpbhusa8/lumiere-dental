"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { type ReactNode } from "react";

const EDITORIAL_EASE = [0.22, 1, 0.36, 1] as const;

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
  as?: "div" | "section" | "article" | "li" | "span";
};

export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  once = true,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();
  const Tag = motion[as] as typeof motion.div;
  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : y },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduce ? 0 : 0.8,
        ease: EDITORIAL_EASE,
        delay: reduce ? 0 : delay,
      },
    },
  };
  return (
    <Tag
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-10%" }}
      variants={variants}
      className={className}
    >
      {children}
    </Tag>
  );
}

export function Stagger({
  children,
  className,
  stagger = 0.06,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  as?: "div" | "ul" | "ol" | "section";
}) {
  const Tag = motion[as] as typeof motion.div;
  return (
    <Tag
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10%" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger } },
      }}
      className={className}
    >
      {children}
    </Tag>
  );
}

export function StaggerItem({
  children,
  className,
  y = 20,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  y?: number;
  as?: "div" | "li" | "article" | "span";
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as] as typeof motion.div;
  return (
    <Tag
      variants={{
        hidden: { opacity: 0, y: reduce ? 0 : y },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: reduce ? 0 : 0.7, ease: EDITORIAL_EASE },
        },
      }}
      className={className}
    >
      {children}
    </Tag>
  );
}
