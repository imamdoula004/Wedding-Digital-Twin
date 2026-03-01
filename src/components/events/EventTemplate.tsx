"use client";

import { motion } from "framer-motion";
import { Countdown } from "./Countdown";
import Link from "next/link";
import { LiveCollage } from "../gallery/LiveCollage";
import { LeaveWishes } from "../wishes/LeaveWishes";
import { SocialLinks, Playlist } from "./Playlist";
import { EventConfig } from "@/config/events";
import { SymbolicMotif } from "../ui/SymbolicMotif";
import { Reveal, Floating, GlowPulse, PageTransition } from "../ui/MotionWrapper";
import { BackgroundMusic } from "../ui/BackgroundMusic";
import { SocialFilterHub } from "../ui/SocialFilterHub";
import { useSettings } from "@/lib/hooks/useSettings";

export const EventTemplate = ({ event }: { event: EventConfig }) => {
    const { settings } = useSettings();
    const isLight = event.theme.primary === "bg-[#fffbeb]" || event.id === "nikkah" || event.slug.includes("holud");
    const textColor = isLight ? "text-wedding-emerald" : "text-wedding-ivory";
    const subTextColor = isLight ? "text-wedding-gold-text" : "text-wedding-gold";

    const streamingUrl = settings.livestreamURL || event.streamingUrl;
    const spotifyUrl = settings.playlistURL || "https://open.spotify.com/playlist/37i9dQZF1DX5Ejj0EkURtP";
    const hashtag = settings.hashtag || "ZainabAhmed2026";

    // Extract hex color from class like "bg-[#f59e0b]" or use defaults
    const hexMatch = event.theme.primary.match(/\[(#[a-fA-F0-9]+)\]/);
    let bgColor = hexMatch ? hexMatch[1] : (event.theme.primary.includes('black') ? '#000000' : '#022c22');

    // Fallback for named colors
    if (!hexMatch && event.theme.primary.includes('emerald')) bgColor = '#022c22';
    if (!hexMatch && event.theme.primary.includes('maroon')) bgColor = '#4c0519';

    return (
        <PageTransition>
            <div
                className={`min-h-screen ${textColor} selection:bg-wedding-gold/30 pb-20 silk-texture relative overflow-hidden`}
                style={{ backgroundColor: `${bgColor}F2` }} // F2 is approx 95% opacity for better contrast
            >
                <SymbolicMotif type={event.theme.pattern} />
                {event.ambientMusicUrl && (
                    <BackgroundMusic url={event.ambientMusicUrl} isLight={isLight} />
                )}

                {/* Fixed Background Flourish */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-wedding-gold/5 blur-[100px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/20 blur-[100px] pointer-events-none" />

                {/* Header / Nav */}
                <nav className="relative z-50 p-6 md:p-10 flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className={`w-10 h-10 rounded-full border ${isLight ? 'border-wedding-emerald/20' : 'border-wedding-gold/30'} flex items-center justify-center group-hover:bg-wedding-gold/10 transition-colors`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={subTextColor}><path d="m15 18-6-6 6-6" /></svg>
                        </div>
                        <span className={`font-cinzel text-sm tracking-widest ${subTextColor}`}>Universe</span>
                    </Link>
                    <div className="hidden md:block">
                        <span className={`font-cinzel text-xs tracking-[0.3em] ${isLight ? 'text-wedding-emerald/40' : 'text-wedding-gold/50'} uppercase`}>Ceremonial Portal</span>
                    </div>
                </nav>

                {/* Hero Section */}
                <header className="relative z-10 max-w-5xl mx-auto pt-16 md:pt-24 px-6 text-center">
                    <Reveal>
                        <span className={`font-cinzel ${subTextColor} text-sm tracking-[0.4em] uppercase mb-4 block font-bold`}>
                            {event.allegory.themeName}
                        </span>
                        <h1 className="font-playfair text-6xl md:text-9xl mb-8 leading-tight drop-shadow-md">
                            {event.name}
                        </h1>

                        <div className="flex items-center justify-center gap-6 mb-12">
                            <div className={`w-16 h-[1px] bg-gradient-to-r from-transparent ${isLight ? 'to-wedding-emerald/20' : 'to-wedding-gold/40'}`} />
                            <span className={`${subTextColor} text-2xl drop-shadow-sm`}>✧</span>
                            <div className={`w-16 h-[1px] bg-gradient-to-l from-transparent ${isLight ? 'to-wedding-emerald/20' : 'to-wedding-gold/40'}`} />
                        </div>
                    </Reveal>

                    {/* Allegory Section */}
                    <Reveal delay={0.2} className="max-w-3xl mx-auto mb-20">
                        <p className={`font-cormorant text-3xl md:text-5xl italic leading-relaxed mb-8 ${isLight ? 'text-wedding-emerald/90' : 'text-wedding-ivory/90'} drop-shadow-sm`}>
                            &ldquo;{event.allegory.story}&rdquo;
                        </p>
                        <div className={`p-6 ${isLight ? 'bg-wedding-gold/5 border-wedding-gold/20' : 'glass-emerald border-wedding-gold/20'} rounded-2xl border inline-block`}>
                            <p className={`font-amiri text-xl ${subTextColor} italic font-medium`}>
                                {event.allegory.symbolism}
                            </p>
                        </div>
                    </Reveal>

                    {/* Countdown */}
                    <Reveal delay={0.4} className="mb-32">
                        <div className={`inline-block px-8 py-2 rounded-full border ${isLight ? 'border-wedding-emerald/10' : 'border-wedding-gold/20'} mb-8`}>
                            <span className={`font-cinzel text-xs tracking-widest ${isLight ? 'text-wedding-emerald/60' : 'text-wedding-gold/60'} uppercase font-bold`}>Countdown to Union</span>
                        </div>
                        <Countdown targetDate={new Date(event.date)} />
                    </Reveal>
                </header>

                <main className="relative z-10 max-w-6xl mx-auto px-6">
                    {/* Live Stream Section */}
                    {streamingUrl && (
                        <Reveal className="mb-32">
                            <div className={`aspect-video w-full rounded-[2.5rem] overflow-hidden shadow-2xl border ${isLight ? 'border-wedding-emerald/10' : 'border-wedding-gold/20'} ${isLight ? 'bg-white/40' : 'glass-emerald'} relative group`}>
                                <iframe
                                    src={streamingUrl.includes('youtube.com/embed') ? streamingUrl : `https://www.youtube.com/embed/${streamingUrl}`}
                                    className="w-full h-full"
                                    allowFullScreen
                                />
                            </div>
                        </Reveal>
                    )}

                    {/* Interaction Hub */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-start mb-40">
                        <Reveal className="space-y-32">
                            <LiveCollage eventId={event.id} />
                            <SocialFilterHub filters={event.filters} isLight={isLight} />
                            <SocialLinks hashtag={hashtag} />
                        </Reveal>

                        <Reveal className="space-y-32" delay={0.2}>
                            <Playlist spotifyUrl={spotifyUrl} eventName={event.name} />
                            <LeaveWishes />
                        </Reveal>
                    </div>

                    {/* Google Maps Location */}
                    {event.locationEmbedUrl && (
                        <Reveal className="mb-40">
                            <div className="text-center mb-16">
                                <span className={`font-cinzel ${subTextColor} text-xs tracking-[0.4em] uppercase mb-4 block font-bold`}>The Sacred Venue</span>
                                <h2 className="font-playfair text-4xl md:text-6xl mb-12 leading-tight">{event.location}</h2>

                                <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16 p-8 rounded-3xl border ${isLight ? 'bg-wedding-gold/5 border-wedding-gold/20' : 'glass-emerald border-wedding-gold/20'} backdrop-blur-sm shadow-xl`}>
                                    <div className="flex flex-col items-center gap-3">
                                        <span className={`font-cinzel text-[10px] tracking-[0.2em] uppercase ${isLight ? 'text-wedding-emerald/40' : 'text-wedding-gold/40'}`}>Sacred Date</span>
                                        <p className="font-playfair text-2xl font-bold">{new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                                    </div>
                                    <div className={`hidden md:block w-px h-12 ${isLight ? 'bg-wedding-emerald/10' : 'bg-wedding-gold/10'} self-center`} />
                                    <div className="flex flex-col items-center gap-3">
                                        <span className={`font-cinzel text-[10px] tracking-[0.2em] uppercase ${isLight ? 'text-wedding-emerald/40' : 'text-wedding-gold/40'}`}>Celestial Time</span>
                                        <p className="font-playfair text-2xl font-bold">{new Date(event.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
                                    </div>
                                    <div className={`hidden md:block w-px h-12 ${isLight ? 'bg-wedding-emerald/10' : 'bg-wedding-gold/10'} self-center`} />
                                    <div className="flex flex-col items-center gap-3">
                                        <span className={`font-cinzel text-[10px] tracking-[0.2em] uppercase ${isLight ? 'text-wedding-emerald/40' : 'text-wedding-gold/40'}`}>Gathering Place</span>
                                        <p className="font-playfair text-2xl font-bold truncate max-w-[200px]">{event.location.split(',')[0]}</p>
                                    </div>
                                </div>

                                {event.note && (
                                    <Reveal delay={0.2} className="max-w-3xl mx-auto mb-16">
                                        <div className="relative py-12 px-8">
                                            {/* Decorative Quotes */}
                                            <div className={`absolute top-0 left-0 text-7xl font-serif opacity-20 ${isLight ? 'text-wedding-emerald' : 'text-wedding-gold'}`}>&ldquo;</div>
                                            <div className={`absolute bottom-0 right-0 text-7xl font-serif opacity-20 ${isLight ? 'text-wedding-emerald' : 'text-wedding-gold'}`}>&rdquo;</div>

                                            <p className={`font-cormorant text-2xl md:text-3xl italic leading-relaxed ${isLight ? 'text-wedding-emerald/90' : 'text-wedding-ivory/90'}`}>
                                                {event.note}
                                            </p>
                                            <div className={`mt-6 font-cinzel text-xs tracking-[0.3em] uppercase ${isLight ? 'text-wedding-gold-text' : 'text-wedding-gold'}`}>
                                                — Zainab & Ahmed
                                            </div>
                                        </div>
                                    </Reveal>
                                )}

                                <p className={`font-cormorant text-xl ${isLight ? 'text-wedding-emerald/70' : 'text-wedding-ivory/70'} italic`}>Follow the starlight to our celebration</p>
                            </div>
                            <div className={`w-full h-[500px] rounded-[3rem] overflow-hidden shadow-2xl border ${isLight ? 'border-wedding-emerald/20' : 'border-wedding-gold/30'} glass-emerald relative`}>
                                <iframe
                                    src={event.locationEmbedUrl}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0, filter: isLight ? 'none' : 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)' }}
                                    allowFullScreen={true}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="relative z-10"
                                />
                            </div>
                        </Reveal>
                    )}

                    {/* Navigation Footer */}
                    <div className="text-center">
                        <div className={`w-px h-24 bg-gradient-to-b ${isLight ? 'from-wedding-gold-text' : 'from-wedding-gold'} to-transparent mx-auto mb-12`} />
                        <Link href="/rsvp">
                            <GlowPulse>
                                <button className={`px-16 py-6 ${isLight ? 'bg-wedding-emerald text-wedding-ivory' : 'bg-wedding-gold text-wedding-emerald'} font-cinzel text-xl rounded-full shadow-2xl hover:scale-105 transition-transform font-bold`}>
                                    RSVP to this Celebration
                                </button>
                            </GlowPulse>
                        </Link>
                    </div>
                </main>

                <footer className="mt-48 text-center pb-20">
                    <p className={`font-cinzel text-[10px] tracking-[0.5em] ${isLight ? 'text-wedding-emerald/40' : 'text-wedding-gold/40'} uppercase`}>Zainab & Ahmed • Curated Digital Remembrance</p>
                </footer>
            </div>
        </PageTransition>
    );
};
