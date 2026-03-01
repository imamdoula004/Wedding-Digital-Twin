"use client";

import { useEffect, useRef } from "react";
import { animate, createDrawable } from "animejs";

interface MotifAnimatorProps {
    children: React.ReactElement;
    trigger?: boolean;
}

export const MotifAnimator = ({ children, trigger = true }: MotifAnimatorProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current || !trigger) return;

        const paths = containerRef.current.querySelectorAll("path");
        if (paths.length === 0) return;

        const drawables = createDrawable(paths);

        animate(drawables, {
            draw: "0 1",
            easing: "outSine",
            duration: 2000,
            delay: (el, i) => i * 250,
            direction: "alternate",
            loop: false,
        });
    }, [trigger]);

    return (
        <div ref={containerRef} className="w-full h-full flex items-center justify-center">
            {children}
        </div>
    );
};
