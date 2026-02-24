"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
    Database, Table, Server, Clock,
    BarChart3, LineChart, Target,
    Volume2, Zap, Calendar,
    Video, ToggleRight, AlertCircle, MessageSquare
} from 'lucide-react';

export default function FeaturesScroll() {
    const [activeSection, setActiveSection] = useState(1);
    const [mounted, setMounted] = useState(false);
    const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const sectionIndex = Number(entry.target.getAttribute('data-index'));
                        setActiveSection(sectionIndex);
                    }
                });
            },
            { threshold: 0.5 }
        );

        sectionRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => observer.disconnect();
    }, []);

    const featuresData = [
        {
            id: 1, num: "01", sidebarLabel: "Connect Your Data", colorName: "indigo",
            title: "Connect to any database, spreadsheet, or pick from examples.",
            description: "Plug in your existing database, choose from ready-made example datasets, or connect directly to Google Sheets. Schedule automatic data retrieval so your reports are always fresh and up to date.",
            themeClasses: { text: "text-indigo-600", activeSidebar: "bg-indigo-600" },
            bgGradient: "from-indigo-100/40 via-white to-white"
        },
        {
            id: 2, num: "02", sidebarLabel: "Schema & Data Dictionary", colorName: "purple",
            title: "View the schema. Update metadata and data dictionary.",
            description: "Instantly visualise your database schema, review every table and column, and enrich the metadata with business context. A clear data dictionary ensures the AI understands your domain perfectly.",
            themeClasses: { text: "text-purple-600", activeSidebar: "bg-purple-600" },
            bgGradient: "from-purple-100/40 via-white to-white"
        },
        {
            id: 3, num: "03", sidebarLabel: "AI-Generated Goals", colorName: "emerald",
            title: "LLM creates goals from your data. You refine them.",
            description: "The AI analyses your dataset to propose meaningful, data-driven goals. Review, edit, or add your own targets. Every goal is tracked against live data so you always know where you stand.",
            themeClasses: { text: "text-emerald-500", activeSidebar: "bg-emerald-500" },
            bgGradient: "from-emerald-100/30 via-white to-white"
        },
        {
            id: 4, num: "04", sidebarLabel: "Smart Reports", colorName: "sky",
            title: "Pre-built reports, AI reports, or just ask in plain English.",
            description: "Browse a library of pre-defined reports, explore LLM-generated insights based on your schema, or simply type a question in plain English. The right report is always one sentence away.",
            themeClasses: { text: "text-sky-500", activeSidebar: "bg-sky-500" },
            bgGradient: "from-sky-100/40 via-white to-white"
        },
        {
            id: 5, num: "05", sidebarLabel: "Professional & Interactive", colorName: "amber",
            title: "Beautiful reports you can question further.",
            description: "Every report is generated in a clean, professional format ready for your stakeholders. Ask follow-up questions, drill into any metric, and get deeper context without leaving the page.",
            themeClasses: { text: "text-amber-500", activeSidebar: "bg-amber-500" },
            bgGradient: "from-amber-100/40 via-[#FFFCF8] to-[#FFFCF8]"
        },
        {
            id: 6, num: "06", sidebarLabel: "Voice & Call Intelligence", colorName: "pink",
            title: "AI analyses every call recording against company policy.",
            description: "Upload call-centre recordings and our AI transcribes, analyses sentiment, validates compliance against your company policies, and highlights what worked. Discover the best pitch, the best time to call, and evaluate every agent.",
            themeClasses: { text: "text-pink-500", activeSidebar: "bg-pink-500" },
            bgGradient: "from-pink-100/40 via-[#FFFDFD] to-white"
        },
        {
            id: 7, num: "07", sidebarLabel: "Analytics, Insights & Action", colorName: "red",
            title: "Every report comes with analytics, insights, and next steps.",
            description: "Go beyond charts. Each report surfaces key analytics, AI-driven insights, and recommended actions so you can act on your data immediately instead of just reading it.",
            themeClasses: { text: "text-red-500", activeSidebar: "bg-red-500" },
            bgGradient: "from-red-100/30 via-[#FFFDFC] to-white"
        },
        {
            id: 8, num: "08", sidebarLabel: "Goal Progress & Nudges", colorName: "teal",
            title: "Track progress against goals with smart nudges.",
            description: "See how you are performing against each goal in real time. AI-powered nudges highlight trends, risks, and opportunities, giving you deeper business insights exactly when you need them.",
            themeClasses: { text: "text-teal-500", activeSidebar: "bg-teal-500" },
            bgGradient: "from-teal-100/30 via-white to-white"
        },
        {
            id: 9, num: "09", sidebarLabel: "Save & Schedule Reports", colorName: "fuchsia",
            title: "Save reports and schedule delivery via email.",
            description: "Bookmark any report and set it to arrive daily, weekly, or monthly straight to your inbox. Keep your team aligned without lifting a finger.",
            themeClasses: { text: "text-fuchsia-500", activeSidebar: "bg-fuchsia-500" },
            bgGradient: "from-fuchsia-100/30 via-white to-white"
        },
        {
            id: 10, num: "10", sidebarLabel: "Business Pulse Summary", colorName: "orange",
            title: "One summary that captures the pulse of your organisation.",
            description: "All your generated reports feed into a single, AI-curated business summary. See the big picture across every department, metric, and goal in one unified view.",
            themeClasses: { text: "text-orange-500", activeSidebar: "bg-orange-500" },
            bgGradient: "from-orange-100/30 via-[#FFFCF8] to-[#FFFCF8]"
        },
        {
            id: 11, num: "11", sidebarLabel: "Talk to Us", colorName: "indigo",
            title: "See it in action. Book a personalised demo.",
            description: "Ready to transform your reporting? Our team will walk you through a live demo tailored to your data and your goals. No commitment, just clarity.",
            themeClasses: { text: "text-indigo-600", activeSidebar: "bg-indigo-600" },
            bgGradient: "from-indigo-100/40 via-white to-white"
        }
    ];

    const activeGradient = featuresData.find(f => f.id === activeSection)?.bgGradient || featuresData[0].bgGradient;

    // Framer Motion Animation Variants for the right side elements
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            // Sync the delay so it starts animating just as the parent's CSS animation triggers
            transition: { staggerChildren: 0.15, delayChildren: 0.4 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20, transition: { duration: 0.2 } },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } }
    };

    return (
        <section id="features" className="relative w-full text-slate-900 bg-white">

            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">

                {/* Dynamic Background */}
                <div
                    className={`absolute inset-0 bg-[radial-gradient(circle_at_10%_50%,_var(--tw-gradient-stops))] pointer-events-none transition-all duration-1000 ease-in-out ${activeGradient}`}
                />

                <div className="relative z-10 flex w-full h-full items-center">

                    {/* --- LEFT SIDEBAR: ROTATING DISK --- */}
                    {mounted && (
                        <div className="hidden lg:flex absolute left-0 top-0 bottom-0 z-20" style={{ width: "200px" }}>
                            <div className="relative w-full h-full flex items-center justify-center">
                                {/* The disk container — we shift it left so only the right half is visible */}
                                <div
                                    className="absolute"
                                    style={{
                                        width: "240px",
                                        height: "240px",
                                        left: "-180px",
                                        // Rotate so active section is at 3 o'clock (0°)
                                        // Each item is at (index * 360/11)° on the circle
                                        // To bring item N to 0°, rotate by -(N-1) * (360/11)
                                        transform: `rotate(${-((activeSection - 1) * (360 / featuresData.length))}deg)`,
                                        transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                                    }}>
                                    {/* Subtle disk circle outline */}
                                    <div
                                        className="absolute inset-0 rounded-full border border-slate-200/60"
                                    />

                                    {featuresData.map((item, index) => {
                                        const isActive = activeSection === item.id;
                                        const angle = index * (360 / featuresData.length);
                                        const radius = 100; // half of 200px
                                        const xPos = Math.round(Math.cos((angle * Math.PI) / 180) * radius * 100) / 100;
                                        const yPos = Math.round(Math.sin((angle * Math.PI) / 180) * radius * 100) / 100;

                                        return (
                                            <div
                                                key={item.id}
                                                className="absolute flex items-center justify-center"
                                                style={{
                                                    width: "36px",
                                                    height: "36px",
                                                    // Position on the circle circumference
                                                    left: `calc(50% + ${xPos}px - 18px)`,
                                                    top: `calc(50% + ${yPos}px - 18px)`,
                                                    // Counter-rotate so text stays upright
                                                    transform: `rotate(${(activeSection - 1) * (360 / featuresData.length)}deg)`,
                                                    transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                                                }}
                                            >
                                                <span
                                                    className={`text-[13px] font-bold tracking-wider transition-all duration-500 ${isActive ? `${item.themeClasses.text} scale-125` : 'text-slate-300 scale-100'
                                                        }`}
                                                >
                                                    {item.num}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Active section label — positioned to the right of the disk */}
                                <div
                                    className="absolute flex items-center"
                                    style={{ left: "70px", top: '50%', transform: 'translateY(-50%)' }}
                                >
                                    {featuresData.map((item) => {
                                        const isActive = activeSection === item.id;
                                        return (
                                            <span
                                                key={item.id}
                                                className={`absolute whitespace-nowrap text-xs font-medium text-slate-900 transition-all duration-400 ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
                                                    }`}
                                                style={{ pointerEvents: isActive ? 'auto' : 'none' }}
                                            >
                                                {item.sidebarLabel}
                                            </span>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* --- RIGHT CONTENT AREA --- */}
                    <div className="flex-1 w-full max-w-5xl mx-auto px-6 lg:pl-32 xl:pl-16 relative h-[60vh] md:h-[70vh]">

                        {featuresData.map((section) => {
                            const isActive = activeSection === section.id;
                            const isPast = section.id < activeSection;

                            // Original CSS Animation Classes restored exactly as requested
                            let animationClass = "";
                            if (isActive) {
                                animationClass = "opacity-100 translate-y-0 transition-all duration-700 delay-300 ease-out z-10 pointer-events-auto";
                            } else if (isPast) {
                                animationClass = "opacity-0 -translate-y-12 transition-all duration-300 ease-in z-0 pointer-events-none";
                            } else {
                                animationClass = "opacity-0 translate-y-12 transition-all duration-300 ease-in z-0 pointer-events-none";
                            }

                            return (
                                <div
                                    key={section.id}
                                    className={`absolute inset-0 flex flex-col justify-center ${animationClass}`}
                                >
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                                        {/* Text Content */}
                                        <div>
                                            <h2 className={`text-[4rem] font-light leading-none mb-4 transition-colors duration-500 ${section.themeClasses.text}`}>
                                                {section.num}
                                            </h2>
                                            <h3 className="text-4xl font-bold tracking-tight mb-6 leading-tight text-slate-900">
                                                {section.title}
                                            </h3>
                                            <p className="text-slate-500 leading-relaxed text-lg">
                                                {section.description}
                                            </p>
                                        </div>

                                        {/* UI Mockups with Staggered Framer Motion */}
                                        <motion.div
                                            className="relative"
                                            variants={containerVariants}
                                            initial="hidden"
                                            animate={isActive ? "show" : "hidden"}
                                        >
                                            {/* 01: Connect Data */}
                                            {section.id === 1 && (
                                                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                                                    <motion.p variants={itemVariants} className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Data Sources</motion.p>
                                                    <div className="grid grid-cols-3 gap-3 mb-6">
                                                        <motion.div variants={itemVariants} className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-5 flex flex-col items-center gap-2">
                                                            <Database size={24} className="text-indigo-400" />
                                                            <span className="text-[10px] font-semibold text-indigo-900">PostgreSQL</span>
                                                        </motion.div>
                                                        <motion.div variants={itemVariants} className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-5 flex flex-col items-center gap-2">
                                                            <Table size={24} className="text-emerald-500" />
                                                            <span className="text-[10px] font-semibold text-emerald-900">Google Sheets</span>
                                                        </motion.div>
                                                        <motion.div variants={itemVariants} className="bg-sky-50/50 border border-sky-100 rounded-xl p-5 flex flex-col items-center gap-2">
                                                            <Server size={24} className="text-sky-400" />
                                                            <span className="text-[10px] font-semibold text-sky-900">MySQL</span>
                                                        </motion.div>
                                                    </div>
                                                    <motion.div variants={itemVariants} className="bg-indigo-50/50 rounded-xl p-3 flex items-center gap-2 text-indigo-600 text-xs font-medium">
                                                        <Clock size={14} /> Scheduled sync: Every 6 hours
                                                    </motion.div>
                                                </div>
                                            )}

                                            {/* 02: Schema Explorer */}
                                            {section.id === 2 && (
                                                <div className="space-y-4">
                                                    <motion.div variants={itemVariants} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                                                        <div className="flex items-center gap-2 text-sm font-bold text-slate-800 mb-4">
                                                            <Database size={16} className={section.themeClasses.text} /> Schema Explorer
                                                        </div>
                                                        <div className="space-y-2">
                                                            {['customers', 'orders', 'products'].map((table, i) => (
                                                                <div key={i} className="flex justify-between items-center p-3 rounded-xl border border-slate-100 bg-slate-50/50">
                                                                    <span className="text-xs font-mono text-slate-600">{table}</span>
                                                                    <span className="text-[10px] text-slate-400">{12 - (i * 2)} columns</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </motion.div>
                                                    <motion.div variants={itemVariants} className="bg-purple-50/50 border border-purple-100 p-3 rounded-xl text-xs font-medium text-purple-600">
                                                        Data Dictionary: 28 columns enriched with business context
                                                    </motion.div>
                                                </div>
                                            )}

                                            {/* 03: Goals */}
                                            {section.id === 3 && (
                                                <div className="space-y-3">
                                                    {[
                                                        { label: "Revenue Target", val: "$4.5M", pct: "96%", color: "bg-emerald-500", text: "text-emerald-500" },
                                                        { label: "Customer Retention", val: "97%", pct: "94%", color: "bg-amber-500", text: "text-amber-500" },
                                                        { label: "NPS Score", val: "75+", pct: "81%", color: "bg-red-500", text: "text-red-500" }
                                                    ].map((goal, i) => (
                                                        <motion.div variants={itemVariants} key={i} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
                                                            <div className="flex justify-between items-end mb-2">
                                                                <span className="text-xs font-semibold text-slate-600">{goal.label}</span>
                                                                <span className="text-sm font-bold text-slate-900">{goal.val}</span>
                                                            </div>
                                                            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden mb-1">
                                                                {/* Progress Bar Animation */}
                                                                <motion.div
                                                                    className={`h-full ${goal.color}`}
                                                                    initial={{ width: 0 }}
                                                                    animate={isActive ? { width: goal.pct } : { width: 0 }}
                                                                    transition={{ duration: 1.2, delay: 0.6 + (i * 0.2), ease: "easeOut" }}
                                                                />
                                                            </div>
                                                            <div className={`text-[10px] font-bold text-right ${goal.text}`}>{goal.pct}</div>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            )}

                                            {/* 04: Smart Reports */}
                                            {section.id === 4 && (
                                                <motion.div variants={itemVariants} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                                                    <div className="border border-sky-100 bg-sky-50/30 rounded-xl p-3 mb-4 flex items-center gap-3">
                                                        <MessageSquare size={16} className="text-sky-400 shrink-0" />
                                                        <div className="flex items-center text-xs text-slate-500 overflow-hidden w-full">
                                                            {/* Typewriter Effect */}
                                                            <motion.div
                                                                initial={{ width: 0 }}
                                                                animate={isActive ? { width: "100%" } : { width: 0 }}
                                                                transition={{ duration: 1.5, delay: 0.6, ease: "linear" }}
                                                                className="overflow-hidden whitespace-nowrap"
                                                            >
                                                                Show me this month's sales breakdown
                                                            </motion.div>
                                                            <span className="animate-pulse ml-0.5 text-sky-400 font-bold">|</span>
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-3">
                                                        <motion.div variants={itemVariants} className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-center">
                                                            <div className="text-sm font-bold text-sky-600 mb-1">24 reports</div>
                                                            <div className="text-[10px] font-semibold text-sky-400 uppercase tracking-wider">Pre-built</div>
                                                        </motion.div>
                                                        <motion.div variants={itemVariants} className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-4 text-center">
                                                            <div className="text-sm font-bold text-emerald-600 mb-1">12 new</div>
                                                            <div className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider">AI-generated</div>
                                                        </motion.div>
                                                    </div>
                                                </motion.div>
                                            )}

                                            {/* 05: Interactive */}
                                            {section.id === 5 && (
                                                <div className="space-y-3">
                                                    <motion.div variants={itemVariants} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                                                        <div className="flex justify-between items-center mb-6">
                                                            <span className="text-sm font-bold text-slate-800">Q4 Revenue Report</span>
                                                            <span className="bg-amber-50 text-amber-600 text-[10px] font-bold px-2 py-1 rounded">Professional</span>
                                                        </div>
                                                        <div className="space-y-4">
                                                            <div className="flex justify-between items-center border-b border-slate-50 pb-3">
                                                                <span className="text-xs text-slate-500">Revenue</span>
                                                                <span className="text-sm font-bold text-slate-900">$4.32M <span className="text-emerald-500 text-xs font-normal">+12%</span></span>
                                                            </div>
                                                            <div className="flex justify-between items-center">
                                                                <span className="text-xs text-slate-500">Margin</span>
                                                                <span className="text-sm font-bold text-slate-900">68.2% <span className="text-emerald-500 text-xs font-normal">+3.2%</span></span>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                    <motion.div variants={itemVariants} className="bg-amber-50/50 border border-amber-100 rounded-xl p-3 flex items-center gap-2 text-xs text-amber-600">
                                                        <MessageSquare size={14} /> Ask follow-up: "Why did margin improve?"
                                                    </motion.div>
                                                </div>
                                            )}

                                            {/* 06: Voice & Call */}
                                            {section.id === 6 && (
                                                <div className="space-y-3">
                                                    <motion.div variants={itemVariants} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                                                        <div className="flex justify-between items-start mb-6">
                                                            <div className="flex gap-3">
                                                                <div className="bg-pink-50 p-2 rounded-full text-pink-500"><Volume2 size={16} /></div>
                                                                <div>
                                                                    <div className="text-sm font-bold text-slate-900">Call #2847</div>
                                                                    <div className="text-[10px] text-slate-400">Agent: Sarah M. • 12:34</div>
                                                                </div>
                                                            </div>
                                                            <span className="bg-emerald-50 text-emerald-600 text-[10px] font-bold px-2 py-1 rounded">compliant</span>
                                                        </div>

                                                        {/* Fluctuating Audio Bars Animation */}
                                                        <div className="flex items-center justify-center gap-1 h-12 mb-6">
                                                            {[12, 16, 24, 10, 20, 32, 16, 12, 8, 28, 36, 20, 12, 8, 16, 28, 14, 10].map((h, i) => (
                                                                <motion.div
                                                                    key={i}
                                                                    className="w-1.5 bg-pink-400 rounded-full"
                                                                    initial={{ height: 4 }}
                                                                    animate={isActive ? { height: [h * 0.4, h, h * 0.6, h * 0.9, h * 0.4] } : { height: 4 }}
                                                                    transition={{
                                                                        duration: 1.2 + (i % 4) * 0.2,
                                                                        repeat: Infinity,
                                                                        repeatType: "mirror",
                                                                        ease: "easeInOut",
                                                                        delay: 0.4
                                                                    }}
                                                                />
                                                            ))}
                                                        </div>

                                                        <div className="flex gap-2">
                                                            <span className="text-[10px] bg-pink-50 text-pink-600 px-2 py-1 rounded-full font-medium">best pitch</span>
                                                            <span className="text-[10px] bg-slate-50 border border-slate-100 text-slate-500 px-2 py-1 rounded-full font-medium">policy ✓</span>
                                                            <span className="text-[10px] bg-slate-50 border border-slate-100 text-slate-500 px-2 py-1 rounded-full font-medium">sentiment +</span>
                                                        </div>
                                                    </motion.div>
                                                    <motion.div variants={itemVariants} className="bg-pink-50/50 border border-pink-100 rounded-xl p-3 text-[10px] font-medium text-pink-600">
                                                        AI: Agent used ideal pitch. Best call window: Tue 10-11am.
                                                    </motion.div>
                                                </div>
                                            )}

                                            {/* 07: Analytics & Insights */}
                                            {section.id === 7 && (
                                                <div className="space-y-3">
                                                    <motion.div variants={itemVariants} className="bg-red-50/30 border border-red-100 p-4 rounded-2xl">
                                                        <div className="flex items-center gap-2 text-[10px] font-bold text-red-600 uppercase mb-1">
                                                            <LineChart size={12} /> Analytics
                                                        </div>
                                                        <div className="text-sm font-bold text-slate-900 mb-1">Revenue up 12% QoQ</div>
                                                        <div className="text-[10px] text-slate-500">APAC region driving 60% of growth</div>
                                                    </motion.div>
                                                    <motion.div variants={itemVariants} className="bg-amber-50/30 border border-amber-100 p-4 rounded-2xl">
                                                        <div className="flex items-center gap-2 text-[10px] font-bold text-amber-600 uppercase mb-1">
                                                            <Zap size={12} /> Insight
                                                        </div>
                                                        <div className="text-sm font-bold text-slate-900 mb-1">Churn risk in SMB tier</div>
                                                        <div className="text-[10px] text-slate-500">Pricing sensitivity detected in $50-100/mo</div>
                                                    </motion.div>
                                                    <motion.div variants={itemVariants} className="bg-emerald-50/30 border border-emerald-100 p-4 rounded-2xl">
                                                        <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-600 uppercase mb-1">
                                                            <Target size={12} /> Action
                                                        </div>
                                                        <div className="text-sm font-bold text-slate-900 mb-1">Launch retention program</div>
                                                        <div className="text-[10px] text-slate-500">Target: 200 at-risk accounts this quarter</div>
                                                    </motion.div>
                                                </div>
                                            )}

                                            {/* 08: Goal Progress & Nudges */}
                                            {section.id === 8 && (
                                                <div className="space-y-3">
                                                    <motion.div variants={itemVariants} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                                                        <div className="flex justify-between items-end mb-6">
                                                            <span className="text-sm font-bold text-slate-800">Goal Progress</span>
                                                            <span className="text-[10px] font-bold text-teal-600">3 of 5 on track</span>
                                                        </div>
                                                        <div className="space-y-4">
                                                            <div>
                                                                <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                                                                    <span>Revenue</span><span className="text-teal-600 font-bold">96%</span>
                                                                </div>
                                                                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                                    <motion.div className="h-full bg-teal-500" initial={{ width: 0 }} animate={isActive ? { width: "96%" } : { width: 0 }} transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }} />
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                                                                    <span>Retention</span><span className="text-amber-500 font-bold">94%</span>
                                                                </div>
                                                                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                                    <motion.div className="h-full bg-amber-500" initial={{ width: 0 }} animate={isActive ? { width: "94%" } : { width: 0 }} transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }} />
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                                                                    <span>NPS</span><span className="text-red-500 font-bold">81%</span>
                                                                </div>
                                                                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                                    <motion.div className="h-full bg-red-500" initial={{ width: 0 }} animate={isActive ? { width: "81%" } : { width: 0 }} transition={{ duration: 1.2, delay: 1.0, ease: "easeOut" }} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                    <motion.div variants={itemVariants} className="bg-teal-50 border border-teal-100 rounded-xl p-3 flex items-start gap-2 text-[10px] font-medium text-teal-700 leading-relaxed">
                                                        <AlertCircle size={14} className="shrink-0 mt-0.5" />
                                                        Nudge: NPS trending up after onboarding changes. Maintain focus to hit 75+ by quarter end.
                                                    </motion.div>
                                                </div>
                                            )}

                                            {/* 09: Save & Schedule */}
                                            {section.id === 9 && (
                                                <div className="space-y-3">
                                                    <motion.div variants={itemVariants} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                                                        <div className="flex items-center gap-2 text-sm font-bold text-slate-800 mb-6">
                                                            <Calendar size={16} className="text-fuchsia-500" /> Scheduled Reports
                                                        </div>
                                                        <div className="space-y-4">
                                                            <motion.div variants={itemVariants} className="flex justify-between items-center border-b border-slate-50 pb-4">
                                                                <div>
                                                                    <div className="text-sm font-bold text-slate-900">Weekly Sales</div>
                                                                    <div className="text-[10px] text-slate-400">Every Monday 9am</div>
                                                                </div>
                                                                <ToggleRight size={32} className="text-fuchsia-500" fill="#d946ef" strokeWidth={1} />
                                                            </motion.div>
                                                            <motion.div variants={itemVariants} className="flex justify-between items-center border-b border-slate-50 pb-4">
                                                                <div>
                                                                    <div className="text-sm font-bold text-slate-900">Monthly Summary</div>
                                                                    <div className="text-[10px] text-slate-400">1st of month</div>
                                                                </div>
                                                                <ToggleRight size={32} className="text-fuchsia-500" fill="#d946ef" strokeWidth={1} />
                                                            </motion.div>
                                                            <motion.div variants={itemVariants} className="flex justify-between items-center">
                                                                <div>
                                                                    <div className="text-sm font-bold text-slate-900">Daily KPIs</div>
                                                                    <div className="text-[10px] text-slate-400">Every day 8am</div>
                                                                </div>
                                                                <ToggleRight size={32} className="text-slate-200" fill="#f1f5f9" strokeWidth={1} />
                                                            </motion.div>
                                                        </div>
                                                    </motion.div>
                                                    <motion.div variants={itemVariants} className="bg-fuchsia-50/50 border border-fuchsia-100 rounded-xl p-3 flex items-center gap-2 text-[10px] font-medium text-fuchsia-600">
                                                        <MessageSquare size={14} /> Delivered to 5 team members via email
                                                    </motion.div>
                                                </div>
                                            )}

                                            {/* 10: Business Pulse */}
                                            {section.id === 10 && (
                                                <div className="space-y-3">
                                                    <motion.div variants={itemVariants} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                                                        <div className="flex justify-between items-center mb-6">
                                                            <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
                                                                <BarChart3 size={16} className="text-orange-500" /> Business Pulse
                                                            </div>
                                                            <span className="bg-orange-50 text-orange-600 text-[10px] font-bold px-2 py-0.5 rounded border border-orange-100">Live</span>
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-3">
                                                            <motion.div variants={itemVariants} className="border border-slate-100 rounded-xl p-4 text-center">
                                                                <div className="text-2xl font-bold text-emerald-500 mb-1">87/100</div>
                                                                <div className="text-[10px] text-slate-400 uppercase font-semibold">Health Score</div>
                                                            </motion.div>
                                                            <motion.div variants={itemVariants} className="border border-slate-100 rounded-xl p-4 text-center">
                                                                <div className="text-2xl font-bold text-orange-500 mb-1">142</div>
                                                                <div className="text-[10px] text-slate-400 uppercase font-semibold">Reports Used</div>
                                                            </motion.div>
                                                            <motion.div variants={itemVariants} className="border border-slate-100 rounded-xl p-4 text-center">
                                                                <div className="text-2xl font-bold text-sky-500 mb-1">8/12</div>
                                                                <div className="text-[10px] text-slate-400 uppercase font-semibold">Goals on Track</div>
                                                            </motion.div>
                                                            <motion.div variants={itemVariants} className="border border-slate-100 rounded-xl p-4 text-center">
                                                                <div className="text-2xl font-bold text-red-500 mb-1">3</div>
                                                                <div className="text-[10px] text-slate-400 uppercase font-semibold">Risks Flagged</div>
                                                            </motion.div>
                                                        </div>
                                                    </motion.div>
                                                    <motion.div variants={itemVariants} className="bg-orange-50/50 border border-orange-100 rounded-xl p-3 text-[10px] font-medium text-orange-700 leading-relaxed">
                                                        Summary: Overall business health is strong. Focus areas: SMB retention and NPS improvement.
                                                    </motion.div>
                                                </div>
                                            )}

                                            {/* 11: Talk to Us / Demo */}
                                            {section.id === 11 && (
                                                <motion.div variants={itemVariants} className="bg-white p-10 rounded-3xl border border-slate-100 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] flex flex-col items-center justify-center text-center">
                                                    <motion.div variants={itemVariants} className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-indigo-500/30 mb-6">
                                                        <Video size={28} />
                                                    </motion.div>
                                                    <motion.h4 variants={itemVariants} className="text-xl font-bold text-slate-900 mb-2">Book a Live Demo</motion.h4>
                                                    <motion.p variants={itemVariants} className="text-xs text-slate-500 mb-6">See your data come alive in 30 minutes</motion.p>
                                                    <motion.button variants={itemVariants} className="bg-indigo-600 hover:bg-indigo-700 transition-colors text-white px-6 py-3 rounded-full text-sm font-medium w-full shadow-md">
                                                        Schedule Now →
                                                    </motion.button>
                                                </motion.div>
                                            )}

                                        </motion.div>
                                    </div>
                                </div>
                            );
                        })}

                    </div>
                </div>
            </div>

            {/* The Invisible Scroll Track */}
            <div className="relative w-full -mt-[100vh]">
                {featuresData.map((section) => (
                    <div
                        key={`scroll-track-${section.id}`}
                        ref={(el) => { sectionRefs.current[section.id - 1] = el }}
                        data-index={section.id}
                        className="h-screen w-full pointer-events-none"
                    />
                ))}
            </div>

        </section>
    );
}