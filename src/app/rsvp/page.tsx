import { RSVPForm } from "@/components/rsvp/RSVPForm";
import { IslamicPattern } from "@/components/ui/IslamicPattern";
import Link from "next/link";

export default function RSVPPage() {
    return (
        <main className="min-h-screen relative py-12 px-6" style={{ backgroundColor: 'rgba(255, 251, 235, 0.9)' }}>
            <div className="absolute inset-0 islamic-pattern opacity-5 pointer-events-none" />

            <div className="max-w-4xl mx-auto relative z-10">
                <Link href="/" className="inline-flex items-center gap-2 font-cinzel text-wedding-emerald hover:text-wedding-gold transition-colors mb-8 group">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform"><path d="m15 18-6-6 6-6" /></svg>
                    Back to Home
                </Link>

                <div className="text-center mb-12">
                    <h1 className="font-cinzel text-4xl md:text-6xl text-wedding-emerald mb-4">RSVP</h1>
                    <p className="font-amiri text-2xl text-wedding-gold italic">Please let us know if you can join our celebration</p>
                    <div className="w-24 h-1 bg-wedding-gold mx-auto mt-6" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                    <div className="lg:col-span-1 space-y-8">
                        <div className="bg-wedding-emerald p-8 rounded-2xl text-wedding-ivory shadow-xl relative overflow-hidden">
                            <IslamicPattern />
                            <div className="relative z-10">
                                <h3 className="font-cinzel text-xl text-wedding-gold mb-4 underline decoration-wedding-gold/30 underline-offset-8">Guest Instructions</h3>
                                <ul className="font-amiri text-lg space-y-4 opacity-90">
                                    <li>• Please respond by May 1st, 2026</li>
                                    <li>• Semi-formal or Traditional attire preferred</li>
                                    <li>• Children are welcome under adult supervision</li>
                                    <li>• Valet parking available at all venues</li>
                                </ul>
                            </div>
                        </div>

                        <div className="border-2 border-wedding-gold/20 p-8 rounded-2xl bg-wedding-gold/5">
                            <h3 className="font-cinzel text-xl text-wedding-emerald mb-4 italic">Need Help?</h3>
                            <p className="font-amiri text-lg text-wedding-emerald/70">
                                If you have trouble with the form, please contact our coordinator at <br />
                                <span className="text-wedding-gold font-bold">+880 1234 567890</span>
                            </p>
                        </div>
                    </div>

                    <div className="lg:col-span-2">
                        <RSVPForm />
                    </div>
                </div>
            </div>
        </main>
    );
}
