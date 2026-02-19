import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CTA = () => {
    return (
        <div className="py-24 relative overflow-hidden bg-blue-600">
            {/* Background Patterns */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
                    Ready to Showcase Your Talent?
                </h2>
                <p className="text-blue-100 text-xl md:text-2xl mb-10 max-w-3xl mx-auto">
                    Join thousands of athletes and scouts on the world's most advanced scouting platform.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <Link
                        to="/signup"
                        className="px-10 py-4 rounded-full bg-white text-blue-600 font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-2"
                    >
                        Create Account
                    </Link>
                    <Link
                        to="/explore"
                        className="px-10 py-4 rounded-full bg-blue-700 border border-white/20 text-white font-bold text-lg hover:bg-blue-800 transition-all flex items-center justify-center gap-2"
                    >
                        Explore Athletes <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CTA;
