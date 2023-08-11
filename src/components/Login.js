import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css'
import Register from './Register';
import axios from 'axios';

const Login = ({token, setToken, currentUser, setCurrentUser, handleAuthentication, registerNewUser}) => {
  

  //login form initial data
  const [loginForm, setloginForm] = useState({
          email: "",
          password: ""
          })

  //define var to handle useNavigate
  const navigate = useNavigate()

  //what happens upon login
  const handleLogin = (event) => {
    console.log("token:", token)
    console.log("inside HandleLogin");
    // console.log("users:", users[0])

    axios({
      method: "POST",
      url:"https://morti-back-end.onrender.com/token",
      data:{
        email: loginForm.email,
        password: loginForm.password
      }
    })
    .then((response) => {
      setCurrentUser(response.data.first_name)
      setToken(response.data.access_token)
      alert("Successful Login")
      localStorage.setItem('email', loginForm.email)
      navigate('/profile');
    }).catch((error) => {
        if (error.response) {
            console.log(error.response)
            console.log(error.response.status)
            console.log(error.response.headers)
            alert("Error:",error.response)
        };
    });

    // Clear the login form fields
    setloginForm({
      email: "",
      password: ""
    });

    event.preventDefault()
    //HARD CODED DATA
    // Check if the submitted form matches any valid user credentials
    // const validUser = users.find(
    //   user => user.email === loginForm.email && user.password === loginForm.password
    // );
    
    // if (validUser) {
    //   setToken(validUser.access_token);
    //   alert("Successful Login");
    //   handleAuthentication(loginForm.email)
    //   localStorage.setItem('email', loginForm.email); //ask ana what this does?
    //   navigate('/profile');
    // } else {
    //   alert('Invalid username or password');
    // }

  };

  //what happens if there is any typing in the login form
    function handleChange(event) {
      // console.log(users)
      const {value, name} = event.target
      setloginForm(prevNote => ({
          ...prevNote,
          [name]:value })
      )
    }

  //state that defines whether to show login or register form
  const [isRegisterFormVisible, setIsRegisterFormVisible] = useState(false)

    return (
      <div className="login-page">
        <section className="morti-intro"> <h2>Welcome to Morti</h2> 
        We are a compassionate platform designed to help you leave a lasting legacy for your loved ones. Life is uncertain, and Morti is here to empower you to prepare meaningful farewell messages in advance. With Morti, you can craft heartfelt messages to be delivered to your cherished friends and family after you're gone. Our secure trustee system ensures your intentions are carried out, allowing designated trustees to confirm your passing and send out your messages with ease. Additionally, Morti provides a space for you to receive messages from those you hold dear, creating a space of connection and remembrance. Embrace the opportunity to leave behind a legacy of love and care with Morti.</section>
        <div className = "login-form--container">
          <h2 className="form-title">
            {isRegisterFormVisible ? "Sign Up" : "Log in"}
          </h2>
          {isRegisterFormVisible ? (
            <Register registerNewUser={registerNewUser} setIsRegisterFormVisible={setIsRegisterFormVisible} isRegisterFormVisible={isRegisterFormVisible} setToken={setToken} handleAuthentication={handleAuthentication}/>
          ):
          (<form className="login-form" onSubmit={handleLogin}>
                        <input onChange={handleChange} 
                            type="email"
                            text={loginForm.email} 
                            name="email" 
                            placeholder="Email" 
                            value={loginForm.email} />
                                          
                        <input onChange={handleChange} 
                            type="password"
                            text={loginForm.password} 
                            name="password" 
                            placeholder="Password" 
                            value={loginForm.password} />
            <button className="form-submit-button" > 
              {isRegisterFormVisible ? 'REGISTER' : 'LOGIN'}
            </button>
            <p className="not-a-member">
            {isRegisterFormVisible ? (
                <>
                  Already have an account?{' '}
                  <button onClick={setIsRegisterFormVisible(false)}>
                    <Link to="/login">Log in </Link>
                </button>
                </>
              ) : (
                <>
                  Not a member?{' '}
                  <button
                    className="link-button"
                    onClick={() => setIsRegisterFormVisible(true)}
                  >
                    Sign Up.
                  </button>
                </>
              )}
            </p>
          </form>
          )}
         
        </div>
      </div>
    );
  };


export default Login;
