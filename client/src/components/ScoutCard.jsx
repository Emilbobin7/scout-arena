import { Building2, MapPin, Award } from 'lucide-react';

const ScoutCard = ({ scout }) => {
    const { userId, fullName, organization, designation, specializationSport, location, profilePhoto } = scout;

    return (
        <div className="glass rounded-xl p-5 border border-white/10 hover:border-green-500/30 transition-all hover:-translate-y-1 group">
            <div className="flex items-center gap-4 mb-4">
                <img
                    src={profilePhoto || 'https://via.placeholder.com/60'}
                    alt={fullName || userId?.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-green-500/30"
                />
                <div>
                    <h3 className="font-bold text-white group-hover:text-green-400 transition-colors">
                        {fullName || userId?.name || 'Unknown Scout'}
                    </h3>
                    <p className="text-sm text-gray-400">{designation || 'Scout'}</p>
                </div>
            </div>

            <div className="space-y-2 text-xs text-gray-400">
                {organization && (
                    <div className="flex items-center gap-2">
                        <Building2 size={12} />
                        <span>{organization}</span>
                    </div>
                )}
                {specializationSport && (
                    <div className="flex items-center gap-2">
                        <Award size={12} />
                        <span>Specializes in {specializationSport}</span>
                    </div>
                )}
                {location && (
                    <div className="flex items-center gap-2">
                        <MapPin size={12} />
                        <span>{location}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ScoutCard;
