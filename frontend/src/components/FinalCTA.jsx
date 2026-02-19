import { Link } from 'react-router-dom';
import { ArrowRight, Rss } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FinalCTA() {
    return (
        <section className="py-24 bg-slate-900 relative overflow-hidden">
            {/* Glow blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-600/15 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-900/20 mb-6">
                        <Rss size={13} className="text-blue-400" />
                        <span className="text-blue-300 text-sm font-semibold">Your next opportunity is waiting</span>
                    </div>

                    <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
                        Ready to{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                            Get Discovered?
                        </span>
                    </h2>
                    <p className="text-gray-400 text-lg mb-10 leading-relaxed max-w-xl mx-auto">
                        Join 50,000+ athletes who are already using AI-powered analytics to fast-track their careers.
                        It only takes 2 minutes to create your profile.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/signup"
                            className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-base transition-all shadow-lg shadow-blue-500/30 hover:-translate-y-0.5"
                        >
                            Create Free Profile
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            to="/login"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-white font-semibold text-base transition-all"
                        >
                            Already have an account? Sign in
                        </Link>
                    </div>

                    {/* Trust row */}
                    <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-gray-500">
                        {['✓ Free forever', '✓ No credit card', '✓ AI scores in minutes', '✓ Join 50k+ athletes'].map(t => (
                            <span key={t}>{t}</span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
