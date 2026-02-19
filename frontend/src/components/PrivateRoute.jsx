import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const PrivateRoute = ({ children, allowedRoles }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <div className="text-white text-center pt-20">Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        // Redirect based on role if trying to access unauthorized area
        if (user.role === 'athlete') return <Navigate to="/dashboard" replace />;
        if (user.role === 'scout') return <Navigate to="/scout-dashboard" replace />;
    }

    return children;
};

export default PrivateRoute;
