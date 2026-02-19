import { Video, BarChart2, Search, Zap, Globe, Share2, Award, UserCheck } from 'lucide-react';

const features = [
    {
        name: 'Athlete Profiles',
        description: 'Create professional athlete profiles with achievements, stats, and performance videos.',
        icon: UserCheck,
    },
    {
        name: 'Video Upload & Analysis',
        description: 'Upload performance videos and receive AI-based skill evaluations.',
        icon: Video,
    },
    {
        name: 'AI Skill Scores',
        description: 'Get intelligent performance scores including speed, agility, and accuracy.',
        icon: BarChart2,
    },
    {
        name: 'Scout Discovery',
        description: 'Scouts can search and discover athletes using powerful filters.',
        icon: Search,
    },
    {
        name: 'Smart Recommendations',
        description: 'AI recommends athletes based on performance and requirements.',
        icon: Zap,
    },
    {
        name: 'Social Networking',
        description: 'Follow athletes, interact, and build sports connections.',
        icon: Share2,
    },
];

const Features = () => {
    return (
        <div id="features" className="py-24 bg-slate-900 relative">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
                <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-sm text-blue-400 font-bold tracking-widest uppercase">Powerful Features</h2>
                    <p className="mt-2 text-4xl font-extrabold text-white tracking-tight sm:text-5xl">
                        Everything you need to <span className="text-blue-500">discover</span> and <span className="text-green-400">showcase</span> talent
                    </p>
                    <p className="mt-4 text-xl text-gray-400">
                        Scout Arena bridges the gap between talent and opportunity with cutting-edge technology.
                    </p>
                </div>

                <div className="mt-20">
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {features.map((feature) => (
                            <div key={feature.name} className="relative group">
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-green-400 rounded-xl opacity-20 group-hover:opacity-100 transition duration-500 blur"></div>
                                <div className="relative bg-slate-900 h-full p-8 rounded-xl border border-white/10 hover:border-transparent transition-all duration-300">
                                    <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-600/20 to-green-500/20 rounded-lg mb-6 group-hover:scale-110 transition-transform duration-300">
                                        <feature.icon className="h-7 w-7 text-blue-400 group-hover:text-white transition-colors" aria-hidden="true" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">{feature.name}</h3>
                                    <p className="text-gray-400 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Features;
