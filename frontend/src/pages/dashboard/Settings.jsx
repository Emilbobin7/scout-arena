import { useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

const Settings = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const [passwordData, setPasswordData] = useState({
        password: '',
        confirmPassword: ''
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    };

    const handlePasswordUpdate = async (e) => {
        e.preventDefault();
        if (passwordData.password !== passwordData.confirmPassword) {
            setMessage('Passwords do not match');
            return;
        }

        try {
            const token = JSON.parse(localStorage.getItem('userInfo'))?.token;
            const config = { headers: { Authorization: `Bearer ${token}` } };
            await axios.put(`${API_URL}/api/settings/password`, { password: passwordData.password }, config);
            setMessage('Password updated successfully');
            setPasswordData({ password: '', confirmPassword: '' });
        } catch (error) {
            setMessage('Failed to update password');
            console.error(error);
        }
    };

    const handleDeleteAccount = async () => {
        if (!window.confirm("Are you SURE? This will permanently delete your account, profile, videos, and achievements. This action cannot be undone.")) {
            return;
        }

        try {
            const token = JSON.parse(localStorage.getItem('userInfo'))?.token;
            const config = { headers: { Authorization: `Bearer ${token}` } };
            await axios.delete(`${API_URL}/api/settings/account`, config);
            logout();
            navigate('/signup');
        } catch (error) {
            console.error("Failed to delete account:", error);
            alert("Failed to delete account");
        }
    };

    return (
        <div className="max-w-2xl">
            <h1 className="text-3xl font-bold mb-8">Settings</h1>

            {/* Change Password */}
            <div className="glass p-8 rounded-xl border border-white/10 mb-8">
                <h3 className="text-xl font-bold mb-6">Change Password</h3>
                {message && <p className={`mb-4 px-4 py-2 rounded ${message.includes('success') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>{message}</p>}

                <form onSubmit={handlePasswordUpdate} className="space-y-4">
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">New Password</label>
                        <input
                            type="password"
                            name="password"
                            value={passwordData.password}
                            onChange={handleChange}
                            className="bg-white/5 border border-white/10 rounded px-3 py-2 w-full"
                            required
                            minLength={6}
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Confirm New Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={passwordData.confirmPassword}
                            onChange={handleChange}
                            className="bg-white/5 border border-white/10 rounded px-3 py-2 w-full"
                            required
                        />
                    </div>
                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg mt-2">
                        Update Password
                    </button>
                </form>
            </div>

            {/* Danger Zone */}
            <div className="border border-red-500/30 rounded-xl p-8 bg-red-500/5">
                <h3 className="text-xl font-bold text-red-500 mb-4">Danger Zone</h3>
                <p className="text-gray-400 mb-6 text-sm">
                    Once you delete your account, there is no going back. Please be certain.
                </p>
                <button
                    onClick={handleDeleteAccount}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg"
                >
                    Delete Account
                </button>
            </div>
        </div>
    );
};

export default Settings;
