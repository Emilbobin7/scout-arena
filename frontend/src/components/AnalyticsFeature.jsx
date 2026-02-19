import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CheckCircle2, Cpu, ScanLine, BarChart3 } from 'lucide-react';

const AnalyticsFeature = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

    return (
        <section ref={ref} className="py-24 bg-slate-950 overflow-hidden relative">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Visual Side */}
                    <div className="relative order-2 lg:order-1">
                        <div className="relative z-10 rounded-3xl overflow-hidden border border-blue-500/30 shadow-[0_0_50px_rgba(59,130,246,0.2)] bg-slate-900/50 backdrop-blur-sm">
                            {/* Mockup of Analysis Interface */}
                            <img
                                src="https://images.unsplash.com/photo-1526676037777-05a232554f77?q=80&w=2070&auto=format&fit=crop"
                                alt="AI Analysis"
                                className="w-full h-auto opacity-60"
                            />

                            {/* Overlay UI Elements */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                    className="w-full h-full border-2 border-blue-400/50 rounded-lg m-8 relative"
                                >
                                    {/* Corners */}
                                    <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-blue-500 -mt-1 -ml-1"></div>
                                    <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-blue-500 -mt-1 -mr-1"></div>
                                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-blue-500 -mb-1 -ml-1"></div>
                                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-blue-500 -mb-1 -mr-1"></div>

                                    {/* Scanning Line */}
                                    <motion.div
                                        animate={{ top: ["0%", "100%", "0%"] }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                        className="absolute left-0 w-full h-0.5 bg-blue-400 shadow-[0_0_20px_rgba(96,165,250,1)]"
                                    ></motion.div>

                                    {/* Data Points */}
                                    <div className="absolute top-1/4 left-1/4 flex items-center gap-2">
                                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                        <span className="text-xs text-green-400 font-mono bg-black/50 px-1">VELOCITY: 8.4m/s</span>
                                    </div>
                                    <div className="absolute bottom-1/3 right-1/4 flex items-center gap-2">
                                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse animation-delay-500"></div>
                                        <span className="text-xs text-green-400 font-mono bg-black/50 px-1">ANGLE: 42°</span>
                                    </div>
                                </motion.div>
                            </div>
                        </div>

                        {/* Floating Badge */}
                        <motion.div
                            style={{ y }}
                            className="absolute -bottom-10 -right-10 bg-slate-800 border border-white/10 p-4 rounded-2xl shadow-xl z-20 hidden md:block"
                        >
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400">
                                    <Cpu className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 uppercase">Processing</p>
                                    <p className="text-white font-bold">Real-time Vision API</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Content Side */}
                    <div className="order-1 lg:order-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/30 border border-blue-500/30 text-blue-400 text-sm font-medium mb-6">
                            <ScanLine className="w-4 h-4" />
                            <span>Computer Vision Technology</span>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                            SEE WHAT OTHERS <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">CAN'T SEE</span>
                        </h2>

                        <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                            Our advanced AI doesn't just watch video; it understands movement. We extract over 50+ performance metrics from standard footage to build a comprehensive athletic profile.
                        </p>

                        <div className="space-y-6">
                            {[
                                { title: 'Biomechanics Analysis', desc: 'Detailed breakdown of form and technique.' },
                                { title: 'Speed & Trajectory', desc: 'Precise measurements of movement speed and ball trajectory.' },
                                { title: 'Tactical Awareness', desc: 'Heat maps and positioning analysis during game play.' }
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5"
                                >
                                    <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-lg">{item.title}</h4>
                                        <p className="text-gray-400 text-sm">{item.desc}</p>
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
