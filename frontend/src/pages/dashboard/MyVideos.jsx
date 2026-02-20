import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { API_URL } from '../../config';
import {
    Upload, Trash2, Play, Zap, Target, Activity, Brain,
    Star, TrendingUp, X, ChevronRight, Video as VideoIcon
} from 'lucide-react';
import {
    RadarChart, Radar, PolarGrid, PolarAngleAxis,
    ResponsiveContainer, Tooltip
} from 'recharts';

// ─── Helpers ────────────────────────────────────────────────────────────────

const getConfig = () => {
    const token = JSON.parse(localStorage.getItem('userInfo') || 'null')?.token;
    return { headers: { Authorization: `Bearer ${token}` } };
};

const getTier = (score) => {
    if (score >= 90) return { label: 'Elite', color: 'text-yellow-400', bg: 'bg-yellow-500/15 border-yellow-500/30' };
    if (score >= 80) return { label: 'Advanced', color: 'text-blue-400', bg: 'bg-blue-500/15 border-blue-500/30' };
    if (score >= 70) return { label: 'Proficient', color: 'text-green-400', bg: 'bg-green-500/15 border-green-500/30' };
    if (score >= 60) return { label: 'Developing', color: 'text-orange-400', bg: 'bg-orange-500/15 border-orange-500/30' };
    return { label: 'Beginner', color: 'text-gray-400', bg: 'bg-gray-500/15 border-gray-500/30' };
};

const SCORE_DEFS = [
    { key: 'speedScore', label: 'Speed', icon: Zap, color: '#3b82f6' },
    { key: 'agilityScore', label: 'Agility', icon: Activity, color: '#10b981' },
    { key: 'accuracyScore', label: 'Accuracy', icon: Target, color: '#f59e0b' },
    { key: 'reactionScore', label: 'Reaction', icon: Brain, color: '#a855f7' },
];

// ─── Radial Score Ring ───────────────────────────────────────────────────────

function ScoreRing({ score, label, color, size = 56 }) {
    const r = (size - 8) / 2;
    const circ = 2 * Math.PI * r;
    const fill = circ * (score / 100);
    return (
        <div className="flex flex-col items-center gap-1">
            <svg width={size} height={size}>
                <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={5} />
                <circle
                    cx={size / 2} cy={size / 2} r={r} fill="none"
                    stroke={color} strokeWidth={5}
                    strokeDasharray={`${fill} ${circ}`}
                    strokeLinecap="round"
                    transform={`rotate(-90 ${size / 2} ${size / 2})`}
                    style={{ transition: 'stroke-dasharray 1s ease-in-out' }}
                />
                <text x="50%" y="54%" dominantBaseline="middle" textAnchor="middle"
                    fill="white" fontSize={size < 70 ? 12 : 15} fontWeight="bold">
                    {score}
                </text>
            </svg>
            <span className="text-xs text-gray-400">{label}</span>
        </div>
    );
}

// ─── Video Card ──────────────────────────────────────────────────────────────

function VideoCard({ video, onDelete, onPlay }) {
    const overall = video.overallScore || 0;
    const tier = getTier(overall);

    const radarData = SCORE_DEFS.map(s => ({
        subject: s.label,
        value: video[s.key] || 0,
        fullMark: 100,
    }));

    return (
        <div className="bg-slate-800/60 backdrop-blur-sm border border-white/8 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all hover:shadow-xl hover:shadow-blue-500/5 group">
            {/* Video Thumbnail */}
            <div
                className="relative h-44 bg-gradient-to-br from-slate-900 to-slate-800 cursor-pointer"
                onClick={onPlay}
            >
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-black/40 border border-white/20 backdrop-blur-sm p-4 rounded-full group-hover:scale-110 transition-transform group-hover:bg-blue-600/40">
                        <Play fill="white" size={22} />
                    </div>
                </div>
                {/* OVR Badge */}
                <div className={`absolute top-3 right-3 px-3 py-1 rounded-full border text-sm font-black ${tier.bg} ${tier.color}`}>
                    {overall} OVR
                </div>
                {/* Tier Badge */}
                <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full text-xs text-white border border-white/10">
                    {tier.label}
                </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-4">
                <div className="flex justify-between items-start">
                    <div>
                        <h4 className="font-bold text-white">{video.title || 'Performance Video'}</h4>
                        <p className="text-xs text-gray-500 mt-0.5">{new Date(video.createdAt).toLocaleDateString()}</p>
                    </div>
                    <button
                        onClick={onDelete}
                        className="p-1.5 text-gray-600 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                    >
                        <Trash2 size={15} />
                    </button>
                </div>

                {/* Score Rings */}
                <div className="flex justify-between px-2">
                    {SCORE_DEFS.map(s => (
                        <ScoreRing
                            key={s.key}
                            score={video[s.key] || 0}
                            label={s.label}
                            color={s.color}
                            size={54}
                        />
                    ))}
                </div>

                {/* Radar Chart */}
                <div className="h-36">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart data={radarData} outerRadius={50}>
                            <PolarGrid stroke="rgba(255,255,255,0.08)" />
                            <PolarAngleAxis dataKey="subject" tick={{ fill: '#6b7280', fontSize: 10 }} />
                            <Radar
                                name="Performance"
                                dataKey="value"
                                stroke="#3b82f6"
                                fill="#3b82f6"
                                fillOpacity={0.2}
                            />
                            <Tooltip
                                contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }}
                                labelStyle={{ color: '#94a3b8' }}
                                itemStyle={{ color: '#60a5fa' }}
                            />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

// ─── Video Modal ─────────────────────────────────────────────────────────────

function VideoModal({ video, onClose }) {
    if (!video) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={onClose}>
            <div className="relative max-w-3xl w-full mx-4" onClick={e => e.stopPropagation()}>
                <button
                    onClick={onClose}
                    className="absolute -top-10 right-0 text-white bg-white/10 hover:bg-white/20 rounded-full p-1.5 transition-all"
                >
                    <X size={18} />
                </button>
                <video
                    src={video.videoUrl}
                    controls
                    autoPlay
                    className="w-full rounded-2xl border border-white/10 shadow-2xl"
                />
            </div>
        </div>
    );
}

// ─── Performance Summary Banner ──────────────────────────────────────────────

function PerformanceSummary({ videos }) {
    if (!videos.length) return null;

    const latest = videos[0];
    const avgOverall = Math.round(videos.reduce((acc, v) => acc + (v.overallScore || 0), 0) / videos.length);
    const best = Math.max(...videos.map(v => v.overallScore || 0));
    const tier = getTier(avgOverall);

    return (
        <div className="bg-gradient-to-r from-blue-600/20 via-purple-600/10 to-slate-800/60 border border-blue-500/20 rounded-2xl p-5 mb-8">
            <div className="flex flex-wrap gap-6 items-center">
                <div className="flex items-center gap-3">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${tier.bg}`}>
                        <Star size={24} className={tier.color} />
                    </div>
                    <div>
                        <p className="text-xs text-gray-400">Avg Overall Score</p>
                        <p className={`text-3xl font-black ${tier.color}`}>{avgOverall}</p>
                        <p className="text-xs text-gray-500">{tier.label} Athlete</p>
                    </div>
                </div>

                <div className="flex gap-6 flex-wrap">
                    {[
                        { label: 'Best Score', value: best, icon: TrendingUp, color: 'text-green-400' },
                        { label: 'Videos', value: videos.length, icon: VideoIcon, color: 'text-blue-400' },
                        { label: 'Avg Speed', value: Math.round(videos.reduce((a, v) => a + (v.speedScore || 0), 0) / videos.length), icon: Zap, color: 'text-yellow-400' },
                        { label: 'Avg Agility', value: Math.round(videos.reduce((a, v) => a + (v.agilityScore || 0), 0) / videos.length), icon: Activity, color: 'text-purple-400' },
                    ].map(s => (
                        <div key={s.label} className="text-center">
                            <s.icon size={16} className={`mx-auto mb-1 ${s.color}`} />
                            <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
                            <p className="text-xs text-gray-500">{s.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

const MyVideos = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [analyzing, setAnalyzing] = useState(false);
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [playingVideo, setPlayingVideo] = useState(null);
    const [dragOver, setDragOver] = useState(false);

    const fetchVideos = useCallback(async () => {
        try {
            const { data } = await axios.get(`${API_URL}/api/videos`, getConfig());
            setVideos(data);
        } catch (e) {
            console.error('fetchVideos error', e);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchVideos(); }, [fetchVideos]);

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) return;

        const formData = new FormData();
        formData.append('video', file);
        formData.append('title', title || file.name.replace(/\.[^.]+$/, ''));

        setUploading(true);
        setAnalyzing(false);

        try {
            const config = {
                ...getConfig(),
                headers: {
                    ...getConfig().headers,
                    'Content-Type': 'multipart/form-data'
                }
            };
            // After upload bytes sent, show analyzing state
            setTimeout(() => { setAnalyzing(true); }, 500);

            const { data } = await axios.post(`${API_URL}/api/videos`, formData, config);
            setVideos(prev => [data, ...prev]);
            setFile(null);
            setTitle('');
        } catch (err) {
            console.error('Upload error', err);
            alert('Upload failed. Please try again.');
        } finally {
            setUploading(false);
            setAnalyzing(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this video?')) return;
        try {
            await axios.delete(`${API_URL}/api/videos/${id}`, getConfig());
            setVideos(prev => prev.filter(v => v._id !== id));
        } catch (e) {
            console.error('Delete error', e);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        const dropped = e.dataTransfer.files[0];
        if (dropped && dropped.type.startsWith('video/')) setFile(dropped);
    };

    return (
        <div>
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-blue-600/20 border border-blue-500/30 rounded-xl flex items-center justify-center">
                    <VideoIcon size={20} className="text-blue-400" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold">My Videos</h1>
                    <p className="text-sm text-gray-400">AI analysis runs automatically on every upload</p>
                </div>
            </div>

            {/* Performance Summary */}
            {!loading && videos.length > 0 && <PerformanceSummary videos={videos} />}

            {/* Upload Panel */}
            <div className="bg-slate-800/50 border border-white/10 rounded-2xl p-6 mb-8">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <Upload size={18} className="text-blue-400" /> Upload New Video
                </h3>
                <form onSubmit={handleUpload} className="space-y-4">
                    {/* Drop Zone */}
                    <div
                        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                        onDragLeave={() => setDragOver(false)}
                        onDrop={handleDrop}
                        onClick={() => document.getElementById('video-file-input').click()}
                        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${dragOver
                            ? 'border-blue-500 bg-blue-500/10'
                            : file
                                ? 'border-green-500/50 bg-green-500/5'
                                : 'border-white/10 hover:border-white/25 hover:bg-white/3'
                            }`}
                    >
                        <input
                            id="video-file-input"
                            type="file"
                            accept="video/*"
                            className="hidden"
                            onChange={e => setFile(e.target.files[0])}
                        />
                        <VideoIcon size={32} className={`mx-auto mb-2 ${file ? 'text-green-400' : 'text-gray-600'}`} />
                        {file ? (
                            <p className="text-green-400 font-medium">{file.name}</p>
                        ) : (
                            <>
                                <p className="text-gray-400">Drop video here or click to browse</p>
                                <p className="text-xs text-gray-600 mt-1">MP4, MOV, AVI • Max 100MB</p>
                            </>
                        )}
                    </div>

                    <div className="flex gap-3">
                        <input
                            type="text"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            placeholder="Video title (e.g. Sprint Drill #1)"
                            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500/50 transition-colors"
                        />
                        <button
                            type="submit"
                            disabled={uploading || !file}
                            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold rounded-xl transition-all flex items-center gap-2 min-w-[140px] justify-center"
                        >
                            {uploading ? (
                                analyzing ? (
                                    <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Analyzing...</>
                                ) : (
                                    <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Uploading...</>
                                )
                            ) : (
                                <><Upload size={16} /> Upload & Analyze</>
                            )}
                        </button>
                    </div>

                    {/* AI Analysis Info */}
                    {uploading && analyzing && (
                        <div className="flex items-center gap-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl text-sm text-blue-300">
                            <span className="w-4 h-4 border-2 border-blue-400/40 border-t-blue-400 rounded-full animate-spin flex-shrink-0" />
                            AI is analyzing your video for speed, agility, accuracy and reaction metrics...
                        </div>
                    )}
                </form>
            </div>

            {/* Video Grid */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="bg-slate-800/40 rounded-2xl h-96 animate-pulse" />
                    ))}
                </div>
            ) : videos.length === 0 ? (
                <div className="text-center py-20 border border-dashed border-white/10 rounded-2xl">
                    <VideoIcon size={48} className="mx-auto mb-4 text-gray-700" />
                    <p className="text-gray-400 font-medium">No videos yet</p>
                    <p className="text-gray-600 text-sm mt-1">Upload your first performance video to get AI scores</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {videos.map(video => (
                        <VideoCard
                            key={video._id}
                            video={video}
                            onDelete={() => handleDelete(video._id)}
                            onPlay={() => setPlayingVideo(video)}
                        />
                    ))}
                </div>
            )}

            {/* Video Player Modal */}
            <VideoModal video={playingVideo} onClose={() => setPlayingVideo(null)} />
        </div>
    );
};

export default MyVideos;
