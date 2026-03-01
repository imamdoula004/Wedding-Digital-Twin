"use client";

import { motion } from "framer-motion";
import { MotifAnimator } from "./MotifAnimator";

interface Props {
    type: "golden-glow" | "paisley" | "geometric" | "floral" | "sparkle";
}

export const SymbolicMotif = ({ type }: Props) => {
    switch (type) {
        case "golden-glow":
            return (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{
                                x: Math.random() * 100 + "%",
                                y: Math.random() * 100 + "%",
                                opacity: 0,
                                scale: 0,
                            }}
                            animate={{
                                y: [null, "-100%"],
                                opacity: [0, 0.8, 0],
                                scale: [0, 1, 0.5],
                            }}
                            transition={{
                                duration: 5 + Math.random() * 5,
                                repeat: Infinity,
                                delay: Math.random() * 5,
                            }}
                            className="absolute w-1 h-1 bg-wedding-gold rounded-full blur-[1px]"
                        />
                    ))}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-wedding-gold/5 to-transparent shadow-[inset_0_0_100px_rgba(212,175,55,0.1)]" />
                </div>
            );

        case "paisley":
            return (
                <div className="absolute inset-0 opacity-25 pointer-events-none">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="w-full h-full"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0c-15 0-25 10-25 25s10 25 10 25-10 15-10 25 10 25 25 25 25-10 25-25-10-15-10-25 10-25 10-25-10-25-25-25z' fill='none' stroke='%23d4af37' stroke-width='0.5'/%3E%3C/svg%3E")`,
                            backgroundSize: "200px 200px",
                        }}
                    />
                </div>
            );

        case "geometric":
            // Redesigned as an Intricate Mandala (Girih/Floral Arabesque)
            // Avoiding any star or crescent silhouettes
            return (
                <div className="absolute inset-0 opacity-40 pointer-events-none">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
                        className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] flex items-center justify-center scale-150"
                    >
                        <MotifAnimator>
                            <svg width="1000" height="1000" viewBox="0 0 100 100" className="text-wedding-gold">
                                {/* Central Floral/Mandala Pattern */}
                                <circle cx="50" cy="50" r="8" fill="none" stroke="currentColor" strokeWidth="0.5" />
                                {[...Array(12)].map((_, i) => (
                                    <g key={i} transform={`rotate(${i * 30}, 50, 50)`}>
                                        {/* Interlocking Petals/Loops */}
                                        <path
                                            d="M50 42 C54 30, 46 30, 50 42"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="0.3"
                                        />
                                        <path
                                            d="M50 42 Q65 15, 80 42"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="0.2"
                                            strokeOpacity="0.5"
                                        />
                                        <circle cx="50" cy="25" r="3" fill="none" stroke="currentColor" strokeWidth="0.1" />
                                    </g>
                                ))}
                                {/* Outer Layers of Ornaments */}
                                <circle cx="50" cy="50" r="38" stroke="currentColor" fill="none" strokeWidth="0.1" strokeDasharray="1 2" />
                                <circle cx="50" cy="50" r="45" stroke="currentColor" fill="none" strokeWidth="0.2" />
                                <circle cx="50" cy="50" r="48" stroke="currentColor" fill="none" strokeWidth="0.05" />
                            </svg>
                        </MotifAnimator>
                    </motion.div>
                </div>
            );

        case "floral":
            return (
                <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
                    <motion.div
                        animate={{
                            backgroundPosition: ["0% 0%", "100% 100%"],
                        }}
                        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                        className="w-full h-full"
                        style={{
                            backgroundImage: `url("https://www.transparenttextures.com/patterns/floral-paper.png")`,
                            backgroundRepeat: "repeat",
                        }}
                    />
                </div>
            );

        case "sparkle":
            // Redesigned as Tiny Floating Sparkles
            return (
                <div className="absolute inset-0 pointer-events-none">
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{
                                x: Math.random() * 100 + "%",
                                y: Math.random() * 100 + "%",
                                scale: 0,
                                opacity: 0,
                            }}
                            animate={{
                                scale: [0, 1, 0],
                                opacity: [0, 0.8, 0],
                                y: [null, Math.random() * -100],
                            }}
                            transition={{
                                duration: 3 + Math.random() * 4,
                                repeat: Infinity,
                                delay: Math.random() * 5,
                            }}
                            className="absolute w-1 h-1 bg-wedding-gold rounded-full shadow-[0_0_8px_#F9D648] blur-[0.5px]"
                        />
                    ))}
                </div>
            );

        default:
            return null;
    }
};
