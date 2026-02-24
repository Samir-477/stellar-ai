"use client";

import React, { useState, useEffect } from "react";

// A small helper component to handle the animation logic
const AnimatedNumber = ({ value }: { value: string }) => {
    const [displayValue, setDisplayValue] = useState(0);

    // Parse the numeric part and any suffix/prefix
    const numericValue = parseFloat(value.replace(/[^0-9.]/g, "")) || 0;
    const prefix = value.match(/^[^\d]+/)?.[0] || "";
    const suffix = value.match(/[^\d.]+$/)?.[0] || "";
    const hasDecimals = value.includes(".");

    useEffect(() => {
        let startTimestamp: number | null = null;
        let animationFrameId: number | null = null;
        const duration = 2000; // 2 seconds animation

        const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);

            if (progress < 1) {
                // Smooth "ease-out" count up (Looks more professional)
                const easeOutProgress = 1 - Math.pow(1 - progress, 4);
                setDisplayValue(numericValue * easeOutProgress);

                // If you strictly want the random scramble instead, uncomment below and delete the 2 lines above:
                // setDisplayValue(Math.random() * numericValue);

                animationFrameId = window.requestAnimationFrame(step);
            } else {
                // Settle on the final value
                setDisplayValue(numericValue);
            }
        };

        animationFrameId = window.requestAnimationFrame(step);

        // Crucial cleanup to prevent memory leaks and jittering
        return () => {
            if (animationFrameId) {
                window.cancelAnimationFrame(animationFrameId);
            }
        };
    }, [numericValue]);

    return (
        <span>
            {prefix}
            {hasDecimals
                ? displayValue.toFixed(1)
                : Math.floor(displayValue).toLocaleString()}
            {suffix}
        </span>
    );
};

export default function StatsSection() {
    const stats = [
        {
            value: "94.2%",
            label: "Model Accuracy",
            sublabel: "and improving every quarter"
        },
        {
            value: "847+",
            label: "Calls Analyzed",
            sublabel: "per customer on average"
        },
        {
            value: "2.4K",
            label: "Signals Detected",
            sublabel: "across all conversations"
        },
        {
            value: "<5min",
            label: "Time to Insight",
            sublabel: "from question to report"
        }
    ];

    return (
        // Using a very deep navy/black color to match the image precisely
        <section className="relative w-full bg-[#0a0e17] py-24 md:py-32 overflow-hidden z-10">

            {/* Subtle center glow effect to give the dark background depth */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_50%)] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 text-center">

                    {stats.map((stat, index) => (
                        <div key={index} className="flex flex-col items-center justify-center">
                            {/* Large, thin metric number with min-width to prevent layout shift during animation */}
                            <div className="text-5xl md:text-6xl font-light text-white tracking-tight mb-4 min-w-[150px]">
                                <AnimatedNumber value={stat.value} />
                            </div>

                            {/* Primary Label */}
                            <div className="text-sm md:text-base font-medium text-slate-200 mb-1">
                                {stat.label}
                            </div>

                            {/* Muted Sub-label */}
                            <div className="text-xs md:text-sm text-slate-500 font-light">
                                {stat.sublabel}
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </section>
    );
}