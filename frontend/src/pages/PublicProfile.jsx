import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    User, MapPin, MessageSquare, X, Play,
    Video as VideoIcon, Trophy, Activity, Zap,
    Target, Timer, ChevronRight, Camera, Star
} from 'lucide-react';
import axios from 'axios';
import FollowButton from '../components/FollowButton';
import FollowersCount from '../components/FollowersCount';

// ── Helpers ───────────────────────────────────────────────────────────────────
const calcOverall = (stats = {}) => {
    const vals = [stats.speed || 0, stats.agility || 0, stats.accuracy || 0, stats.reaction || 0];
    return Math.round(vals.reduce((a, b) => a + b, 0) / 4);
};

const calcCompletion = (profile) => {
    if (!profile) return 0;
    const fields = ['bio', 'sport', 'position', 'location', 'age', 'height', 'weight', 'profilePhoto', 'coverPhoto'];
    const filled = fields.filter(f => profile[f] && profile[f] !== '0');
    const hasStats = Object.values(profile.stats || {}).some(v => v > 0);
    const hasVideos = (profile.videos?.length || 0) > 0;
    const hasAchievements = (profile.achievements?.length || 0) > 0;
    const total = fields.length + 3;
    return Math.round(((filled.length + (hasStats ? 1 : 0) + (hasVideos ? 1 : 0) + (hasAchievements ? 1 : 0)) / total) * 100);
};

const SKILL_META = [
    { key: 'speed', label: 'Speed', Icon: Zap, color: 'from-yellow-500 to-amber-400', ring: '#f59e0b' },
    { key: 'agility', label: 'Agility', Icon: Activity, color: 'from-green-500 to-emerald-400', ring: '#22c55e' },
    { key: 'accuracy', label: 'Accuracy', Icon: Target, color: 'from-blue-500 to-cyan-400', ring: '#3b82f6' },
    { key: 'reaction', label: 'Reaction', Icon: Timer, color: 'from-purple-500 to-violet-400', ring: '#a855f7' },
];

// ── Sub-components ────────────────────────────────────────────────────────────
const SkillRing = ({ score, color, ring }) => {
    const r = 36;
    const circ = 2 * Math.PI * r;
    const offset = circ - (circ * (score || 0)) / 100;
    return (
        <svg className="w-24 h-24 -rotate-90">
            <circle cx="48" cy="48" r={r} stroke="#1e293b" strokeWidth="8" fill="none" />
            <circle cx="48" cy="48" r={r} stroke={ring} strokeWidth="8" fill="none"
                strokeDasharray={circ} strokeDashoffset={offset}
                strokeLinecap="round"
                style={{ transition: 'stroke-dashoffset 1s ease', filter: `drop-shadow(0 0 6px ${ring}80)` }}
            />
        </svg>
    );
};

const TabBtn = ({ active, onClick, children }) => (
    <button
        onClick={onClick}
        className={`px-5 py-3 text-sm font-semibold rounded-xl transition-all ${active
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
    >
        {children}
    </button>
);

// ── Video Modal ──────────────────────────────────────────────────────────────
const VideoModal = ({ video, profileName, onClose }) => (
    <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4"
        onClick={onClose}
    >
        <div
            className="relative bg-slate-900 rounded-2xl border border-white/10 overflow-hidden w-full max-w-3xl shadow-2xl"
            onClick={e => e.stopPropagation()}
        >
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                <div>
                    <h3 className="font-bold text-white">{video.title || 'Performance Video'}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{profileName}</p>
                </div>
                <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-all">
                    <X size={20} />
                </button>
            </div>
            <div className="aspect-video bg-black">
                {video.videoUrl ? (
                    <video src={video.videoUrl} controls autoPlay className="w-full h-full" />
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-500">
                        <VideoIcon className="w-12 h-12 mb-3 opacity-30" />
                        <p className="text-sm">Video unavailable</p>
                    </div>
                )}
            </div>
            <div className="px-5 py-4 grid grid-cols-4 gap-3">
                {[['Speed', video.speedScore], ['Agility', video.agilityScore], ['Accuracy', video.accuracyScore], ['Reaction', video.reactionScore]].map(([label, val]) => (
                    <div key={label} className="text-center bg-slate-800 rounded-xl p-3 border border-white/5">
                        <div className="text-xs text-gray-500 mb-1">{label}</div>
                        <div className="text-xl font-bold text-white">{val || 0}</div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

// ── Main Component ────────────────────────────────────────────────────────────
const PublicProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('about');
    const [selectedVideo, setSelectedVideo] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                const config = { headers: { Authorization: `Bearer ${userInfo?.token}` } };
                const [profileRes, videosRes, achievementsRes] = await Promise.all([
                    axios.get(`/api/athlete/profile/${id}`, config),
                    axios.get(`/api/videos/${id}`, config),
                    axios.get(`/api/athlete/achievements/${id}`, config),
                ]);
                setProfile({
                    ...profileRes.data,
                    name: profileRes.data.userId?.name || profileRes.data.name || 'Athlete',
                    skills: profileRes.data.stats || {},
                    videos: videosRes.data || [],
                    achievements: achievementsRes.data || [],
                });
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [id]);

    useEffect(() => {
        const handleKey = (e) => { if (e.key === 'Escape') setSelectedVideo(null); };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, []);

    const handleMessage = () => {
        const myInfo = JSON.parse(localStorage.getItem('userInfo'));
        const base = myInfo?.role === 'scout' ? '/scout-dashboard' : '/dashboard';
        navigate(`${base}/messages?userId=${id}&userName=${encodeURIComponent(profile?.name || '')}`);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="text-gray-400 text-sm">Loading profile...</p>
                </div>
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                <div className="text-center">
                    <User className="w-20 h-20 text-gray-700 mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-white">Profile not found</h2>
                    <p className="text-gray-500 text-sm mt-2">This athlete profile doesn't exist.</p>
                </div>
            </div>
        );
    }

    const overall = calcOverall(profile.skills);
    const completion = calcCompletion(profile);
    const athleteId = profile.userId?._id || id;

    return (
        <div className="min-h-screen bg-slate-900 pb-20">

            {/* ── Cover Photo ─────────────────────────────────────────────── */}
            <div className="relative h-64 md:h-80 overflow-hidden">
                {profile.coverPhoto ? (
                    <img src={profile.coverPhoto} alt="Cover" className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-900 via-purple-900/50 to-slate-900" />
                )}
                {/* Shimmer overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-black/20" />

                {/* Decorative grid */}
                <div className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 39px,rgba(255,255,255,.05) 40px),repeating-linear-gradient(90deg,transparent,transparent 39px,rgba(255,255,255,.05) 40px)' }}
                />
            </div>

            {/* ── Profile Header Card ─────────────────────────────────────── */}
            <div className="max-w-6xl mx-auto px-4 md:px-8">
                <div className="relative -mt-24 bg-slate-800/70 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl">

                    <div className="flex flex-col md:flex-row gap-6 items-start md:items-end">
                        {/* Avatar */}
                        <div className="relative flex-shrink-0">
                            <div className="w-28 h-28 md:w-36 md:h-36 rounded-2xl border-4 border-slate-800 overflow-hidden bg-slate-700 shadow-2xl ring-4 ring-blue-500/30">
                                {profile.profilePhoto && !profile.profilePhoto.includes('placeholder') ? (
                                    <img src={profile.profilePhoto} alt={profile.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-800 to-purple-800">
                                        <span className="text-4xl font-black text-white/60">{profile.name?.charAt(0)?.toUpperCase()}</span>
                                    </div>
                                )}
                            </div>
                            {/* Overall Score Badge */}
                            {overall > 0 && (
                                <div className="absolute -bottom-2 -right-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl px-2.5 py-1.5 shadow-lg shadow-blue-500/30 text-center min-w-[44px]">
                                    <div className="text-[9px] text-blue-200 leading-none">OVR</div>
                                    <div className="text-base font-black text-white leading-tight">{overall}</div>
                                </div>
                            )}
                        </div>

                        {/* Name + Info */}
                        <div className="flex-1 min-w-0">
                            <h1 className="text-2xl md:text-3xl font-black text-white truncate">{profile.name}</h1>
                            <p className="text-blue-400 font-semibold text-base mt-0.5">
                                {profile.sport && profile.position
                                    ? `${profile.sport} · ${profile.position}`
                                    : profile.sport || profile.position || 'Athlete'}
                            </p>
                            {profile.location && (
                                <div className="flex items-center gap-1.5 text-gray-400 text-sm mt-1.5">
                                    <MapPin size={13} /> {profile.location}
                                </div>
                            )}
                            <div className="mt-2">
                                <FollowersCount userId={athleteId} />
                            </div>

                            {/* Profile Completion Bar */}
                            <div className="mt-3 max-w-xs">
                                <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                                    <span>Profile Completion</span>
                                    <span className={`font-semibold ${completion >= 80 ? 'text-green-400' : completion >= 50 ? 'text-yellow-400' : 'text-gray-400'}`}>{completion}%</span>
                                </div>
                                <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                                    <div
                                        className="h-full rounded-full transition-all duration-1000 bg-gradient-to-r from-blue-500 to-purple-500"
                                        style={{ width: `${completion}%`, boxShadow: '0 0 8px #3b82f680' }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex md:flex-col gap-3 flex-wrap md:flex-nowrap w-full md:w-auto">
                            <div className="flex-1 md:flex-none md:w-40">
                                <FollowButton userId={athleteId?.toString()} userName={profile.name} />
                            </div>
                            <button
                                onClick={handleMessage}
                                className="flex-1 md:flex-none md:w-40 flex items-center justify-center gap-2 py-2 px-4 bg-white/10 hover:bg-green-500/20 hover:text-green-400 hover:border-green-500/40 border border-white/15 text-white text-sm font-semibold rounded-xl transition-all"
                            >
                                <MessageSquare size={15} /> Message
                            </button>
                        </div>
                    </div>
                </div>

                {/* ── Tabs ────────────────────────────────────────────────── */}
                <div className="mt-6 flex gap-2 bg-slate-800/50 border border-white/10 rounded-xl p-1.5 w-fit">
                    <TabBtn active={activeTab === 'about'} onClick={() => setActiveTab('about')}>About</TabBtn>
                    <TabBtn active={activeTab === 'videos'} onClick={() => setActiveTab('videos')}>
                        Videos {profile.videos.length > 0 && <span className="ml-1 text-xs bg-blue-600/40 text-blue-300 px-1.5 rounded-full">{profile.videos.length}</span>}
                    </TabBtn>
                    <TabBtn active={activeTab === 'achievements'} onClick={() => setActiveTab('achievements')}>
                        Achievements {profile.achievements.length > 0 && <span className="ml-1 text-xs bg-yellow-500/20 text-yellow-300 px-1.5 rounded-full">{profile.achievements.length}</span>}
                    </TabBtn>
                </div>

                {/* ── Tab Content ─────────────────────────────────────────── */}
                <div className="mt-6">

                    {/* ═══ ABOUT TAB ═══ */}
                    {activeTab === 'about' && (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                            {/* Left */}
                            <div className="space-y-5">
                                {/* Bio */}
                                <div className="bg-slate-800/60 backdrop-blur border border-white/10 rounded-2xl p-6">
                                    <h3 className="font-bold text-white text-lg mb-3 flex items-center gap-2">
                                        <User size={16} className="text-blue-400" /> About
                                    </h3>
                                    <p className="text-gray-300 text-sm leading-relaxed">
                                        {profile.bio || 'This athlete hasn\'t added a bio yet.'}
                                    </p>
                                </div>

                                {/* Physical Stats */}
                                <div className="bg-slate-800/60 backdrop-blur border border-white/10 rounded-2xl p-6">
                                    <h3 className="font-bold text-white text-lg mb-4">Physical Info</h3>
                                    <div className="space-y-3">
                                        {[
                                            ['Age', profile.age ? `${profile.age} yrs` : null],
                                            ['Height', profile.height ? `${profile.height} cm` : null],
                                            ['Weight', profile.weight ? `${profile.weight} kg` : null],
                                            ['Location', profile.location],
                                        ].filter(([, v]) => v).map(([label, val]) => (
                                            <div key={label} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                                                <span className="text-gray-500 text-sm">{label}</span>
                                                <span className="text-white text-sm font-medium">{val}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right — Skill Assessment */}
                            <div className="lg:col-span-2 space-y-5">
                                {/* Overall Score Hero */}
                                {overall > 0 && (
                                    <div className="bg-gradient-to-br from-blue-900/40 to-purple-900/30 border border-blue-500/20 rounded-2xl p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="font-bold text-white text-lg flex items-center gap-2">
                                                <Star size={16} className="text-yellow-400" /> AI Skill Rating
                                            </h3>
                                            <div className="flex items-center gap-2">
                                                <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">{overall}</span>
                                                <span className="text-gray-500 text-sm">/100</span>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            {SKILL_META.map(({ key, label, Icon, color, ring }) => {
                                                const score = profile.skills?.[key] || 0;
                                                return (
                                                    <div key={key} className="bg-slate-900/50 rounded-xl p-4 text-center border border-white/5 flex flex-col items-center gap-2">
                                                        <div className="relative">
                                                            <SkillRing score={score} ring={ring} />
                                                            <div className="absolute inset-0 flex items-center justify-center">
                                                                <span className="text-xl font-black text-white">{score}</span>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-1.5">
                                                            <Icon size={12} className={`bg-gradient-to-r ${color} bg-clip-text text-transparent`} style={{ color: ring }} />
                                                            <span className="text-xs text-gray-400 capitalize">{label}</span>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

                                {/* Stats Summary Cards */}
                                <div className="grid grid-cols-3 gap-4">
                                    {[
                                        { label: 'Skill Score', value: overall || '—', sub: 'Overall rating', color: 'from-blue-500/20 to-blue-600/10', border: 'border-blue-500/20', text: 'text-blue-400' },
                                        { label: 'Videos', value: profile.videos.length, sub: 'Uploaded', color: 'from-purple-500/20 to-purple-600/10', border: 'border-purple-500/20', text: 'text-purple-400' },
                                        { label: 'Achievements', value: profile.achievements.length, sub: 'Earned', color: 'from-yellow-500/20 to-yellow-600/10', border: 'border-yellow-500/20', text: 'text-yellow-400' },
                                    ].map(({ label, value, sub, color, border, text }) => (
                                        <div key={label} className={`bg-gradient-to-br ${color} border ${border} rounded-2xl p-5 text-center`}>
                                            <div className={`text-3xl font-black ${text}`}>{value}</div>
                                            <div className="text-white text-sm font-semibold mt-1">{label}</div>
                                            <div className="text-gray-500 text-xs">{sub}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ═══ VIDEOS TAB ═══ */}
                    {activeTab === 'videos' && (
                        <div>
                            {profile.videos.length === 0 ? (
                                <div className="bg-slate-800/40 border border-white/10 rounded-2xl p-20 text-center">
                                    <VideoIcon className="mx-auto mb-4 text-gray-700 w-14 h-14" />
                                    <h3 className="text-white font-bold text-lg mb-1">No videos yet</h3>
                                    <p className="text-gray-500 text-sm">This athlete hasn't uploaded any performance videos.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                                    {profile.videos.map((vid, idx) => (
                                        <div
                                            key={vid._id || idx}
                                            onClick={() => setSelectedVideo(vid)}
                                            className="group cursor-pointer bg-slate-800/60 border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300"
                                        >
                                            <div className="relative h-44 bg-slate-900 flex items-center justify-center overflow-hidden">
                                                {vid.thumbnailUrl ? (
                                                    <img src={vid.thumbnailUrl} alt="Thumbnail" className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500" />
                                                ) : (
                                                    <div className="w-full h-full bg-gradient-to-br from-blue-900/30 to-slate-800 flex items-center justify-center">
                                                        <VideoIcon className="w-12 h-12 text-gray-600" />
                                                    </div>
                                                )}
                                                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                                    <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 group-hover:bg-blue-500/70 group-hover:scale-110 transition-all duration-300 shadow-lg">
                                                        <Play className="w-6 h-6 text-white fill-white ml-0.5" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-4">
                                                <h4 className="font-bold text-white text-sm mb-2 truncate">{vid.title || 'Performance Video'}</h4>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {[['Spd', vid.speedScore], ['Agi', vid.agilityScore], ['Acc', vid.accuracyScore], ['Rxn', vid.reactionScore]].map(([label, val]) => (
                                                        <span key={label} className="text-xs px-2 py-0.5 bg-blue-500/10 text-blue-400 rounded-lg border border-blue-500/20">
                                                            {label}: {val || 0}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* ═══ ACHIEVEMENTS TAB ═══ */}
                    {activeTab === 'achievements' && (
                        <div>
                            {profile.achievements.length === 0 ? (
                                <div className="bg-slate-800/40 border border-white/10 rounded-2xl p-20 text-center">
                                    <Trophy className="mx-auto mb-4 text-gray-700 w-14 h-14" />
                                    <h3 className="text-white font-bold text-lg mb-1">No achievements yet</h3>
                                    <p className="text-gray-500 text-sm">This athlete hasn't logged any achievements.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {profile.achievements.map((ach, idx) => (
                                        <div
                                            key={ach._id || idx}
                                            className="bg-slate-800/60 border border-white/10 rounded-2xl p-5 hover:border-yellow-500/30 hover:bg-yellow-500/5 transition-all group"
                                        >
                                            <div className="flex items-start gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500/20 to-amber-600/10 border border-yellow-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                                    <Trophy size={20} className="text-yellow-400" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-bold text-white text-sm truncate">{ach.title || ach.name || 'Achievement'}</h4>
                                                    {ach.description && (
                                                        <p className="text-gray-400 text-xs mt-0.5 line-clamp-2">{ach.description}</p>
                                                    )}
                                                    {ach.date && (
                                                        <p className="text-gray-600 text-xs mt-1.5 flex items-center gap-1">
                                                            <Timer size={10} />
                                                            {new Date(ach.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                                                        </p>
                                                    )}
                                                </div>
                                                <ChevronRight size={16} className="text-gray-700 group-hover:text-yellow-400 transition-colors flex-shrink-0 mt-0.5" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Video Modal */}
            {selectedVideo && (
                <VideoModal video={selectedVideo} profileName={profile.name} onClose={() => setSelectedVideo(null)} />
            )}
        </div>
    );
};

export default PublicProfile;
