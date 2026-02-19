import { Edit2, MapPin, Save, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const ProfileSummary = ({ profile }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        sport: '',
        position: '',
        age: '',
        height: '',
        weight: '',
        location: '',
        bio: '',
        image: ''
    });

    useEffect(() => {
        if (profile) {
            setFormData({
                name: profile.name || '', // Name might come from User model, but let's assume profile has it or we merge
                sport: profile.sport || '',
                position: profile.position || '',
                age: profile.age || '',
                height: profile.height || '',
                weight: profile.weight || '',
                location: profile.location || '',
                bio: profile.bio || '',
                image: profile.profilePhoto || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop'
            });
        }
    }, [profile]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            const { data } = await axios.put('/api/dashboard/profile', formData, config);
            // Optionally update local state or trigger refresh if needed, but for now just exit edit mode
            //Ideally we should callback to parent to refresh, but local update is fine for UI speed
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    if (!profile) return <div className="text-white">Loading profile...</div>;

    return (
        <div className="bg-slate-900 rounded-xl border border-white/10 overflow-hidden shadow-lg">
            <div className="h-32 bg-gradient-to-r from-blue-600 to-green-500 relative">
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="absolute top-4 right-4 bg-black/30 hover:bg-black/50 text-white p-2 rounded-lg backdrop-blur-sm transition-colors"
                >
                    {isEditing ? <X className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
                </button>
            </div>

            <div className="px-6 pb-6 pt-0 relative">
                <div className="flex justify-between items-end -mt-12 mb-4">
                    <img
                        src={formData.image}
                        alt="Profile"
                        className="w-24 h-24 rounded-xl border-4 border-slate-900 object-cover shadow-lg"
                    />
                    {!isEditing && (
                        <div className="text-right">
                            {/* Displaying name from prop/state. Note: name is on User model typically, but we can store copy in profile or fetch from context. 
                                For simplification if profile doesn't have name, we might show 'Athlete' */}
                            <h2 className="text-xl font-bold text-white uppercase">{formData.name || 'Athlete'}</h2>
                            <p className="text-blue-400 font-medium">{formData.sport} • {formData.position}</p>
                        </div>
                    )}
                </div>

                {isEditing ? (
                    <div className="space-y-4 animate-fadeIn">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs text-gray-500 uppercase">Name</label>
                                <input name="name" value={formData.name} onChange={handleChange} className="w-full bg-slate-800 border border-white/10 rounded px-3 py-2 text-white focus:border-blue-500 outline-none" />
                            </div>
                            <div>
                                <label className="text-xs text-gray-500 uppercase">Sport</label>
                                <input name="sport" value={formData.sport} onChange={handleChange} className="w-full bg-slate-800 border border-white/10 rounded px-3 py-2 text-white focus:border-blue-500 outline-none" />
                            </div>
                            <div>
                                <label className="text-xs text-gray-500 uppercase">Position</label>
                                <input name="position" value={formData.position} onChange={handleChange} className="w-full bg-slate-800 border border-white/10 rounded px-3 py-2 text-white focus:border-blue-500 outline-none" />
                            </div>
                            <div>
                                <label className="text-xs text-gray-500 uppercase">Age</label>
                                <input name="age" value={formData.age} onChange={handleChange} className="w-full bg-slate-800 border border-white/10 rounded px-3 py-2 text-white focus:border-blue-500 outline-none" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs text-gray-500 uppercase">Height</label>
                                <input name="height" value={formData.height} onChange={handleChange} className="w-full bg-slate-800 border border-white/10 rounded px-3 py-2 text-white focus:border-blue-500 outline-none" />
                            </div>
                            <div>
                                <label className="text-xs text-gray-500 uppercase">Weight</label>
                                <input name="weight" value={formData.weight} onChange={handleChange} className="w-full bg-slate-800 border border-white/10 rounded px-3 py-2 text-white focus:border-blue-500 outline-none" />
                            </div>
                        </div>
                        <div>
                            <label className="text-xs text-gray-500 uppercase">Location</label>
                            <input name="location" value={formData.location} onChange={handleChange} className="w-full bg-slate-800 border border-white/10 rounded px-3 py-2 text-white focus:border-blue-500 outline-none" />
                        </div>
                        <div>
                            <label className="text-xs text-gray-500 uppercase">Bio</label>
                            <textarea name="bio" value={formData.bio} onChange={handleChange} className="w-full bg-slate-800 border border-white/10 rounded px-3 py-2 text-white focus:border-blue-500 outline-none h-20" />
                        </div>
                        <button onClick={handleSave} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
                            <Save className="w-4 h-4" /> Save Changes
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="flex items-center text-gray-400 text-sm">
                            <MapPin className="w-4 h-4 mr-1" /> {formData.location}
                        </div>

                        <div className="grid grid-cols-3 gap-2 text-center py-4 border-y border-white/5">
                            <div>
                                <div className="text-xs text-gray-500 uppercase">Age</div>
                                <div className="font-bold text-white">{formData.age}</div>
                            </div>
                            <div>
                                <div className="text-xs text-gray-500 uppercase">Height</div>
                                <div className="font-bold text-white">{formData.height}</div>
                            </div>
                            <div>
                                <div className="text-xs text-gray-500 uppercase">Weight</div>
                                <div className="font-bold text-white">{formData.weight}</div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-bold text-white mb-2">About</h3>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                {formData.bio}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfileSummary;
