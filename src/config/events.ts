export type EventTheme = {
    primary: string;
    secondary: string;
    accent: string;
    glow: string;
    pattern: "golden-glow" | "paisley" | "geometric" | "floral" | "sparkle";
};

export type EventAllegory = {
    title: string;
    themeName: string;
    story: string;
    symbolism: string;
    motif: string;
};

export type SocialFilter = {
    platform: 'facebook' | 'instagram' | 'snapchat';
    name: string;
    url: string;
};

export type EventConfig = {
    id: string;
    slug: string;
    name: string;
    date: string;
    location: string;
    locationEmbedUrl?: string;
    theme: EventTheme;
    allegory: EventAllegory;
    streamingUrl?: string;
    ambientMusicUrl?: string;
    lineage?: {
        bride: { parents: string; grandParents?: string };
        groom: { parents: string; grandParents?: string };
    };
    note?: string;
    filters?: SocialFilter[];
};

export const events: EventConfig[] = [
    {
        id: "holud-bride",
        slug: "holud-bride",
        name: "Gaye Holud – Bride",
        date: "2026-05-10T18:00:00",
        location: "Sena Malancha, Dhaka",
        locationEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.198308432578!2d90.389270376043!3d23.77594538804868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c79805555555%3A0xe54556a8360fba!2sSena%20Malancha!5e0!3m2!1sen!2sbd!4v1710000000000!5m2!1sen!2sbd",
        theme: {
            primary: "bg-[#f59e0b]",
            secondary: "text-[#b45309]",
            accent: "border-[#fcd34d]",
            glow: "shadow-[0_0_30px_rgba(245,158,11,0.4)]",
            pattern: "golden-glow",
        },
        allegory: {
            title: "Light Before Union",
            themeName: "The Golden Dawn",
            story: "Before the sun rises on a new journey, the warmth of turmeric prepares the spirit—infusing it with the glow of ancestors and the promise of a bright horizon.",
            symbolism: "The turmeric represents the sun's first rays, purifying and illuminating the path forward.",
            motif: "Floating golden particles like sunlit dust.",
        },
        ambientMusicUrl: "https://www.soundjay.com/culture/sounds/indian-flute-1.mp3", // Indian Flute Placeholder
        note: "As we gather for the first of our celebrations, we invite you to share in the warmth and light of our journey's beginning.",
        lineage: {
            bride: {
                parents: "Mr. Abul Bashar & Mrs. Selina Begum",
                grandParents: "Late Haji Abdul Karim & Late Mariam Khatun"
            },
            groom: {
                parents: "Mr. Mahbubur Rahman & Mrs. Farida Akter",
                grandParents: "Mr. Shamsuddin Ahmed & Mrs. Razia Khatun"
            }
        },
        filters: [
            { platform: 'instagram', name: 'Golden Glow', url: 'https://www.instagram.com/ar/329483482817045/' },
            { platform: 'facebook', name: 'Holud Aura', url: 'https://www.facebook.com/fb-camera-effects/tryit/217316335967073/' },
            { platform: 'snapchat', name: 'Turmeric Tint', url: 'https://www.snapchat.com/unlock/?type=SNAPCODE&uuid=449d01c9513c40288d74397352cb304e&metadata=01' }
        ]
    },
    {
        id: "mehndi",
        slug: "mehndi",
        name: "Mehndi Night",
        date: "2026-05-11T19:00:00",
        location: "Pan Pacific Sonargaon, Dhaka",
        locationEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.195614948834!2d90.3924765760418!3d23.74044108804791!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b897931c36b3%3A0x696874e92d64571d!2sPan%20Pacific%20Sonargaon%20Dhaka!5e0!3m2!1sen!2sbd!4v1710000000000!5m2!1sen!2sbd",
        theme: {
            primary: "bg-[#065f46]",
            secondary: "text-[#d1fae5]",
            accent: "border-[#10b981]",
            glow: "shadow-[0_0_30px_rgba(16,185,129,0.3)]",
            pattern: "paisley",
        },
        allegory: {
            title: "Art of Destiny",
            themeName: "The Weaver's Hand",
            story: "Where patterns bind stories. Every line drawn in henna is a thread in the tapestry of a shared future, intricate and enduring.",
            symbolism: "The henna patterns symbolize the strength of the bond and the beauty of the life being written.",
            motif: "Animated henna line art drawing slowly in the silence.",
        },
        ambientMusicUrl: "https://www.soundjay.com/culture/sounds/indian-sitar-1.mp3", // Sitar Instrumental Placeholder
        note: "Every stroke of henna tells a story of destiny. We are so grateful to have you with us as we weave our lives together.",
        lineage: {
            bride: {
                parents: "Mr. Abul Bashar & Mrs. Selina Begum",
                grandParents: "Late Haji Abdul Karim & Late Mariam Khatun"
            },
            groom: {
                parents: "Mr. Mahbubur Rahman & Mrs. Farida Akter",
                grandParents: "Mr. Shamsuddin Ahmed & Mrs. Razia Khatun"
            }
        },
        filters: [
            { platform: 'instagram', name: 'Henna Art', url: 'https://www.instagram.com/ar/6479883115423312/' },
            { platform: 'facebook', name: 'Mehndi Magic', url: 'https://www.facebook.com/fb-camera-effects/tryit/217316335967073/' },
            { platform: 'snapchat', name: 'Paisley Pattern', url: 'https://www.snapchat.com/unlock/?type=SNAPCODE&uuid=449d01c9513c40288d74397352cb304e&metadata=01' }
        ]
    },
    {
        id: "nikkah",
        slug: "nikkah",
        name: "Sacred Nikkah",
        date: "2026-05-15T11:00:00",
        location: "Gulshan Society Mosque",
        locationEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.050304212557!2d90.41315627604313!3d23.7812168880486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7a3626359f7%3A0xe54c6d669a8b14e6!2sGulshan%20Society%20Jame%20Masjid!5e0!3m2!1sen!2sbd!4v1710000000000!5m2!1sen!2sbd",
        theme: {
            primary: "bg-[#fffbeb]",
            secondary: "text-[#d4af37]",
            accent: "border-[#d4af37]",
            glow: "shadow-[0_0_30px_rgba(212,175,55,0.2)]",
            pattern: "geometric",
        },
        allegory: {
            title: "Sacred Covenant",
            themeName: "The Lantern's Guidance",
            story: "A promise signed under the gaze of the heavens. A soft lantern glow guides the two hearts into a single, illuminated path of faith.",
            symbolism: "The Islamic arch symbolizes the threshold of a new life, framed by divine geometric perfection.",
            motif: "Soft flickering lantern glow and manuscript-style textures.",
        },
        ambientMusicUrl: "https://www.soundjay.com/culture/sounds/shehnai-1.mp3", // Shehnai Traditional Placeholder
        note: "Today, we sign a covenant of faith and friendship. Your presence at this sacred threshold means the world to us.",
        lineage: {
            bride: {
                parents: "Mr. Abul Bashar & Mrs. Selina Begum",
                grandParents: "Late Haji Abdul Karim & Late Mariam Khatun"
            },
            groom: {
                parents: "Mr. Mahbubur Rahman & Mrs. Farida Akter",
                grandParents: "Mr. Shamsuddin Ahmed & Mrs. Razia Khatun"
            }
        },
        filters: [
            { platform: 'instagram', name: 'Nikkah Grace', url: 'https://www.instagram.com/ar/1485184508982062/' },
            { platform: 'facebook', name: 'Sacred Light', url: 'https://www.facebook.com/fb-camera-effects/tryit/217316335967073/' },
            { platform: 'snapchat', name: 'Lantern Shimmer', url: 'https://www.snapchat.com/unlock/?type=SNAPCODE&uuid=449d01c9513c40288d74397352cb304e&metadata=01' }
        ],
        streamingUrl: "https://www.youtube.com/embed/live_stream_id",
    },
    {
        id: "biye",
        slug: "biye",
        name: "Wedding Ceremony (Biye)",
        date: "2026-05-16T19:00:00",
        location: "International Convention City Bashundhara",
        locationEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.158100589332!2d90.41738597604415!3d23.81295968804791!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c6543594b15f%3A0x82b9e69c6fc21528!2sInternational%20Convention%20City%20Bashundhara%20(ICCB)!5e0!3m2!1sen!2sbd!4v1710000000000!5m2!1sen!2sbd",
        theme: {
            primary: "bg-[#4c0519]",
            secondary: "text-[#fffbeb]",
            accent: "border-[#d4af37]",
            glow: "shadow-[0_0_30px_rgba(76,5,25,0.4)]",
            pattern: "floral",
        },
        allegory: {
            title: "Union of Two Legacies",
            themeName: "The Silk River",
            story: "Two rivers of heritage flowing from different mountains, now becoming one vast ocean of harmony and strength.",
            symbolism: "Flowing red silk represents the lifeblood of tradition and the vibrant pulse of new beginnings.",
            motif: "Flowing silk-like textures and faint floral blooms.",
        },
        ambientMusicUrl: "https://www.chosic.com/wp-content/uploads/2021/07/The-Grand-Entrance.mp3", // Shehnai Traditional Entrance
        note: "Bound by tradition and fueled by love, we take this step together. Thank you for being a part of our legacy.",
        lineage: {
            bride: {
                parents: "Mr. Abul Bashar & Mrs. Selina Begum",
                grandParents: "Late Haji Abdul Karim & Late Mariam Khatun"
            },
            groom: {
                parents: "Mr. Mahbubur Rahman & Mrs. Farida Akter",
                grandParents: "Mr. Shamsuddin Ahmed & Mrs. Razia Khatun"
            }
        },
        filters: [
            { platform: 'instagram', name: 'Royal Biye', url: 'https://www.instagram.com/ar/329483482817045/' },
            { platform: 'facebook', name: 'Silk & Soul', url: 'https://www.facebook.com/fb-camera-effects/tryit/217316335967073/' },
            { platform: 'snapchat', name: 'Maroon Elegance', url: 'https://www.snapchat.com/unlock/?type=SNAPCODE&uuid=449d01c9513c40288d74397352cb304e&metadata=01' }
        ]
    },
    {
        id: "reception",
        slug: "reception",
        name: "Walima (Reception)",
        date: "2026-05-18T19:00:00",
        location: "Garden Resort, Dhaka",
        locationEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.083838561053!2d90.41018887604423!3d23.81559858804791!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c6552bb794b1%3A0x6b69fa34c6792da0!2sRadisson%20Blu%20Dhaka%20Water%20Garden!5e0!3m2!1sen!2sbd!4v1710000000000!5m2!1sen!2sbd",
        theme: {
            primary: "bg-black",
            secondary: "bg-wedding-emerald/50",
            accent: "border-[#d4af37]",
            glow: "shadow-[0_0_30px_rgba(2,44,34,0.5)]",
            pattern: "sparkle",
        },
        allegory: {
            title: "Celebration of Harmony",
            themeName: "Celestial Embrace",
            story: "Under the watchful eye of a thousand stars, two souls become one universe.",
            symbolism: "Candlelight shimmer represents the warmth of the community surrounding the couple.",
            motif: "Soft sparkle particles and candlelight shimmer animations.",
        },
        ambientMusicUrl: "https://www.chosic.com/wp-content/uploads/2021/07/The-Grand-Entrance.mp3", // Royal Celebration Shehnai
        note: "Under the stars, we celebrate the harmony of our union. Let's make this a night to remember together.",
        lineage: {
            bride: {
                parents: "Mr. Abul Bashar & Mrs. Selina Begum",
                grandParents: "Late Haji Abdul Karim & Late Mariam Khatun"
            },
            groom: {
                parents: "Mr. Mahbubur Rahman & Mrs. Farida Akter",
                grandParents: "Mr. Shamsuddin Ahmed & Mrs. Razia Khatun"
            }
        },
        filters: [
            { platform: 'instagram', name: 'Celestial Walima', url: 'https://www.instagram.com/ar/6479883115423312/' },
            { platform: 'facebook', name: 'Starry Reception', url: 'https://www.facebook.com/fb-camera-effects/tryit/217316335967073/' },
            { platform: 'snapchat', name: 'Glimmer Glow', url: 'https://www.snapchat.com/unlock/?type=SNAPCODE&uuid=449d01c9513c40288d74397352cb304e&metadata=01' }
        ]
    },
];
