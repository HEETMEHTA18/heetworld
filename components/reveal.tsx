"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  x?: number;
  className?: string;
  once?: boolean;
};

export function Reveal({
  children,
  delay = 0,
  y = 20,
  x = 0,
  className,
  once = true,
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div
      initial={{ opacity: 0, y, x, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, x: 0, filter: "blur(0px)" }}
      viewport={{ once, margin: "-64px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function RevealText({
  children,
  className,
  delay = 0,
}: {
  children: string | ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return <span className={className}>{children}</span>;

  // If children is just a string, we can stagger words for a more premium effect
  if (typeof children === "string") {
    const words = children.split(" ");
    return (
      <span className={className} style={{ display: "inline-block" }}>
        {words.map((word, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{
              duration: 0.6,
              delay: delay + i * 0.04,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ display: "inline-block", marginRight: "0.25em" }}
          >
            {word}
          </motion.span>
        ))}
      </span>
    );
  }

  return (
    <motion.span
      initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-48px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      style={{ display: "inline-block" }}
    >
      {children}
    </motion.span>
  );
}