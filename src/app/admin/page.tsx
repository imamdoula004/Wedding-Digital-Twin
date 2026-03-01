"use client";

import { useState, useEffect, useRef } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, query, orderBy, onSnapshot, doc, setDoc, deleteDoc, getDocs, getDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "@/lib/firebase";
import Link from "next/link";
import { animate } from "animejs";

export default function AdminDashboard() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const [activeTab, setActiveTab] = useState<"rsvps" | "wishes" | "photos" | "settings">("rsvps");
    const [rsvps, setRsvps] = useState<any[]>([]);
    const [wishes, setWishes] = useState<any[]>([]);
    const [photos, setPhotos] = useState<any[]>([]);
    const [settings, setSettings] = useState<any>({
        brideName: "Zainab",
        groomName: "Ahmed",
        hashtag: "#ZainabAhmedWedding",
        livestreamURL: "",
        playlistURL: "",
        ceremonyPDFURL: "",
        weddingDate: ""
    });

    const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const indicatorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (u) => {
            setUser(u);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (!user) return;

        const fetchData = async () => {
            // Stats & Lists
            const rsvpQuery = query(collection(db, "rsvps"), orderBy("createdAt", "desc"));
            const rsvpSnap = await getDocs(rsvpQuery);
            setRsvps(rsvpSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

            const wishesQuery = query(collection(db, "wishes"), orderBy("createdAt", "desc"));
            const wishesSnap = await getDocs(wishesQuery);
            setWishes(wishesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

            // Settings - Fetch ONCE to avoid edit interference
            const settingsDoc = await getDoc(doc(db, "settings", "main"));
            if (settingsDoc.exists()) {
                setSettings(settingsDoc.data());
            } else {
                // Initialize if missing
                await setDoc(doc(db, "settings", "main"), settings);
            }
        };

        fetchData();

        // Real-time for Photos is fine
        const photosQuery = query(collection(db, "photos"), orderBy("createdAt", "desc"));
        const unsubscribePhotos = onSnapshot(photosQuery, (snapshot) => {
            setPhotos(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });

        return () => {
            unsubscribePhotos();
        };
    }, [user]);

    useEffect(() => {
        const activeTabIndex = (["rsvps", "wishes", "photos", "settings"] as const).indexOf(activeTab);
        const activeTabElement = tabRefs.current[activeTabIndex];

        if (activeTabElement && indicatorRef.current) {
            animate(indicatorRef.current, {
                width: activeTabElement.offsetWidth,
                translateX: activeTabElement.offsetLeft,
                duration: 300,
                easing: 'easeOutQuad'
            });
        }
    }, [activeTab]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
            setError("Invalid credentials. Please try again.");
        }
    };

    const handleDeletePhoto = async (photoId: string, imageURL: string) => {
        if (!confirm("Are you sure you want to delete this photo?")) return;
        try {
            await deleteDoc(doc(db, "photos", photoId));
        } catch (err) {
            console.error("Delete failed:", err);
        }
    };

    const handleUpdateSettings = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await setDoc(doc(db, "settings", "main"), settings);
            alert("Settings updated successfully!");
        } catch (err) {
            console.error("Update failed:", err);
            alert("Failed to update settings.");
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
        const file = e.target.files?.[0];
        if (!file) return;
        try {
            const storageRef = ref(storage, `wedding/assets/${Date.now()}_${file.name}`);
            const result = await uploadBytes(storageRef, file);
            const url = await getDownloadURL(result.ref);
            setSettings({ ...settings, [field]: url });
            alert("File uploaded! Click 'Save' to apply changes.");
        } catch (err) {
            console.error("Upload failed:", err);
            alert("Upload failed.");
        }
    };

    const exportRSVPs = () => {
        const headers = ["Name", "Email", "Phone", "Attendees", "Events", "Note", "Date"];
        const csvRows = [
            headers.join(","),
            ...rsvps.map(r => [
                `"${r.name}"`,
                `"${r.email}"`,
                `"${r.phone}"`,
                r.attendees,
                `"${Array.isArray(r.event) ? r.event.join("; ") : r.event}"`,
                `"${r.note || ""}"`,
                r.createdAt?.toDate()?.toLocaleString() || ""
            ].join(","))
        ];
        const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "rsvps.csv";
        a.click();
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-white font-sans text-zinc-900">Loading Dashboard...</div>;

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-zinc-50 font-sans p-6 text-zinc-900">
                <div className="bg-white p-8 rounded-2xl shadow-xl border border-zinc-200 max-w-md w-full">
                    <h2 className="text-2xl font-bold mb-6 text-zinc-900">Admin Login</h2>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-zinc-700 block mb-1">Email</label>
                            <input
                                type="email"
                                className="w-full border border-zinc-200 p-3 rounded-lg outline-none focus:ring-2 focus:ring-zinc-900 bg-white text-zinc-900"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-zinc-700 block mb-1">Password</label>
                            <input
                                type="password"
                                className="w-full border border-zinc-200 p-3 rounded-lg outline-none focus:ring-2 focus:ring-zinc-900 bg-white text-zinc-900"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
                        <button className="w-full bg-zinc-900 text-white py-3 rounded-lg font-bold hover:bg-zinc-800 transition-all shadow-md">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-50 font-sans p-6 text-zinc-900 relative z-50">
            <style jsx global>{`
                input, textarea {
                    color: #18181b !important;
                    background-color: #ffffff !important;
                }
                label {
                    color: #18181b !important;
                }
            `}</style>

            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-zinc-900">Wedding Admin</h1>
                        <p className="text-zinc-500">Live Portal Management</p>
                    </div>
                    <button
                        onClick={() => signOut(auth)}
                        className="px-4 py-2 text-sm border-2 border-red-100 text-red-600 rounded-lg hover:bg-red-50 transition-colors font-bold"
                    >
                        Logout
                    </button>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                    <div className="relative flex gap-1 p-1 bg-white rounded-full shadow-inner border border-zinc-200 overflow-hidden">
                        {(["rsvps", "wishes", "photos", "settings"] as const).map((tab, index) => (
                            <button
                                key={tab}
                                ref={(el) => { tabRefs.current[index] = el; }}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-2 rounded-full text-sm font-bold capitalize transition-all relative z-10 ${activeTab === tab ? "text-white" : "text-zinc-500 hover:text-zinc-900"
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                        <div
                            ref={indicatorRef}
                            className="absolute top-1 left-1 h-[calc(100%-8px)] bg-zinc-900 rounded-full shadow-md z-0 pointer-events-none"
                        />
                    </div>

                    {activeTab === "rsvps" && rsvps.length > 0 && (
                        <button
                            onClick={exportRSVPs}
                            className="flex items-center gap-2 px-4 py-2 bg-zinc-100 text-zinc-900 rounded-lg font-bold text-sm hover:bg-zinc-200 transition-all border border-zinc-200"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" /></svg>
                            Export CSV
                        </button>
                    )}
                </div>

                <div className="bg-white rounded-2xl shadow-xl border border-zinc-200 overflow-hidden min-h-[500px]">
                    {activeTab === "rsvps" && (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-zinc-50 text-zinc-500 text-xs font-bold uppercase tracking-wider">
                                    <tr>
                                        <th className="p-5">Guest Information</th>
                                        <th className="p-5">Status / Events</th>
                                        <th className="p-5">Count</th>
                                        <th className="p-5">Notes</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-100">
                                    {rsvps.map((rsvp) => (
                                        <tr key={rsvp.id} className="hover:bg-zinc-50/50 transition-colors">
                                            <td className="p-5 text-zinc-900">
                                                <div className="font-bold">{rsvp.name}</div>
                                                <div className="text-sm text-zinc-500">{rsvp.email}</div>
                                                <div className="text-xs text-zinc-400 mt-1">{rsvp.phone}</div>
                                            </td>
                                            <td className="p-5">
                                                <div className="flex flex-wrap gap-1.5">
                                                    {Array.isArray(rsvp.event) ? rsvp.event.map((e: string) => (
                                                        <span key={e} className="px-2.5 py-1 bg-zinc-100 text-zinc-700 text-[10px] font-bold rounded-full border border-zinc-200">{e}</span>
                                                    )) : <span className="px-2.5 py-1 bg-zinc-100 text-zinc-700 text-[10px] font-bold rounded-full border border-zinc-200">{rsvp.event}</span>}
                                                </div>
                                            </td>
                                            <td className="p-5 font-mono font-bold text-zinc-900">{rsvp.attendees}</td>
                                            <td className="p-5 text-sm text-zinc-600 italic max-w-xs">{rsvp.note || "-"}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {activeTab === "wishes" && (
                        <div className="divide-y divide-zinc-100">
                            {wishes.map((wish) => {
                                const isLocked = wish.revealDate && wish.revealDate.toDate() > new Date();
                                return (
                                    <div key={wish.id} className={`p-8 transition-colors ${isLocked ? "bg-zinc-50/30" : "hover:bg-zinc-50/50"}`}>
                                        <div className="flex justify-between items-start mb-3">
                                            <div className="flex items-center gap-3">
                                                <div className="font-bold text-lg text-zinc-900">{isLocked ? "A Sealed Message" : wish.name}</div>
                                                {isLocked && (
                                                    <span className="flex items-center gap-1 px-2 py-0.5 bg-amber-100 text-amber-700 text-[10px] font-bold rounded-full border border-amber-200 uppercase">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                                                        Sealed
                                                    </span>
                                                )}
                                            </div>
                                            <span className="px-3 py-1 bg-zinc-900 text-white text-[10px] rounded-full font-bold uppercase tracking-widest">{wish.tagType}</span>
                                        </div>
                                        {isLocked ? (
                                            <div className="flex flex-col gap-2">
                                                <p className="text-zinc-400 italic text-sm">This wish is from <span className="font-bold">{wish.name}</span>. It is locked until {wish.revealDate.toDate().toLocaleDateString()}.</p>
                                                <div className="w-full bg-zinc-100 h-1.5 rounded-full overflow-hidden">
                                                    <div className="bg-zinc-300 h-full w-1/3" />
                                                </div>
                                            </div>
                                        ) : (
                                            <p className="text-zinc-600 italic text-lg leading-relaxed">"{wish.message}"</p>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {activeTab === "photos" && (
                        <div className="p-8">
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                                {photos.map((photo) => (
                                    <div key={photo.id} className="relative group rounded-2xl overflow-hidden aspect-square border border-zinc-200">
                                        <img src={photo.imageURL} alt="Guest" className="w-full h-full object-cover" />
                                        <div className="absolute inset-x-0 bottom-0 p-4 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => handleDeletePhoto(photo.id, photo.imageURL)}
                                                className="w-full bg-red-500 text-white py-2 rounded text-xs font-bold"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === "settings" && (
                        <div className="p-10 max-w-4xl">
                            <form onSubmit={handleUpdateSettings} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold">Bride's Name</label>
                                        <input
                                            type="text"
                                            className="w-full border border-zinc-300 p-4 rounded-xl focus:ring-2 focus:ring-zinc-900 outline-none text-zinc-900"
                                            value={settings.brideName || ""}
                                            onChange={(e) => setSettings({ ...settings, brideName: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold">Groom's Name</label>
                                        <input
                                            type="text"
                                            className="w-full border border-zinc-300 p-4 rounded-xl focus:ring-2 focus:ring-zinc-900 outline-none text-zinc-900"
                                            value={settings.groomName || ""}
                                            onChange={(e) => setSettings({ ...settings, groomName: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold">Wedding Hashtag</label>
                                        <input
                                            type="text"
                                            className="w-full border border-zinc-300 p-4 rounded-xl focus:ring-2 focus:ring-zinc-900 outline-none text-zinc-900"
                                            value={settings.hashtag || ""}
                                            onChange={(e) => setSettings({ ...settings, hashtag: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold">Wedding Date</label>
                                        <input
                                            type="date"
                                            className="w-full border border-zinc-300 p-4 rounded-xl focus:ring-2 focus:ring-zinc-900 outline-none text-zinc-900"
                                            value={settings.weddingDate || ""}
                                            onChange={(e) => setSettings({ ...settings, weddingDate: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold">Livestream Link</label>
                                        <input
                                            type="text"
                                            className="w-full border border-zinc-300 p-4 rounded-xl focus:ring-2 focus:ring-zinc-900 outline-none text-zinc-900"
                                            value={settings.livestreamURL || ""}
                                            onChange={(e) => setSettings({ ...settings, livestreamURL: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-sm font-bold">Spotify Playlist URL</label>
                                        <input
                                            type="text"
                                            className="w-full border border-zinc-300 p-4 rounded-xl focus:ring-2 focus:ring-zinc-900 outline-none text-zinc-900"
                                            value={settings.playlistURL || ""}
                                            onChange={(e) => setSettings({ ...settings, playlistURL: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-sm font-bold">Ceremony Program (PDF)</label>
                                        <div className="flex items-center gap-4">
                                            <input
                                                type="text"
                                                className="flex-1 border border-zinc-200 p-4 rounded-xl bg-zinc-50 text-zinc-500 text-sm"
                                                value={settings.ceremonyPDFURL || ""}
                                                readOnly
                                            />
                                            <label className="cursor-pointer bg-zinc-900 text-white px-6 py-4 rounded-xl font-bold text-sm hover:bg-zinc-800 transition-all">
                                                Upload PDF
                                                <input type="file" className="hidden" accept="application/pdf" onChange={(e) => handleFileUpload(e, "ceremonyPDFURL")} />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" className="bg-zinc-900 text-white px-10 py-4 rounded-xl font-bold hover:bg-zinc-800 transition-all shadow-lg active:scale-[0.98]">
                                    Save All Settings
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
