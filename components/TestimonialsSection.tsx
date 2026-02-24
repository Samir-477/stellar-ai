"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function TestimonialsSection() {
    const testimonials = [
        {
            quote: "We replaced three BI tools with this. The NLP queries alone save our team 20 hours a week.",
            name: "Sarah Chen",
            role: "VP of Revenue, ScaleForce",
            initials: "SC"
        },
        {
            quote: "The voice intelligence caught a churn signal we would have missed. Saved us a $400K account.",
            name: "Marcus Johnson",
            role: "Head of CS, DataBridge",
            initials: "MJ"
        },
        {
            quote: "Self-learning reports that actually get better over time. Our board presentations went from painful to effortless.",
            name: "Emily Rodriguez",
            role: "CFO, NovaTech",
            initials: "ER"
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
            },
        },
    };

    const fadeUp = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0] as const },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 60, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] as const },
        },
    };

    return (
        <section
            id="testimonials"
            className="w-full bg-[#f8f9fa] py-24 md:py-32 px-6"
        >
            <motion.div
                className="max-w-7xl mx-auto"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
            >
                <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24 flex flex-col items-center">
                    {/* Eyebrow */}
                    <motion.p
                        variants={fadeUp}
                        className="text-xs font-bold tracking-[0.2em] text-slate-400 uppercase mb-4"
                    >
                        Testimonials
                    </motion.p>

                    {/* Headline */}
                    <motion.h2
                        variants={fadeUp}
                        className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight"
                    >
                        Trusted by operators who care about signal
                    </motion.h2>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariants}
                            whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.08)" }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="bg-white p-10 rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col h-full"
                        >
                            {/* Quote icon */}
                            <motion.div
                                className="mb-6"
                                initial={{ opacity: 0, scale: 0.5 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                            >
                                <svg width="32" height="24" viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-slate-200">
                                    <path d="M9.6 0H0L2.88 24H12.48L9.6 0ZM28.8 0H19.2L22.08 24H31.68L28.8 0Z" fill="currentColor" />
                                </svg>
                            </motion.div>

                            <p className="text-slate-500 leading-relaxed text-[15px] mb-10 flex-grow">
                                &quot;{testimonial.quote}&quot;
                            </p>

                            <div className="flex items-center gap-4">
                                <motion.div
                                    className="w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-xs font-bold text-slate-700 shrink-0"
                                    initial={{ opacity: 0, scale: 0 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.5 + index * 0.1, type: "spring", stiffness: 260, damping: 20 }}
                                >
                                    {testimonial.initials}
                                </motion.div>

                                <div>
                                    <h4 className="text-sm font-bold text-slate-900">
                                        {testimonial.name}
                                    </h4>
                                    <p className="text-xs text-slate-500 mt-0.5">
                                        {testimonial.role}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}