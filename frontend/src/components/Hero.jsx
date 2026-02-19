import { useRef } from 'react';
import { ArrowRight, Play, Trophy, Activity, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero = () => {
    const containerRef = useRef(null);
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -150]);

    return (
        <div ref={containerRef} className="relative overflow-hidden min-h-screen flex items-center bg-slate-950 pt-20">
            {/* Background Image - Stadium Night */}
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-screen"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=2069&auto=format&fit=crop')" }}
                ></div>
                {/* Dark Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-blue-900/30"></div>

                {/* Animated Spotlights */}
                <div className="absolute top-0 left-1/4 w-32 h-[100vh] bg-blue-500/10 blur-[80px] rotate-12 origin-top animate-pulse"></div>
                <div className="absolute top-0 right-1/4 w-32 h-[100vh] bg-blue-500/10 blur-[80px] -rotate-12 origin-top animate-pulse animation-delay-2000"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-blue-500/30 bg-blue-900/20 backdrop-blur-md">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </span>
                        <span className="text-blue-200 text-sm font-bold tracking-wide uppercase">AI-Powered Scouting v2.0</span>
                    </div>

                    <h1 className="text-6xl lg:text-8xl font-black text-white mb-6 tracking-tighter leading-[0.9]">
                        UNLEASH<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-green-400 animate-gradient-x">YOUR</span><br />
                        POTENTIAL
                    </h1>

                    <p className="text-xl text-gray-400 max-w-lg mb-10 leading-relaxed font-light">
                        The world's first AI-driven platform connecting elite talent with professional scouts.
                        Data-backed discovery for the next generation of legends.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-5">
                        <Link
                            to="/signup"
                            className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg transition-all shadow-[0_0_40px_rgba(37,99,235,0.4)] hover:shadow-[0_0_60px_rgba(37,99,235,0.6)] hover:-translate-y-1 flex items-center justify-center gap-2 group ring-1 ring-white/20"
                        >
                            Join Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <button
                            onClick={() => document.getElementById('demo-section').scrollIntoView({ behavior: 'smooth' })}
                            className="px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 text-white font-semibold text-lg transition-all backdrop-blur-md flex items-center justify-center gap-2 group"
                        >
                            <div className="w-8 h-8 rounded-full bg-white text-slate-900 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Play className="w-4 h-4 fill-current ml-0.5" />
                            </div>
                            Watch Demo
                        </button>
                    </div>

                    <div className="mt-12 flex items-center gap-8 border-t border-white/10 pt-8">
                        <div>
                            <p className="text-3xl font-bold text-white">50k+</p>
                            <p className="text-gray-500 text-sm uppercase tracking-wider">Athletes</p>
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-white">1.2k+</p>
                            <p className="text-gray-500 text-sm uppercase tracking-wider">Scouts</p>
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-white">98%</p>
                            <p className="text-gray-500 text-sm uppercase tracking-wider">Accuracy</p>
                        </div>
                    </div>
                </motion.div>

                {/* Floating Visuals / 3D Elements */}
                <div className="relative hidden lg:block h-[600px] perspective-1000">
                    {/* Main Athlete Card */}
                    <motion.div
                        style={{ y: y1 }}
                        className="absolute right-10 top-10 w-80 h-96 bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-4 shadow-2xl rotate-y-12 rotate-z-6 z-20"
                    >
                        <div className="w-full h-full rounded-2xl overflow-hidden relative">
                            <img src="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=2069&auto=format&fit=crop" className="w-full h-full object-cover opacity-80" alt="Athlete" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
                            <div className="absolute bottom-4 left-4">
                                <p className="text-white font-bold text-lg">Vikram Das</p>
                                <p className="text-blue-400 text-sm">CDM • 89 OVR</p>
                            </div>
                            <div className="absolute top-4 right-4 bg-green-500 text-slate-900 text-xs font-bold px-2 py-1 rounded">MATCH 98%</div>
                        </div>
                    </motion.div>

                    {/* Stats Card Floating */}
                    <motion.div
                        style={{ y: y2 }}
                        className="absolute left-0 bottom-20 w-72 bg-slate-800/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-[0_0_50px_rgba(0,0,0,0.5)] z-30"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-blue-600/20 rounded-lg text-blue-400">
                                <Activity className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-gray-400 text-xs uppercase">Performance</p>
                                <p className="text-white font-bold">Excellent</p>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div>
                                <div className="flex justify-between text-xs text-gray-400 mb-1">
                                    <span>Speed</span>
                                    <span>94</span>
                                </div>
                                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-500 w-[94%]"></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs text-gray-400 mb-1">
                                    <span>Agility</span>
                                    <span>88</span>
                                </div>
                                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500 w-[88%]"></div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Decorative Elements */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[100px] mix-blend-screen pointer-events-none"></div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
