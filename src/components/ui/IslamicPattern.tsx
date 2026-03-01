"use client";

import React from "react";

export const IslamicPattern = () => {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20 islamic-pattern" />
    );
};

export const GeometricOverlay = () => {
    return (
        <svg
            className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 opacity-10"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <pattern
                    id="geometric-pattern"
                    x="0"
                    y="0"
                    width="100"
                    height="100"
                    patternUnits="userSpaceOnUse"
                >
                    <path
                        d="M50 0 L61 39 L100 50 L61 61 L50 100 L39 61 L0 50 L39 39 Z"
                        fill="currentColor"
                        className="text-wedding-gold"
                    />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#geometric-pattern)" />
        </svg>
    );
};
