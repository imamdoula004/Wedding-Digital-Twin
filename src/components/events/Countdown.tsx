"use client";

import { useEffect, useState } from "react";
import { intervalToDuration, isPast, type Duration } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";

export const Countdown = ({ targetDate }: { targetDate: Date }) => {
    const [duration, setDuration] = useState<Duration | null>(null);
    const [isEventPast, setIsEventPast] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            if (isPast(targetDate)) {
                setIsEventPast(true);
                clearInterval(timer);
            } else {
                setDuration(intervalToDuration({
                    start: new Date(),
                    end: targetDate,
                }));
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    if (isEventPast) {
        return (
            <div className="text-center py-4 px-8 bg-wedding-gold/20 rounded-lg border border-wedding-gold/30">
                <p className="font-cinzel text-xl text-wedding-gold animate-gold-glow">The Celebration has Begun!</p>
            </div>
        );
    }

    return (
        <div className="flex gap-4 md:gap-8 justify-center items-center">
            {['days', 'hours', 'minutes', 'seconds'].map((unit) => (
                <motion.div
                    key={unit}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center"
                >
                    <motion.div
                        animate={{
                            boxShadow: ["0 0 15px rgba(249, 214, 72, 0.2)", "0 0 30px rgba(249, 214, 72, 0.6)", "0 0 15px rgba(249, 214, 72, 0.2)"]
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-wedding-emerald text-wedding-gold rounded-xl border border-wedding-gold/40 shadow-xl mb-2 relative overflow-hidden group"
                    >
                        <motion.div
                            key={duration ? duration[unit as keyof Duration] : 0}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="text-2xl md:text-3xl font-bold z-10"
                        >
                            {duration ? (duration[unit as keyof Duration] || 0).toString().padStart(2, '0') : '00'}
                        </motion.div>
                        <div className="absolute inset-0 bg-gradient-to-tr from-wedding-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.div>
                    <span className="font-amiri text-sm md:text-base uppercase tracking-widest text-wedding-gold/80 font-bold drop-shadow-sm">
                        {unit}
                    </span>
                </motion.div>
            ))}
        </div>
    );
};
