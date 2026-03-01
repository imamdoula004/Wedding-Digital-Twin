"use client";

import { motion, AnimatePresence, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";

interface Props extends HTMLMotionProps<"div"> {
    children: ReactNode;
    delay?: number;
}

export const PageTransition = ({ children }: { children: ReactNode }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 1.02, y: -10 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
        {children}
    </motion.div>
);

export const Reveal = ({ children, delay = 0, ...props }: Props) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay, ease: "easeOut" }}
        {...props}
    >
        {children}
    </motion.div>
);

export const Floating = ({ children, duration = 4 }: { children: ReactNode; duration?: number }) => (
    <motion.div
        animate={{
            y: [0, -15, 0],
        }}
        transition={{
            duration,
            repeat: Infinity,
            ease: "easeInOut",
        }}
    >
        {children}
    </motion.div>
);

export const GlowPulse = ({ children }: { children: ReactNode }) => (
    <motion.div
        animate={{
            boxShadow: [
                "0 0 10px rgba(212, 175, 55, 0.2)",
                "0 0 30px rgba(212, 175, 55, 0.6)",
                "0 0 10px rgba(212, 175, 55, 0.2)",
            ],
        }}
        transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
        }}
        className="rounded-full"
    >
        {children}
    </motion.div>
);
