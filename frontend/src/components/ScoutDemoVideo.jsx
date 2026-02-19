import { useState, useRef } from 'react';
import { Play } from 'lucide-react';

const ScoutDemoVideo = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef(null);

    const handlePlay = () => {
        setIsPlaying(true);
    };

    return (
        <div className="relative w-full max-w-5xl mx-auto rounded-2xl border border-white/10 shadow-2xl overflow-hidden group bg-slate-900 aspect-video">


            {isPlaying ? (
                <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/maz9nPMc_Ps?autoplay=1&rel=0"
                    title="Scout Arena Demo"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            ) : (
                /* Poster Image */
                <img
                    src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=2070&auto=format&fit=crop"
                    alt="Video Thumbnail"
                    className="w-full h-full object-cover"
                />
            )}

            {/* Overlay (Play Button & Info) - Only visible when NOT playing */}
            {!isPlaying && (
                <div
                    className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all cursor-pointer flex items-center justify-center z-10"
                    onClick={handlePlay}
                >
                    <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                        <Play className="w-10 h-10 text-white fill-white ml-2" />
                    </div>

                    {/* Floating Stats - Only visible when not playing (part of preview) */}
                    <div className="absolute bottom-8 right-8 bg-slate-900/90 backdrop-blur px-6 py-4 rounded-xl border border-white/10 shadow-lg hidden md:block text-left animate-fade-in-up">
                        <div className="flex flex-col">
                            <span className="text-gray-400 text-xs uppercase tracking-wider mb-1">Top Speed</span>
                            <div className="flex items-end gap-2">
                                <span className="text-white font-bold text-2xl">34.2</span>
                                <span className="text-blue-400 text-sm font-bold mb-1">km/h</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ScoutDemoVideo;
