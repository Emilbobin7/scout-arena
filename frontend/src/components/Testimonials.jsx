import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

const testimonials = [
    {
        name: 'Vikram Das',
        role: 'ISL Midfielder',
        sport: '⚽ Football',
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop',
        quote: 'Scout Arena is the reason I got picked up by an ISL club. The AI analysis showed exactly what coaches wanted to see.',
        rating: 5,
        result: 'Signed by Bengaluru FC',
    },
    {
        name: 'Priya Sharma',
        role: 'State Cricketer',
        sport: '🏏 Cricket',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
        quote: 'From a small district with zero connections. This platform put my performance data in front of national selectors in weeks.',
        rating: 5,
        result: 'Selected for State Squad',
    },
    {
        name: 'Arjun Singh',
        role: 'Pro Hockey Player',
        sport: '🏑 Hockey',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
        quote: 'The speed and agility metrics are incredibly accurate. It tracks my progress in a way coaches actually appreciate.',
        rating: 5,
        result: 'National Team Shortlist',
    },
];

const StarRow = ({ count = 5 }) => (
    <div className="flex gap-0.5">
        {Array.from({ length: count }).map((_, i) => (
            <Star key={i} size={13} className="fill-yellow-400 text-yellow-400" />
        ))}
    </div>
);

export default function Testimonials() {
    return (
        <section className="py-24 bg-slate-950 relative">
            {/* subtle top border gradient */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-yellow-500/20 bg-yellow-900/10 mb-4">
                        <Star size={14} className="fill-yellow-400 text-yellow-400" />
                        <span className="text-yellow-300 text-sm font-semibold">4.9 / 5 across 2,000+ athletes</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                        Athletes Who{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">Made It</span>
                    </h2>
                    <p className="text-gray-400 max-w-xl mx-auto">
                        Real athletes. Real results. These are their stories.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15 }}
                            className="relative bg-slate-900/70 backdrop-blur-sm border border-white/8 rounded-2xl p-6 hover:border-white/15 hover:bg-slate-800/60 transition-all group"
                        >
                            <Quote className="absolute top-5 right-5 text-blue-500/15 w-10 h-10" />

                            {/* Stars + sport */}
                            <div className="flex items-center justify-between mb-4">
                                <StarRow count={t.rating} />
                                <span className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded-full">{t.sport}</span>
                            </div>

                            {/* Quote */}
                            <p className="text-gray-300 text-sm leading-relaxed mb-5 italic">
                                "{t.quote}"
                            </p>

                            {/* Result badge */}
                            <div className="mb-5 inline-block px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-semibold">
                                ✓ {t.result}
                            </div>

                            {/* Author */}
                            <div className="flex items-center gap-3 border-t border-white/8 pt-4">
                                <img
                                    src={t.image}
                                    alt={t.name}
                                    className="w-10 h-10 rounded-full object-cover border-2 border-blue-500/30"
                                />
                                <div>
                                    <p className="text-white font-bold text-sm">{t.name}</p>
                                    <p className="text-blue-400 text-xs">{t.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
