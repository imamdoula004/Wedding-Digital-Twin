"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { IslamicPattern } from "../ui/IslamicPattern";

export const RSVPForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        attendees: "1",
        foodPreference: "Standard",
        event: [] as string[],
        note: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState("");

    const eventOptions = [
        "Holud – Bride",
        "Holud – Groom",
        "Nikkah",
        "Biye (Wedding)",
        "Reception",
        "Mehndi Night",
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        try {
            await addDoc(collection(db, "rsvps"), {
                ...formData,
                createdAt: serverTimestamp(),
            });
            setIsSuccess(true);
        } catch (err) {
            console.error("Error adding RSVP: ", err);
            setError("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const toggleEvent = (event: string) => {
        setFormData((prev) => ({
            ...prev,
            event: prev.event.includes(event)
                ? prev.event.filter((e) => e !== event)
                : [...prev.event, event],
        }));
    };

    if (isSuccess) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center p-12 bg-wedding-emerald rounded-3xl border-2 border-wedding-gold shadow-2xl"
            >
                <div className="w-20 h-20 bg-wedding-gold rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                </div>
                <h3 className="font-cinzel text-3xl text-wedding-gold mb-4 text-center">JazakAllah Khair!</h3>
                <p className="font-amiri text-xl text-wedding-ivory italic">
                    Your RSVP has been received. We look forward to celebrating with you!
                </p>
            </motion.div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8 glass-emerald p-8 md:p-12 rounded-3xl border-2 border-wedding-gold/30 shadow-2xl relative overflow-hidden">
            <IslamicPattern />

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="font-cinzel text-wedding-gold block">Full Name</label>
                    <input
                        required
                        type="text"
                        className="w-full bg-wedding-ivory/10 border border-wedding-gold/30 rounded-lg p-3 text-wedding-ivory focus:border-wedding-gold outline-none transition-colors"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                </div>

                <div className="space-y-2">
                    <label className="font-cinzel text-wedding-gold block">Email Address</label>
                    <input
                        required
                        type="email"
                        className="w-full bg-wedding-ivory/10 border border-wedding-gold/30 rounded-lg p-3 text-wedding-ivory focus:border-wedding-gold outline-none transition-colors"
                        placeholder="email@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                </div>

                <div className="space-y-2">
                    <label className="font-cinzel text-wedding-gold block">Phone Number</label>
                    <input
                        required
                        type="tel"
                        className="w-full bg-wedding-ivory/10 border border-wedding-gold/30 rounded-lg p-3 text-wedding-ivory focus:border-wedding-gold outline-none transition-colors"
                        placeholder="+880..."
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                </div>

                <div className="space-y-2">
                    <label className="font-cinzel text-wedding-gold block">Number of Attendees</label>
                    <select
                        className="w-full bg-wedding-ivory/10 border border-wedding-gold/30 rounded-lg p-3 text-wedding-ivory focus:border-wedding-gold outline-none transition-colors"
                        value={formData.attendees}
                        onChange={(e) => setFormData({ ...formData, attendees: e.target.value })}
                    >
                        {[1, 2, 3, 4, 5].map(n => <option key={n} value={n} className="bg-wedding-emerald">{n}</option>)}
                    </select>
                </div>
            </div>

            <div className="relative z-10 space-y-4">
                <label className="font-cinzel text-wedding-gold block">Select Events You&apos;ll Attend</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {eventOptions.map((event) => (
                        <button
                            key={event}
                            type="button"
                            onClick={() => toggleEvent(event)}
                            className={`p-3 rounded-lg border font-amiri text-sm transition-all ${formData.event.includes(event)
                                ? "bg-wedding-gold text-wedding-emerald border-wedding-gold shadow-lg shadow-wedding-gold/20"
                                : "bg-wedding-ivory/5 border-wedding-gold/20 text-wedding-ivory/60 hover:border-wedding-gold/50"
                                }`}
                        >
                            {event.replace("'", "&apos;")}
                        </button>
                    ))}
                </div>
            </div>

            <div className="relative z-10 space-y-2">
                <label className="font-cinzel text-wedding-gold block">Food Preference</label>
                <div className="flex gap-4">
                    {["Standard", "Vegetarian", "No Spicy"].map(pref => (
                        <label key={pref} className="flex items-center gap-2 cursor-pointer group">
                            <input
                                type="radio"
                                name="food"
                                className="hidden"
                                checked={formData.foodPreference === pref}
                                onChange={() => setFormData({ ...formData, foodPreference: pref })}
                            />
                            <div className={`w-5 h-5 rounded-full border-2 border-wedding-gold flex items-center justify-center transition-all ${formData.foodPreference === pref ? 'bg-wedding-gold' : 'bg-transparent'}`}>
                                {formData.foodPreference === pref && <div className="w-2 h-2 bg-white rounded-full" />}
                            </div>
                            <span className="font-amiri text-wedding-ivory group-hover:text-wedding-gold transition-colors">{pref}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="relative z-10 space-y-2">
                <label className="font-cinzel text-wedding-gold block">Personal Note (Optional)</label>
                <textarea
                    className="w-full bg-wedding-ivory/10 border border-wedding-gold/30 rounded-lg p-3 text-wedding-ivory focus:border-wedding-gold outline-none transition-colors h-32"
                    placeholder="Anything else we should know?"
                    value={formData.note}
                    onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                />
            </div>

            {error && <p className="text-red-400 font-amiri italic text-center">{error}</p>}

            <div className="relative z-10 text-center pt-4">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={isSubmitting || formData.event.length === 0}
                    className="relative px-16 py-4 bg-wedding-gold text-wedding-emerald font-cinzel text-xl rounded-full disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-wedding-gold/10 flex items-center justify-center gap-3 min-w-[240px]"
                >
                    <AnimatePresence mode="wait">
                        {isSubmitting ? (
                            <motion.div
                                key="submitting"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex items-center gap-2"
                            >
                                <svg className="animate-spin h-5 w-5 text-wedding-emerald" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                <span>Sending...</span>
                            </motion.div>
                        ) : isSuccess ? (
                            <motion.div
                                key="success"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="flex items-center gap-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                                <span>Sent!</span>
                            </motion.div>
                        ) : (
                            <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                Submit RSVP
                            </motion.span>
                        )}
                    </AnimatePresence>
                </motion.button>
                {formData.event.length === 0 && (
                    <p className="text-wedding-gold/60 text-xs mt-3 font-amiri italic">Please select at least one event</p>
                )}
            </div>
        </form>
    );
};
