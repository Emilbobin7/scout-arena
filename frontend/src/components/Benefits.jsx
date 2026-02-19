import { CheckCircle } from 'lucide-react';

const Benefits = () => {
    const benefits = [
        { title: 'AI-Driven Talent Discovery', desc: 'Objective skill analysis using AI.' },
        { title: 'Global Exposure', desc: 'Athletes get visibility worldwide.' },
        { title: 'Data-Based Evaluation', desc: 'No bias, only performance.' },
        { title: 'Professional Profiles', desc: 'Showcase like LinkedIn for sports.' },
        { title: 'Video-Based Proof', desc: 'Real performance, not just resumes.' },
    ];

    return (
        <div className="py-24 bg-slate-900 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    {/* Left Side: Image/Visual */}
                    <div className="lg:w-1/2 relative">
                        <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
                            <div className="absolute inset-0 bg-blue-600/20 mix-blend-overlay z-10"></div>
                            {/* Placeholder image for a dashboard or athlete analyzing stats */}
                            <img
                                src="https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=2006&auto=format&fit=crop"
                                alt="Analytics Dashboard"
                                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                            />

                            {/* Floating Card Overlay */}
                            <div className="absolute bottom-6 left-6 right-6 bg-slate-900/90 backdrop-blur-md p-6 rounded-xl border border-white/10 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400">Match Found</p>
                                        <p className="text-white font-bold">98% Compatibility Score</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Decorative Background Blob */}
                        <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-600/20 rounded-full blur-3xl"></div>
                    </div>

                    {/* Right Side: Content */}
                    <div className="lg:w-1/2">
                        <h2 className="text-blue-400 font-bold tracking-wide uppercase mb-2">Why Choose Scout Arena?</h2>
                        <h3 className="text-4xl md:text-5xl font-extrabold text-white mb-8 leading-tight">
                            Unlock Your True <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">Potential</span>
                        </h3>

                        <div className="space-y-6">
                            {benefits.map((benefit, index) => (
                                <div key={index} className="flex items-start group">
                                    <div className="flex-shrink-0 mt-1">
                                        <CheckCircle className="w-6 h-6 text-green-500 group-hover:scale-110 transition-transform" />
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{benefit.title}</h4>
                                        <p className="text-gray-400 mt-1">{benefit.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Benefits;
