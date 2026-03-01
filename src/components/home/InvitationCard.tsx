"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SymbolicMotif } from "../ui/SymbolicMotif";
import { Reveal, Floating, GlowPulse } from "../ui/MotionWrapper";
import { IslamicPattern } from "../ui/IslamicPattern";
import { ChevronRight, ChevronLeft, MapPin, Calendar } from "lucide-react";

const invitationPages = [
    {
        id: "intro",
        type: "welcome",
        title: "Decree of Union",
        subtitle: "Whispers of a celebration untold"
    },
    {
        id: "invitation",
        type: "main",
    },
    {
        id: "lineage",
        type: "lineage",
    },
    {
        id: "itinerary",
        type: "itinerary",
    }
];

export const InvitationCard = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [page, setPage] = useState(0);

    const nextPage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setPage((prev) => (prev + 1) % invitationPages.length);
    };

    const prevPage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setPage((prev) => (prev - 1 + invitationPages.length) % invitationPages.length);
    };

    return (
        <section className="py-32 px-6 bg-wedding-ivory silk-texture overflow-hidden flex flex-col items-center">
            <Reveal className="max-w-4xl mx-auto text-center mb-20">
                <span className="font-cinzel text-wedding-gold-text text-xs tracking-[0.4em] uppercase mb-4 block font-bold">The Sacred Summons</span>
                <h2 className="font-playfair text-5xl md:text-7xl text-wedding-emerald mb-6">Ceremonial Decree</h2>
                <div className="flex items-center justify-center gap-4">
                    <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-wedding-gold-text" />
                    <p className="font-cormorant text-2xl italic text-wedding-gold-text font-medium">Behold the journey of two hearts</p>
                    <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-wedding-gold-text" />
                </div>
            </Reveal>

            <div className="relative flex justify-center items-center w-full max-w-4xl min-h-[500px]" style={{ perspective: "2000px" }}>
                {/* Particle Glow Background when open */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1.5 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 z-0 pointer-events-none"
                        >
                            <SymbolicMotif type="sparkle" />
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.div
                    className={`${isOpen ? 'fixed inset-0 z-[100] p-4 md:p-0 flex items-center justify-center bg-black/60 backdrop-blur-sm' : 'relative w-full aspect-[4/5] md:aspect-[7/5] max-w-[320px] md:max-w-none md:w-[700px] md:h-[500px]'} cursor-pointer`}
                    onClick={() => { if (!isOpen) setIsOpen(true); }}
                >
                    {/* Envelope Back - hide when full screen mobile */}
                    {!isOpen && (
                        <div className="absolute inset-0 bg-wedding-maroon rounded-2xl shadow-[0_20px_50px_rgba(76,5,25,0.4)] overflow-hidden border border-wedding-gold/30">
                            <div className="absolute inset-0 islamic-pattern opacity-20" />
                            <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/40" />
                        </div>
                    )}

                    {/* Invitation Card Inserts */}
                    <AnimatePresence mode="wait">
                        {isOpen && (
                            <motion.div
                                key={page}
                                initial={{ y: 300, scale: 0.9, rotateX: 20, zIndex: 20 }}
                                animate={{
                                    y: isOpen ? 0 : -120,
                                    scale: 1,
                                    rotateX: 0,
                                    zIndex: 50,
                                    width: "100%",
                                    height: "100%",
                                    maxWidth: isOpen ? (window.innerWidth < 768 ? "100%" : "700px") : "700px",
                                    maxHeight: isOpen ? (window.innerWidth < 768 ? "100%" : "500px") : "500px"
                                }}
                                exit={{ y: -500, opacity: 0, scale: 0.8, transition: { duration: 0.4 } }}
                                transition={{ type: "spring", damping: 20, stiffness: 100 }}
                                className={`relative ${isOpen ? 'm-0' : 'absolute inset-x-2 md:inset-x-8 top-10 bottom-10'} bg-[#fffdfa] rounded-xl shadow-[0_40px_80px_rgba(0,0,0,0.4)] p-6 md:p-12 border border-wedding-gold/40 flex flex-col items-center text-wedding-emerald glass-white overflow-hidden group/card`}
                            >
                                <div className="absolute inset-0 silk-texture pointer-events-none opacity-40" />
                                <div className="absolute inset-6 border border-wedding-gold/10 pointer-events-none" />

                                {/* Page Navigation Controls */}
                                <div className="absolute inset-y-0 left-2 right-2 flex items-center justify-between z-50 pointer-events-none">
                                    <button
                                        onClick={prevPage}
                                        className="w-10 h-10 rounded-full bg-wedding-gold/10 hover:bg-wedding-gold text-wedding-gold-text hover:text-wedding-emerald transition-all flex items-center justify-center pointer-events-auto shadow-lg"
                                    >
                                        <ChevronLeft size={20} />
                                    </button>
                                    <button
                                        onClick={nextPage}
                                        className="w-10 h-10 rounded-full bg-wedding-gold/10 hover:bg-wedding-gold text-wedding-gold-text hover:text-wedding-emerald transition-all flex items-center justify-center pointer-events-auto shadow-lg"
                                    >
                                        <ChevronRight size={20} />
                                    </button>
                                </div>

                                {/* Content Rendering */}
                                <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center">
                                    {invitationPages[page].type === "main" && (
                                        <div className="flex flex-col items-center justify-center h-full w-full py-4">
                                            <Floating duration={4}>
                                                <span className="text-wedding-gold-text text-xl md:text-2xl font-amiri mb-2 md:mb-4 block font-bold">بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ</span>
                                            </Floating>
                                            <h3 className="font-playfair text-4xl md:text-6xl mb-4 md:mb-6 text-wedding-emerald tracking-tight drop-shadow-sm font-bold leading-tight">
                                                Zainab <span className="font-cormorant italic text-wedding-gold-text">&</span> Ahmed
                                            </h3>
                                            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-wedding-gold/40 to-transparent mb-6 md:mb-8" />
                                            <p className="font-cormorant text-xl md:text-2xl mb-6 md:mb-8 text-wedding-emerald italic max-w-sm font-medium leading-normal px-2">
                                                With hearts full of joy, we request the honor of your presence as we pledge our legacies.
                                            </p>
                                            <div className="flex flex-col items-center gap-1 md:gap-2">
                                                <span className="font-cinzel text-[10px] md:text-xs tracking-[0.3em] text-wedding-gold-text uppercase font-bold">May 10th - 18th, 2026</span>
                                                <span className="font-cinzel text-[10px] md:text-xs tracking-[0.3em] text-wedding-gold-text uppercase font-bold">Dhaka • Bangladesh</span>
                                            </div>
                                        </div>
                                    )}

                                    {invitationPages[page].type === "lineage" && (
                                        <div className="space-y-10 w-full max-w-lg">
                                            <span className="font-cinzel text-[10px] tracking-[0.4em] text-wedding-gold-text uppercase font-bold">The Family Legacy</span>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                                <div className="space-y-4">
                                                    <h4 className="font-playfair text-3xl text-wedding-emerald font-bold border-b border-wedding-gold/20 pb-2">The Bride</h4>
                                                    <p className="font-cinzel text-[9px] text-wedding-gold-text tracking-widest uppercase mb-1">Daughter of</p>
                                                    <p className="font-cormorant text-base md:text-xl font-bold">Mr. Abul Bashar <br /> & Selina Begum</p>
                                                    <p className="font-cinzel text-[8px] text-wedding-gold-text/50 tracking-widest uppercase mt-4">Grand-daughter of</p>
                                                    <p className="font-cormorant text-xs md:text-sm italic">Late Haji Abdul Karim <br /> & Late Mariam Khatun</p>
                                                </div>
                                                <div className="space-y-4">
                                                    <h4 className="font-playfair text-3xl text-wedding-emerald font-bold border-b border-wedding-gold/20 pb-2">The Groom</h4>
                                                    <p className="font-cinzel text-[9px] text-wedding-gold-text tracking-widest uppercase mb-1">Son of</p>
                                                    <p className="font-cormorant text-base md:text-xl font-bold">Mr. Mahbubur Rahman <br /> & Farida Akter</p>
                                                    <p className="font-cinzel text-[8px] text-wedding-gold-text/50 tracking-widest uppercase mt-4">Grand-son of</p>
                                                    <p className="font-cormorant text-xs md:text-sm italic">Mr. Shamsuddin Ahmed <br /> & Mrs. Razia Khatun</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {invitationPages[page].type === "itinerary" && (
                                        <div className="w-full max-w-xl h-full flex flex-col">
                                            <span className="font-cinzel text-[10px] tracking-[0.4em] text-wedding-gold-text uppercase font-bold mb-8">Timeline of Union</span>
                                            <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar space-y-6 text-left">
                                                {[
                                                    { name: "The Golden Dawn (Holud)", date: "May 10", time: "6:00 PM", icon: "✧" },
                                                    { name: "Weaver's Hand (Mehndi)", date: "May 11", time: "7:00 PM", icon: "◈" },
                                                    { name: "Sacred Covenant (Nikah)", date: "May 15", time: "11:00 AM", icon: "☾" },
                                                    { name: "The Silk River (Biye)", date: "May 16", time: "7:00 PM", icon: "❀" },
                                                    { name: "Starlit Garden (Walima)", date: "May 18", time: "7:00 PM", icon: "★" }
                                                ].map((item, i) => (
                                                    <div key={i} className="group flex items-center gap-6 p-4 rounded-xl border border-transparent hover:border-wedding-gold/20 hover:bg-wedding-gold/5 transition-all">
                                                        <div className="w-10 h-10 rounded-full bg-wedding-emerald text-wedding-gold flex items-center justify-center font-bold shadow-md">
                                                            {item.icon}
                                                        </div>
                                                        <div className="flex-1">
                                                            <h5 className="font-cinzel text-xs font-bold tracking-widest uppercase">{item.name}</h5>
                                                            <div className="flex gap-4 mt-1 opacity-60">
                                                                <span className="flex items-center gap-1 text-[10px]"><Calendar size={10} /> {item.date}</span>
                                                                <span className="flex items-center gap-1 text-[10px]"><MapPin size={10} /> {item.time}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {invitationPages[page].type === "welcome" && (
                                        <div className="space-y-6">
                                            <Floating duration={5}>
                                                <div className="text-6xl text-wedding-gold-text mb-4">📜</div>
                                            </Floating>
                                            <h3 className="font-playfair text-5xl md:text-7xl mb-4 font-bold">{invitationPages[page].title}</h3>
                                            <p className="font-cormorant text-2xl italic text-wedding-gold-text font-medium">{invitationPages[page].subtitle}</p>
                                            <div className="pt-8">
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    onClick={nextPage}
                                                    className="px-10 py-3 bg-wedding-emerald text-wedding-ivory rounded-full font-cinzel text-xs tracking-widest font-bold shadow-xl"
                                                >
                                                    Unfold the Story
                                                </motion.button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Envelope Flap */}
                    <motion.div
                        initial={false}
                        animate={{
                            rotateX: isOpen ? 180 : 0,
                            zIndex: isOpen ? 5 : 30,
                            filter: isOpen ? "brightness(0.7)" : "brightness(1)"
                        }}
                        transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
                        className="absolute top-0 inset-x-0 h-1/2 bg-wedding-maroon rounded-t-2xl border-x-2 border-t-2 border-wedding-gold/40 origin-bottom"
                        style={{
                            clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                        }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent" />
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-wedding-gold opacity-50">
                            <div className="w-8 h-8 rounded-full border border-wedding-gold/30 flex items-center justify-center">
                                <span className="text-[10px]">✧</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Envelope Front (Lower part) - hide when full screen mobile */}
                    {!isOpen && (
                        <div className="absolute bottom-0 inset-x-0 h-1/2 bg-wedding-maroon rounded-b-2xl border-x-2 border-b-2 border-wedding-gold/40 z-25 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                            <IslamicPattern />
                        </div>
                    )}

                    {/* Interaction Hint */}
                    <AnimatePresence>
                        {!isOpen && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 z-40 bg-black/10 flex items-center justify-center pointer-events-none rounded-2xl"
                            >
                                <GlowPulse>
                                    <div className="bg-wedding-gold text-wedding-emerald px-6 py-2 rounded-full font-cinzel text-sm tracking-widest shadow-xl">
                                        Open Invitation
                                    </div>
                                </GlowPulse>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>

            {isOpen && (
                <Reveal delay={0.5} className="mt-12">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="font-cinzel text-[10px] tracking-widest text-wedding-gold-text/40 hover:text-wedding-gold-text transition-colors uppercase underline underline-offset-8"
                    >
                        Close the Scroll
                    </button>
                </Reveal>
            )}
        </section>
    );
};
