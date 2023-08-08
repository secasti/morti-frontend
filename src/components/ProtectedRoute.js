import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Dashboard, isAuthenticated, ...rest}) => {
    return (
        <Route
        {...rest}
        render={(props) =>
        isAuthenticated ? <Dashboard {...props} /> : <Navigate to="/login" />
    } 
        />
    );
};

export default ProtectedRoute;