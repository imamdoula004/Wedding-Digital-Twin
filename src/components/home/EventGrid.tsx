"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { events, EventConfig } from "@/config/events";
import { Reveal, Floating } from "../ui/MotionWrapper";
import { SymbolicMotif } from "../ui/SymbolicMotif";

export const EventCard = ({ event, index }: { event: EventConfig; index: number }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 50 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                        duration: 0.8,
                        ease: [0.22, 1, 0.36, 1]
                    }
                }
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateY,
                rotateX,
                transformStyle: "preserve-3d",
            }}
            whileHover={{ scale: 1.02 }}
            className="relative h-[400px] w-full rounded-3xl cursor-pointer group"
        >
            <Link href={`/event/${event.slug}`} className="w-full h-full block">
                <div
                    className={`absolute inset-0 rounded-3xl border border-wedding-gold/20 overflow-hidden shadow-2xl transition-all duration-500 group-hover:border-wedding-gold/50 ${event.theme.primary}`}
                    style={{ transform: "translateZ(50px)" }}
                >
                    <SymbolicMotif type={event.theme.pattern} />

                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 gold-shimmer opacity-0 group-hover:opacity-100 transition-opacity" />

                    {/* Content */}
                    <div className="absolute inset-x-0 bottom-0 p-8 z-20 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
                        <span className="font-cinzel text-wedding-gold text-xs tracking-widest uppercase mb-2 block font-bold drop-shadow-[0_0_8px_rgba(249,214,72,0.3)]">
                            {event.allegory.themeName}
                        </span>
                        <h3 className="font-playfair text-3xl md:text-4xl text-wedding-ivory mb-2 group-hover:text-wedding-gold transition-colors drop-shadow-md">
                            {event.name}
                        </h3>
                        <p className="font-cormorant text-wedding-ivory text-xl italic line-clamp-2 opacity-90 drop-shadow-sm">
                            {event.allegory.story}
                        </p>
                    </div>

                    {/* Decoration */}
                    <div className="absolute top-6 right-6 w-10 h-10 rounded-full border border-wedding-gold/30 flex items-center justify-center text-wedding-gold group-hover:bg-wedding-gold group-hover:text-wedding-emerald transition-all duration-500">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14m-7-7 7 7-7 7" />
                        </svg>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export const EventGrid = () => {
    return (
        <section className="py-32 px-6 relative bg-wedding-emerald overflow-hidden">
            <div className="absolute inset-0 islamic-pattern opacity-5" />

            <div className="max-w-7xl mx-auto relative z-10">
                <Reveal className="text-center mb-20">
                    <h2 className="font-cinzel text-5xl md:text-7xl text-wedding-gold mb-6 tracking-tight drop-shadow-lg">The Universe of Events</h2>
                    <div className="flex items-center justify-center gap-4">
                        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-wedding-gold opacity-60" />
                        <span className="font-cormorant text-wedding-ivory italic text-xl drop-shadow-md font-medium">Allegories of Love</span>
                        <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-wedding-gold opacity-60" />
                    </div>
                </Reveal>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={{
                        visible: {
                            transition: {
                                staggerChildren: 0.15,
                                delayChildren: 0.2
                            }
                        }
                    }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
                >
                    {events.map((event, i) => (
                        <EventCard key={event.id} event={event} index={i} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
};
