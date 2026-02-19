import { Play, Trash2, Plus, Upload, Loader } from 'lucide-react';
import { useState } from 'react';
import axios from 'axios';

const VideoGallery = ({ videos, onVideoChange }) => {
    const [isUploading, setIsUploading] = useState(false);
    const [uploadFile, setUploadFile] = useState(null);
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(false);

    const handleFileSelect = (e) => {
        setUploadFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!uploadFile) return;

        setLoading(true);
        const formData = new FormData();
        formData.append('video', uploadFile);
        formData.append('title', title);

        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                    'Content-Type': 'multipart/form-data'
                }
            };

            await axios.post('http://localhost:5000/api/videos', formData, config);

            setIsUploading(false);
            setUploadFile(null);
            setTitle('');
            if (onVideoChange) onVideoChange();
        } catch (error) {
            console.error("Error uploading video:", error);
            alert("Upload failed");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this video?")) return;

        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const config = {
                headers: { Authorization: `Bearer ${userInfo.token}` }
            };
            await axios.delete(`http://localhost:5000/api/videos/${id}`, config);
            if (onVideoChange) onVideoChange();
        } catch (error) {
            console.error("Error deleting video:", error);
        }
    };

    return (
        <div className="bg-slate-900 rounded-xl border border-white/10 p-6 shadow-lg">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-white flex items-center">
                    <Play className="w-5 h-5 mr-2 text-blue-500" />
                    Highlighted Videos
                </h3>
                <button
                    onClick={() => setIsUploading(true)}
                    className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-3 py-2 rounded-lg flex items-center transition-colors"
                >
                    <Upload className="w-3 h-3 mr-1" />
                    Upload
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(!videos || videos.length === 0) ? (
                    <div className="col-span-2 text-center text-gray-500 py-8">No videos uploaded yet.</div>
                ) : (
                    videos.map((video) => (
                        <div key={video._id} className="group relative bg-slate-800 rounded-lg overflow-hidden border border-white/5 hover:border-blue-500/50 transition-all">
                            <div className="aspect-video relative bg-black">
                                <video src={`http://localhost:5000${video.videoUrl}`} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-blue-600 group-hover:scale-110 transition-all">
                                        <Play className="w-4 h-4 text-white fill-white" />
                                    </div>
                                </div>
                                <div className="absolute top-2 right-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded backdrop-blur-sm">
                                    AI Analyzed
                                </div>
                            </div>
                            <div className="p-3">
                                <h4 className="text-sm font-bold text-white truncate">{video.title}</h4>
                                <p className="text-xs text-gray-400 mt-1">{new Date(video.createdAt).toLocaleDateString()}</p>

                                <div className="flex gap-2 mt-3 flex-wrap">
                                    {video.aiScores && Object.entries(video.aiScores).map(([key, value]) => (
                                        <div key={key} className="bg-slate-900/50 px-2 py-1 rounded text-[10px] text-gray-300 border border-white/5">
                                            <span className="capitalize">{key}:</span> <span className="text-blue-400 font-bold">{value}</span>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    onClick={() => handleDelete(video._id)}
                                    className="absolute top-2 right-2 p-1.5 bg-red-500/80 hover:bg-red-500 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <Trash2 className="w-3 h-3" />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {isUploading && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <div className="bg-slate-900 rounded-xl border border-white/10 p-6 w-full max-w-md">
                        <h3 className="text-lg font-bold text-white mb-4">Upload Video</h3>
                        <div className="space-y-4">
                            <div className="border-2 border-dashed border-white/20 rounded-lg h-32 flex flex-col items-center justify-center text-gray-400 hover:border-blue-500 hover:bg-white/5 transition-colors cursor-pointer relative">
                                <input type="file" accept="video/*" onChange={handleFileSelect} className="absolute inset-0 opacity-0 cursor-pointer" />
                                <Upload className="w-8 h-8 mb-2" />
                                <span className="text-sm">{uploadFile ? uploadFile.name : 'Click to select video'}</span>
                            </div>
                            <div>
                                <label className="text-xs text-gray-500 uppercase">Title</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="e.g. Shooting Practice"
                                    className="w-full bg-slate-800 border border-white/10 rounded px-3 py-2 text-white focus:border-blue-500 outline-none"
                                />
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button onClick={() => setIsUploading(false)} className="flex-1 bg-slate-800 hover:bg-slate-700 text-white py-2 rounded-lg border border-white/10 text-sm font-medium">Cancel</button>
                                <button
                                    onClick={handleUpload}
                                    disabled={loading || !uploadFile}
                                    className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg text-sm font-bold flex justify-center items-center gap-2"
                                >
                                    {loading ? <Loader className="animate-spin w-4 h-4" /> : 'Upload & Analyze'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VideoGallery;
