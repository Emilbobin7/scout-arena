import { MapPin, Briefcase, Building2 } from 'lucide-react';

const ProfileHeader = ({ name, role, sport, position, organization, location, profilePhoto }) => {
    return (
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 glass rounded-xl border border-white/10">
            <img
                src={profilePhoto || 'https://via.placeholder.com/120'}
                alt={name}
                className="w-24 h-24 rounded-full object-cover border-4 border-blue-500/40 shadow-lg shadow-blue-500/20"
            />
            <div className="text-center sm:text-left">
                <h1 className="text-2xl font-bold text-white">{name || 'Unknown'}</h1>
                <span className={`inline-block mt-1 px-3 py-0.5 rounded-full text-xs font-semibold ${role === 'scout' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'
                    }`}>
                    {role === 'scout' ? 'Scout' : 'Athlete'}
                </span>

                <div className="flex flex-wrap justify-center sm:justify-start gap-4 mt-3 text-sm text-gray-400">
                    {(sport || position) && (
                        <span className="flex items-center gap-1">
                            <Briefcase size={14} />
                            {sport}{position ? ` · ${position}` : ''}
                        </span>
                    )}
                    {organization && (
                        <span className="flex items-center gap-1">
                            <Building2 size={14} />
                            {organization}
                        </span>
                    )}
                    {location && (
                        <span className="flex items-center gap-1">
                            <MapPin size={14} />
                            {location}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;
