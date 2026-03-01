"use client";

import { Hero } from "@/components/home/Hero";
import { Overview } from "@/components/home/Overview";
import { EventGrid } from "@/components/home/EventGrid";
import { InvitationCard } from "@/components/home/InvitationCard";
import { BackgroundMusic } from "@/components/ui/BackgroundMusic";
import { useSettings } from "@/lib/hooks/useSettings";

export default function Home() {
  const { settings, loading } = useSettings();

  if (loading) return <div className="min-h-screen bg-wedding-emerald flex items-center justify-center font-cinzel text-wedding-gold">Loading...</div>;

  return (
    <main className="bg-wedding-ivory/90 min-h-screen">
      <BackgroundMusic url="https://www.soundjay.com/culture/sounds/indian-sitar-1.mp3" isLight={false} />
      <Hero brideName={settings.brideName} groomName={settings.groomName} />
      <InvitationCard />
      <Overview />
      <EventGrid />

      {/* Footer */}
      <footer className="py-12 bg-wedding-emerald text-wedding-ivory text-center border-t border-wedding-gold/20">
        <p className="font-cinzel text-lg mb-2">{settings.brideName} & {settings.groomName}</p>
        <p className="font-amiri italic text-wedding-gold opacity-80">May 2026 • Together Forever</p>
      </footer>
    </main>
  );
}
