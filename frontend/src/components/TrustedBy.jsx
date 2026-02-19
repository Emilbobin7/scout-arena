import { Shield, Trophy, Activity, Award } from 'lucide-react';

const TrustedBy = () => {
    const stats = [
        { label: 'Athletes', value: '10,000+', icon: Activity },
        { label: 'Scouts', value: '500+', icon: Shield },
        { label: 'Sports', value: '50+', icon: Trophy },
        { label: 'Matches', value: '2,500+', icon: Award },
    ];

    return (
        <div className="py-12 bg-slate-950 border-b border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <p className="text-center text-sm font-semibold text-gray-500 uppercase tracking-widest mb-8">
                    Trusted by Athletes, Coaches, and Scouts Worldwide
                </p>

                {/* Icons / Logos - Using placeholders/icons for now */}
                <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                    {/* Simulating club logos with text/icon combos */}
                    <div className="flex items-center gap-2"><Trophy className="w-8 h-8 text-yellow-500" /><span className="text-xl font-bold font-serif text-white">LIONS FC</span></div>
                    <div className="flex items-center gap-2"><Shield className="w-8 h-8 text-red-500" /><span className="text-xl font-bold font-mono text-white">REDHAWKS</span></div>
                    <div className="flex items-center gap-2"><Activity className="w-8 h-8 text-blue-500" /><span className="text-xl font-bold text-white">PULSE</span></div>
                    <div className="flex items-center gap-2"><Award className="w-8 h-8 text-green-500" /><span className="text-xl font-bold text-white">ELITE</span></div>
                </div>

                <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
                            <div className="text-sm text-gray-400 uppercase tracking-wide">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TrustedBy;
