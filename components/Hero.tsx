"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useAnimate, AnimatePresence } from 'framer-motion';
import {
  Sparkles, Lock, ArrowRight, FileText, Mic, CheckCircle2, AlertTriangle, MessageSquare, Zap, Target, Phone, Headphones, BarChart3
} from 'lucide-react';
import Link from 'next/link';
import VoiceAnalyticsDashboard from './VoiceAnalyticsDashboard';

// Custom SVG for the "Folded Palm" (Grab) cursor
const GrabCursor = ({ className }: { className?: string }) => (
  <svg className={className} width="28" height="28" viewBox="0 0 24 24" fill="white" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 15V5a2 2 0 0 1 4 0v4" />
    <path d="M14 10V6.5a2 2 0 0 1 4 0v4" />
    <path d="M18 11V8.5a2 2 0 0 1 4 0v5.5a7 7 0 0 1-7 7H9.5a5.5 5.5 0 0 1-4.78-8.25l2.84-4.74A2 2 0 0 1 10 9.5V15z" />
  </svg>
);

// ── ReportSense Dashboard (extracted from the original) ──
function ReportSenseDashboard() {
  const [scope, animate] = useAnimate();
  const [activeBadge, setActiveBadge] = useState("Ask it in plain English");
  const [stepIndex, setStepIndex] = useState(0);
  const animationRef = useRef<boolean>(true);

  useEffect(() => {
    animationRef.current = true;

    const runAnimationSequence = async () => {
      await new Promise(r => setTimeout(r, 800));

      const sequence = [
        { class: ".box-prompt", x: "45%", y: "15%", text: "Ask it in plain English", color: "#10b981", bg: "rgba(16, 185, 129, 0.04)" },
        { class: ".box-goals", x: "45%", y: "30%", text: "AI sets your goals", color: "#10b981", bg: "rgba(16, 185, 129, 0.04)" },
        { class: ".box-revenue", x: "12%", y: "48%", text: "Validate against the goal", color: "#10b981", bg: "rgba(16, 185, 129, 0.04)" },
        { class: ".box-margin", x: "38%", y: "48%", text: "Track every metric", color: "#10b981", bg: "rgba(16, 185, 129, 0.04)" },
        { class: ".box-churn", x: "62%", y: "48%", text: "Surface the risk", color: "#ef4444", bg: "rgba(239, 68, 68, 0.04)" },
        { class: ".box-nps", x: "88%", y: "48%", text: "Measure satisfaction", color: "#10b981", bg: "rgba(16, 185, 129, 0.04)" },
        { class: ".box-opportunity", x: "25%", y: "65%", text: "Discover opportunities", color: "#10b981", bg: "rgba(16, 185, 129, 0.04)" },
        { class: ".box-risk", x: "75%", y: "65%", text: "Flag the warnings", color: "#ef4444", bg: "rgba(239, 68, 68, 0.04)" },
        { class: ".box-actions", x: "50%", y: "82%", text: "Dive into action", color: "#10b981", bg: "rgba(16, 185, 129, 0.04)" },
        { class: ".box-share", x: "75%", y: "94%", text: "Share with your team", color: "#10b981", bg: "rgba(16, 185, 129, 0.04)" },
      ];

      const smoothEase: [number, number, number, number] = [0.25, 0.1, 0.25, 1.0];

      while (animationRef.current) {
        for (let i = 0; i < sequence.length; i++) {
          if (!animationRef.current) return;
          const step = sequence[i];
          try {
            const cursorMove = animate(".custom-cursor", { left: step.x, top: step.y }, { duration: 1.2, ease: smoothEase });
            animate(step.class, { borderColor: step.color, backgroundColor: step.bg }, { duration: 0.5, ease: "easeOut" });
            animate(".ripple-effect", { left: step.x, top: step.y, opacity: 1, scale: 0 }, { duration: 0 });

            await cursorMove;
            if (!animationRef.current) return;

            const clickDown = animate(".custom-cursor", { scale: 0.9 }, { duration: 0.3, ease: "easeInOut" });
            animate(".ripple-effect", { opacity: 0, scale: 2.5 }, { duration: 0.6, ease: "easeOut" });
            await clickDown;
            if (!animationRef.current) return;

            setActiveBadge(step.text);
            setStepIndex(i);
            await animate(".custom-cursor", { scale: 1 }, { duration: 0.3, ease: "easeInOut" });
            if (!animationRef.current) return;

            await new Promise(r => setTimeout(r, 1200));

            await animate(step.class, { borderColor: "transparent", backgroundColor: "transparent" }, { duration: 0.4, ease: "easeInOut" });
          } catch {
            return;
          }
        }
      }
    };

    runAnimationSequence();

    return () => {
      animationRef.current = false;
    };
  }, [animate]);

  return (
    <div className="relative w-full">
      {/* Progress Bar */}
      <div className="flex items-center justify-center gap-2 mb-4 z-20 w-full max-w-[750px] mx-auto">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((dot) => (
          <motion.div
            key={dot}
            layout
            className={`rounded-full transition-all duration-300 ${dot === stepIndex ? 'w-5 h-1.5 bg-[#38bba1]' : 'w-1.5 h-1.5 bg-[#cbd5e1]'
              }`}
          />
        ))}
      </div>

      <div className="relative w-full max-w-[750px] mx-auto transform lg:scale-[0.8] xl:scale-[0.85] origin-top rounded-2xl" ref={scope}>

        {/* Floating Card - Top Right (Goals Tracked) */}
        <motion.div
          animate={{ y: [-6, 6, -6] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-4 -right-10 bg-white px-6 py-4 rounded-[1.25rem] shadow-[0_15px_40px_-15px_rgba(0,0,0,0.15)] border border-slate-100/80 w-44 z-30 hidden md:block"
        >
          <p className="text-[8px] text-slate-400 uppercase font-bold tracking-widest mb-1.5">Goals Tracked</p>
          <p className="text-[1.5rem] font-bold text-slate-900 mb-2 leading-none">12</p>
          <p className="text-[11px] text-[#059669] font-semibold">94.2% model accuracy</p>
        </motion.div>

        {/* Floating Card - Bottom Left (Insights) */}
        <motion.div
          animate={{ y: [6, -6, 6] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute bottom-6 -left-12 bg-white px-6 py-5 rounded-[1.25rem] shadow-[0_15px_40px_-15px_rgba(0,0,0,0.15)] border border-slate-100/80 w-48 z-30 hidden md:block"
        >
          <p className="text-[10px] text-[#059669] uppercase font-bold tracking-widest mb-2">Insights</p>
          <p className="text-xl font-bold text-slate-900 mb-4 leading-tight">23 patterns <br />found</p>
          <div className="flex gap-1.5 w-full">
            <div className="h-1.5 flex-1 bg-[#059669] rounded-full"></div>
            <div className="h-1.5 flex-1 bg-[#059669] rounded-full"></div>
            <div className="h-1.5 flex-1 bg-[#059669] rounded-full"></div>
            <div className="h-1.5 flex-1 bg-[#059669] rounded-full"></div>
            <div className="h-1.5 flex-1 bg-slate-200 rounded-full"></div>
          </div>
        </motion.div>

        {/* Ripple + Cursor */}
        <motion.div
          className="ripple-effect absolute z-40 w-10 h-10 rounded-full border-2 border-slate-400 bg-slate-300/30 pointer-events-none opacity-0"
          style={{ marginLeft: -20, marginTop: -20, left: "50%", top: "50%" }}
        />
        <motion.div
          className="custom-cursor absolute z-50 pointer-events-none drop-shadow-xl"
          initial={{ left: "60%", top: "80%" }}
          style={{ originX: 0.3, originY: 0.1 }}
        >
          <GrabCursor className="drop-shadow-lg" />
        </motion.div>

        {/* Main Dashboard UI */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden relative pb-2 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.1)]">

          <div className="bg-[#111827] px-4 py-2.5 flex items-center">
            <div className="flex gap-1.5 w-1/3">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
            </div>
            <div className="w-1/3 text-center text-[10px] text-slate-400 font-medium tracking-wide">
              reportsense.ai/board
            </div>
          </div>

          <div className="p-4 md:p-5">
            <div className="flex justify-between items-start mb-2 px-1">
              <div className="flex gap-2">
                <div className="mt-0.5 text-emerald-500"><Lock size={16} /></div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900">ReportSense AI</h3>
                  <p className="text-[10px] text-slate-400">Self-learning report engine</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-semibold border border-emerald-100">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                AI Active
              </div>
            </div>

            <div className="box-prompt border-2 border-transparent rounded-[1.25rem] p-1.5 transition-colors duration-500">
              <div className="border border-emerald-100 bg-emerald-50/50 rounded-xl p-2 mb-2 flex justify-between items-center shadow-sm">
                <div className="flex items-center gap-2 text-slate-600 text-xs">
                  <Sparkles size={14} className="text-emerald-500" />
                  Show me Q4 performance vs our annual goals... <span className="animate-pulse text-emerald-400 ml-0.5">|</span>
                </div>
                <div className="bg-[#059669] text-white p-1.5 rounded-lg shadow-sm">
                  <ArrowRight size={14} />
                </div>
              </div>
              <div className="flex gap-2 relative px-1">
                <span className="text-[10px] border border-slate-200 text-slate-500 px-3 py-1 rounded-full bg-white">Revenue analysis</span>
                <span className="text-[10px] border border-emerald-200 text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full font-medium shadow-sm">Goal tracking</span>
                <span className="text-[10px] border border-slate-200 text-slate-500 px-3 py-1 rounded-full bg-white">Risk assessment</span>
              </div>
            </div>

            <div className="box-goals border-2 border-transparent rounded-[1.25rem] p-1.5 mt-0.5 transition-colors duration-500">
              <div className="border border-slate-100 rounded-xl p-3 bg-white shadow-sm">
                <div className="flex items-center gap-2 text-slate-800 text-xs font-bold mb-3">
                  <CheckCircle2 size={14} className="text-emerald-500" /> AI-Generated Goals Q4
                </div>
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <div className="flex justify-between text-[10px] text-slate-500 font-medium mb-1.5">
                      <span>Revenue $4.5M</span><span className="text-emerald-600 font-bold">96%</span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-[#059669] w-[96%] rounded-full"></div></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[10px] text-slate-500 font-medium mb-1.5">
                      <span>Retention 97%</span><span className="text-amber-500 font-bold">94%</span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-amber-400 w-[94%] rounded-full"></div></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[10px] text-slate-500 font-medium mb-1.5">
                      <span>NPS 75+</span><span className="text-red-500 font-bold">81%</span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-red-400 w-[81%] rounded-full"></div></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-3 mt-1 px-2 border-b border-slate-100 pb-3">
              <div className="box-revenue border-2 border-transparent rounded-2xl p-2.5 bg-slate-50/50 transition-colors duration-500">
                <p className="text-[9px] text-slate-400 uppercase font-bold tracking-wider mb-1">Revenue</p>
                <p className="text-xl font-bold text-slate-900">$4.32M</p>
                <p className="text-[9px] bg-emerald-100 text-emerald-700 w-fit px-1.5 py-0.5 rounded mt-1.5 font-bold flex items-center gap-1"><ArrowRight size={10} className="-rotate-45" /> 12% YoY</p>
              </div>
              <div className="box-margin border-2 border-transparent rounded-2xl p-2.5 bg-slate-50/50 transition-colors duration-500">
                <p className="text-[9px] text-slate-400 uppercase font-bold tracking-wider mb-1">Margin</p>
                <p className="text-xl font-bold text-slate-900">68.2%</p>
                <p className="text-[9px] bg-emerald-100 text-emerald-700 w-fit px-1.5 py-0.5 rounded mt-1.5 font-bold flex items-center gap-1"><ArrowRight size={10} className="-rotate-45" /> 3.1% YoY</p>
              </div>
              <div className="box-churn border-2 border-transparent rounded-2xl p-2.5 bg-slate-50/50 transition-colors duration-500">
                <p className="text-[9px] text-slate-400 uppercase font-bold tracking-wider mb-1">Churn</p>
                <p className="text-xl font-bold text-slate-900">3.8%</p>
                <p className="text-[9px] bg-red-100 text-red-700 w-fit px-1.5 py-0.5 rounded mt-1.5 font-bold flex items-center gap-1"><ArrowRight size={10} className="rotate-45" /> 0.4% spike</p>
              </div>
              <div className="box-nps border-2 border-transparent rounded-2xl p-2.5 bg-slate-50/50 transition-colors duration-500">
                <p className="text-[9px] text-slate-400 uppercase font-bold tracking-wider mb-1">NPS</p>
                <p className="text-xl font-bold text-slate-900">72</p>
                <p className="text-[9px] bg-amber-100 text-amber-700 w-fit px-1.5 py-0.5 rounded mt-1.5 font-bold flex items-center gap-1"><ArrowRight size={10} className="rotate-0" /> Stable</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-2 px-2">
              <div className="box-opportunity border-2 border-transparent p-3 rounded-xl bg-white shadow-sm border-slate-100/50 transition-colors duration-500">
                <div className="flex items-center gap-1.5 text-emerald-600 text-[10px] font-bold uppercase mb-1.5">
                  <Zap size={12} className="fill-emerald-100" /> Opportunity
                </div>
                <h4 className="text-xs font-bold text-slate-900 mb-1">APAC Outperformance</h4>
                <p className="text-[10px] text-slate-500 leading-relaxed">Region exceeded targets by 8.6%. Localized content strategy shows strong correlation.</p>
              </div>
              <div className="box-risk border-2 border-transparent p-3 rounded-xl bg-white shadow-sm border-slate-100/50 transition-colors duration-500">
                <div className="flex items-center gap-1.5 text-red-500 text-[10px] font-bold uppercase mb-1.5">
                  <AlertTriangle size={12} className="fill-red-50" /> Risk Flagged
                </div>
                <h4 className="text-xs font-bold text-slate-900 mb-1">SMB Churn Spike</h4>
                <p className="text-[10px] text-slate-500 leading-relaxed">Churn increased 1.2% in SMB segment due to recent pricing changes.</p>
              </div>
            </div>

            <div className="box-actions border-2 border-transparent p-2 mt-1 transition-colors duration-500">
              <h4 className="text-[11px] font-bold text-slate-800 mb-2 px-1 flex items-center gap-1.5"><Target size={12} /> Recommended Actions</h4>
              <div className="space-y-1.5 bg-slate-50 p-2.5 rounded-xl border border-slate-100/50">
                <div className="flex justify-between items-center text-[10px] px-2 pb-1.5 border-b border-slate-100">
                  <div className="flex items-center gap-3 text-slate-700 font-medium">
                    <span className="w-4 h-4 rounded flex items-center justify-center bg-red-100 text-red-600 font-bold text-[8px]">P1</span>
                    Launch SMB retention program
                  </div>
                  <span className="text-slate-400 text-[9px]">Assign: VP CS</span>
                </div>
                <div className="flex justify-between items-center text-[10px] px-2 pb-1.5 border-b border-slate-100">
                  <div className="flex items-center gap-3 text-slate-700 font-medium">
                    <span className="w-4 h-4 rounded flex items-center justify-center bg-red-100 text-red-600 font-bold text-[8px]">P1</span>
                    NPS root-cause analysis
                  </div>
                  <span className="text-slate-400 text-[9px]">Assign: Product</span>
                </div>
                <div className="flex justify-between items-center text-[10px] px-2">
                  <div className="flex items-center gap-3 text-slate-700 font-medium">
                    <span className="w-4 h-4 rounded flex items-center justify-center bg-amber-100 text-amber-600 font-bold text-[8px]">P2</span>
                    Scale APAC marketing +$200K
                  </div>
                  <span className="text-slate-400 text-[9px]">Assign: CMO</span>
                </div>
              </div>
            </div>

            <div className="box-share border-2 border-transparent p-2 mt-1 transition-colors duration-500 flex justify-between items-center bg-white shadow-sm border border-slate-50">
              <div className="text-[10px] text-emerald-600 font-medium px-2 flex items-center gap-1.5">
                <Sparkles size={12} /> Model confidence: 94.2%
              </div>
              <div className="flex gap-2">
                <button className="text-[10px] border border-slate-200 text-slate-600 px-3 py-1 rounded bg-white hover:bg-slate-50 font-medium shadow-sm flex items-center gap-1.5"><MessageSquare size={10} /> Email Report</button>
                <button className="text-[10px] border border-slate-200 text-slate-600 px-3 py-1 rounded bg-white hover:bg-slate-50 font-medium shadow-sm">Share Link</button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Badge */}
        <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex justify-center w-full z-50">
          <motion.div
            key={activeBadge}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1.0] }}
            className="bg-[#111827] text-white pl-4 pr-5 py-2.5 rounded-full shadow-2xl text-[13px] font-medium flex items-center gap-3 whitespace-nowrap border border-slate-700/50"
          >
            <div className="bg-emerald-500/20 p-1.5 rounded-full">
              <Sparkles size={14} className="text-emerald-400" />
            </div>
            {activeBadge}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// ── Loading Screen Component ──
function LoadingScreen({ tab, phase }: { tab: "report" | "voice"; phase: number }) {
  const isReport = tab === "report";
  const color = isReport ? "#059669" : "#7c3aed";
  const lightBg = isReport ? "rgba(5, 150, 105, 0.08)" : "rgba(124, 58, 237, 0.08)";

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <AnimatePresence mode="wait">
        {phase === 1 && (
          <motion.div
            key="dot"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="rounded-full"
            style={{ width: 12, height: 12, backgroundColor: color }}
          />
        )}
        {phase === 2 && (
          <motion.div
            key="icon"
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1.0] }}
            className="rounded-2xl shadow-lg flex items-center justify-center"
            style={{ width: 64, height: 64, backgroundColor: color }}
          >
            {isReport ? (
              <BarChart3 size={28} className="text-white" />
            ) : (
              <Phone size={28} className="text-white" />
            )}
          </motion.div>
        )}
        {phase === 3 && (
          <motion.div
            key="circle"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] }}
            className="flex flex-col items-center gap-5"
          >
            <div
              className="rounded-full flex items-center justify-center shadow-sm"
              style={{ width: 100, height: 100, backgroundColor: lightBg }}
            >
              {isReport ? (
                <FileText size={40} style={{ color }} strokeWidth={1.5} />
              ) : (
                <Headphones size={40} style={{ color }} strokeWidth={1.5} />
              )}
            </div>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="text-sm font-semibold tracking-[0.2em] uppercase"
              style={{ color: "#94a3b8" }}
            >
              {isReport ? "Building your report" : "Listening to every call"}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Main Hero Component ──
export default function Hero() {
  const [activeTab, setActiveTab] = useState<"report" | "voice">("report");
  const [loadingPhase, setLoadingPhase] = useState(0); // 0=none, 1=dot, 2=icon, 3=circle+text
  const [isLoading, setIsLoading] = useState(false);
  const loadingRef = useRef<boolean>(false);
  const initialLoadDone = useRef<boolean>(false);

  const runLoadingSequence = useCallback(async (tab: "report" | "voice") => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    setIsLoading(true);

    // Phase 1: Dot
    setLoadingPhase(1);
    await new Promise(r => setTimeout(r, 600));

    // Phase 2: Icon
    setLoadingPhase(2);
    await new Promise(r => setTimeout(r, 800));

    // Phase 3: Circle + text
    setLoadingPhase(3);
    await new Promise(r => setTimeout(r, 1200));

    // Done
    setLoadingPhase(0);
    setIsLoading(false);
    loadingRef.current = false;
  }, []);

  // Run loading only on the very first visit per session
  useEffect(() => {
    if (!initialLoadDone.current) {
      initialLoadDone.current = true;
      const alreadyLoaded = sessionStorage.getItem("hero-loaded");
      if (!alreadyLoaded) {
        sessionStorage.setItem("hero-loaded", "true");
        runLoadingSequence("report");
      }
    }
  }, [runLoadingSequence]);

  const handleTabSwitch = useCallback((tab: "report" | "voice") => {
    if (tab === activeTab || loadingRef.current) return;
    setActiveTab(tab);
    runLoadingSequence(tab);
  }, [activeTab, runLoadingSequence]);

  return (
    <section id="home" className="min-h-[95vh] lg:min-h-screen bg-[#f8f9fa] flex items-center justify-center p-6 md:p-12 relative overflow-hidden">

      {/* Ambient color glow — green for ReportSense, purple for Voice Analytics */}
      <motion.div
        className="absolute pointer-events-none"
        style={{ width: "60%", height: "60%", left: "5%", top: "10%", borderRadius: "50%", filter: "blur(120px)" }}
        animate={{ backgroundColor: activeTab === "report" ? "rgba(5, 150, 105, 0.06)" : "rgba(124, 58, 237, 0.06)" }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute pointer-events-none"
        style={{ width: "50%", height: "50%", right: "0%", bottom: "15%", borderRadius: "50%", filter: "blur(100px)" }}
        animate={{ backgroundColor: activeTab === "report" ? "rgba(5, 150, 105, 0.04)" : "rgba(124, 58, 237, 0.05)" }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute pointer-events-none"
        style={{ width: "35%", height: "35%", right: "20%", top: "5%", borderRadius: "50%", filter: "blur(90px)" }}
        animate={{ backgroundColor: activeTab === "report" ? "rgba(5, 150, 105, 0.03)" : "rgba(139, 92, 246, 0.04)" }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />

      {/* Floating background particles */}
      {[
        { size: 6, x: "8%", y: "15%", dur: 18, delay: 0 },
        { size: 5, x: "15%", y: "70%", dur: 22, delay: 2 },
        { size: 7, x: "25%", y: "40%", dur: 20, delay: 1 },
        { size: 5, x: "40%", y: "85%", dur: 16, delay: 4 },
        { size: 6, x: "55%", y: "20%", dur: 24, delay: 0.5 },
        { size: 5, x: "65%", y: "55%", dur: 19, delay: 3 },
        { size: 8, x: "78%", y: "30%", dur: 21, delay: 1.5 },
        { size: 5, x: "88%", y: "65%", dur: 17, delay: 2.5 },
        { size: 6, x: "92%", y: "10%", dur: 23, delay: 0 },
        { size: 5, x: "35%", y: "25%", dur: 20, delay: 3.5 },
        { size: 7, x: "50%", y: "75%", dur: 18, delay: 1 },
        { size: 5, x: "72%", y: "80%", dur: 22, delay: 2 },
        { size: 6, x: "3%", y: "50%", dur: 19, delay: 1.5 },
        { size: 5, x: "45%", y: "10%", dur: 21, delay: 3 },
        { size: 7, x: "60%", y: "90%", dur: 17, delay: 0.5 },
        { size: 5, x: "82%", y: "45%", dur: 23, delay: 2 },
      ].map((p, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute rounded-full bg-violet-300/50 pointer-events-none"
          style={{ width: p.size, height: p.size, left: p.x, top: p.y }}
          animate={{
            x: [0, 30, -20, 15, 0],
            y: [0, -25, 15, -10, 0],
          }}
          transition={{
            duration: p.dur,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}

      {/* TOP NAV BAR */}
      <div className="absolute top-28 lg:top-8 left-1/2 -translate-x-1/2 flex items-center justify-center gap-6 z-30 w-full max-w-2xl">
        <div className="flex justify-center gap-2">
          <button
            onClick={() => handleTabSwitch("report")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 cursor-pointer ${activeTab === "report"
              ? "bg-[#059669] text-white shadow-lg hover:shadow-xl"
              : "bg-white text-slate-500 shadow-sm border border-slate-200 hover:text-slate-800"
              }`}
          >
            <FileText size={16} />
            ReportSense
          </button>
          <button
            onClick={() => handleTabSwitch("voice")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 cursor-pointer ${activeTab === "voice"
              ? "bg-violet-600 text-white shadow-lg hover:shadow-xl"
              : "bg-white text-slate-500 shadow-sm border border-slate-200 hover:text-slate-800"
              }`}
          >
            <Mic size={16} />
            Voice Analytics
          </button>
        </div>
      </div>

      {/* Loading Screen Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loading-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <LoadingScreen tab={activeTab} phase={loadingPhase} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content — hidden during loading */}
      <motion.div
        className="max-w-[90rem] w-full mx-auto grid grid-cols-1 lg:grid-cols-[45%_55%] gap-8 lg:gap-12 items-center mt-24 lg:mt-0 pt-8 lg:pt-10"
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.4 }}
      >

        {/* Left Column: Copy & CTA — slides in from the left */}
        <motion.div
          className="flex flex-col items-start justify-center z-10 pr-0 lg:pr-4 lg:pl-16 xl:pl-24"
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: isLoading ? 0 : 1, x: isLoading ? -60 : 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0], delay: isLoading ? 0 : 0.1 }}
        >
          <Link href="/" className="flex items-center gap-2.5 mb-6">
            <img src="/logo.svg" alt="Stellar AI" className="h-6 w-auto" />
            <span className="font-bold text-base text-slate-900 tracking-tight">Stellar AI</span>
          </Link>

          <div className="min-h-[280px] xl:min-h-[300px]">
            <AnimatePresence mode="wait">
              {activeTab === "report" ? (
                <motion.div
                  key="report-copy"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1.0] }}
                >
                  <h1 className="text-4xl md:text-5xl lg:text-[2.75rem] xl:text-[3.4rem] font-bold leading-[1.1] tracking-tight text-[#111827] mb-6">
                    Your data has <br />
                    <span className="whitespace-nowrap">
                      answers. <span className="text-[#059669]">AI finds them.</span>
                    </span>
                  </h1>
                  <p className="text-sm md:text-base text-slate-500 mb-8 max-w-lg leading-relaxed">
                    Let AI create goals from your data. Validate performance against targets. Surface insights, flag risks, and dive straight into action. Ask in plain English, get a boardroom-ready report.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="voice-copy"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1.0] }}
                >
                  <h1 className="text-4xl md:text-5xl lg:text-[2.75rem] xl:text-[3.4rem] font-bold leading-[1.1] tracking-tight text-[#111827] mb-6">
                    Every call has a <br />
                    <span className="whitespace-nowrap">
                      story. <span className="text-violet-600">We read them.</span>
                    </span>
                  </h1>
                  <p className="text-sm md:text-base text-slate-500 mb-8 max-w-lg leading-relaxed">
                    Insights from voice calls. Alerts on false promises & bad words. Agent performance scored on goal alignment. Improvement paths for agents & managers. The right pitch, the right time.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/auth" className="bg-[#111827] hover:bg-slate-800 text-white px-7 py-3 rounded-full font-medium transition-colors shadow-lg shadow-slate-900/20 text-sm">
              Start Free Trial
            </Link>
            <Link href="/auth" className="text-[#111827] border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors px-7 py-3 rounded-full font-medium text-sm">
              Book a Demo
            </Link>
          </div>
        </motion.div>

        {/* Right Column: Animated Dashboard — slides in from the right */}
        <motion.div
          className="relative w-full z-10 mt-16 lg:mt-0 lg:-mt-24 flex flex-col items-center lg:items-end"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: isLoading ? 0 : 1, x: isLoading ? 60 : 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0], delay: isLoading ? 0 : 0.25 }}
        >
          <AnimatePresence mode="wait">
            {activeTab === "report" ? (
              <motion.div
                key="report-dashboard"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] }}
                className="w-full"
              >
                <ReportSenseDashboard />
              </motion.div>
            ) : (
              <motion.div
                key="voice-dashboard"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] }}
                className="w-full"
              >
                <VoiceAnalyticsDashboard />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </section>
  );
}