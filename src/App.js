
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
  // const VALID_USERS = [
  //     {email:"x" , password: "123", access_token: 123, firstName: "Susi", lastName: "Franco"}
  // ]
  
  //user data state
  // const [users, setUsers] = useState(VALID_USERS)
const CURRENT_USER = [{
  token:"",
first_name:""
}]
  //token for authenticating users
  const { token, removeToken, setToken } = useToken();

  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(CURRENT_USER)

  // Function to handle successful authentication
  // const handleAuthentication = (email) => {
  //   setIsAuthenticated({email:email, name: "Susi"});
  // };

  //handle logout
  const handleLogout = () => {
  setIsAuthenticated(false);
  };

  return (
    <div className="website-container">
      <div className='app-page-container'>

        <h1>M O R T I</h1>

        <NavigationMenu className={!token?  "invisible-menu": ""} token={token} setToken={setToken} removeToken={removeToken} handleLogout={handleLogout} isAuthenticated={isAuthenticated} token={token}/>

      </div>

      <div className='defining-routes'>
      {(!token && token !== "" && token !== undefined)? (
        <Routes>
        <Route
          path="/login"
          element={
            <Login
              setToken={setToken}
              token={token}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              // handleAuthentication={handleAuthentication}
              // registerNewUser={registerNewUser}
              // users={users}
            />
          }
        />
        <Route
          path="*"
          element={
            <Login
              setToken={setToken}
              token={token}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              // handleAuthentication={handleAuthentication}
              // registerNewUser={registerNewUser}
              // users={users}
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
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            // handleAuthentication={handleAuthentication}
            // registerNewUser={registerNewUser}
            setIsAuthenticated={setIsAuthenticated}
            // users={users}
            // setUsers={setUsers}
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
