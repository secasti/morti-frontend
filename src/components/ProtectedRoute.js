import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Dashboard, isAuthenticated}) => {

    if (isAuthenticated) {
        return <Dashboard to="/dashboard" replace />;
    }

    return <Navigate to="/login" replace />
};

export default ProtectedRoute;