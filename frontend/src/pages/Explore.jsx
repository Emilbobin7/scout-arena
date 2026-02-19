import { Link } from 'react-router-dom';
import { Search, Trophy, TrendingUp, Users, Filter, MapPin, ChevronRight, Star } from 'lucide-react';
import { useState } from 'react';

// Mock data (replace with API call later)
const MOCK_ATHLETES = [
    { id: 1, name: "Rahul Singh", sport: "Cricket", role: "Fast Bowler", location: "Mumbai", score: 92, status: "Signed", image: "https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?q=80&w=2070&auto=format&fit=crop" },
    { id: 2, name: "Priya Sharma", sport: "Badminton", role: "Singles", location: "Bangalore", score: 88, status: "Available", image: "https://images.unsplash.com/photo-1626224583764-847890e058f5?q=80&w=2070&auto=format&fit=crop" },
    { id: 3, name: "Arjun Kumar", sport: "Football", role: "Striker", location: "Kolkata", score: 85, status: "Available", image: "https://images.unsplash.com/photo-1517466787929-bc90951d6db0?q=80&w=1935&auto=format&fit=crop" },
    { id: 4, name: "Vikram Das", sport: "Hockey", role: "Midfielder", location: "Punjab", score: 90, status: "Scouted", image: "https://images.unsplash.com/photo-1532054304892-e4d6d9f78f8c?q=80&w=2070&auto=format&fit=crop" },
    { id: 5, name: "Ananya Patel", sport: "Tennis", role: "Doubles", location: "Ahmedabad", score: 84, status: "Available", image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=2070&auto=format&fit=crop" },
    { id: 6, name: "Rohan Gupta", sport: "Athletics", role: "Sprinter", location: "Delhi", score: 94, status: "Elite", image: "https://images.unsplash.com/photo-1552674605-5d28c4e1902c?q=80&w=2070&auto=format&fit=crop" },
];

const Explore = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilter, setActiveFilter] = useState('All');

    const filters = ['All', 'Cricket', 'Football', 'Badminton', 'Hockey', 'Tennis'];

    const filteredAthletes = MOCK_ATHLETES.filter(athlete =>
        (activeFilter === 'All' || athlete.sport === activeFilter) &&
        (athlete.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            athlete.role.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-12">

                {/* Header */}
                <div className="text-center space-y-4">
                    <h1 className="text-5xl font-extrabold text-white tracking-tight">
                        Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">Future Legends</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Browse top-rated athletes backed by AI performance data. Connect with the best talent in the country.
                    </p>
                </div>

                {/* Search & Filters */}
                <div className="flex flex-col md:flex-row gap-6 justify-between items-center bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-lg">
                    {/* Search */}
                    <div className="relative w-full md:w-96 group">
                        <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-blue-400 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search by name, role, or location..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder-gray-500"
                        />
                    </div>

                    {/* Filter Pills */}
                    <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto no-scrollbar">
                        {filters.map(filter => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${activeFilter === filter
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                                        : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                                    }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredAthletes.map((athlete) => (
                        <div key={athlete.id} className="group relative bg-slate-900/50 border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10">
                            {/* Image Overlay */}
                            <div className="relative h-64 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10" />
                                <img
                                    src={athlete.image}
                                    alt={athlete.name}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute top-4 right-4 z-20 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center gap-1.5">
                                    <Trophy className="w-3.5 h-3.5 text-yellow-500" />
                                    <span className="text-xs font-bold text-white">{athlete.score} OVR</span>
                                </div>
                                <div className="absolute bottom-4 left-4 z-20">
                                    <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">{athlete.name}</h3>
                                    <div className="flex items-center gap-2 text-gray-300 text-sm">
                                        <MapPin className="w-3.5 h-3.5" />
                                        {athlete.location}
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 space-y-6">
                                <div className="flex justify-between items-center text-sm">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-gray-500 text-xs uppercase tracking-wider">Sport</span>
                                        <span className="text-white font-medium">{athlete.sport}</span>
                                    </div>
                                    <div className="flex flex-col gap-1 text-right">
                                        <span className="text-gray-500 text-xs uppercase tracking-wider">Role</span>
                                        <span className="text-white font-medium">{athlete.role}</span>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${athlete.status === 'Signed' ? 'bg-green-500/20 text-green-400 border border-green-500/20' :
                                            athlete.status === 'Elite' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/20' :
                                                'bg-blue-500/20 text-blue-400 border border-blue-500/20'
                                        }`}>
                                        {athlete.status}
                                    </span>

                                    <Link to={`/signup`} className="flex items-center gap-1.5 text-sm font-bold text-gray-300 hover:text-white transition-colors group/btn">
                                        View Profile
                                        <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredAthletes.length === 0 && (
                    <div className="text-center py-20">
                        <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">No athletes found</h3>
                        <p className="text-gray-400">Try adjusting your filters or search term.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Explore;
