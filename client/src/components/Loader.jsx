const Loader = ({ size = 'md', text = 'Loading...' }) => {
    const sizeClasses = {
        sm: 'w-6 h-6 border-2',
        md: 'w-10 h-10 border-2',
        lg: 'w-16 h-16 border-4',
    };

    return (
        <div className="flex flex-col items-center justify-center gap-3 py-8">
            <div
                className={`${sizeClasses[size]} border-blue-500 border-t-transparent rounded-full animate-spin`}
            />
            {text && <p className="text-gray-400 text-sm">{text}</p>}
        </div>
    );
};

export default Loader;
