"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";

export interface WeddingSettings {
    brideName: string;
    groomName: string;
    livestreamURL: string;
    playlistURL: string;
    hashtag: string;
    ceremonyPDFURL: string;
    eventDetails: Record<string, any>;
}

const defaultSettings: WeddingSettings = {
    brideName: "Zainab",
    groomName: "Ahmed",
    livestreamURL: "",
    playlistURL: "https://open.spotify.com/playlist/37i9dQZF1DX5Ejj0EkURtP",
    hashtag: "ZainabAhmed2026",
    ceremonyPDFURL: "",
    eventDetails: {},
};

const SETTINGS_CACHE_KEY = "wedding_settings_cache";

export function useSettings() {
    const [settings, setSettings] = useState<WeddingSettings>(() => {
        if (typeof window !== "undefined") {
            const cached = localStorage.getItem(SETTINGS_CACHE_KEY);
            return cached ? JSON.parse(cached) : defaultSettings;
        }
        return defaultSettings;
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onSnapshot(doc(db, "settings", "main"), (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.data() as WeddingSettings;
                setSettings(data);
                localStorage.setItem(SETTINGS_CACHE_KEY, JSON.stringify(data));
            }
            setLoading(false);
        }, (error) => {
            console.error("Settings listener failed:", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return { settings, loading };
}
