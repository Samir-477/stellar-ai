"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Link, MessageCircle, Lightbulb } from 'lucide-react';

export default function ProcessSection() {
    const steps = [
        {
            num: "01",
            icon: <Link strokeWidth={1.5} size={24} />,
            title: "Connect Your Data",
            description: "Plug in your CRM, call recordings, spreadsheets, or databases. We handle the ingestion, cleaning, and schema mapping automatically."
        },
        {
            num: "02",
            icon: <MessageCircle strokeWidth={1.5} size={24} />,
            title: "Ask or Automate",
            description: "Query in plain English, set up automated report schedules, or let AI detect patterns and generate goals for you."
        },
        {
            num: "03",
            icon: <Lightbulb strokeWidth={1.5} size={24} />,
            title: "Get Insights & Act",
            description: "Receive actionable insights, risk alerts, and coaching recommendations. Share reports via email, Slack, or WhatsApp in one click."
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.18,
                delayChildren: 0.15,
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
        hidden: { opacity: 0, y: 70, scale: 0.92 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1.0] as const },
        },
    };

    const lineVariants = {
        hidden: { scaleX: 0, opacity: 0 },
        visible: {
            scaleX: 1,
            opacity: 1,
            transition: { duration: 1.0, delay: 0.7, ease: [0.25, 0.1, 0.25, 1.0] as const },
        },
    };

    return (
        <section id="how-it-works" className="relative w-full bg-white py-32 px-6 overflow-hidden z-10">

            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-30 pointer-events-none"></div>

            <motion.div
                className="max-w-7xl mx-auto relative z-10"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
            >

                <div className="text-center max-w-2xl mx-auto mb-20">
                    <motion.p variants={fadeUp} className="text-xs font-bold tracking-[0.2em] text-slate-400 uppercase mb-4">
                        Process
                    </motion.p>
                    <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
                        Three steps to clarity
                    </motion.h2>
                    <motion.p variants={fadeUp} className="text-lg text-slate-500">
                        From raw data to boardroom-ready insights in minutes, not weeks.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">

                    {/* Connecting Line */}
                    <motion.div
                        variants={lineVariants}
                        style={{ transformOrigin: "left center" }}
                        className="hidden md:block absolute top-[4.5rem] left-[15%] right-[15%] h-[1px] bg-slate-200 -z-10"
                    />

                    {steps.map((step, index) => (
                        <motion.div
                            variants={cardVariants}
                            key={index}
                            whileHover={{
                                y: -8,
                                boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
                                transition: { type: "spring", stiffness: 300, damping: 20 }
                            }}
                            className="bg-white rounded-[2rem] p-8 md:p-10 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col h-full"
                        >
                            <div className="flex items-center gap-6 mb-8 bg-white pr-4 inline-flex w-fit rounded-r-full">
                                <motion.div
                                    className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400"
                                    initial={{ opacity: 0, rotate: -20, scale: 0.5 }}
                                    whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.4 + index * 0.15, type: "spring", stiffness: 200, damping: 15 }}
                                >
                                    {step.icon}
                                </motion.div>
                                <motion.span
                                    className="text-5xl font-light text-slate-200"
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.5 + index * 0.15, duration: 0.5 }}
                                >
                                    {step.num}
                                </motion.span>
                            </div>

                            <h3 className="text-xl font-bold text-slate-900 mb-4">
                                {step.title}
                            </h3>
                            <p className="text-slate-500 leading-relaxed text-sm md:text-base">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}

                </div>
            </motion.div>
        </section>
    );
}