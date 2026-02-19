import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Activity, Cpu, ScanLine, BrainCircuit, Zap, Target, Search } from 'lucide-react';

const AnalyticsFeature = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

    return (
        <section ref={ref} className="py-32 bg-slate-950 overflow-hidden relative">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[100px] mix-blend-screen pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    {/* Visual Side */}
                    <div className="relative order-2 lg:order-1 perspective-1000">
                        <div className="relative z-10 rounded-3xl overflow-hidden border border-blue-500/20 shadow-[0_0_100px_rgba(59,130,246,0.15)] bg-slate-900/80 backdrop-blur-md group">
                            {/* Mockup of Analysis Interface */}
                            <div className="relative">
                                <img
                                    src="https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1000&q=80"
                                    alt="AI Analysis"
                                    className="w-full h-auto object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                                <div className="absolute inset-0 bg-blue-500/10 mix-blend-overlay"></div>
                            </div>

                            {/* Overlay UI Elements */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.8 }}
                                    className="w-[90%] h-[90%] border border-blue-400/30 rounded-2xl relative"
                                >
                                    {/* Corners */}
                                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-400 rounded-tl-lg shadow-[0_0_15px_rgba(96,165,250,0.5)]"></div>
                                    <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-blue-400 rounded-tr-lg shadow-[0_0_15px_rgba(96,165,250,0.5)]"></div>
                                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-blue-400 rounded-bl-lg shadow-[0_0_15px_rgba(96,165,250,0.5)]"></div>
                                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-400 rounded-br-lg shadow-[0_0_15px_rgba(96,165,250,0.5)]"></div>

                                    {/* Scanning Line */}
                                    <motion.div
                                        animate={{ top: ["0%", "100%", "0%"] }}
                                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                        className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-400 to-transparent shadow-[0_0_20px_rgba(96,165,250,0.8)]"
                                    ></motion.div>

                                    {/* Data Points */}
                                    <div className="absolute top-1/3 left-1/3 ml-4 mt-8">
                                        <div className="flex items-center gap-3 bg-slate-900/90 backdrop-blur border border-green-500/30 px-3 py-1.5 rounded-lg shadow-lg">
                                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                                            <span className="text-xs text-green-400 font-mono tracking-wider">VELOCITY: 8.4m/s</span>
                                        </div>
                                    </div>
                                    <div className="absolute bottom-1/3 right-1/4">
                                        <div className="flex items-center gap-3 bg-slate-900/90 backdrop-blur border border-blue-500/30 px-3 py-1.5 rounded-lg shadow-lg">
                                            <Target className="w-3 h-3 text-blue-400" />
                                            <span className="text-xs text-blue-400 font-mono tracking-wider">PROJECTED: 94%</span>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>

                        {/* Floating Badge */}
                        <motion.div
                            style={{ y }}
                            className="absolute -bottom-8 -right-8 bg-slate-900/90 backdrop-blur-xl border border-white/10 p-5 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-20 hidden md:block"
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20 text-blue-400 shadow-inner">
                                    <Cpu className="w-8 h-8" />
                                </div>
                                <div>
                                    <p className="text-[10px] text-blue-300 uppercase tracking-widest font-semibold mb-1">Processing</p>
                                    <p className="text-white font-bold text-lg leading-none">Vision API V2.0</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Content Side */}
                    <div className="order-1 lg:order-2">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-900/20 border border-blue-500/20 text-blue-400 text-sm font-semibold mb-8 backdrop-blur-sm">
                            <ScanLine className="w-4 h-4 animate-pulse" />
                            <span className="tracking-wide">COMPUTER VISION TECHNOLOGY</span>
                        </div>

                        <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight">
                            SEE WHAT OTHERS <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-gradient-x">CAN'T SEE</span>
                        </h2>

                        <p className="text-gray-400 text-lg mb-10 leading-relaxed max-w-lg">
                            Our advanced AI doesn't just watch video; it understands <span className="text-white font-medium">biomechanics</span>. We extract over 50+ performance metrics from standard footage to build a comprehensive athletic profile.
                        </p>

                        <div className="space-y-8">
                            {[
                                {
                                    title: 'Biomechanics Analysis',
                                    desc: 'Detailed breakdown of skeletal form and technique efficiency.',
                                    icon: <Activity className="w-5 h-5 text-blue-400" />,
                                    color: 'bg-blue-500/10'
                                },
                                {
                                    title: 'Speed & Trajectory',
                                    desc: 'Precise measurements of sprint velocity and ball flight paths.',
                                    icon: <Zap className="w-5 h-5 text-yellow-400" />,
                                    color: 'bg-yellow-500/10'
                                },
                                {
                                    title: 'Tactical Awareness',
                                    desc: 'Heat maps and spatial positioning analysis during match play.',
                                    icon: <BrainCircuit className="w-5 h-5 text-purple-400" />,
                                    color: 'bg-purple-500/10'
                                }
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-start gap-5 group"
                                >
                                    <div className={`mt-1 flex-shrink-0 w-12 h-12 rounded-2xl ${item.color} border border-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-xl mb-1 group-hover:text-blue-400 transition-colors">{item.title}</h4>
                                        <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AnalyticsFeature;
