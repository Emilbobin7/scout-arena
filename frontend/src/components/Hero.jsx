import { useState } from 'react';
import { ArrowRight, Play, Users, Trophy, Zap, Star, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const ROLES = [
    {
        id: 'athlete',
        label: '🏃 I\'m an Athlete',
        subtitle: 'Upload videos · Get AI scores · Get discovered',
        cta: 'Create Athlete Profile',
        ctaLink: '/signup',
        color: 'from-blue-600 to-blue-700',
        glow: 'shadow-blue-500/40',
        border: 'border-blue-500/50',
    },
    {
        id: 'scout',
        label: '🎯 I\'m a Scout',
        subtitle: 'Search talent · View AI reports · Recruit smarter',
        cta: 'Start Scouting',
        ctaLink: '/signup',
        color: 'from-purple-600 to-purple-700',
        glow: 'shadow-purple-500/40',
        border: 'border-purple-500/50',
    },
];

const STATS = [
    { value: '50k+', label: 'Athletes' },
    { value: '1.2k+', label: 'Scouts' },
    { value: '98%', label: 'Match Accuracy' },
    { value: '120+', label: 'Clubs' },
];

export default function Hero() {
    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center bg-slate-950 pt-20 pb-16 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-20"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522778119026-d647f0565c6a?q=80&w=2069&auto=format&fit=crop')" }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/80 to-slate-950" />
                {/* Spotlight beams */}
                <div className="absolute top-0 left-1/4 w-24 h-screen bg-blue-500/8 blur-[60px] rotate-12 origin-top" />
                <div className="absolute top-0 right-1/4 w-24 h-screen bg-purple-500/8 blur-[60px] -rotate-12 origin-top" />
                {/* Dot grid */}
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '32px 32px' }}
                />
            </div>

            <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 text-center">
                {/* Live badge */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-green-500/30 bg-green-900/20 backdrop-blur-sm"
                >
                    <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                    </span>
                    <span className="text-green-300 text-sm font-semibold">AI-Powered Scouting · Live Platform</span>
                </motion.div>

                {/* Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                    className="text-5xl sm:text-6xl md:text-7xl font-black text-white mb-5 tracking-tight leading-[1.05]"
                >
                    Where{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Athletes</span>
                    {' '}Meet{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Opportunity</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                    className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
                >
                    Upload performance videos → AI generates your scores → Scouts discover you.
                    The smartest way to get recruited.
                </motion.p>

                {/* Role Selector */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                    className="mb-8"
                >
                    <p className="text-gray-500 text-sm uppercase tracking-widest mb-5 font-medium">Who are you?</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-xl mx-auto">
                        {ROLES.map(role => (
                            <Link
                                key={role.id}
                                to={`/signup?role=${role.id}`}
                                className={`flex-1 p-5 rounded-2xl border-2 text-left transition-all duration-200 group border-white/10 bg-white/3 hover:border-white/25 hover:bg-white/6 hover:-translate-y-1 hover:shadow-lg`}
                            >
                                <p className="text-white font-bold text-base mb-1">{role.label}</p>
                                <p className="text-gray-400 text-xs">{role.subtitle}</p>
                            </Link>
                        ))}
                    </div>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="flex flex-col sm:flex-row gap-3 justify-center"
                >
                    <Link
                        to="/signup"
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-base transition-all shadow-lg shadow-blue-500/30 hover:-translate-y-0.5 group"
                    >
                        Get Started Free <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <button
                        onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-white font-semibold text-base transition-all"
                    >
                        <Play size={16} className="fill-white" /> See How It Works
                    </button>
                </motion.div>

                {/* Trust line */}
                <motion.p
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                    className="mt-5 text-gray-600 text-sm"
                >
                    Free to join · No credit card required · 2 min setup
                </motion.p>

                {/* Stats Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
                    className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-white/8 pt-10"
                >
                    {STATS.map(s => (
                        <div key={s.label}>
                            <p className="text-3xl font-black text-white">{s.value}</p>
                            <p className="text-gray-500 text-xs uppercase tracking-wider mt-1">{s.label}</p>
                        </div>
                    ))}
                </motion.div>

                {/* Scroll hint */}
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
                    className="mt-12 flex justify-center"
                >
                    <button
                        onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                        className="flex flex-col items-center gap-1 text-gray-600 hover:text-gray-400 transition-colors"
                    >
                        <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
                        <ChevronDown size={18} className="animate-bounce" />
                    </button>
                </motion.div>
            </div>
        </div>
    );
}
