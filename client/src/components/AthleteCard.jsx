import { Link } from 'react-router-dom';
import { MapPin, Activity } from 'lucide-react';

const AthleteCard = ({ athlete }) => {
    const { userId, sport, position, location, stats, profilePhoto } = athlete;

    const avgScore = stats
        ? Math.round((stats.speed + stats.agility + stats.accuracy + stats.reaction) / 4)
        : 0;

    return (
        <div className="glass rounded-xl p-5 border border-white/10 hover:border-blue-500/30 transition-all hover:-translate-y-1 group">
            <div className="flex items-center gap-4 mb-4">
                <img
                    src={profilePhoto || 'https://via.placeholder.com/60'}
                    alt={userId?.name || 'Athlete'}
                    className="w-14 h-14 rounded-full object-cover border-2 border-blue-500/30"
                />
                <div>
                    <h3 className="font-bold text-white group-hover:text-blue-400 transition-colors">
                        {userId?.name || 'Unknown Athlete'}
                    </h3>
                    <p className="text-sm text-gray-400">{sport} · {position}</p>
                </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
                <MapPin size={12} />
                <span>{location || 'Unknown'}</span>
            </div>

            {avgScore > 0 && (
                <div className="flex items-center gap-2 mb-4">
                    <Activity size={14} className="text-green-400" />
                    <span className="text-sm text-gray-300">Avg Score: <span className="text-green-400 font-bold">{avgScore}</span></span>
                </div>
            )}

            <Link
                to={`/profile/${userId?._id}`}
                className="block w-full text-center py-2 rounded-lg bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 text-sm font-medium transition-all"
            >
                View Profile
            </Link>
        </div>
    );
};

export default AthleteCard;
