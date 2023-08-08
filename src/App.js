
import { useState } from 'react';
import './App.css';
import { Route, Routes, Link} from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard'
import ProtectedRoute from './components/ProtectedRoute';
import { set } from 'lodash';


function App() {

  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Function to handle successful authentication
  const handleAuthentication = () => {
    // Set isAuthenticated to true after successful authentication
    setIsAuthenticated(true);
  };

  //handle logout
  const handleLogout = () => {
    set(false);
  };

  const Navigation = () => (
    <nav>
      <Link to="/login">
        <button>LOGIN</button>
      </Link>
      <Link to="/register">
        <button>SIGN UP</button>
      </Link>
    </nav>
  )

  // If authenticated, show the main content based on the active component
  return (
    <>
    <h1>M O R T I</h1>
    <p>Welcome to the saddest site made by Latines of course.</p>
    
    <Navigation />

    <Routes>
        <Route 
        exact path="/Login" 
        element={<Login onLogin={handleAuthentication} />} 
        />
        <Route
        exact path="/dashboard"
        element={<ProtectedRoute component={Dashboard} isAuthenticated={isAuthenticated} />}
        />
        {/* <Route path="*">
          {isAuthenticated ? <Dashboard/> : <Login />}
        </Route> */}
    </Routes>
    </>
  );
};

export default App;
