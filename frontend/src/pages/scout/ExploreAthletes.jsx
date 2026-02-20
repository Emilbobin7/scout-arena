import { useState, useEffect, useCallback } from 'react';
import {
    Search, MapPin, Star, SlidersHorizontal, X,
    MessageSquare, UserCheck, ArrowUpDown, Zap, Target, Timer, Activity
} from 'lucide-react';
import axios from 'axios';
import { API_URL } from '../../config';
import { Link, useNavigate } from 'react-router-dom';
import FollowButton from '../../components/FollowButton';

const SPORTS = ['All Sports', 'Football', 'Basketball', 'Cricket', 'Tennis', 'Swimming',
    'Athletics', 'Boxing', 'Rugby', 'Baseball', 'Volleyball'];

const SORT_OPTIONS = [
    { value: 'overall_desc', label: 'Highest Score' },
    { value: 'overall_asc', label: 'Lowest Score' },
    { value: 'name_asc', label: 'Name A–Z' },
    { value: 'name_desc', label: 'Name Z–A' },
];

const SKILL_ICONS = {
    speed: Zap,
    agility: Activity,
    accuracy: Target,
    reaction: Timer,
};

const SKILL_COLORS = {
    speed: 'text-yellow-400',
    agility: 'text-green-400',
    accuracy: 'text-blue-400',
    reaction: 'text-purple-400',
};

const getOverallScore = (athlete) => {
    const s = athlete.stats || {};
    const vals = [s.speed || 0, s.agility || 0, s.accuracy || 0, s.reaction || 0];
    return Math.round(vals.reduce((a, b) => a + b, 0) / 4);
};

const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    if (score >= 40) return 'text-orange-400';
    return 'text-gray-400';
};

const getScoreBg = (score) => {
    if (score >= 80) return 'from-green-500/20 to-emerald-500/10 border-green-500/30';
    if (score >= 60) return 'from-yellow-500/20 to-amber-500/10 border-yellow-500/30';
    if (score >= 40) return 'from-orange-500/20 to-red-500/10 border-orange-500/30';
    return 'from-white/10 to-white/5 border-white/10';
};

// ─── Athlete Card ─────────────────────────────────────────────────────────────
const AthleteCard = ({ athlete }) => {
    const navigate = useNavigate();
    const overall = getOverallScore(athlete);
    const userId = athlete.userId?._id;
    const name = athlete.userId?.name || 'Unknown Athlete';

    const handleMessage = () => {
        navigate('/scout-dashboard/messages', { state: { openUserId: userId, openUserName: name } });
    };

    return (
        <div className="relative group flex flex-col bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/15 hover:border-blue-500/30">

            {/* Top banner / photo */}
            <div className="relative h-44 overflow-hidden bg-slate-800 flex-shrink-0">
                {athlete.profilePhoto && !athlete.profilePhoto.includes('placeholder') ? (
                    <img
                        src={athlete.profilePhoto}
                        alt={name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-900/40 to-purple-900/40">
                        <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center text-3xl font-bold text-white/40">
                            {name.charAt(0).toUpperCase()}
                        </div>
                    </div>
                )}
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />

                {/* Overall Score Badge */}
                {overall > 0 && (
                    <div className={`absolute top-3 right-3 bg-gradient-to-br ${getScoreBg(overall)} backdrop-blur-sm border rounded-xl px-3 py-1.5 text-center`}>
                        <div className="text-[10px] text-gray-400 uppercase tracking-wider leading-none mb-0.5">Overall</div>
                        <div className={`text-xl font-black leading-none ${getScoreColor(overall)}`}>{overall}</div>
                    </div>
                )}

                {/* Sport badge */}
                {athlete.sport && (
                    <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm border border-white/15 rounded-full px-2.5 py-1 text-xs font-medium text-white">
                        {athlete.sport}
                    </div>
                )}

                {/* Name overlay */}
                <div className="absolute bottom-3 left-4 right-4">
                    <h3 className="text-lg font-bold text-white leading-tight truncate drop-shadow-lg">{name}</h3>
                    <p className="text-blue-400 text-sm font-medium">
                        {athlete.position || 'Athlete'}{athlete.sport ? ` • ${athlete.sport}` : ''}
                    </p>
                </div>
            </div>

            {/* Body */}
            <div className="flex flex-col flex-1 p-4 gap-3">

                {/* Location */}
                {athlete.location && (
                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                        <MapPin size={11} className="flex-shrink-0" />
                        <span className="truncate">{athlete.location}</span>
                    </div>
                )}

                {/* Skill bars */}
                <div className="grid grid-cols-2 gap-1.5">
                    {Object.entries(SKILL_ICONS).map(([skill, Icon]) => {
                        const val = athlete.stats?.[skill] || 0;
                        return (
                            <div key={skill} className="bg-slate-800/60 rounded-lg px-2.5 py-2 border border-white/5">
                                <div className="flex items-center justify-between mb-1">
                                    <div className="flex items-center gap-1">
                                        <Icon size={10} className={SKILL_COLORS[skill]} />
                                        <span className="text-[10px] text-gray-500 capitalize">{skill}</span>
                                    </div>
                                    <span className={`text-xs font-bold ${SKILL_COLORS[skill]}`}>{val}</span>
                                </div>
                                <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full transition-all duration-700 ${skill === 'speed' ? 'bg-yellow-400' :
                                            skill === 'agility' ? 'bg-green-400' :
                                                skill === 'accuracy' ? 'bg-blue-400' : 'bg-purple-400'
                                            }`}
                                        style={{ width: `${val}%` }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Action buttons */}
                <div className="mt-auto pt-1 flex flex-col gap-2">
                    {/* View Profile */}
                    <Link
                        to={`/profile/${userId}`}
                        className="w-full py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white text-sm font-semibold rounded-xl text-center transition-all hover:shadow-lg hover:shadow-blue-500/30"
                    >
                        View Full Profile
                    </Link>

                    {/* Follow + Message */}
                    <div className="flex gap-2">
                        <div className="flex-1">
                            <FollowButton userId={userId} userName={name} compact />
                        </div>
                        <button
                            onClick={handleMessage}
                            title="Send Message"
                            className="px-3 py-2 bg-slate-700 hover:bg-green-600/20 hover:border-green-500/40 border border-white/10 rounded-xl text-gray-300 hover:text-green-400 transition-all flex items-center gap-1.5 text-xs font-medium"
                        >
                            <MessageSquare size={14} />
                            <span>Msg</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ─── Skeleton Card ─────────────────────────────────────────────────────────────
const SkeletonCard = () => (
    <div className="bg-slate-800/50 border border-white/10 rounded-2xl overflow-hidden animate-pulse">
        <div className="h-44 bg-slate-700" />
        <div className="p-4 space-y-3">
            <div className="h-3 bg-slate-700 rounded w-2/3" />
            <div className="grid grid-cols-2 gap-2">
                {[1, 2, 3, 4].map(i => <div key={i} className="h-10 bg-slate-700 rounded-lg" />)}
            </div>
            <div className="h-9 bg-slate-700 rounded-xl" />
            <div className="h-9 bg-slate-700 rounded-xl" />
        </div>
    </div>
);

// ─── Main Page ─────────────────────────────────────────────────────────────────
const ExploreAthletes = () => {
    const [athletes, setAthletes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState('overall_desc');

    const [filters, setFilters] = useState({
        name: '', sport: '', position: '', location: '', minOverall: ''
    });
    const [appliedFilters, setAppliedFilters] = useState(filters);

    const getConfig = () => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        return { headers: { Authorization: `Bearer ${userInfo?.token}` } };
    };

    const fetchAthletes = useCallback(async (activeFilters) => {
        setLoading(true);
        try {
            const params = Object.fromEntries(
                Object.entries(activeFilters)
                    .filter(([, v]) => v !== '' && v !== 'All Sports')
            );
            const { data } = await axios.get(`${API_URL}/api/scout/search`, { ...getConfig(), params });
            setAthletes(data);
        } catch (error) {
            console.error('Error fetching athletes:', error);
            setAthletes([]);
        } finally {
            setLoading(false);
        }
    }, []);

    // Initial & filter-triggered load
    useEffect(() => {
        fetchAthletes(appliedFilters);
    }, [appliedFilters, fetchAthletes]);

    // Debounce text inputs
    useEffect(() => {
        const timer = setTimeout(() => setAppliedFilters(filters), 500);
        return () => clearTimeout(timer);
    }, [filters]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleSportChange = (e) => {
        const val = e.target.value === 'All Sports' ? '' : e.target.value;
        setFilters(prev => ({ ...prev, sport: val }));
    };

    const clearFilters = () => {
        const empty = { name: '', sport: '', position: '', location: '', minOverall: '' };
        setFilters(empty);
        setAppliedFilters(empty);
    };

    const hasActiveFilters = Object.values(appliedFilters).some(v => v !== '');

    // Client-side sort
    const sorted = [...athletes].sort((a, b) => {
        if (sortBy === 'overall_desc') return getOverallScore(b) - getOverallScore(a);
        if (sortBy === 'overall_asc') return getOverallScore(a) - getOverallScore(b);
        const na = a.userId?.name || '';
        const nb = b.userId?.name || '';
        if (sortBy === 'name_asc') return na.localeCompare(nb);
        if (sortBy === 'name_desc') return nb.localeCompare(na);
        return 0;
    });

    return (
        <div className="max-w-7xl mx-auto py-8 space-y-8">

            {/* ── Header ── */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                        Explore Athletes
                    </h1>
                    <p className="text-gray-400 mt-1 text-sm">
                        {loading
                            ? 'Discovering talent...'
                            : `${sorted.length} athlete${sorted.length !== 1 ? 's' : ''} found`}
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    {/* Sort */}
                    <div className="flex items-center gap-2 bg-slate-800/80 border border-white/10 rounded-xl px-3 py-2">
                        <ArrowUpDown size={14} className="text-gray-400" />
                        <select
                            value={sortBy}
                            onChange={e => setSortBy(e.target.value)}
                            className="bg-transparent text-sm text-white focus:outline-none cursor-pointer"
                        >
                            {SORT_OPTIONS.map(o => (
                                <option key={o.value} value={o.value} className="bg-slate-800">{o.label}</option>
                            ))}
                        </select>
                    </div>

                    {/* Clear filters */}
                    {hasActiveFilters && (
                        <button
                            onClick={clearFilters}
                            className="flex items-center gap-1.5 px-3 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-xl text-red-400 text-sm font-medium transition-all"
                        >
                            <X size={13} />
                            Clear
                        </button>
                    )}
                </div>
            </div>

            {/* ── Filter Bar ── */}
            <div className="bg-slate-800/50 backdrop-blur-sm p-5 rounded-2xl border border-white/10 space-y-4">
                <div className="flex items-center gap-2 text-gray-400 text-xs font-semibold uppercase tracking-wider">
                    <SlidersHorizontal size={14} />
                    Filters
                    {hasActiveFilters && <span className="text-blue-400 ml-1">(active)</span>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                    {/* Name search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-500" />
                        <input
                            type="text" name="name" placeholder="Athlete name..."
                            value={filters.name} onChange={handleFilterChange}
                            className="w-full pl-9 pr-3 py-2.5 bg-slate-900/60 border border-white/10 rounded-xl focus:outline-none focus:border-blue-500 text-white text-sm placeholder-gray-600 transition-colors"
                        />
                    </div>

                    {/* Sport dropdown */}
                    <select
                        name="sport"
                        value={filters.sport || 'All Sports'}
                        onChange={handleSportChange}
                        className="py-2.5 px-3 bg-slate-900/60 border border-white/10 rounded-xl focus:outline-none focus:border-blue-500 text-white text-sm transition-colors cursor-pointer"
                    >
                        {SPORTS.map(s => (
                            <option key={s} value={s} className="bg-slate-800">{s}</option>
                        ))}
                    </select>

                    {/* Position */}
                    <input
                        type="text" name="position" placeholder="Position..."
                        value={filters.position} onChange={handleFilterChange}
                        className="py-2.5 px-3 bg-slate-900/60 border border-white/10 rounded-xl focus:outline-none focus:border-blue-500 text-white text-sm placeholder-gray-600 transition-colors"
                    />

                    {/* Location */}
                    <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-500" />
                        <input
                            type="text" name="location" placeholder="Location..."
                            value={filters.location} onChange={handleFilterChange}
                            className="w-full pl-9 pr-3 py-2.5 bg-slate-900/60 border border-white/10 rounded-xl focus:outline-none focus:border-blue-500 text-white text-sm placeholder-gray-600 transition-colors"
                        />
                    </div>

                    {/* Min Score */}
                    <div className="relative">
                        <Star className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-500" />
                        <input
                            type="number" name="minOverall" placeholder="Min score..." min="0" max="100"
                            value={filters.minOverall} onChange={handleFilterChange}
                            className="w-full pl-9 pr-3 py-2.5 bg-slate-900/60 border border-white/10 rounded-xl focus:outline-none focus:border-blue-500 text-white text-sm placeholder-gray-600 transition-colors"
                        />
                    </div>
                </div>
            </div>

            {/* ── Results ── */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map(i => <SkeletonCard key={i} />)}
                </div>
            ) : sorted.length === 0 ? (
                <div className="bg-slate-800/30 border border-white/10 rounded-2xl p-20 text-center">
                    <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-5 text-4xl">
                        🔍
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">No athletes found</h3>
                    <p className="text-gray-500 text-sm mb-6 max-w-sm mx-auto">
                        {hasActiveFilters
                            ? 'No athletes match your filters. Try broadening your search.'
                            : 'No athlete profiles exist yet. Check back soon!'}
                    </p>
                    {hasActiveFilters && (
                        <button
                            onClick={clearFilters}
                            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-semibold transition-colors"
                        >
                            Clear all filters
                        </button>
                    )}
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {sorted.map(athlete => (
                            <AthleteCard key={athlete._id} athlete={athlete} />
                        ))}
                    </div>
                    <p className="text-center text-gray-600 text-xs pt-4">
                        Showing {sorted.length} athlete{sorted.length !== 1 ? 's' : ''}
                    </p>
                </>
            )}
        </div>
    );
};

export default ExploreAthletes;
