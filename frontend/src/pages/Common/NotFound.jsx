import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <div className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 mb-4">
                    404
                </div>
                <h1 className="text-3xl font-bold text-white mb-3">Page Not Found</h1>
                <p className="text-gray-400 mb-8 max-w-md mx-auto">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <div className="flex items-center justify-center gap-4">
                    <button onClick={() => window.history.back()}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 text-gray-300 hover:text-white hover:border-white/30 transition-all">
                        <ArrowLeft size={16} />
                        Go Back
                    </button>
                    <Link to="/" className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition-all">
                        <Home size={16} />
                        Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
