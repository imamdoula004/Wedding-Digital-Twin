"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp, getDoc, doc } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal, Floating, GlowPulse } from "../ui/MotionWrapper";
import { SymbolicMotif } from "../ui/SymbolicMotif";

const wishTags = ["Send Now", "Anniversary", "First Child", "5 Years Later", "Forever Together"];

export const LeaveWishes = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [tagType, setTagType] = useState(wishTags[0]);
    const [weddingDate, setWeddingDate] = useState<Date | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [sealing, setSealing] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const fetchSettings = async () => {
            const settingsDoc = await getDoc(doc(db, "settings", "main"));
            if (settingsDoc.exists() && settingsDoc.data().weddingDate) {
                setWeddingDate(new Date(settingsDoc.data().weddingDate));
            }
        };
        fetchSettings();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            let revealDate: Date | null = null;
            const now = new Date();
            const refDate = weddingDate || now;

            if (tagType === "Anniversary") {
                revealDate = new Date(refDate);
                revealDate.setFullYear(refDate.getFullYear() + 1);
            } else if (tagType === "5 Years Later") {
                revealDate = new Date(refDate);
                revealDate.setFullYear(refDate.getFullYear() + 5);
            } else if (tagType === "First Child") {
                // Approximate for a "Time Capsule" feel if no specific date
                revealDate = new Date(refDate);
                revealDate.setFullYear(refDate.getFullYear() + 2);
            } else if (tagType === "Forever Together") {
                revealDate = new Date(refDate);
                revealDate.setFullYear(refDate.getFullYear() + 10);
            } else {
                // "Send Now" or Default
                revealDate = now;
            }

            await addDoc(collection(db, "wishes"), {
                name,
                email,
                message,
                tagType,
                revealDate,
                createdAt: serverTimestamp(),
            });

            setSealing(true);
            // Delay success to allow "sealing" animation feel
            setTimeout(() => {
                setSuccess(true);
                setSealing(false);
            }, 2500);
        } catch (error) {
            console.error("Error leaving wish:", error);
            alert("Failed to send wish. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    if (sealing) {
        return (
            <div className="relative text-center p-20 glass-maroon rounded-[2.5rem] border border-wedding-gold/30 shadow-2xl overflow-hidden min-h-[400px] flex flex-col items-center justify-center">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="relative w-48 h-32 bg-wedding-gold/10 border-2 border-wedding-gold/30 rounded-lg flex items-center justify-center"
                >
                    {/* Envelope Top Flap */}
                    <motion.div
                        initial={{ rotateX: 0 }}
                        animate={{ rotateX: 180 }}
                        transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
                        style={{ transformOrigin: "top", perspective: "1000px" }}
                        className="absolute top-0 inset-x-0 h-16 bg-wedding-gold/20 border-b border-wedding-gold/30 rounded-t-lg z-20"
                    />

                    {/* Letter sliding in */}
                    <motion.div
                        initial={{ y: 0 }}
                        animate={{ y: 20, opacity: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="w-40 h-24 bg-wedding-ivory/90 rounded shadow-lg z-10"
                    />

                    <SymbolicMotif type="geometric" />
                </motion.div>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="mt-8 font-cinzel text-wedding-gold tracking-widest text-sm"
                >
                    SEALING YOUR DUA...
                </motion.p>
            </div>
        );
    }

    if (success) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative text-center p-12 glass-maroon rounded-[2.5rem] border border-wedding-gold/30 shadow-2xl overflow-hidden"
            >
                <div className="absolute inset-0 z-0">
                    <SymbolicMotif type="sparkle" />
                </div>

                <div className="relative z-10 flex flex-col items-center">
                    <motion.div
                        initial={{ scale: 2, opacity: 0, rotate: -20 }}
                        animate={{ scale: 1, opacity: 1, rotate: 0 }}
                        transition={{ duration: 0.5, type: "spring" }}
                        className="w-24 h-24 mb-6 rounded-full border-4 border-wedding-gold flex items-center justify-center bg-wedding-gold/10"
                    >
                        <span className="font-cinzel text-wedding-gold font-bold">SEALED</span>
                    </motion.div>

                    <h2 className="font-playfair text-4xl text-wedding-gold mb-4 drop-shadow-md">Your Dua has been Sealed</h2>
                    <p className="font-cormorant text-2xl text-wedding-ivory italic max-w-md mx-auto opacity-100 drop-shadow-sm">
                        Your words have been placed into our digital time capsule,
                        to be opened and cherished on our {tagType}.
                    </p>

                    <motion.button
                        onClick={() => setSuccess(false)}
                        className="mt-10 font-cinzel text-xs tracking-widest text-wedding-gold/50 hover:text-wedding-gold transition-colors underline underline-offset-8"
                    >
                        Leave another whisper
                    </motion.button>
                </div>
            </motion.div>
        );
    }

    return (
        <section className="py-20 relative">
            <Reveal className="max-w-4xl mx-auto glass-maroon p-10 md:p-16 rounded-[3rem] border border-wedding-gold/30 shadow-[0_30px_60px_rgba(0,0,0,0.4)] relative overflow-hidden">
                <div className="absolute inset-0 islamic-pattern opacity-10 pointer-events-none" />
                <div className="absolute top-0 right-0 w-64 h-64 bg-wedding-gold/5 blur-[80px] pointer-events-none" />

                <div className="relative z-10 text-center mb-16">
                    <span className="font-cinzel text-wedding-gold text-xs tracking-[0.4em] uppercase mb-4 block font-bold">The Time Capsule</span>
                    <h2 className="font-playfair text-5xl md:text-6xl text-wedding-gold mb-6 drop-shadow-lg">Ceremonial Wishes</h2>
                    <p className="font-cormorant text-2xl text-wedding-ivory italic opacity-100 drop-shadow-sm">
                        Leave a fragment of your heart to be read in the seasons to come.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="relative z-10 space-y-10">
                    <div className="space-y-3">
                        <label className="font-cinzel text-wedding-gold text-[10px] tracking-[0.3em] uppercase ml-1 font-bold">Guest Name</label>
                        <input
                            required
                            type="text"
                            className="w-full bg-black/20 border border-wedding-gold/20 rounded-2xl p-5 text-wedding-ivory font-cormorant text-xl focus:border-wedding-gold/60 outline-none transition-all focus:bg-black/40"
                            placeholder="Your name..."
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="space-y-3">
                        <label className="font-cinzel text-wedding-gold text-[10px] tracking-[0.3em] uppercase ml-1 font-bold">Email (Optional)</label>
                        <input
                            type="email"
                            className="w-full bg-black/20 border border-wedding-gold/20 rounded-2xl p-5 text-wedding-ivory font-cormorant text-xl focus:border-wedding-gold/60 outline-none transition-all focus:bg-black/40"
                            placeholder="email@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="space-y-3">
                        <label className="font-cinzel text-wedding-gold text-[10px] tracking-[0.3em] uppercase ml-1 font-bold">Moment to Open</label>
                        <div className="relative">
                            <select
                                className="w-full bg-black/20 border border-wedding-gold/20 rounded-2xl p-5 text-wedding-ivory font-cormorant text-xl focus:border-wedding-gold/60 outline-none transition-all appearance-none cursor-pointer focus:bg-black/40"
                                value={tagType}
                                onChange={(e) => setTagType(e.target.value)}
                            >
                                {wishTags.map(t => (
                                    <option key={t} value={t} className="bg-wedding-maroon text-wedding-ivory">{t}</option>
                                ))}
                            </select>
                            <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-wedding-gold/30">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="font-cinzel text-wedding-gold text-[10px] tracking-[0.3em] uppercase ml-1 font-bold">Heartfelt Message</label>
                        <textarea
                            required
                            className="w-full bg-black/20 border border-wedding-gold/20 rounded-3xl p-6 text-wedding-ivory font-cormorant text-xl focus:border-wedding-gold/60 outline-none transition-all h-48 focus:bg-black/40"
                            placeholder="Write your wishes here..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                    </div>

                    <div className="flex justify-center pt-6">
                        <GlowPulse>
                            <motion.button
                                disabled={submitting}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="relative group px-16 py-6 bg-wedding-gold text-wedding-emerald rounded-full font-cinzel text-xl tracking-[0.1em] font-bold disabled:opacity-50 transition-all shadow-2xl overflow-hidden"
                            >
                                <span className="absolute inset-0 bg-wedding-ivory/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                                <span className="relative">{submitting ? "Sealing Message..." : "Seal Our Dua"}</span>
                            </motion.button>
                        </GlowPulse>
                    </div>
                </form>
            </Reveal>
        </section>
    );
};
