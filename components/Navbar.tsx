"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const NAV_SECTIONS = [
    { id: "home", label: "Home" },
    { id: "features", label: "Features" },
    { id: "how-it-works", label: "How It Works" },
    { id: "testimonials", label: "Testimonials" },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("home");

    useEffect(() => {
        const handleScroll = () => {
            // Show/hide navbar
            if (window.scrollY >= window.innerHeight * 0.8) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }

            // Determine active section based on scroll position
            const scrollY = window.scrollY + 120; // offset for navbar height
            let current = "home";

            for (const section of NAV_SECTIONS) {
                const el = document.getElementById(section.id);
                if (el) {
                    const top = el.offsetTop;
                    const bottom = top + el.offsetHeight;
                    if (scrollY >= top && scrollY < bottom) {
                        current = section.id;
                    }
                }
            }

            setActiveSection(current);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 transition-all duration-500 ease-in-out ${isScrolled ? 'translate-y-0 opacity-100 shadow-sm' : '-translate-y-full opacity-0'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <Image src="/logo.svg" alt="Stellar AI" width={40} height={20} className="h-5 w-auto" />
                    <span className="font-bold text-lg tracking-tight text-slate-900">Stellar AI</span>
                </Link>

                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-500">
                    {NAV_SECTIONS.map((section) => (
                        <a
                            key={section.id}
                            href={`#${section.id}`}
                            onClick={(e) => handleClick(e, section.id)}
                            className={`transition-colors duration-200 ${activeSection === section.id
                                ? "text-slate-900 bg-slate-100 px-4 py-1.5 rounded-full"
                                : "hover:text-slate-900"
                                }`}
                        >
                            {section.label}
                        </a>
                    ))}
                    <Link href="/auth" className="hover:text-slate-900 transition-colors">Sign In</Link>
                </div>

                <Link href="/auth" className="bg-[#111827] text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-slate-800 transition shadow-md">
                    Book a Demo
                </Link>
            </div>
        </nav>
    );
}