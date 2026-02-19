import { Link } from 'react-router-dom';
import { Video, Cpu, Activity, Globe, Shield, Zap } from 'lucide-react';

const Features = () => {
    const featureList = [
        {
            icon: <Cpu className="w-8 h-8 text-blue-400" />,
            title: "AI Performance Analysis",
            desc: "Our proprietary AI analyzes video footage to calculate speed, agility, and reaction metrics with 98% accuracy compared to professional sensors.",
            color: "blue"
        },
        {
            icon: <Video className="w-8 h-8 text-purple-400" />,
            title: "Smart Video Processing",
            desc: "Upload raw footage from any device. Our system automatically stabilizes, crops, and highlights key performance moments for scouts.",
            color: "purple"
        },
        {
            icon: <Activity className="w-8 h-8 text-green-400" />,
            title: "Athlete Dashboard",
            desc: "Track your progress over time. Visualize your improvement in speed, strength, and technique with interactive charts and historical data.",
            color: "green"
        },
        {
            icon: <Globe className="w-8 h-8 text-pink-400" />,
            title: "Global Scout Network",
            desc: "Your profile is instantly searchable by verified scouts from top clubs, academies, and universities worldwide.",
            color: "pink"
        },
        {
            icon: <Shield className="w-8 h-8 text-yellow-400" />,
            title: "Verified Badges",
            desc: "Earn verified skill badges through standardized video challenges. Prove your stats are real and stand out from the crowd.",
            color: "yellow"
        },
        {
            icon: <Zap className="w-8 h-8 text-cyan-400" />,
            title: "Instant Recruitment",
            desc: "Direct messaging allows scouts to contact you immediately. Receive trial invites and scholarship offers directly in your inbox.",
            color: "cyan"
        }
    ];

    return (
        <div className="min-h-screen bg-slate-950 pt-24 pb-20">
            {/* Hero Section */}
            <div className="text-center px-4 max-w-4xl mx-auto mb-20">
                <span className="px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-sm font-bold border border-blue-500/20 mb-6 inline-block">
                    POWERED BY ADVANCED AI
                </span>
                <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
                    The Toolkit for <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Next-Gen Athletes</span>
                </h1>
                <p className="text-xl text-gray-400 leading-relaxed">
                    Scout Arena provides professional-grade tools to democratize sports scouting.
                    No expensive equipment needed—just your phone and your talent.
                </p>
            </div>

            {/* Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featureList.map((feature, idx) => (
                        <div key={idx} className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 group">
                            <div className={`w-14 h-14 rounded-2xl bg-${feature.color}-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                {feature.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                            <p className="text-gray-400 leading-relaxed text-sm">
                                {feature.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom CTA */}
            <div className="mt-24 text-center">
                <div className="inline-block p-[2px] rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                    <div className="bg-slate-950 rounded-2xl px-10 py-12 max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold text-white mb-4">Ready to experience the future?</h2>
                        <p className="text-gray-400 mb-8">Join thousands of athletes getting discovered every day.</p>
                        <div className="flex gap-4 justify-center">
                            <Link to="/signup" className="px-8 py-3 bg-white text-slate-950 font-bold rounded-xl hover:bg-gray-200 transition-colors">
                                Get Started Free
                            </Link>
                            <Link to="/explore" className="px-8 py-3 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-colors border border-white/10">
                                Explore Talent
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Features;
