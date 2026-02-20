import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../config';

const MyProfile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const [saving, setSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);

    useEffect(() => { fetchProfile(); }, []);

    const fetchProfile = async () => {
        try {
            const token = JSON.parse(localStorage.getItem('userInfo'))?.token;
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const { data } = await axios.get(`${API_URL}/api/profile`, config);
            setProfile(data);
            setFormData(data);
        } catch (error) {
            if (error.response?.status === 404) {
                setProfile({});
                setFormData({});
            }
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const token = JSON.parse(localStorage.getItem('userInfo'))?.token;

            // Only send known editable fields — never send _id, __v, userId, stats etc.
            const editableFields = ['name', 'sport', 'position', 'age', 'height', 'weight', 'location', 'bio'];
            const hasPhoto = formData.profilePhoto instanceof File;

            let data;
            if (hasPhoto) {
                const fd = new FormData();
                editableFields.forEach(k => fd.append(k, formData[k] ?? ''));
                fd.append('profilePhoto', formData.profilePhoto);
                const res = await axios.put(`${API_URL}/api/profile`, fd, {
                    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
                });
                data = res.data;
            } else {
                const payload = {};
                editableFields.forEach(k => { payload[k] = formData[k] ?? ''; });
                const res = await axios.put(`${API_URL}/api/profile`, payload, {
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

    if (loading) return <div className="text-white p-8">Loading...</div>;

    return (
        <div className="max-w-4xl">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-white">My Profile</h1>
                {saveSuccess && (
                    <div className="bg-green-500/20 border border-green-500/30 text-green-300 text-sm rounded-lg px-4 py-2">
                        ✓ Profile saved!
                    </div>
                )}
            </div>

            <div className="glass p-8 rounded-xl border border-white/10">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                    {/* LEFT: Profile Image & Actions */}
                    <div className="flex flex-col items-center gap-4 w-full md:w-auto">
                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500 relative group">
                            {isEditing && formData.profilePhoto instanceof File ? (
                                <img src={URL.createObjectURL(formData.profilePhoto)} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                                <img src={profile?.profilePhoto || "https://via.placeholder.com/150"} alt="Profile" className="w-full h-full object-cover" />
                            )}
                            {isEditing && (
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                    <span className="text-xs text-white font-bold">Change</span>
                                </div>
                            )}
                        </div>

                        {isEditing && (
                            <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-full transition">
                                Upload Photo
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => setFormData({ ...formData, profilePhoto: e.target.files[0] })}
                                />
                            </label>
                        )}

                        {!isEditing && (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition w-full text-white font-medium"
                            >
                                Edit Profile
                            </button>
                        )}
                    </div>

                    {/* RIGHT: Details */}
                    <div className="flex-1 w-full">
                        {isEditing ? (
                            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Name</label>
                                    <input type="text" name="name" value={formData.name || ''} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white" />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Sport</label>
                                    <input type="text" name="sport" value={formData.sport || ''} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white" />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Position</label>
                                    <input type="text" name="position" value={formData.position || ''} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white" />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Age</label>
                                    <input type="number" name="age" value={formData.age || ''} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white" />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Height (cm)</label>
                                    <input type="text" name="height" value={formData.height || ''} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white" />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Weight (kg)</label>
                                    <input type="text" name="weight" value={formData.weight || ''} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm text-gray-400 mb-1">Location</label>
                                    <input type="text" name="location" value={formData.location || ''} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm text-gray-400 mb-1">Bio</label>
                                    <textarea name="bio" value={formData.bio || ''} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 h-24 text-white" />
                                </div>
                                <div className="md:col-span-2 flex gap-4 mt-4">
                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className="bg-green-600 hover:bg-green-700 disabled:opacity-60 px-6 py-2 rounded-lg font-bold text-white transition"
                                    >
                                        {saving ? 'Saving...' : 'Save Changes'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => { setIsEditing(false); setFormData(profile); }}
                                        className="bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded-lg font-bold text-white transition"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold text-white">{profile?.name || 'No name set'}</h2>
                                <p className="text-blue-400 text-lg">{profile?.sport} {profile?.position && `• ${profile.position}`}</p>
                                <p className="text-gray-300">{profile?.bio || 'No bio yet.'}</p>
                                <div className="grid grid-cols-2 gap-4 mt-6">
                                    {[['Age', profile?.age], ['Height', profile?.height ? `${profile.height} cm` : '—'], ['Weight', profile?.weight ? `${profile.weight} kg` : '—'], ['Location', profile?.location]].map(([label, val]) => (
                                        <div key={label} className="p-4 bg-white/5 rounded-lg border border-white/5">
                                            <p className="text-sm text-gray-500">{label}</p>
                                            <p className="font-bold text-white">{val || '—'}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
