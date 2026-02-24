"use client";

import React, { useState } from 'react';
import { Eye, EyeOff, Zap, Phone, BarChart3, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function AuthPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp, setIsSignUp] = useState(true);

    return (
        <div className="h-screen flex flex-col lg:flex-row overflow-hidden">

            {/* ── LEFT PANEL: Branding & Stats ── */}
            <div className="relative w-full lg:w-[50%] h-full bg-gradient-to-br from-[#ecfdf5] via-[#f0fdf9] to-[#f5f7fa] flex flex-col justify-between p-8 md:p-12 lg:p-16 overflow-hidden">

                {/* Greenish tint — top-left */}
                <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-emerald-200/50 blur-[100px] pointer-events-none" />
                <div className="absolute top-0 left-0 w-[350px] h-[350px] rounded-full bg-teal-200/40 blur-[80px] pointer-events-none" />
                {/* Purple tint — bottom-right */}
                <div className="absolute -bottom-32 -right-32 w-[450px] h-[450px] rounded-full bg-violet-200/40 blur-[100px] pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full bg-purple-200/30 blur-[80px] pointer-events-none" />

                {/* Subtle grid pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(#d1fae5_0.8px,transparent_0.8px)] [background-size:20px_20px] opacity-40 pointer-events-none" />

                <div className="relative z-10">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2.5 mb-12 lg:mb-16 group">
                        <img src="/logo.svg" alt="Stellar AI" className="h-6 w-auto" />
                        <span className="font-bold text-lg tracking-tight text-slate-900">Stellar AI</span>
                    </Link>

                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm border border-emerald-200/60 px-3 py-1 rounded-full text-[11px] font-medium text-slate-600 mb-6 shadow-sm">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        Join 500+ enterprise teams
                    </div>

                    {/* Headline */}
                    <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold leading-[1.1] tracking-tight text-[#111827] mb-4">
                        Start making<br />smarter<br />
                        <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">decisions</span> today.
                    </h1>

                    {/* Description */}
                    <p className="text-sm text-slate-500 max-w-md leading-relaxed mb-8">
                        Replace manual reports and endless call reviews with AI that works 24/7 — surfacing the insights your team needs before they ask.
                    </p>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-3 max-w-md">
                        <div className="bg-white rounded-2xl px-5 py-4 shadow-[0_2px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_24px_rgba(0,0,0,0.1)] transition-shadow flex items-center gap-4">
                            <div className="w-11 h-11 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                                <Zap size={18} className="text-emerald-500" />
                            </div>
                            <div>
                                <span className="text-xl font-bold text-emerald-600 block leading-tight">10×</span>
                                <p className="text-[11px] text-slate-400 font-medium">Faster Reporting</p>
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl px-5 py-4 shadow-[0_2px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_24px_rgba(0,0,0,0.1)] transition-shadow flex items-center gap-4">
                            <div className="w-11 h-11 rounded-full bg-indigo-50 flex items-center justify-center shrink-0">
                                <Phone size={18} className="text-indigo-500" />
                            </div>
                            <div>
                                <span className="text-xl font-bold text-indigo-600 block leading-tight">100%</span>
                                <p className="text-[11px] text-slate-400 font-medium">Call Coverage</p>
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl px-5 py-4 shadow-[0_2px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_24px_rgba(0,0,0,0.1)] transition-shadow flex items-center gap-4">
                            <div className="w-11 h-11 rounded-full bg-purple-50 flex items-center justify-center shrink-0">
                                <BarChart3 size={18} className="text-purple-500" />
                            </div>
                            <div>
                                <span className="text-xl font-bold text-purple-600 block leading-tight">38%</span>
                                <p className="text-[11px] text-slate-400 font-medium">Faster Decisions</p>
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl px-5 py-4 shadow-[0_2px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_24px_rgba(0,0,0,0.1)] transition-shadow flex items-center gap-4">
                            <div className="w-11 h-11 rounded-full bg-teal-50 flex items-center justify-center shrink-0">
                                <CheckCircle size={18} className="text-teal-500" />
                            </div>
                            <div>
                                <span className="text-xl font-bold text-teal-600 block leading-tight">94%</span>
                                <p className="text-[11px] text-slate-400 font-medium">AI Accuracy</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom trust bar */}
                <div className="relative z-10 flex items-center gap-6 text-xs text-slate-400 font-medium mt-10 lg:mt-0">
                    <span className="flex items-center gap-1.5">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                        No credit card required
                    </span>
                    <span className="flex items-center gap-1.5">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                        SOC 2 compliant
                    </span>
                    <span className="flex items-center gap-1.5">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                        5-min setup
                    </span>
                </div>
            </div>

            {/* ── RIGHT PANEL: Auth Form ── */}
            <div className="w-full lg:w-[50%] h-full flex items-center justify-center p-8 md:p-12 lg:p-16 bg-white overflow-y-auto">
                <div className="w-full max-w-md">

                    {/* Header */}
                    <h2 className="text-3xl font-bold text-[#111827] mb-2">
                        {isSignUp ? 'Create your account' : 'Welcome back'}
                    </h2>
                    <p className="text-sm text-slate-400 mb-8">
                        {isSignUp ? 'Free trial · No credit card required.' : 'Sign in to continue to Stellar AI'}
                    </p>

                    {/* OAuth Buttons */}
                    <div className="flex gap-3 mb-6">
                        <button className="flex-1 flex items-center justify-center gap-2.5 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm">
                            <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                            Google
                        </button>
                        <button className="flex items-center justify-center border border-slate-200 rounded-xl px-5 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="#111827"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                        </button>
                        <button className="flex items-center justify-center border border-slate-200 rounded-xl px-5 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="#111827"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                        </button>
                    </div>

                    {/* Divider */}
                    <div className="flex items-center gap-4 mb-6">
                        <div className="flex-1 h-px bg-slate-200" />
                        <span className="text-xs text-slate-400 font-medium">or with email</span>
                        <div className="flex-1 h-px bg-slate-200" />
                    </div>

                    {/* Form */}
                    <form onSubmit={(e) => e.preventDefault()} className="space-y-5">

                        {/* Name field (only for sign up) */}
                        {isSignUp && (
                            <div>
                                <label className="block text-sm font-semibold text-[#111827] mb-1.5">Full Name</label>
                                <input
                                    type="text"
                                    placeholder="Jane Smith"
                                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all bg-white"
                                />
                            </div>
                        )}

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-semibold text-[#111827] mb-1.5">
                                {isSignUp ? 'Work Email' : 'Email'}
                            </label>
                            <input
                                type="email"
                                placeholder="you@company.com"
                                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all bg-white"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <div className="flex justify-between items-center mb-1.5">
                                <label className="block text-sm font-semibold text-[#111827]">Password</label>
                                {!isSignUp && (
                                    <a href="#" className="text-xs text-emerald-600 font-medium hover:text-emerald-700 transition-colors">Forgot password?</a>
                                )}
                            </div>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder={isSignUp ? "Create a strong password" : "Enter your password"}
                                    className="w-full border border-slate-200 rounded-xl px-4 py-3 pr-12 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all bg-white"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-full bg-[#111827] text-white py-3.5 rounded-xl font-semibold text-sm hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/10 active:scale-[0.98] transform"
                        >
                            {isSignUp ? 'Create Account' : 'Sign In'}
                        </button>
                    </form>

                    {/* Toggle */}
                    <p className="text-center text-sm text-slate-500 mt-6">
                        {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
                        <button
                            onClick={() => setIsSignUp(!isSignUp)}
                            className="font-semibold text-[#111827] underline underline-offset-2 hover:text-emerald-600 transition-colors"
                        >
                            {isSignUp ? 'Sign in' : 'Sign up free'}
                        </button>
                    </p>

                    {/* Legal */}
                    <p className="text-center text-xs text-slate-400 mt-4">
                        By continuing you agree to our{' '}
                        <a href="#" className="underline underline-offset-2 hover:text-slate-600 transition-colors">Terms</a>
                        {' & '}
                        <a href="#" className="underline underline-offset-2 hover:text-slate-600 transition-colors">Privacy Policy</a>
                    </p>
                </div>
            </div>
        </div>
    );
}
