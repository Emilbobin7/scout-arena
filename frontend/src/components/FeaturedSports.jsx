import { ArrowRight, Activity, Target, Shield, Zap } from 'lucide-react';

const sports = [
    {
        id: 1,
        name: 'Football',
        image: 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?q=80&w=2070&auto=format&fit=crop',
        icon: <Activity className="w-6 h-6" />,
        color: 'from-blue-500 to-cyan-500',
        stats: '2.5k+ Scouts'
    },
    {
        id: 2,
        name: 'Cricket',
        image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=2067&auto=format&fit=crop',
        icon: <Target className="w-6 h-6" />,
        color: 'from-emerald-500 to-green-500',
        stats: '1.8k+ Scouts'
    },
    {
        id: 3,
        name: 'Basketball',
        image: 'https://images.unsplash.com/photo-1546519638-68e109498ee2?q=80&w=2070&auto=format&fit=crop',
        icon: <Zap className="w-6 h-6" />,
        color: 'from-orange-500 to-amber-500',
        stats: '1.2k+ Scouts'
    },
    {
        id: 4,
        name: 'Tennis',
        image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=2070&auto=format&fit=crop',
        icon: <Trophy className="w-6 h-6" />, // Need to import Trophy
        color: 'from-purple-500 to-pink-500',
        stats: '900+ Scouts'
    }
];

import { Trophy } from 'lucide-react'; // Added import

const FeaturedSports = () => {
    return (
        <section className="py-24 bg-slate-950 relative overflow-hidden" id="explore">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex justify-between items-end mb-16">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-black text-white mb-4">CHOOSE YOUR <span className="text-blue-500">ARENA</span></h2>
                        <p className="text-gray-400 max-w-xl text-lg">Select your sport to see top academies, scouts, and opportunities waiting for you.</p>
                    </div>
                    <button className="hidden md:flex items-center gap-2 text-blue-400 hover:text-white transition-colors font-semibold group">
                        View All Sports <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {sports.map((sport) => (
                        <div key={sport.id} className="group relative h-[400px] rounded-3xl overflow-hidden cursor-pointer">
                            {/* Background Image */}
                            <img
                                src={sport.image}
                                alt={sport.name}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-90 transition-opacity group-hover:opacity-80"></div>
                            <div className={`absolute inset-0 bg-gradient-to-t ${sport.color} opacity-0 group-hover:opacity-30 transition-opacity duration-500 mix-blend-overlay`}></div>

                            {/* Content */}
                            <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${sport.color} mb-4 shadow-lg`}>
                                        <div className="text-white">
                                            {sport.icon}
                                        </div>
                                    </div>

                                    <h3 className="text-3xl font-bold text-white mb-2">{sport.name}</h3>

                                    <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                        <span className="text-sm font-medium text-gray-300">{sport.stats}</span>
                                        <div className="h-1 w-1 bg-gray-500 rounded-full"></div>
                                        <span className="text-sm font-medium text-blue-400 flex items-center gap-1">
                                            Explore <ArrowRight className="w-3 h-3" />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <button className="w-full md:hidden mt-8 flex items-center justify-center gap-2 py-4 rounded-xl bg-slate-900 text-blue-400 font-semibold border border-white/10">
                    View All Sports <ArrowRight className="w-5 h-5" />
                </button>
            </div>
        </section>
    );
};

export default FeaturedSports;
