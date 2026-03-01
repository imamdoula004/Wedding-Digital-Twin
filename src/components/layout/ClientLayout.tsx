"use client";

import { usePathname } from "next/navigation";
import ImmersiveBackground from "@/components/ui/ImmersiveBackground";
import PageTransition from "@/components/ui/PageTransition";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith("/admin");

    return (
        <>
            {!isAdmin && <ImmersiveBackground />}
            <PageTransition>
                {children}
            </PageTransition>
        </>
    );
}
