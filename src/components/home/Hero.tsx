"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SymbolicMotif } from "../ui/SymbolicMotif";
import { Reveal, Floating, GlowPulse } from "../ui/MotionWrapper";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const Hero = ({ brideName, groomName }: { brideName: string; groomName: string }) => {
    const heroRef = useRef<HTMLDivElement>(null);
    const motifRef = useRef<HTMLDivElement>(null);
    const nameRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        if (!heroRef.current) return;

        // Parallax Motif
        gsap.to(motifRef.current, {
            yPercent: 30,
            ease: "none",
            scrollTrigger: {
                trigger: heroRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });

        // Name Fade and Scale on Scroll
        gsap.to(nameRef.current, {
            opacity: 0,
            y: -100,
            scale: 0.9,
            ease: "power2.inOut",
            scrollTrigger: {
                trigger: heroRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });
    }, []);

    const nameArray = `${brideName} & ${groomName}`.split("");

    return (
        <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden bg-wedding-emerald silk-texture">
            {/* Background Layers */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-radial-gradient from-wedding-gold/20 via-transparent to-transparent opacity-70" />
                <div ref={motifRef} className="absolute inset-0">
                    <SymbolicMotif type="geometric" />
                </div>
                <div className="absolute inset-0 islamic-pattern opacity-20" />
            </div>

            {/* Animated Bismillah Calligraphy */}
            <Reveal delay={0.2} className="z-10 mb-8 sm:mb-16 w-full max-w-[1000px] px-2 md:px-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    transition={{ duration: 2.5, ease: "easeOut" }}
                    className="relative w-full"
                >
                    <svg
                        viewBox="0 0 1200 400"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-full text-wedding-gold drop-shadow-[0_0_20px_rgba(212,175,55,0.4)] overflow-visible"
                    >
                        {/* Elegant Fallback for missing path - high-fidelity font rendering */}
                        <text
                            x="50%"
                            y="50%"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            className="font-amiri text-[120px] md:text-[180px] tracking-[0.05em] select-none"
                            fill="currentColor"
                        >
                            بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
                        </text>
                        {/* Decorative Flourish Lines */}
                        <motion.path
                            d="M150,320 Q600,350 1050,320"
                            stroke="currentColor"
                            strokeWidth="1"
                            strokeDasharray="10 10"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 0.3 }}
                            transition={{ duration: 3, delay: 1 }}
                        />
                    </svg>

                    <motion.div
                        animate={{ opacity: [0.2, 0.4, 0.2] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-wedding-gold/20 to-transparent blur-3xl -z-10"
                    />
                </motion.div>
            </Reveal>

            {/* Names with Letter Reveal */}
            <div className="z-10 w-full px-4">
                <h1 ref={nameRef} className="flex flex-col items-center justify-center font-playfair text-5xl md:text-9xl text-wedding-gold mb-6 tracking-normal drop-shadow-[0_2px_10px_rgba(212,175,55,0.3)]">
                    <span className="flex justify-center whitespace-nowrap">
                        {brideName.split("").map((char, i) => (
                            <motion.span
                                key={`bride-${i}`}
                                initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                transition={{
                                    delay: 0.8 + i * 0.05,
                                    duration: 1,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                            >
                                {char === " " ? "\u00A0" : char}
                            </motion.span>
                        ))}
                    </span>

                    <motion.span
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1.1 }}
                        transition={{ delay: 1.5, duration: 1 }}
                        className="my-4 text-wedding-gold font-cormorant font-bold italic text-4xl md:text-7xl drop-shadow-[0_0_15px_rgba(249,214,72,0.4)]"
                    >
                        &
                    </motion.span>

                    <span className="flex justify-center whitespace-nowrap">
                        {groomName.split("").map((char, i) => (
                            <motion.span
                                key={`groom-${i}`}
                                initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                transition={{
                                    delay: 2.0 + i * 0.05,
                                    duration: 1,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                            >
                                {char === " " ? "\u00A0" : char}
                            </motion.span>
                        ))}
                    </span>
                </h1>

                <Reveal delay={2} className="flex flex-col items-center">
                    {/* Decorative Divider */}
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-wedding-gold" />
                        <span className="text-wedding-gold drop-shadow-md">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2L14 5H10L12 2ZM8 5H16V19H8V5ZM7 5H17L18 7H6L7 5ZM7 19H17L18 17H6L7 19ZM10 19L12 22L14 19H10Z" />
                            </svg>
                        </span>
                        <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-wedding-gold" />
                    </div>

                    <p className="font-cormorant text-2xl md:text-4xl text-wedding-ivory font-light italic tracking-wide max-w-2xl mx-auto leading-relaxed drop-shadow-sm">
                        In the name of Love, guided by the Divine, <br />
                        <span className="text-wedding-gold font-bold brightness-125 drop-shadow-sm">two legacies</span> whispered into one journey.
                    </p>

                    <div className="mt-16">
                        <GlowPulse>
                            <motion.button
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className="relative group px-12 py-5 bg-wedding-maroon text-wedding-gold font-cinzel text-xl rounded-full transition-all overflow-hidden border border-wedding-gold/20 shadow-2xl"
                                onClick={() => {
                                    document.getElementById("overview")?.scrollIntoView({ behavior: "smooth" });
                                }}
                            >
                                <span className="absolute inset-0 bg-wedding-gold/10 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                                <span className="relative font-bold tracking-widest">Enter Our Wedding</span>
                            </motion.button>
                        </GlowPulse>
                    </div>
                </Reveal>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3, duration: 1 }}
                className="absolute bottom-10 z-10 cursor-pointer group"
                onClick={() => document.getElementById("overview")?.scrollIntoView({ behavior: "smooth" })}
            >
                <Floating duration={2}>
                    <div className="flex flex-col items-center text-wedding-gold opacity-60 group-hover:opacity-100 transition-opacity">
                        <span className="font-cinzel text-xs tracking-widest mb-2">Soul Scroll</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m6 9 6 6 6-6" />
                        </svg>
                    </div>
                </Floating>
            </motion.div>
        </section>
    );
};
