"use client";

import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Music, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface BackgroundMusicProps {
    url: string;
    isLight?: boolean;
}

export const BackgroundMusic = ({ url, isLight = false }: BackgroundMusicProps) => {
    const [isMuted, setIsMuted] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [audioError, setAudioError] = useState(false);
    const [showPlayPrompt, setShowPlayPrompt] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (!url) return;

        setIsLoading(true);
        setAudioError(false);

        const audio = new Audio(url);
        audio.loop = true;
        audio.volume = 0; // Start at 0 for fade-in
        audioRef.current = audio;

        const handleCanPlay = () => {
            setIsLoading(false);
            attemptAutoplay();
        };

        const handleError = (e: any) => {
            console.error("Audio Load Error:", e);
            setAudioError(true);
            setIsLoading(false);
        };

        audio.addEventListener('canplaythrough', handleCanPlay);
        audio.addEventListener('error', handleError);

        const attemptAutoplay = () => {
            if (!audioRef.current) return;

            audioRef.current.play()
                .then(() => {
                    setIsMuted(false);
                    setIsPlaying(true);
                    // Fade in
                    let vol = 0;
                    const interval = setInterval(() => {
                        if (vol < 0.3 && audioRef.current) {
                            vol += 0.02;
                            audioRef.current.volume = vol;
                        } else {
                            clearInterval(interval);
                        }
                    }, 100);
                })
                .catch((err) => {
                    if (err.name === 'NotAllowedError') {
                        console.log("Autoplay blocked - showing prompt");
                        setShowPlayPrompt(true);
                    } else {
                        setAudioError(true);
                    }
                    setIsPlaying(false);
                    setIsMuted(true);
                });
        };

        return () => {
            audio.removeEventListener('canplaythrough', handleCanPlay);
            audio.removeEventListener('error', handleError);
            audio.pause();
            audioRef.current = null;
        };
    }, [url]);

    const toggleMusic = () => {
        if (!audioRef.current) return;

        if (isMuted || !isPlaying) {
            audioRef.current.play()
                .then(() => {
                    setIsMuted(false);
                    setIsPlaying(true);
                    setShowPlayPrompt(false);
                    audioRef.current!.volume = 0.3;
                })
                .catch(err => console.error("Playback failed:", err));
        } else {
            audioRef.current.pause();
            setIsMuted(true);
            setIsPlaying(false);
        }
    };

    return (
        <>
            {/* Tap to Play Overlay (only when blocked) */}
            <AnimatePresence>
                {showPlayPrompt && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="fixed bottom-24 left-8 z-[101]"
                    >
                        <button
                            onClick={toggleMusic}
                            className="bg-wedding-gold text-wedding-emerald px-6 py-3 rounded-2xl font-cinzel text-xs tracking-widest font-bold shadow-2xl flex items-center gap-3 hover:scale-105 transition-transform"
                        >
                            <Music size={16} className="animate-bounce" />
                            Tap to Awaken Ambience
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="fixed bottom-8 left-8 z-[100]">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleMusic}
                    disabled={audioError || isLoading}
                    className={`flex items-center gap-3 px-4 py-2 rounded-full border shadow-2xl transition-all duration-500 group overflow-hidden relative ${isLight
                        ? 'border-wedding-emerald/20 bg-white/40 text-wedding-emerald backdrop-blur-md'
                        : 'border-wedding-gold/30 bg-black/40 text-wedding-gold backdrop-blur-md'
                        } ${audioError ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    <div className="relative z-10 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center relative">
                            <AnimatePresence mode="wait">
                                {isLoading ? (
                                    <motion.div
                                        key="loading"
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                        className="opacity-50"
                                    >
                                        <Music size={14} />
                                    </motion.div>
                                ) : audioError ? (
                                    <motion.div key="error" className="text-red-400">
                                        <AlertCircle size={18} />
                                    </motion.div>
                                ) : isMuted ? (
                                    <motion.div
                                        key="muted"
                                        initial={{ opacity: 0, rotate: -20 }}
                                        animate={{ opacity: 1, rotate: 0 }}
                                        exit={{ opacity: 0, rotate: 20 }}
                                    >
                                        <VolumeX size={18} />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="playing"
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.5 }}
                                    >
                                        <Volume2 size={18} />
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {!isMuted && isPlaying && (
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <motion.div
                                        animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0, 0.3] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className={`absolute inset-0 rounded-full border ${isLight ? 'border-wedding-emerald' : 'border-wedding-gold'}`}
                                    />
                                </div>
                            )}
                        </div>

                        <span className="font-cinzel text-[10px] tracking-[0.2em] uppercase font-bold">
                            {isLoading ? "Summoning..." : audioError ? "Silent Echo" : isMuted ? "Awaken Soul" : "Distant Echoes"}
                        </span>
                    </div>

                    {!isMuted && isPlaying && (
                        <div className="flex gap-[2px] items-end h-3 ml-2 pr-1">
                            {[1, 2, 3, 4].map((i) => (
                                <motion.div
                                    key={i}
                                    animate={{ height: [4, 12, 4] }}
                                    transition={{
                                        duration: 0.5 + Math.random(),
                                        repeat: Infinity,
                                        delay: i * 0.1
                                    }}
                                    className={`w-[2px] rounded-full ${isLight ? 'bg-wedding-emerald' : 'bg-wedding-gold'}`}
                                />
                            ))}
                        </div>
                    )}
                </motion.button>
            </div>
        </>
    );
};
