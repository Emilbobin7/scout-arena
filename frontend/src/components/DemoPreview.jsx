import ScoutDemoVideo from './ScoutDemoVideo';

const DemoPreview = () => {
    return (
        <div className="py-24 bg-slate-950 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full bg-slate-950 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[100px]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
                    See <span className="text-blue-500">Scout Arena</span> in Action
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto text-lg mb-12">
                    Experience the power of AI-driven scouting. Watch how easy it is to upload, analyze, and get discovered.
                </p>

                <ScoutDemoVideo />
            </div>
        </div>
    );
};

export default DemoPreview;
