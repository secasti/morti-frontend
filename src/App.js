
import { useState } from 'react';
import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard'
import ProtectedRoute from './components/ProtectedRoute';
import { set } from 'lodash';


function App() {

  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  
  // Function to handle successful authentication
  const handleAuthentication = () => {
    // Set isAuthenticated to true after successful authentication
    setIsAuthenticated(true);
  };

  //handle logout
  const handleLogout = () => {
    set(false);
  };
 

  // If authenticated, show the main content based on the active component
  return (
    <Routes>

        {/* login page route */}
        <Route exact path="/Login" element={<Login onLogin={handleAuthentication} />} />

        {/* if authentication passes, there is a protected route that allows dashboard to be acessed */}
        <Route
        path="/dashboard"
        element={<ProtectedRoute component={Dashboard} isAuthenticated={isAuthenticated} />}
        />

       {/* redirect to dashboard or login depending on auth */}
        {/* <Route path="*">
          {isAuthenticated ? <Dashboard/> : <Login />}
        </Route> */}

    </Routes>
  );
};

export default App;
