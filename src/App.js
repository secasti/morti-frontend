
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
      {email:"x" , password: "123", access_token: 123, firstName: "Susi", lastName: "Franco"}
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

  //handle logout
  const handleLogout = () => {
  setIsAuthenticated(false);
  };

  //REGISTER NEW USER
  const registerNewUser = (newUser) => {
    console.log("newUser info:", newUser)
    //add new user to valid users
    setUsers([...users, newUser]);
    console.log("updated users data after new register:", users)
    //give access using login 
    //

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
              users={users}
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
              users={users}
            />
          }
        />
        <Route
          path="/register"
          element={<Register />}
        />
              </Routes>
      ) : (
        <PrivateRoutes
            isAuthenticated={isAuthenticated}
            token={token}
            setToken={setToken}
            handleAuthentication={handleAuthentication}
            // registerNewUser={registerNewUser}
            setIsAuthenticated={setIsAuthenticated}
            users={users}
            setUsers={setUsers}
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
