import { UploadCloud, Zap, Users, ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
    {
        id: 1,
        title: 'Upload Performance',
        description: 'Record your skills and upload game footage directly to your profile. All formats supported.',
        icon: <UploadCloud className="w-8 h-8" />,
        color: 'bg-blue-600',
        glow: 'shadow-blue-500/50'
    },
    {
        id: 2,
        title: 'AI Analysis',
        description: 'Our proprietary computer vision algorithms analyze your speed, agility, and technique in real-time.',
        icon: <Zap className="w-8 h-8" />,
        color: 'bg-purple-600',
        glow: 'shadow-purple-500/50'
    },
    {
        id: 3,
        title: 'Get Scouted',
        description: 'Top academies and scouts receive detailed reports. If you match their criteria, you get the call.',
        icon: <Users className="w-8 h-8" />,
        color: 'bg-green-600',
        glow: 'shadow-green-500/50'
    },
];

const HowItWorks = () => {
    return (
        <section className="py-24 bg-slate-900 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6">THE PATH TO <span className="text-blue-500">GLORY</span></h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">Three simple steps to transform your career from local talent to national prospect.</p>
                </div>

                <div className="relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden lg:block absolute top-[60%] left-0 w-full h-1 bg-white/5 -translate-y-1/2 rounded-full">
                        <motion.div
                            initial={{ width: "0%" }}
                            whileInView={{ width: "100%" }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                            className="h-full bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 rounded-full"
                        ></motion.div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative z-10">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2, duration: 0.6 }}
                                className="flex flex-col items-center text-center group"
                            >
                                <div className={`w-24 h-24 rounded-3xl ${step.color} bg-opacity-20 flex items-center justify-center mb-8 relative`}>
                                    <div className={`absolute inset-0 ${step.color} opacity-20 blur-xl rounded-3xl group-hover:opacity-40 transition-opacity`}></div>
                                    <div className={`relative z-10 w-16 h-16 rounded-2xl ${step.color} shadow-lg ${step.glow} flex items-center justify-center text-white transform group-hover:scale-110 transition-transform duration-300`}>
                                        {step.icon}
                                    </div>
                                    {/* Number Badge */}
                                    <div className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-slate-800 border-4 border-slate-900 flex items-center justify-center text-white font-black text-lg shadow-xl">
                                        {step.id}
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">{step.title}</h3>
                                <p className="text-gray-400 leading-relaxed px-4">{step.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="mt-20 flex justify-center">
                    <button className="px-10 py-4 rounded-full border border-white/10 hover:border-blue-500/50 bg-white/5 hover:bg-white/10 text-white font-semibold transition-all flex items-center gap-3 group">
                        Start Your Journey <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
