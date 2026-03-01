"use client";

import { motion } from "framer-motion";
import { Instagram, Camera, Share2 } from "lucide-react";
import { Reveal } from "./MotionWrapper";

interface SocialFilter {
    platform: 'facebook' | 'instagram' | 'snapchat';
    name: string;
    url: string;
}

interface SocialFilterHubProps {
    filters?: SocialFilter[];
    isLight?: boolean;
}

export const SocialFilterHub = ({ filters = [], isLight = false }: SocialFilterHubProps) => {
    // Default placeholders if none provided
    const defaultFilters: SocialFilter[] = [
        { platform: 'instagram', name: 'Golden Glow', url: 'https://www.instagram.com/ar/652233...' },
        { platform: 'facebook', name: 'Wedding Aura', url: 'https://fb.com/fb-camera-effects/tryit/...' },
        { platform: 'snapchat', name: 'Floral Crown', url: 'https://www.snapchat.com/unlock/...' },
    ];

    const displayFilters = filters.length > 0 ? filters : defaultFilters;

    const handleFilterClick = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
        // On mobile, sometimes window.location works better than target="_blank" for deep links
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (isMobile && (url.includes('snapchat.com') || url.includes('instagram.com'))) {
            // No-op, let the default anchor behavior happen but we could also try window.location
            // However, many browsers block universal links if opened via JS, so a direct <a> is best.
        }
    };

    const getIcon = (platform: string) => {
        switch (platform) {
            case 'instagram': return <Instagram size={24} />;
            case 'snapchat': return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 1.5c-3.5 0-5.5 2.5-5.5 4.5 0 .5.1 1.1.3 1.6-.4.2-.8.6-1.1 1.1-.3.5-.5 1.1-.5 1.7 0 1.2.7 2.2 1.7 2.7-.1.4-.2.8-.2 1.2 0 1.5 1 2.8 2.5 3.3-.2.3-.4.7-.5 1.1-.1.4-.1.8-.1 1.2 0 1.4.9 2.5 2.2 2.9-.3.2-.5.5-.6.8-.1.3-.2.7-.2 1.1 0 .6.3 1.1.7 1.4.1.1.3.1.5.1s.4-.1.5-.2c1-.9 2.1-1.4 3.3-1.4s2.3.5 3.3 1.4c.1.1.3.2.5.2s.4-.1.5-.1.7-.8.7-1.4c0-.4-.1-.8-.2-1.1-.1-.3-.3-.6-.6-.8 1.3-.4 2.2-1.5 2.2-2.9 0-.4 0-.8-.1-1.2-.1-.4-.3-.8-.5-1.1 1.5-.5 2.5-1.8 2.5-3.3 0-.4-.1-.8-.2-1.2 1-.5 1.7-1.5 1.7-2.7 0-.6-.2-1.2-.5-1.7-.3-.5-.7-.9-1.1-1.1.2-.5.3-1.1.3-1.6 0-2-2-4.5-5.5-4.5z" />
                </svg>
            );
            default: return <Camera size={24} />;
        }
    };

    const getColor = (platform: string) => {
        switch (platform) {
            case 'instagram': return 'from-[#833ab4] via-[#fd1d1d] to-[#fcb045]';
            case 'snapchat': return 'from-[#fffc00] to-[#fffc00] text-black';
            case 'facebook': return 'from-[#1877F2] to-[#0D65D9]';
            default: return 'from-wedding-gold to-wedding-gold-text';
        }
    };

    return (
        <div className={`p-8 md:p-12 rounded-[3rem] border ${isLight ? 'bg-white/40 border-wedding-emerald/10' : 'glass-maroon border-wedding-gold/20'} relative overflow-hidden`}>
            {/* Background pattern */}
            <div className="absolute inset-0 islamic-pattern opacity-[0.03] pointer-events-none" />

            <div className="relative z-10 text-center mb-10">
                <div className="flex justify-center mb-4">
                    <div className={`w-12 h-12 rounded-full border ${isLight ? 'border-wedding-emerald/20' : 'border-wedding-gold/30'} flex items-center justify-center`}>
                        <Share2 size={20} className={isLight ? 'text-wedding-emerald' : 'text-wedding-gold'} />
                    </div>
                </div>
                <h3 className="font-playfair text-3xl md:text-4xl mb-4">Capture the Magic</h3>
                <p className={`font-cormorant text-xl opacity-80 max-w-sm mx-auto ${isLight ? 'text-wedding-emerald' : 'text-wedding-ivory'}`}>
                    Open your camera with our ceremonial AR filters to share your moments with us.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                {displayFilters.map((filter, index) => (
                    <motion.a
                        key={index}
                        href={filter.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -5, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="group"
                    >
                        <div className={`relative h-20 flex items-center gap-4 px-6 rounded-2xl bg-gradient-to-br ${getColor(filter.platform)} shadow-lg overflow-hidden`}>
                            {/* Gloss effect */}
                            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="relative z-10 bg-white/20 p-2 rounded-xl backdrop-blur-sm">
                                {getIcon(filter.platform)}
                            </div>

                            <div className="relative z-10 text-left">
                                <span className="block text-[10px] uppercase tracking-widest font-bold opacity-80">
                                    {filter.platform}
                                </span>
                                <span className="block font-playfair font-bold text-lg leading-tight">
                                    {filter.name}
                                </span>
                            </div>

                            <div className="absolute right-4 opacity-30 group-hover:opacity-100 transition-opacity">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                            </div>
                        </div>
                    </motion.a>
                ))}
            </div>

            <div className="mt-8 text-center text-[10px] font-cinzel tracking-[0.2em] opacity-40">
                Works best on mobile devices with native apps installed
            </div>
        </div>
    );
};
