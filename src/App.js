
import { useState } from 'react';
import './App.css';
import { Route, Routes} from 'react-router-dom';
import Login from './components/Login';
import NavigationMenu from './components/NavigationMenu'
import useToken from './components/useToken';
import Register from './components/Register';
import PrivateRoutes from './components/PrivateRoutes'
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import logo from './morti.png';




function App() {

  const navigate = useNavigate()

  //token for authenticating users
  const { token, removeToken, setToken } = useToken();

  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to handle successful authentication
  // const handleAuthentication = (email) => {
  //   setIsAuthenticated({email:email, name: "Susi"});
  // };

  //handle logout
  const handleLogout = () => {
  setIsAuthenticated(false);
  };

  //HANDLE LOGIN
  const handleLogin = async (event, loginData) => {
    if (event) {
      event.preventDefault(); // Prevent the default form submission behavior
    }
  
    try {
      const response = await axios({
        method: "POST",
        url: "https://morti-back-end.onrender.com/token",
        data: {
          email: loginData.email,
          password: loginData.password
        }
      });
  
      console.log("token:", response.data.access_token);
      setToken(response.data.access_token);
      alert("Successful Login!");
      localStorage.setItem("email", loginData.email);
      navigate("/profile");
    } catch (error) {
      if (error.response) {
        console.log(error.response);
        console.log(error.response.status);
        console.log(error.response.headers);
        alert("Error:", error.response);
      }
    }
  };
  

  //REGISTER NEW USER
  const registerNewUser = (newUser) => {
    console.log("newUser info:", newUser);
  
    console.log("inside RegisterNewUser");
    axios({
      method: "POST",
      url: "https://morti-back-end.onrender.com/register",
      data: {
        email: newUser.email,
        password: newUser.password,
        first_name: newUser.first_name,
        last_name: newUser.last_name
      }
    })
      .then((response) => {
      handleLogin(null, newUser);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
          alert("Error:", error.response);
        }
      });
  };

  

  return (
    <div className="website-container">
      <div className='app-page-container'>

        <div className='logo'>
          <img src={logo} alt="Logo" />
          {/* <h1 className='app-title'>M O R T I</h1> */}
        </div>

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
              registerNewUser={registerNewUser}
              handleLogin={handleLogin}
            />
          }
        />
        <Route
          path="*"
          element={
            <Login
              setToken={setToken}
              token={token}
              registerNewUser={registerNewUser}
              handleLogin={handleLogin}
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
            setIsAuthenticated={setIsAuthenticated}
            registerNewUser={registerNewUser}
          />
      )
      
      }

      </div>
      

        <footer className="app-footer">
        <p>© 2023 MORTI </p>
        </footer>

    </div>
  );
};

export default App;
