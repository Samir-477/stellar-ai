import React from 'react';
import { Linkedin, Github } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
    const footerLinks = {
        Product: ['ReportSense', 'Voice Analytics', 'Smart Alerts', 'Integrations', 'Pricing'],
        Company: ['About', 'Blog', 'Careers', 'Press'],
        Resources: ['Documentation', 'API Reference', 'Changelog', 'Status'],
        Legal: ['Privacy', 'Terms', 'Security']
    };

    return (
        <footer className="bg-[#0a0e17] text-white pt-20 pb-10 px-6 border-t border-slate-900">
            <div className="max-w-7xl mx-auto">

                {/* Top Section: Links Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-10 lg:gap-8 mb-16">

                    {/* Brand Column (Takes up 2 columns on large screens) */}
                    <div className="col-span-2 lg:col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-6">
                            <img src="/logo.svg" alt="Stellar AI" className="h-5 w-auto brightness-0 invert" />
                            <span className="font-bold text-xl tracking-tight text-white">Stellar AI</span>
                        </Link>
                        <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                            AI-powered intelligence for calls, reports, and decisions.
                        </p>
                    </div>

                    {/* Links Columns */}
                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category} className="col-span-1">
                            <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wider mb-6">
                                {category}
                            </h4>
                            <ul className="space-y-4">
                                {links.map((link) => (
                                    <li key={link}>
                                        <a
                                            href="#"
                                            className="text-sm text-slate-400 hover:text-white transition-colors"
                                        >
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Section: Copyright & Socials */}
                <div className="pt-8 border-t border-slate-800/80 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-slate-500">
                        © 2026 Stellar AI. All rights reserved.
                    </p>

                    <div className="flex items-center gap-6 text-slate-500">
                        <a href="#" className="group hover:text-white transition-colors">
                            <span className="sr-only">X (Twitter)</span>
                            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-slate-400 group-hover:fill-white transition-colors">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 5.96H5.078z"></path>
                            </svg>
                        </a>
                        <a href="#" className="hover:text-white transition-colors">
                            <span className="sr-only">LinkedIn</span>
                            <Linkedin size={18} strokeWidth={1.5} />
                        </a>
                        <a href="#" className="hover:text-white transition-colors">
                            <span className="sr-only">GitHub</span>
                            <Github size={18} strokeWidth={1.5} />
                        </a>
                    </div>
                </div>

            </div>
        </footer>
    );
}