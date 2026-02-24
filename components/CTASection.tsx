import React from 'react';
import Link from 'next/link';

export default function CTASection() {
    return (
        <section className="relative w-full py-32 md:py-40 px-6 bg-white overflow-hidden flex items-center justify-center text-center z-10">

            {/* Subtle concentric wave background pattern */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage: 'repeating-radial-gradient(circle at center, transparent 0, transparent 50px, #000 50px, #000 51px)'
                }}
            />

            <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">

                {/* Headline */}
                <h2 className="text-4xl md:text-5xl lg:text-[4rem] font-bold text-slate-900 mb-6 tracking-tight leading-[1.1]">
                    Ready to hear what your <br className="hidden md:block" />
                    data is trying to tell you?
                </h2>

                {/* Sub-headline */}
                <p className="text-lg text-slate-500 mb-10 max-w-xl leading-relaxed">
                    Join forward-thinking teams who replaced gut feelings with AI-powered clarity. Start with a free trial, no credit card required.
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-4 mb-8 w-full sm:w-auto">
                    <Link href="/auth" className="w-full sm:w-auto bg-[#111827] text-white px-8 py-3.5 rounded-full font-medium hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/10 text-center">
                        Start Free Trial
                    </Link>
                    <Link href="/auth" className="w-full sm:w-auto bg-white text-slate-900 border border-slate-200 px-8 py-3.5 rounded-full font-medium hover:bg-slate-50 transition-colors shadow-sm text-center">
                        Book a Demo
                    </Link>
                </div>

                {/* Footer Text */}
                <p className="text-xs font-medium text-slate-400 tracking-wide">
                    Free 14-day trial <span className="mx-1.5 px-0.5 rounded-full bg-slate-300 inline-block w-1 h-1 align-middle"></span> No credit card <span className="mx-1.5 px-0.5 rounded-full bg-slate-300 inline-block w-1 h-1 align-middle"></span> Cancel anytime
                </p>

            </div>
        </section>
    );
}