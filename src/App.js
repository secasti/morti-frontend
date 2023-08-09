
import { useState } from 'react';
import './App.css';
import { Route, Routes, Link} from 'react-router-dom';
import Login from './components/Login';
import Header from './components/Header';
import Dashboard from './components/Dashboard'
import ProtectedRoute from './components/ProtectedRoute';
import useToken from './components/useToken';



function App() {

  //token for authenticating users
  const { token, removeToken, setToken } = useToken();


  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  
  // Function to handle successful authentication
  const handleAuthentication = () => {
    setIsAuthenticated(true);
  };

  //handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const Navigation = () => (
    <nav>
      <Link to="/login">
        <button>LOGIN</button>
      </Link>
      <Link to="/register">
        <button>SIGN UP</button>
      </Link>
      <Link to="/dashboard">Dashboard</Link>
    </nav>
  )

  // If authenticated, show the main content based on the active component
  return (
    <div>
    <h1>M O R T I</h1>
    
    {/* <Navigation /> */}

    {/* {isAuthenticated ? (
      <button onClick={handleLogout}>Actually Signout</button>
    ) : (
      <button onClick={handleAuthentication}>Actually Login</button>
    )} */}
    <div>
      <Header token = {removeToken}/>
        {!token && token!=="" && token!== undefined ? 
        <Login setToken={setToken} /> :
        (
          <Routes>
            {/* <Route index element={<Dashboard />}></Route> */}
            <Route 
              exact path="/Login" 
              element={<Login  setToken={ setToken }  />} 
            />
            {/* <Route
              exact path="/dashboard"
              element={<ProtectedRoute component={Dashboard} isAuthenticated={isAuthenticated} />}
            /> */}
            {/* <Route path="*">
              {isAuthenticated ? <Dashboard/> : <Login />}
            </Route> */}
          </Routes>
        )}
    </div>
    </div>
  );
};

export default App;
