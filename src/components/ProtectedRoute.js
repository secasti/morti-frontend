import React from 'react';
import { Navigate } from 'react-router-dom';
import Dashboard from './Dashboard';

const ProtectedRoute = ({isAuthenticated, chilren}) => {
    console.log("inside PR")
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;