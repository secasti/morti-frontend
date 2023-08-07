import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Dashboard, isAuthenticated, ...rest}) => {
    return (
        <Route
        {...rest}
        render={(props) =>
        isAuthenticated ? <Dashboard {...props} /> : <Redirect to="/login" />
    } 
        />
    );
};

export default ProtectedRoute;