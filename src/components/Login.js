import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({setToken, handleAuthentication}) => {
  
//VALID USERS
const VALID_USERS = [
    {email:"x" , password: "123", access_token: 123}
]
  
const [loginForm, setloginForm] = useState({
        email: "",
        password: ""
        })

const navigate = useNavigate()

const handleLogin = (loginForm) => {
  console.log("inside HandleLogin");
  
  // Check if the submitted form matches any valid user credentials
  const validUser = VALID_USERS.find(
    user => user.email === loginForm.email && user.password === loginForm.password
  );
  
  if (validUser) {
    setToken(validUser.access_token);
    alert("Successful Login");
    handleAuthentication(loginForm.email)
    localStorage.setItem('email', loginForm.email); //ask ana what this does?
    navigate('/profile');
  } else {
    alert('Invalid username or password');
  }

  // Clear the login form fields
  setloginForm({
    email: "",
    password: ""
  });
};

  function handleChange(event) {
    const {value, name} = event.target
    setloginForm(prevNote => ({
        ...prevNote,
        [name]:value })
    )
  }

  return (
    <div className="login-page">
      <p>This is an intro paragraph of what morti is</p>
      <div className = "login-form--container">
        <h2>Login</h2>
        <form className="login-form">
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
        <button onClick={() => handleLogin(loginForm)}>Login</button>
        </form>
      </div>
    </div>
  );
};


export default Login;
