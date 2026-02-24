"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimate, AnimatePresence } from 'framer-motion';
import { Sparkles, Mic, Play, Pause, Phone } from 'lucide-react';

// Custom SVG for the "Folded Palm" (Grab) cursor
const GrabCursor = ({ className }: { className?: string }) => (
    <svg className={className} width="28" height="28" viewBox="0 0 24 24" fill="white" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 15V5a2 2 0 0 1 4 0v4" />
        <path d="M14 10V6.5a2 2 0 0 1 4 0v4" />
        <path d="M18 11V8.5a2 2 0 0 1 4 0v5.5a7 7 0 0 1-7 7H9.5a5.5 5.5 0 0 1-4.78-8.25l2.84-4.74A2 2 0 0 1 10 9.5V15z" />
    </svg>
);

// Audio Waveform component
const AudioWaveform = () => {
    const bars = [3, 6, 4, 8, 5, 7, 3, 9, 4, 6, 8, 3, 7, 5, 9, 4, 6, 3, 8, 5, 7, 4, 6, 8, 3];
    return (
        <div className="flex items-center gap-[2px] h-6">
            {bars.map((height, i) => (
                <motion.div
                    key={i}
                    className="w-[3px] bg-violet-500 rounded-full"
                    animate={{ height: [`${height}px`, `${height * 2.5}px`, `${height}px`] }}
                    transition={{
                        duration: 0.6 + Math.random() * 0.4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.05,
                    }}
                />
            ))}
        </div>
    );
};

const BADGE_TEXTS = [
    "Surface the volume",
    "Measure every second",
    "Find the pattern",
    "Read the room",
    "Decode what matters",
    "Rank who delivers",
    "Go deeper",
    "Open the conversation",
    "Listen to them",
];

export default function VoiceAnalyticsDashboard() {
    const [scope, animate] = useAnimate();
    const [stepIndex, setStepIndex] = useState(0);
    // Phase 0: collapsed, Phase 1: recent calls list visible, Phase 2: first call expanded (summary+tags), Phase 3: audio waveform visible
    const [expandPhase, setExpandPhase] = useState(0);
    const animationRef = useRef<boolean>(true);

    useEffect(() => {
        animationRef.current = true;

        const runAnimationSequence = async () => {
            await new Promise(r => setTimeout(r, 800));

            const sequence = [
                { class: ".va-total-calls", x: "15%", y: "18%", color: "#7c3aed", bg: "rgba(124, 58, 237, 0.05)" },
                { class: ".va-total-duration", x: "40%", y: "18%", color: "#7c3aed", bg: "rgba(124, 58, 237, 0.05)" },
                { class: ".va-avg-duration", x: "65%", y: "18%", color: "#7c3aed", bg: "rgba(124, 58, 237, 0.05)" },
                { class: ".va-sentiment", x: "88%", y: "18%", color: "#7c3aed", bg: "rgba(124, 58, 237, 0.05)" },
                { class: ".va-topics", x: "28%", y: "50%", color: "#7c3aed", bg: "rgba(124, 58, 237, 0.05)" },
                { class: ".va-agents", x: "75%", y: "50%", color: "#7c3aed", bg: "rgba(124, 58, 237, 0.05)" },
                // Step 7: Go deeper — cursor on Call Intelligence Insight, then expand
                { class: ".va-expand", x: "45%", y: "75%", color: "#7c3aed", bg: "rgba(124, 58, 237, 0.05)", phase: 1 },
                // Step 8: Open the conversation — expand first call details
                { class: ".va-recent-calls", x: "50%", y: "55%", color: "#7c3aed", bg: "rgba(124, 58, 237, 0.05)", phase: 2 },
                // Step 9: Listen to them — show audio waveform
                { class: ".va-audio-trigger", x: "50%", y: "62%", color: "#7c3aed", bg: "rgba(124, 58, 237, 0.05)", phase: 3 },
            ];

            const smoothEase: [number, number, number, number] = [0.25, 0.1, 0.25, 1.0];

            while (animationRef.current) {
                // Force collapse everything at the start of each loop
                setExpandPhase(0);
                setStepIndex(0);
                // Wait for AnimatePresence exit to fully complete
                await new Promise(r => setTimeout(r, 1200));

                for (let i = 0; i < sequence.length; i++) {
                    if (!animationRef.current) return;
                    const step = sequence[i];

                    try {
                        const cursorMove = animate(".va-cursor", { left: step.x, top: step.y }, { duration: 1.2, ease: smoothEase });
                        animate(step.class, { borderColor: step.color, backgroundColor: step.bg }, { duration: 0.5, ease: "easeOut" });
                        animate(".va-ripple", { left: step.x, top: step.y, opacity: 1, scale: 0 }, { duration: 0 });

                        await cursorMove;
                        if (!animationRef.current) return;

                        const clickDown = animate(".va-cursor", { scale: 0.9 }, { duration: 0.3, ease: "easeInOut" });
                        animate(".va-ripple", { opacity: 0, scale: 2.5 }, { duration: 0.6, ease: "easeOut" });
                        await clickDown;
                        if (!animationRef.current) return;

                        setStepIndex(i);

                        // Trigger expand phase AFTER the click
                        if (step.phase) {
                            setExpandPhase(step.phase);
                            await new Promise(r => setTimeout(r, 500));
                        }

                        await animate(".va-cursor", { scale: 1 }, { duration: 0.3, ease: "easeInOut" });
                        if (!animationRef.current) return;

                        await new Promise(r => setTimeout(r, 1200));

                        await animate(step.class, { borderColor: "transparent", backgroundColor: "transparent" }, { duration: 0.4, ease: "easeInOut" });
                    } catch {
                        // Animation element was removed (e.g. during collapse) — break inner loop, while loop restarts
                        break;
                    }
                }
            }
        };

        runAnimationSequence();

        return () => {
            animationRef.current = false;
        };
    }, [animate]);

    const agents = [
        { initials: "JK", name: "James K.", calls: 245, sent: 72, res: 89, color: "bg-violet-200 text-violet-700" },
        { initials: "LR", name: "Lisa R.", calls: 218, sent: 78, res: 94, color: "bg-violet-200 text-violet-700" },
        { initials: "AT", name: "Anna T.", calls: 196, sent: 85, res: 91, color: "bg-violet-200 text-violet-700" },
        { initials: "MD", name: "Mark D.", calls: 188, sent: 68, res: 86, color: "bg-violet-200 text-violet-700" },
    ];

    const topics = [
        { name: "Renewals & Upsells", count: 198, pct: 23, width: "100%" },
        { name: "Technical Support", count: 172, pct: 20, width: "87%" },
        { name: "Onboarding", count: 144, pct: 17, width: "73%" },
        { name: "Billing Inquiries", count: 119, pct: 14, width: "60%" },
        { name: "Feature Requests", count: 112, pct: 13, width: "57%" },
        { name: "Churn / Escalation", count: 102, pct: 12, width: "52%" },
    ];

    const recentCalls = [
        { name: "Sarah Mitchell", sentiment: "positive", topic: "Enterprise renewal discussion", time: "12:34", date: "Feb 12", tags: ["renewal", "discount", "expansion"], summary: "Customer confirmed renewal for 2-year term." },
        { name: "David Chen", sentiment: "neutral", topic: "Onboarding follow-up", time: "8:17", date: "Feb 12", tags: [], summary: "" },
        { name: "Emily Rodriguez", sentiment: "negative", topic: "Billing escalation", time: "22:05", date: "Feb 11", tags: [], summary: "" },
    ];

    return (
        <div className="relative w-full" ref={scope}>
            {/* Progress Bar */}
            <div className="flex items-center justify-center gap-2 mb-4 z-20 w-full max-w-[750px] mx-auto">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((dot) => (
                    <motion.div
                        key={dot}
                        layout
                        className={`rounded-full transition-all duration-300 ${dot === stepIndex ? 'w-5 h-1.5 bg-violet-500' : 'w-1.5 h-1.5 bg-[#cbd5e1]'
                            }`}
                    />
                ))}
            </div>

            <div className="relative w-full max-w-[750px] mx-auto transform lg:scale-[0.8] xl:scale-[0.85] origin-top rounded-2xl">

                {/* Floating Card - Top Right (Signals Found) */}
                <motion.div
                    animate={{ y: [-6, 6, -6] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-4 -right-10 bg-white px-5 py-4 rounded-[1.25rem] shadow-[0_15px_40px_-15px_rgba(0,0,0,0.15)] border border-slate-100/80 w-48 z-30 hidden md:block"
                >
                    <p className="text-[8px] text-slate-400 uppercase font-bold tracking-widest mb-1">Signals Found</p>
                    <p className="text-[1.5rem] font-bold text-slate-900 mb-1 leading-none">2,419</p>
                    <p className="text-[11px] text-violet-600 font-semibold">from 847 conversations</p>
                </motion.div>

                {/* Floating Card - Bottom Left (Silent Churn) */}
                <motion.div
                    animate={{ y: [6, -6, 6] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    className="absolute bottom-6 -left-12 bg-white px-5 py-4 rounded-[1.25rem] shadow-[0_15px_40px_-15px_rgba(0,0,0,0.15)] border border-slate-100/80 z-30 hidden md:block"
                >
                    <p className="text-[10px] text-red-500 uppercase font-bold tracking-widest mb-1.5">Silent Churn</p>
                    <p className="text-lg font-bold text-slate-900 mb-3 leading-tight">Detected early</p>
                    <div className="flex gap-1.5 w-full">
                        <div className="h-1.5 flex-1 bg-red-500 rounded-full"></div>
                        <div className="h-1.5 flex-1 bg-red-500 rounded-full"></div>
                        <div className="h-1.5 flex-1 bg-red-400 rounded-full"></div>
                        <div className="h-1.5 flex-1 bg-slate-200 rounded-full"></div>
                    </div>
                </motion.div>

                {/* Ripple Effect */}
                <motion.div
                    className="va-ripple absolute z-40 w-10 h-10 rounded-full border-2 border-violet-400 bg-violet-300/30 pointer-events-none opacity-0"
                    style={{ marginLeft: -20, marginTop: -20, left: "50%", top: "50%" }}
                />

                {/* Custom Cursor */}
                <motion.div
                    className="va-cursor absolute z-50 pointer-events-none drop-shadow-xl"
                    initial={{ left: "60%", top: "80%" }}
                    style={{ originX: 0.3, originY: 0.1 }}
                >
                    <GrabCursor className="drop-shadow-lg" />
                </motion.div>

                {/* Main Dashboard UI */}
                <motion.div
                    className="bg-white rounded-2xl border border-slate-200 overflow-hidden relative shadow-[0_25px_60px_-15px_rgba(0,0,0,0.1)]"
                    layout
                    transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] }}
                >
                    {/* Title Bar */}
                    <div className="bg-[#111827] px-4 py-2.5 flex items-center">
                        <div className="flex gap-1.5 w-1/3">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                        </div>
                        <div className="w-1/3 text-center text-[10px] text-slate-400 font-medium tracking-wide">
                            callInsight.ai/dashboard
                        </div>
                    </div>

                    <div className="p-4 md:p-5">
                        {/* Header */}
                        <div className="flex justify-between items-start mb-3 px-1">
                            <div className="flex gap-2">
                                <div className="mt-0.5 text-violet-500"><Mic size={16} /></div>
                                <div>
                                    <h3 className="font-bold text-sm text-slate-900">Call Intelligence Dashboard</h3>
                                    <p className="text-[10px] text-slate-400">847 call recordings processed</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] border border-emerald-200 text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full font-medium">Auto-transcribed</span>
                                <span className="text-[10px] border border-violet-200 text-violet-700 bg-violet-50 px-3 py-1 rounded-full font-medium">Sentiment analyzed</span>
                            </div>
                        </div>

                        {/* Stat Cards Row */}
                        <div className="grid grid-cols-4 gap-3 mb-3 px-1">
                            {/* Total Calls */}
                            <div className="va-total-calls border-2 border-transparent rounded-2xl p-2.5 bg-slate-50/50 transition-colors duration-500">
                                <p className="text-[9px] text-slate-400 uppercase font-bold tracking-wider mb-1">Total Calls</p>
                                <div className="flex items-center gap-2">
                                    <p className="text-xl font-bold text-slate-900">847</p>
                                    <Phone size={14} className="text-slate-400" />
                                </div>
                                <p className="text-[9px] text-violet-600 mt-1 font-medium">This quarter</p>
                            </div>

                            {/* Total Duration */}
                            <div className="va-total-duration border-2 border-transparent rounded-2xl p-2.5 bg-slate-50/50 transition-colors duration-500">
                                <p className="text-[9px] text-slate-400 uppercase font-bold tracking-wider mb-1">Total Duration</p>
                                <p className="text-xl font-bold text-slate-900">412h 23m</p>
                                <p className="text-[9px] text-violet-600 mt-1 font-medium">Recorded audio</p>
                            </div>

                            {/* Avg Duration */}
                            <div className="va-avg-duration border-2 border-transparent rounded-2xl p-2.5 bg-slate-50/50 transition-colors duration-500">
                                <p className="text-[9px] text-slate-400 uppercase font-bold tracking-wider mb-1">Avg Duration</p>
                                <p className="text-xl font-bold text-slate-900">14:32</p>
                                <p className="text-[9px] text-slate-500 mt-1 font-medium">Per call</p>
                            </div>

                            {/* Sentiment */}
                            <div className="va-sentiment border-2 border-transparent rounded-2xl p-2.5 bg-slate-50/50 transition-colors duration-500">
                                <p className="text-[9px] text-slate-400 uppercase font-bold tracking-wider mb-1">Sentiment</p>
                                <div className="flex h-2 rounded-full overflow-hidden mt-2 mb-1.5">
                                    <div className="bg-emerald-500 w-[52%]"></div>
                                    <div className="bg-amber-400 w-[31%]"></div>
                                    <div className="bg-red-500 w-[17%]"></div>
                                </div>
                                <div className="flex gap-2 text-[8px] font-bold">
                                    <span className="text-emerald-600">52% pos</span>
                                    <span className="text-amber-500">31% neu</span>
                                    <span className="text-red-500">17% neg</span>
                                </div>
                            </div>
                        </div>

                        {/* Middle Section: Topics + Agent Performance */}
                        <div className="grid grid-cols-2 gap-3 px-1 border-b border-slate-100 pb-3">
                            {/* Top Call Topics */}
                            <div className="va-topics border-2 border-transparent p-3 rounded-xl bg-white transition-colors duration-500">
                                <h4 className="text-xs font-bold text-slate-800 mb-3">Top Call Topics</h4>
                                <div className="space-y-2.5">
                                    {topics.map((topic, i) => (
                                        <div key={i}>
                                            <div className="flex justify-between text-[10px] mb-1">
                                                <span className="text-slate-600 font-medium">{topic.name}</span>
                                                <span className="text-slate-400">{topic.count} ({topic.pct}%)</span>
                                            </div>
                                            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                <motion.div
                                                    className="h-full bg-violet-500 rounded-full"
                                                    initial={{ width: 0 }}
                                                    animate={{ width: topic.width }}
                                                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 + i * 0.1 }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Agent Performance */}
                            <div className="va-agents border-2 border-transparent p-3 rounded-xl bg-white transition-colors duration-500">
                                <h4 className="text-xs font-bold text-slate-800 mb-3">Agent Performance</h4>
                                <div className="space-y-3">
                                    {agents.map((agent, i) => (
                                        <div key={i} className="flex items-center justify-between">
                                            <div className="flex items-center gap-2.5">
                                                <div className={`w-7 h-7 rounded-full ${agent.color} text-[9px] font-bold flex items-center justify-center`}>
                                                    {agent.initials}
                                                </div>
                                                <div>
                                                    <p className="text-[11px] font-semibold text-slate-800">{agent.name}</p>
                                                    <p className="text-[9px] text-slate-400">{agent.calls} calls</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[10px] text-slate-500">Sent: {agent.sent}%</p>
                                                <p className="text-[10px] text-red-500 font-bold">Res: {agent.res}%</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* AI Insight Banner */}
                        <div className="va-expand border-2 border-transparent rounded-xl p-3 mt-2 mx-1 bg-slate-50/80 transition-colors duration-500">
                            <div className="flex items-start gap-2">
                                <Sparkles size={14} className="text-violet-500 mt-0.5 flex-shrink-0" />
                                <p className="text-[10px] text-slate-600 leading-relaxed">
                                    <span className="font-bold text-slate-800">Call Intelligence Insight:</span> 12% of calls relate to churn/escalation, up from 8%. &quot;Competitor&quot; mentions increased 45%. Top driver: report performance on large datasets.
                                </p>
                            </div>
                        </div>

                        {/* ── PHASE 1: Recent Calls List (collapsed entries) ── */}
                        <AnimatePresence>
                            {expandPhase >= 1 && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] }}
                                    className="overflow-hidden"
                                >
                                    <div className="va-recent-calls border-2 border-transparent rounded-xl p-3 mt-2 mx-1 transition-colors duration-500">
                                        {/* Recent Calls Header */}
                                        <div className="flex items-center gap-2 mb-3">
                                            <h4 className="text-xs font-bold text-slate-800">Recent Calls</h4>
                                            <span className="text-[9px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-bold">8</span>
                                        </div>

                                        {/* Call List */}
                                        <div className="space-y-1">
                                            {recentCalls.map((call, i) => (
                                                <div key={i} className={`rounded-xl p-3 ${i === 0 && expandPhase >= 2 ? 'border border-violet-200 bg-violet-50/30' : i === 0 ? 'border border-slate-200 bg-white' : 'border border-transparent hover:bg-slate-50'} transition-all`}>
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-2.5">
                                                            <div className={`w-7 h-7 rounded-full flex items-center justify-center ${i === 0 && expandPhase >= 3 ? 'bg-violet-500' :
                                                                i === 0 ? 'bg-violet-100' : 'bg-slate-100'
                                                                }`}>
                                                                {i === 0 && expandPhase >= 3 ? (
                                                                    <Pause size={10} className="text-white" />
                                                                ) : (
                                                                    <Play size={10} className={i === 0 ? 'text-violet-600 ml-0.5' : 'text-slate-500 ml-0.5'} />
                                                                )}
                                                            </div>
                                                            <div>
                                                                <div className="flex items-center gap-2">
                                                                    <span className="text-[11px] font-semibold text-slate-800">{call.name}</span>
                                                                    <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${call.sentiment === 'positive' ? 'bg-emerald-100 text-emerald-700' :
                                                                        call.sentiment === 'neutral' ? 'text-slate-500' :
                                                                            'bg-red-100 text-red-600'
                                                                        }`}>{call.sentiment}</span>
                                                                </div>
                                                                <p className="text-[9px] text-slate-400">{call.topic}</p>
                                                            </div>
                                                        </div>
                                                        <div className="text-right text-[9px] text-slate-400">
                                                            <span>{call.time}</span>{' '}<span>{call.date}</span>
                                                        </div>
                                                    </div>

                                                    {/* ── PHASE 3: Audio Waveform (only for first call) ── */}
                                                    {i === 0 && expandPhase >= 3 && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: "auto", opacity: 1 }}
                                                            transition={{ duration: 0.4, ease: "easeOut" }}
                                                            className="mt-3 ml-9 overflow-hidden"
                                                        >
                                                            <div className="va-audio-trigger border-2 border-transparent rounded-lg p-2.5 mb-2 flex items-center gap-3 bg-slate-50 transition-colors duration-500">
                                                                <AudioWaveform />
                                                                <span className="text-[9px] text-violet-600 font-mono font-bold ml-auto">3:42 / 12:34</span>
                                                            </div>
                                                        </motion.div>
                                                    )}

                                                    {/* ── PHASE 2: Expanded first call details (AI Summary + Tags) ── */}
                                                    {i === 0 && expandPhase >= 2 && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: "auto", opacity: 1 }}
                                                            transition={{ duration: 0.4, ease: "easeOut" }}
                                                            className="mt-3 ml-9 overflow-hidden"
                                                        >
                                                            <div className="mb-2">
                                                                <p className="text-[9px] text-slate-400 font-medium mb-0.5">AI Summary</p>
                                                                <p className="text-[10px] text-slate-600">{call.summary}</p>
                                                            </div>
                                                            <div className="flex gap-1.5">
                                                                {call.tags.map((tag, j) => (
                                                                    <span key={j} className="text-[9px] border border-violet-200 text-violet-600 px-2.5 py-0.5 rounded-full bg-violet-50 font-medium">{tag}</span>
                                                                ))}
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </div>
                                            ))}

                                            <p className="text-center text-[10px] text-slate-400 mt-2 font-medium">+ 5 more calls</p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Bottom bar */}
                    <div className="flex justify-between items-center px-5 py-2 border-t border-slate-100">
                        <div className="text-[10px] text-violet-600 font-medium flex items-center gap-1.5">
                            <Sparkles size={12} /> View Call List & Analytics
                        </div>
                        <span className="text-[9px] border border-slate-200 text-slate-500 px-3 py-1 rounded-full bg-white font-medium">8 recent</span>
                    </div>
                </motion.div>

                {/* Bottom Badge */}
                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex justify-center w-full z-50">
                    <motion.div
                        key={stepIndex}
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1.0] }}
                        className="bg-[#111827] text-white pl-4 pr-5 py-2.5 rounded-full shadow-2xl text-[13px] font-medium flex items-center gap-3 whitespace-nowrap border border-slate-700/50"
                    >
                        <div className="bg-violet-500/20 p-1.5 rounded-full">
                            <Mic size={14} className="text-violet-400" />
                        </div>
                        {BADGE_TEXTS[stepIndex]}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
