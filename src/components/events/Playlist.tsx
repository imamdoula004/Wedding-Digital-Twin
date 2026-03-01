"use client";

import { motion } from "framer-motion";
import { Reveal, Floating, GlowPulse } from "../ui/MotionWrapper";
import { SiInstagram, SiSnapchat, SiFacebook } from "react-icons/si";

export const SocialLinks = ({ hashtag }: { hashtag: string }) => {
    return (
        <section className="py-20 relative">
            <div className="max-w-4xl mx-auto text-center relative z-10">
                <Reveal className="mb-16">
                    <span className="font-cinzel text-wedding-gold text-[10px] tracking-[0.4em] uppercase mb-4 block font-bold">Digital Echoes</span>
                    <h3 className="font-playfair text-3xl md:text-5xl text-wedding-gold mb-4 uppercase drop-shadow-lg break-all px-4">#{hashtag}</h3>
                    <p className="font-cormorant text-2xl text-wedding-ivory italic opacity-100 drop-shadow-sm">Join the Digital Tapestry — share your captures using our hashtag to be featured in the shared memories.</p>
                </Reveal>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                    {[
                        { name: "Instagram Filter", color: "from-purple-600 via-pink-500 to-orange-500", icon: <SiInstagram size={24} />, url: `https://www.instagram.com/explore/tags/${hashtag}` },
                        { name: "Snapchat Lens", color: "from-yellow-300 to-yellow-500 text-black", icon: <SiSnapchat size={24} />, url: "#" },
                        { name: "Facebook Frame", color: "from-blue-600 to-blue-800", icon: <SiFacebook size={24} />, url: `https://www.facebook.com/hashtag/${hashtag}` }
                    ].map((link, i) => (
                        <Reveal key={link.name} delay={i * 0.1}>
                            <motion.a
                                whileHover={{ y: -10, scale: 1.02 }}
                                href={link.url}
                                target="_blank"
                                className={`flex flex-col items-center gap-4 p-8 glass-maroon rounded-3xl border border-wedding-gold/20 group hover:border-wedding-gold/60 transition-all duration-500`}
                            >
                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-tr ${link.color} flex items-center justify-center font-cinzel font-bold text-xl shadow-lg ring-4 ring-wedding-gold/10 group-hover:ring-wedding-gold/30 transition-all`}>
                                    {link.icon}
                                </div>
                                <span className="font-cinzel text-xs tracking-widest text-wedding-gold">{link.name}</span>
                            </motion.a>
                        </Reveal>
                    ))}
                </div>

                <Reveal delay={0.4} className="mt-16">
                    <p className="font-cormorant text-xl text-wedding-ivory italic opacity-80 drop-shadow-sm">
                        Tag your captures so we may relive the magic through your eyes.
                    </p>
                </Reveal>
            </div>
        </section>
    );
};

export const Playlist = ({ spotifyUrl, eventName }: { spotifyUrl: string; eventName?: string }) => {
    return (
        <section className="py-20 relative">
            <div className="max-w-5xl mx-auto flex flex-col items-center">
                <Reveal className="text-center mb-20">
                    <span className="font-cinzel text-wedding-gold text-[10px] tracking-[0.4em] uppercase mb-4 block font-bold">The Soul&apos;s Rhythm</span>
                    <h2 className="font-playfair text-5xl md:text-6xl text-wedding-gold mb-6 uppercase drop-shadow-lg">
                        {eventName ? `${eventName}'s Playlist` : "Ceremonial Playlist"}
                    </h2>
                    <p className="font-cormorant text-2xl text-wedding-ivory italic max-w-lg mx-auto opacity-100 drop-shadow-sm">
                        Curated rhythms for the {eventName || "ceremony"}. Add your heartbeat to our story.
                    </p>
                </Reveal>

                <Reveal className="w-full flex flex-col gap-12 items-center">
                    {/* Vinyl Decoration */}
                    <div className="flex justify-center group relative">
                        <Floating duration={5}>
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                className="relative w-48 h-48 md:w-64 md:h-64 rounded-full border-[8px] border-black/40 shadow-2xl relative overflow-hidden"
                                style={{
                                    background: "radial-gradient(circle, #222 0%, #000 70%)"
                                }}
                            >
                                {/* Grooves */}
                                <div className="absolute inset-0 opacity-40" style={{
                                    backgroundImage: "repeating-radial-gradient(circle, transparent 0, transparent 4px, #333 5px)"
                                }} />

                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-wedding-maroon border-2 border-wedding-gold flex items-center justify-center text-center p-4">
                                        <span className="font-cinzel text-[6px] md:text-[8px] tracking-widest text-wedding-gold">ZAINAB & AHMED • 2026</span>
                                    </div>
                                </div>
                            </motion.div>
                        </Floating>

                        {/* Needle */}
                        <motion.div
                            initial={{ rotate: -15 }}
                            whileHover={{ rotate: 0 }}
                            className="absolute -top-4 -right-4 w-24 h-6 bg-wedding-gold/20 border border-wedding-gold/40 rounded-full origin-right"
                        />
                    </div>

                    {/* Spotify Embed */}
                    <div className="relative group w-full max-w-4xl px-4 lg:px-0">
                        <div className="absolute -inset-4 bg-gradient-to-r from-wedding-gold/30 via-wedding-maroon/20 to-wedding-gold/30 rounded-[3rem] blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
                        <div className="relative bg-black/60 rounded-[2.5rem] p-6 border border-wedding-gold/20 shadow-[0_0_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl">
                            <iframe
                                src={`https://open.spotify.com/embed/playlist/${spotifyUrl.split('/').pop()?.split('?')[0]}`}
                                width="100%"
                                height="600"
                                frameBorder="0"
                                allow="encrypted-media"
                                className="rounded-[2rem] opacity-95 hover:opacity-100 transition-opacity shadow-inner"
                            ></iframe>
                        </div>

                        <div className="mt-8 flex justify-center">
                            <div className="px-6 py-2 rounded-full border border-wedding-gold/30 gold-shimmer">
                                <p className="font-cinzel text-xs tracking-[0.3em] text-wedding-gold font-bold">Resonating through the Universe</p>
                            </div>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
};
