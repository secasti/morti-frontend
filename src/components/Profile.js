import React from 'react';
import './Profile.css'
import axios from 'axios';
import { useState, useEffect } from 'react';


const Profile = ({isAuthenticated, token}) => {
  console.log("inside profile")
  const [currentUser, setCurrentUser] = useState([]);

  const getUserInfo = () => {
      axios({
        method: "GET",
        url:'https://morti-back-end.onrender.com/profile',
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then((response) => {
        console.log(response.data)
        setCurrentUser(response.data)
      })
      .catch((error) => {
          console.log("error: ", error.response);
      })
  }
  useEffect(getUserInfo,[])
  
    return (
        <div className="welcome-container">
            <h2>Welcome, {currentUser.first_name}!</h2>
            <p>We hope that with our app you can record meaningful messages for your loved ones, set new trustees to manage your messages, and view messages you've received from loved ones.</p>
            <p className="started">To get started:</p>
            <ul>
                <li>Navigate to <strong>Messages</strong> to record messages for your loved ones.</li>
                <li>Navigate to <strong>Trusted Persons</strong> to set new trustees or view who you are a trusted person for.</li>
                <li>Navigate to <strong>Received Messages</strong> to see messages you've received from loved ones.</li>
            </ul>
      </div>
      );
};

export default Profile;