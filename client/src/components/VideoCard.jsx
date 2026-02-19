import { Play, Trash2, Zap } from 'lucide-react';

const VideoCard = ({ video, onDelete, showDelete = false }) => {
    const { title, thumbnailUrl, videoUrl, speedScore, agilityScore, accuracyScore, reactionScore, createdAt } = video;

    const avgScore = Math.round((speedScore + agilityScore + accuracyScore + reactionScore) / 4);

    return (
        <div className="glass rounded-xl overflow-hidden border border-white/10 hover:border-purple-500/30 transition-all group">
            {/* Thumbnail */}
            <div className="relative aspect-video bg-slate-800 overflow-hidden">
                <img
                    src={thumbnailUrl || 'https://via.placeholder.com/300x200'}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                    <a
                        href={videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-white/20 rounded-full backdrop-blur-sm hover:bg-white/30 transition-all"
                    >
                        <Play className="text-white" size={24} />
                    </a>
                </div>
                <div className="absolute top-2 right-2 bg-green-500/80 text-white text-xs font-bold px-2 py-1 rounded-full backdrop-blur-sm">
                    <Zap size={10} className="inline mr-1" />
                    {avgScore}
                </div>
            </div>

            {/* Info */}
            <div className="p-4">
                <h3 className="font-semibold text-white mb-2 truncate">{title}</h3>
                <div className="grid grid-cols-4 gap-1 text-xs text-center mb-3">
                    {[
                        { label: 'Speed', value: speedScore },
                        { label: 'Agility', value: agilityScore },
                        { label: 'Accuracy', value: accuracyScore },
                        { label: 'Reaction', value: reactionScore },
                    ].map(({ label, value }) => (
                        <div key={label} className="bg-white/5 rounded p-1">
                            <div className="text-blue-400 font-bold">{value}</div>
                            <div className="text-gray-500">{label}</div>
                        </div>
                    ))}
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                        {new Date(createdAt).toLocaleDateString()}
                    </span>
                    {showDelete && onDelete && (
                        <button
                            onClick={() => onDelete(video._id)}
                            className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all"
                        >
                            <Trash2 size={14} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VideoCard;
