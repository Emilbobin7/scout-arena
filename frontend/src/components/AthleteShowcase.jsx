import { Star, TrendingUp, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const athletes = [
    { id: 1, name: 'Rohan Mehra', sport: 'Cricket', role: 'Batsman', rating: 92, image: 'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?q=80&w=2070&auto=format&fit=crop' },
    { id: 2, name: 'Sanjay Kumar', sport: 'Football', role: 'Striker', rating: 89, image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=1886&auto=format&fit=crop' },
    { id: 3, name: 'Aditi Singh', sport: 'Tennis', role: 'Singles', rating: 94, image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=2070&auto=format&fit=crop' },
    { id: 4, name: 'Michael Chen', sport: 'Basketball', role: 'Point Guard', rating: 91, image: 'https://images.unsplash.com/photo-1546519638-68e109498ee2?q=80&w=2070&auto=format&fit=crop' },
    { id: 5, name: 'Deepak Patel', sport: 'Cricket', role: 'Bowler', rating: 88, image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=2067&auto=format&fit=crop' },
    { id: 6, name: 'Priya Verma', sport: 'Badminton', role: 'Singles', rating: 95, image: 'https://images.unsplash.com/photo-1626224583764-847890e0b3b9?q=80&w=2071&auto=format&fit=crop' },
];

const AthleteShowcase = () => {
    return (
        <section className="py-24 bg-slate-950 overflow-hidden relative border-y border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 flex justify-between items-end">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                        <span className="text-red-500 font-bold tracking-widest text-xs uppercase">Live Scouting Feed</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black text-white">TOP RATED <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">PROSPECTS</span></h2>
                </div>
                <div className="hidden md:block">
                    <button className="text-sm font-medium text-gray-400 hover:text-white transition-colors">View Leaderboard</button>
                </div>
            </div>

            {/* Infinite Scroll Container */}
            <div className="flex relative">
                <motion.div
                    className="flex gap-6 px-4"
                    animate={{ x: ["0%", "-100%"] }}
                    transition={{ ease: "linear", duration: 30, repeat: Infinity }}
                >
                    {[...athletes, ...athletes].map((athlete, index) => (
                        <div key={`${athlete.id}-${index}`} className="w-[300px] flex-shrink-0 bg-slate-900 rounded-2xl overflow-hidden border border-white/10 group cursor-pointer hover:border-blue-500/50 transition-colors">
                            <div className="h-48 relative overflow-hidden">
                                <img src={athlete.image} alt={athlete.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10 flex items-center gap-1">
                                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                    <span className="text-white font-bold text-xs">{athlete.rating}</span>
                                </div>
                            </div>
                            <div className="p-5">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="text-white font-bold text-lg">{athlete.name}</h3>
                                        <p className="text-blue-400 text-sm">{athlete.sport} • {athlete.role}</p>
                                    </div>
                                    <ShieldCheck className="w-5 h-5 text-green-500" />
                                </div>
                                <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
                                    <TrendingUp className="w-3 h-3" />
                                    <span>Trending in Mumbai</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>

                <motion.div
                    className="flex gap-6 px-4 absolute left-full"
                    animate={{ x: ["0%", "-100%"] }}
                    transition={{ ease: "linear", duration: 30, repeat: Infinity }}
                >
                    {[...athletes, ...athletes].map((athlete, index) => (
                        <div key={`${athlete.id}-${index}-duplicate`} className="w-[300px] flex-shrink-0 bg-slate-900 rounded-2xl overflow-hidden border border-white/10 group cursor-pointer hover:border-blue-500/50 transition-colors">
                            <div className="h-48 relative overflow-hidden">
                                <img src={athlete.image} alt={athlete.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10 flex items-center gap-1">
                                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                    <span className="text-white font-bold text-xs">{athlete.rating}</span>
                                </div>
                            </div>
                            <div className="p-5">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="text-white font-bold text-lg">{athlete.name}</h3>
                                        <p className="text-blue-400 text-sm">{athlete.sport} • {athlete.role}</p>
                                    </div>
                                    <ShieldCheck className="w-5 h-5 text-green-500" />
                                </div>
                                <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
                                    <TrendingUp className="w-3 h-3" />
                                    <span>Trending in Mumbai</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default AthleteShowcase;
