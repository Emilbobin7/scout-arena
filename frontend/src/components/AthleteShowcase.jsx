import { Star, TrendingUp, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const athletes = [
    { id: 1, name: 'Rohan Mehra', sport: 'Cricket', role: 'Batsman', rating: 92, image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80' },
    { id: 2, name: 'Sanjay Kumar', sport: 'Football', role: 'Striker', rating: 89, image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=800&q=80' },
    { id: 3, name: 'Aditi Singh', sport: 'Tennis', role: 'Singles', rating: 94, image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&w=800&q=80' },
    { id: 4, name: 'Michael Chen', sport: 'Basketball', role: 'Point Guard', rating: 91, image: 'https://images.unsplash.com/photo-1546519638-68e109498ee2?auto=format&fit=crop&w=800&q=80' },
    { id: 5, name: 'Deepak Patel', sport: 'Cricket', role: 'Bowler', rating: 88, image: 'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?auto=format&fit=crop&w=800&q=80' },
    { id: 6, name: 'Priya Verma', sport: 'Badminton', role: 'Singles', rating: 95, image: 'https://plus.unsplash.com/premium_photo-1676634832558-6654a134e920?auto=format&fit=crop&w=800&q=80' },
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
            <div className="flex relative overflow-hidden mask-linear-gradient">
                <div
                    className="flex gap-6 px-4 animate-scroll hover:pause will-change-transform"
                    style={{ width: "max-content" }}
                >
                    {/* Render list twice for seamless loop */}
                    {[...athletes, ...athletes].map((athlete, index) => (
                        <div
                            key={`${athlete.id}-${index}`}
                            className="w-[300px] flex-shrink-0 relative group perspective-1000"
                        >
                            <div className="bg-slate-900/40 backdrop-blur-md rounded-xl overflow-hidden border border-white/10 transition-all duration-500 transform -skew-x-12 group-hover:skew-x-0 group-hover:scale-105 group-hover:border-blue-500/50 hover:shadow-[0_0_40px_rgba(59,130,246,0.3)]">
                                <div className="h-48 relative overflow-hidden transform skew-x-12 group-hover:skew-x-0 transition-all duration-500">
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10"></div>
                                    <img src={athlete.image} alt={athlete.name} className="w-full h-full object-cover scale-125 group-hover:scale-110 transition-transform duration-700" />
                                    <div className="absolute top-3 right-3 z-20 bg-blue-600/90 backdrop-blur-md px-2 py-1.5 rounded shadow-lg flex items-center gap-1">
                                        <Star className="w-3 h-3 text-white fill-current" />
                                        <span className="text-white font-bold text-xs">{athlete.rating}</span>
                                    </div>

                                    {/* Hover Overlay Button */}
                                    <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
                                        <button className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider rounded transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-xl border border-white/20">
                                            View Profile
                                        </button>
                                    </div>
                                </div>
                                <div className="p-5 transform skew-x-12 group-hover:skew-x-0 transition-all duration-500">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="text-white font-black text-lg italic uppercase tracking-wider">{athlete.name}</h3>
                                            <p className="text-blue-400 text-xs font-bold uppercase">{athlete.sport} • {athlete.role}</p>
                                        </div>
                                        <div className="p-1.5 rounded bg-white/5 group-hover:bg-green-500/20 transition-colors">
                                            <ShieldCheck className="w-4 h-4 text-green-500" />
                                        </div>
                                    </div>
                                    <div className="mt-3 flex items-center gap-2 text-[10px] text-gray-400 font-mono border-t border-white/5 pt-2">
                                        <TrendingUp className="w-3 h-3 text-blue-500" />
                                        <span>TRENDING IN MUMBAI</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AthleteShowcase;
