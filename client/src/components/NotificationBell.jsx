import { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import api from '../utils/api';

const NotificationBell = () => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const fetchCount = async () => {
            try {
                const { data } = await api.get('/notifications/count');
                setCount(data.count || 0);
            } catch {
                // Silently fail if not authenticated
            }
        };

        fetchCount();
        // Poll every 30 seconds
        const interval = setInterval(fetchCount, 30000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative">
            <Bell size={22} className="text-gray-300 hover:text-white cursor-pointer transition-colors" />
            {count > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
                    {count > 9 ? '9+' : count}
                </span>
            )}
        </div>
    );
};

export default NotificationBell;
