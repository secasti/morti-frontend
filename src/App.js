import { useState } from 'react';
import './App.css';
import { Route, Routes, Link} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard'
import useToken from './components/useToken';



function App() {

  //token for authenticating users
  const { token, removeToken, setToken } = useToken();


  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  
  // Function to handle successful authentication
  const handleAuthentication = (email) => {
    setIsAuthenticated(email);
  };

  //handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  // const Navigation = () => (
  //   <nav>
  //     <Link to="/login">
  //       <button>LOGIN</button>
  //     </Link>
  //     <Link to="/register">
  //       <button>SIGN UP</button>
  //     </Link>
  //     <Link to="/dashboard">Dashboard</Link>
  //   </nav>
  // )

  // If authenticated, show the main content based on the active component
  return (
    <div className="website-title">
    <h1>M O R T I</h1>
    <div>
      {/* <Header token = { removeToken } handleLogout={ handleLogout } /> */}
        {!token && token!=="" && token!== undefined ? <div>
        <Register></Register>
        <Login setToken={ setToken } handleAuthentication={ handleAuthentication } /></div> :
        (
          <Routes>
            <Route
              exact path="/login"
              element={
                  <Login setToken={ setToken } handleAuthentication={ handleAuthentication } />
                }
              />
            <Route
              exact path="/dashboard"
              element={
                  <Dashboard token ={ token } isAuthenticated={isAuthenticated} removeToken = { removeToken } handleLogout={ handleLogout }/>
                }
            />
          </Routes>
        )}
    </div>
    

      <footer className="app-footer">
      <p>© 2023 Your Company</p>
      </footer>

    </div>
  );
};

export default App;
