import { useState, useEffect } from 'react';
import axios from 'axios';
import { Camera, Save, User } from 'lucide-react';
import { API_URL } from '../../config';

const ScoutProfile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});

    // Fetch Profile
    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
            const { data } = await axios.get(`${API_URL}/api/scout/profile`, config);
            setProfile(data);
            setFormData(data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching scout profile:", error);
            // Handle 404 (New user) by initializing empty
            if (error.response && error.response.status === 404) {
                setProfile({});
                setFormData({});
            }
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const [saving, setSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const token = userInfo?.token;

            // Only send known editable fields — never send _id, __v, userId etc.
            const editableFields = ['fullName', 'organization', 'designation', 'experience',
                'specializationSport', 'location', 'bio', 'contactEmail', 'contactPhone'];

            const hasPhoto = formData.profilePhoto instanceof File;

            let data;
            if (hasPhoto) {
                // Use multipart/form-data only when a new photo is selected
                const fd = new FormData();
                editableFields.forEach(k => fd.append(k, formData[k] ?? ''));
                fd.append('profilePhoto', formData.profilePhoto);
                const res = await axios.put(`${API_URL}/api/scout/profile`, fd, {
                    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
                });
                data = res.data;
            } else {
                // Use clean JSON — simpler and more reliable
                const payload = {};
                editableFields.forEach(k => { payload[k] = formData[k] ?? ''; });
                const res = await axios.put(`${API_URL}/api/scout/profile`, payload, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                data = res.data;
            }

            setProfile(data);
            setFormData(data);
            setIsEditing(false);
            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 3000);

        } catch (error) {
            console.error('Error updating profile:', error);
            alert(error.response?.data?.message || 'Failed to update profile. Try again.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-8 text-white">Loading...</div>;

    return (
        <div className="max-w-5xl mx-auto py-8">
            <h1 className="text-3xl font-bold text-white mb-8">My Scout Profile</h1>

            <div className="glass p-8 rounded-xl border border-white/10">
                <div className="flex flex-col md:flex-row gap-8 items-start">

                    {/* LEFT: Profile Photo & Actions */}
                    <div className="flex flex-col items-center gap-6 w-full md:w-64">
                        <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-blue-500 relative group bg-slate-800">
                            {/* Display */}
                            {isEditing && formData.profilePhoto instanceof File ? (
                                <img src={URL.createObjectURL(formData.profilePhoto)} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                                <img src={profile?.profilePhoto || "https://via.placeholder.com/150"} alt="Profile" className="w-full h-full object-cover" />
                            )}

                            {/* Edit Overlay */}
                            {isEditing && (
                                <label className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                    <Camera className="h-8 w-8 text-white mb-2" />
                                    <span className="text-xs text-white font-bold">Change Photo</span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => setFormData({ ...formData, profilePhoto: e.target.files[0] })}
                                    />
                                </label>
                            )}
                        </div>

                        {saveSuccess && (
                            <div className="w-full text-center bg-green-500/20 border border-green-500/30 text-green-300 text-sm rounded-lg px-3 py-2">
                                ✓ Profile saved!
                            </div>
                        )}
                        {!isEditing ? (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="w-full px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition font-medium text-white"
                            >
                                Edit Profile
                            </button>
                        ) : (
                            <div className="flex flex-col gap-2 w-full">
                                <button form="profile-form" type="submit" disabled={saving} className="w-full px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700 transition font-medium text-white flex items-center justify-center gap-2 disabled:opacity-60">
                                    <Save className="h-4 w-4" /> {saving ? 'Saving...' : 'Save Changes'}
                                </button>
                                <button onClick={() => setIsEditing(false)} className="w-full px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition font-medium text-gray-300">
                                    Cancel
                                </button>
                            </div>
                        )}
                    </div>

                    {/* RIGHT: Profile Details */}
                    <div className="flex-1 w-full">
                        {isEditing ? (
                            <form id="profile-form" onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label className="block text-gray-400 text-sm mb-1">Full Name</label>
                                    <input type="text" name="fullName" value={formData.fullName || ''} onChange={handleChange} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 outline-none" placeholder="Your Name" />
                                </div>

                                <div>
                                    <label className="block text-gray-400 text-sm mb-1">Organization / Club</label>
                                    <input type="text" name="organization" value={formData.organization || ''} onChange={handleChange} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 outline-none" placeholder="e.g. Manchester United" />
                                </div>

                                <div>
                                    <label className="block text-gray-400 text-sm mb-1">Designation</label>
                                    <input type="text" name="designation" value={formData.designation || ''} onChange={handleChange} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 outline-none" placeholder="e.g. Chief Scout" />
                                </div>

                                <div>
                                    <label className="block text-gray-400 text-sm mb-1">Experience (Years)</label>
                                    <input type="number" name="experience" value={formData.experience || ''} onChange={handleChange} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 outline-none" />
                                </div>

                                <div>
                                    <label className="block text-gray-400 text-sm mb-1">Specialization Sport</label>
                                    <input type="text" name="specializationSport" value={formData.specializationSport || ''} onChange={handleChange} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 outline-none" />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-gray-400 text-sm mb-1">Location</label>
                                    <input type="text" name="location" value={formData.location || ''} onChange={handleChange} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 outline-none" />
                                </div>

                                <div>
                                    <label className="block text-gray-400 text-sm mb-1">Contact Email</label>
                                    <input type="email" name="contactEmail" value={formData.contactEmail || ''} onChange={handleChange} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 outline-none" />
                                </div>

                                <div>
                                    <label className="block text-gray-400 text-sm mb-1">Contact Phone</label>
                                    <input type="text" name="contactPhone" value={formData.contactPhone || ''} onChange={handleChange} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 outline-none" />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-gray-400 text-sm mb-1">Bio</label>
                                    <textarea name="bio" value={formData.bio || ''} onChange={handleChange} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 outline-none h-32"></textarea>
                                </div>
                            </form>
                        ) : (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-3xl font-bold text-white mb-1">{profile?.fullName}</h2>
                                    <p className="text-blue-400 text-lg flex items-center gap-2">
                                        {profile?.designation} {profile?.organization && <span>@ {profile.organization}</span>}
                                    </p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-800/50 p-6 rounded-xl border border-white/5">
                                    <div>
                                        <h4 className="text-gray-400 text-sm">Specialization</h4>
                                        <p className="text-white font-medium">{profile?.specializationSport || 'Not specified'}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-gray-400 text-sm">Experience</h4>
                                        <p className="text-white font-medium">{profile?.experience ? `${profile.experience} years` : 'Not specified'}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-gray-400 text-sm">Location</h4>
                                        <p className="text-white font-medium">{profile?.location || 'Not specified'}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-gray-400 text-sm">Contact</h4>
                                        <p className="text-white font-medium">{profile?.contactEmail}</p>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">About</h3>
                                    <p className="text-gray-300 leading-relaxed">{profile?.bio || 'No bio available.'}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScoutProfile;
