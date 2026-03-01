"use client";

import { motion } from "framer-motion";

export const Overview = () => {
    return (
        <section id="overview" className="relative py-24 px-6 bg-wedding-ivory text-center">
            <div className="max-w-3xl mx-auto z-10 relative">
                <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="font-cinzel text-4xl md:text-5xl text-wedding-gold mb-8"
                >
                    Welcome to Our Union
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="font-amiri text-xl md:text-2xl text-wedding-emerald leading-relaxed italic"
                >
                    <p className="mb-6">
                        In the name of Allah, the Most Gracious, the Most Merciful.
                        We are honored to have you share in the joy of our wedding,
                        a sacred milestone in our journey of love and faith.
                    </p>
                    <p>
                        This portal is a bridge to our traditions, a digital companion to our physical celebration.
                        Explore the events, share your wishes, and immerse yourself in the warmth of our union.
                    </p>
                </motion.div>

                {/* Hashtag Encouragement */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-16 p-8 rounded-3xl border border-wedding-gold/20 glass-maroon inline-block"
                >
                    <span className="font-cinzel text-xs tracking-[0.3em] text-wedding-gold block mb-4 uppercase font-bold">The Digital Record</span>
                    <h3 className="font-playfair text-3xl text-wedding-gold mb-2">#ZainabAhmed2026</h3>
                    <p className="font-cormorant text-lg text-wedding-ivory italic opacity-80">
                        Capture the magic, tag your moments, and weave your story into our shared digital tapestry.
                    </p>
                </motion.div>
            </div>

            <div className="absolute top-0 left-0 w-32 h-32 opacity-20 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-full h-full islamic-pattern rounded-full border-4 border-wedding-gold" />
            </div>
        </section>
    );
};
