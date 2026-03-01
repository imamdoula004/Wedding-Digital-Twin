"use client";

import { useState, useEffect } from "react";
import { storage, db } from "@/lib/firebase";
import { ref, uploadBytes, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal, Floating, GlowPulse } from "../ui/MotionWrapper";

interface Photo {
    id: string;
    imageURL: string;
    uploaderName: string;
    approved: boolean;
    createdAt: any;
}

export const LiveCollage = ({ eventId }: { eventId: string }) => {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState({ current: 0, total: 0 });
    const [files, setFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const [uploaderName, setUploaderName] = useState("");

    useEffect(() => {
        const q = query(
            collection(db, "photos"),
            orderBy("createdAt", "desc")
        );
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const photoList = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Photo[];
            setPhotos(photoList);
        });
        return () => unsubscribe();
    }, [eventId]);

    // Cleanup previews when component unmounts or files change
    useEffect(() => {
        return () => {
            previews.forEach(url => URL.revokeObjectURL(url));
        };
    }, [previews]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(e.target.files || []);
        if (selectedFiles.length + files.length > 10) {
            alert("Maximum 10 photos per upload.");
            return;
        }

        const newFiles = [...files, ...selectedFiles].slice(0, 10);
        setFiles(newFiles);

        // Generate previews
        const newPreviews = selectedFiles.map(file => URL.createObjectURL(file));
        setPreviews(prev => [...prev, ...newPreviews].slice(0, 10));
    };

    const removeFile = (index: number) => {
        const newFiles = [...files];
        newFiles.splice(index, 1);
        setFiles(newFiles);

        const newPreviews = [...previews];
        URL.revokeObjectURL(newPreviews[index]);
        newPreviews.splice(index, 1);
        setPreviews(newPreviews);
    };

    const compressImage = (file: File): Promise<Blob> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target?.result as string;
                img.onload = () => {
                    const canvas = document.createElement("canvas");
                    const MAX_WIDTH = 1200;
                    const MAX_HEIGHT = 1200;
                    let width = img.width;
                    let height = img.height;

                    if (width > height) {
                        if (width > MAX_WIDTH) {
                            height *= MAX_WIDTH / width;
                            width = MAX_WIDTH;
                        }
                    } else {
                        if (height > MAX_HEIGHT) {
                            width *= MAX_HEIGHT / height;
                            height = MAX_HEIGHT;
                        }
                    }
                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext("2d");
                    ctx?.drawImage(img, 0, 0, width, height);
                    canvas.toBlob((blob) => {
                        if (blob) resolve(blob);
                        else reject(new Error("Canvas to Blob failed"));
                    }, "image/jpeg", 0.7);
                };
            };
            reader.onerror = (error) => reject(error);
        });
    };

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (files.length === 0 || !uploaderName) return;

        setUploading(true);
        setProgress({ current: 0, total: files.length });

        try {
            for (let i = 0; i < files.length; i++) {
                setProgress(prev => ({ ...prev, current: i + 1 }));
                const file = files[i];

                if (file.size > 10 * 1024 * 1024) continue; // Skip too large files, 10MB limit before compression

                const blob = await compressImage(file);
                console.log(`Blob ready: ${file.name}, size: ${(blob.size / 1024).toFixed(1)}KB`);

                const uniqueId = Math.random().toString(36).substring(7);
                const storagePath = `wedding/photos/${Date.now()}_${uniqueId}_${file.name}`;
                const storageRef = ref(storage, storagePath);

                console.log(`Starting Resumable Upload: ${storagePath}`);

                const uploadTask = uploadBytesResumable(storageRef, blob, {
                    contentType: 'image/jpeg'
                });

                await new Promise((resolve, reject) => {
                    uploadTask.on('state_changed',
                        (snapshot) => {
                            const pct = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                            console.log(`Upload progress for ${file.name}: ${pct.toFixed(0)}%`);
                        },
                        (error) => {
                            console.error(`Upload task failed for ${file.name}:`, error);
                            reject(error);
                        },
                        async () => {
                            const imageURL = await getDownloadURL(uploadTask.snapshot.ref);
                            await addDoc(collection(db, "photos"), {
                                imageURL,
                                uploaderName,
                                approved: true,
                                createdAt: serverTimestamp(),
                            });
                            console.log(`Database entry created for: ${file.name}`);
                            resolve(true);
                        }
                    );
                });
            }

            setFiles([]);
            setPreviews([]);
            setUploaderName("");
            alert("Your offerings have been received!");
        } catch (error: any) {
            console.error("Critical upload error:", error);
            if (error.code === 'storage/retry-limit-exceeded') {
                alert(`⚠️ CONNECTION FAILED ⚠️\n\nThe app cannot connect to your Firebase Storage bucket.\n\nMOST COMMON FIX:\n1. Open Firebase Console > Storage\n2. Click "Get Started" if you haven't yet.\n3. Make sure the bucket name in .env.local matches exactly (usually ending in .firebasestorage.app or .appspot.com).`);
            } else if (error.code === 'storage/unauthorized') {
                alert("🛑 SECURITY REJECTION 🛑\n\nFirebase is blocking the upload. Please check your Storage Rules in the console.");
            } else {
                alert(`❌ UPLOAD FAILED ❌\n\nError: ${error.message}`);
            }
        } finally {
            setUploading(false);
            setProgress({ current: 0, total: 0 });
        }
    };

    return (
        <section className="py-20 relative px-4">
            <div className="max-w-7xl mx-auto">
                <Reveal className="text-center mb-20">
                    <span className="font-cinzel text-wedding-gold text-[10px] tracking-[0.4em] uppercase mb-4 block">Shared Visions</span>
                    <h2 className="font-playfair text-5xl md:text-6xl text-wedding-gold mb-6 uppercase">The Living Tapestry</h2>
                    <p className="font-cormorant text-2xl text-wedding-ivory/60 italic max-w-2xl mx-auto">
                        A collective archive of joy. Whisper your captures into our digital museum.
                    </p>
                </Reveal>

                {/* Upload Section */}
                <Reveal className="mb-24 flex flex-col items-center">
                    <div className="w-full max-w-2xl glass-maroon p-8 md:p-12 rounded-[3rem] border border-wedding-gold/20 shadow-2xl relative overflow-hidden group">
                        <div className="absolute inset-0 gold-shimmer opacity-5 pointer-events-none" />
                        <form onSubmit={handleUpload} className="relative z-10 space-y-6">
                            <div className="space-y-4">
                                <label className="font-cinzel text-wedding-gold text-[10px] tracking-[0.3em] uppercase ml-1 font-bold">Guardian of the Lens</label>
                                <input
                                    type="text"
                                    placeholder="Your Name..."
                                    className="w-full bg-black/20 border border-wedding-gold/20 rounded-2xl p-4 text-wedding-ivory font-cormorant text-xl focus:border-wedding-gold/60 outline-none transition-all placeholder:text-wedding-ivory/20"
                                    value={uploaderName}
                                    onChange={(e) => setUploaderName(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-end px-1">
                                    <label className="font-cinzel text-wedding-gold text-[10px] tracking-[0.3em] uppercase font-bold">The Captures</label>
                                    <span className="text-[9px] font-cinzel text-wedding-gold/40">{files.length}/10 selected</span>
                                </div>

                                {previews.length > 0 && (
                                    <div className="grid grid-cols-5 gap-2 mb-4">
                                        {previews.map((src, i) => (
                                            <div key={i} className="relative aspect-square rounded-lg overflow-hidden border border-wedding-gold/20 group/thumb">
                                                <img src={src} className="w-full h-full object-cover" alt="Preview" />
                                                <button
                                                    type="button"
                                                    onClick={() => removeFile(i)}
                                                    className="absolute top-1 right-1 bg-red-500/80 text-white rounded-full p-1 opacity-0 group-hover/thumb:opacity-100 transition-opacity"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <div className="grid grid-cols-2 gap-4">
                                    <label htmlFor="gallery-upload" className="cursor-pointer group flex flex-col items-center justify-center p-6 border border-dashed border-wedding-gold/20 rounded-2xl hover:border-wedding-gold/60 hover:bg-wedding-gold/5 transition-all text-center">
                                        <input
                                            id="gallery-upload"
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            className="hidden"
                                            onChange={handleFileChange}
                                        />
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-wedding-gold/40 group-hover:text-wedding-gold mb-2 transition-colors"><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" /></svg>
                                        <span className="text-wedding-gold/50 font-cinzel text-[10px] tracking-widest uppercase group-hover:text-wedding-gold/80">Gallery</span>
                                    </label>

                                    <label htmlFor="camera-upload" className="cursor-pointer group flex flex-col items-center justify-center p-6 border border-dashed border-wedding-gold/20 rounded-2xl hover:border-wedding-gold/60 hover:bg-wedding-gold/5 transition-all text-center">
                                        <input
                                            id="camera-upload"
                                            type="file"
                                            accept="image/*"
                                            capture="environment"
                                            className="hidden"
                                            onChange={handleFileChange}
                                        />
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-wedding-gold/40 group-hover:text-wedding-gold mb-2 transition-colors"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" /><circle cx="12" cy="13" r="3" /></svg>
                                        <span className="text-wedding-gold/50 font-cinzel text-[10px] tracking-widest uppercase group-hover:text-wedding-gold/80">Camera</span>
                                    </label>
                                </div>
                            </div>

                            <div className="pt-4 flex flex-col items-center gap-4">
                                <GlowPulse>
                                    <motion.button
                                        type="submit"
                                        disabled={uploading || files.length === 0 || !uploaderName}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="w-full px-16 py-5 bg-wedding-gold text-wedding-emerald rounded-full font-cinzel text-lg tracking-widest font-bold disabled:opacity-30 transition-all shadow-2xl"
                                    >
                                        {uploading ? (
                                            <span className="flex items-center gap-2">
                                                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                </svg>
                                                MIGRATING {progress.current}/{progress.total}
                                            </span>
                                        ) : "SHARE MOMENTS"}
                                    </motion.button>
                                </GlowPulse>
                                <p className="text-[9px] font-cinzel text-wedding-gold/30 uppercase tracking-widest italic leading-relaxed text-center">
                                    Limit: 10 High-res Sacred Captures <br />
                                    Optimized for the Digital Archive
                                </p>
                            </div>
                        </form>
                    </div>
                </Reveal>

                {/* Animated Masonry Grid */}
                <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                    <AnimatePresence mode="popLayout">
                        {photos.map((photo, i) => (
                            <Reveal key={photo.id} delay={i * 0.05} className="break-inside-avoid shadow-2xl">
                                <motion.div
                                    whileHover={{ scale: 1.02, y: -5 }}
                                    className="relative group rounded-3xl overflow-hidden border border-wedding-gold/10 bg-black/20"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-wedding-gold/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none" />
                                    <img
                                        src={photo.imageURL}
                                        alt={`Captured by ${photo.uploaderName}`}
                                        className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-all duration-700"
                                    />
                                    <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/90 via-black/40 to-transparent translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 z-20">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-[1px] bg-wedding-gold" />
                                            <p className="text-wedding-ivory font-cormorant italic text-xl">
                                                By <span className="text-wedding-gold">{photo.uploaderName}</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="absolute inset-0 border border-wedding-gold/0 group-hover:border-wedding-gold/30 rounded-3xl transition-all duration-500 pointer-events-none" />
                                </motion.div>
                            </Reveal>
                        ))}
                    </AnimatePresence>
                </div>

                {photos.length === 0 && (
                    <Reveal className="text-center py-40 bg-black/10 rounded-[4rem] border border-dashed border-wedding-gold/10">
                        <Floating duration={6}>
                            <p className="font-cormorant text-3xl text-wedding-gold/20 italic">The museum awaits its first masterpiece.</p>
                        </Floating>
                    </Reveal>
                )}
            </div>
        </section>
    );
};
