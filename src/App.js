
import { useState } from 'react';
import './App.css';
import { Route, Routes} from 'react-router-dom';
import Login from './components/Login';
import NavigationMenu from './components/NavigationMenu'
import useToken from './components/useToken';
import Register from './components/Register';
import PrivateRoutes from './components/PrivateRoutes'




function App() {

  //VALID USERS
  const VALID_USERS = [
      {email:"x" , password: "123", access_token: 123}
  ]
  
  //user data state
  const [users, setUsers] = useState(VALID_USERS)

  //token for authenticating users
  const { token, removeToken, setToken } = useToken();


  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  
  // Function to handle successful authentication
  const handleAuthentication = (email) => {
    setIsAuthenticated({email:email, name: "Susi"});
  };

  //REGISTER NEW USER
  const registerNewUser = (newUser) => {
    console.log("newUser info:", newUser)
    //add new user to valid users
    setUsers([...users, newUser]);
    //give access using login 
    //

  };

  //handle logout
  const handleLogout = () => {
  setIsAuthenticated(false);
  };

  return (
    <div className="website-container">
      <div className='app-page-container'>

        <h1>M O R T I</h1>

        <NavigationMenu className={!isAuthenticated?  "invisible-menu": ""} removeToken={removeToken} handleLogout={handleLogout} isAuthenticated={isAuthenticated}/>

      </div>

      <div className='defining-routes'>
      {(!token && token !== "" && token !== undefined)? (
        <Routes>
        <Route
          path="/login"
          element={
            <Login
              setToken={setToken}
              handleAuthentication={handleAuthentication}
              registerNewUser={registerNewUser}
              VALID_USERS={users}
            />
          }
        />
        <Route
          path="*"
          element={
            <Login
              setToken={setToken}
              handleAuthentication={handleAuthentication}
              registerNewUser={registerNewUser}
              VALID_USERS={users}
            />
          }
        />
        <Route
          path="/register"
          element={<Register registerNewUser={registerNewUser} />}
        />
              </Routes>
      ) : (
        <PrivateRoutes
            isAuthenticated={isAuthenticated}
            token={token}
            setToken={setToken}
            handleAuthentication={handleAuthentication}
            registerNewUser={registerNewUser}
            setIsAuthenticated={setIsAuthenticated}
            users={users}
          />
      )
      
      };

      </div>
      

        <footer className="app-footer">
        <p>© 2023 MORTI </p>
        </footer>

    </div>
  );
};

export default App;
