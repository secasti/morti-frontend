import React from 'react';
import './Profile.css'


const Profile = ({isAuthenticated, currentUser, setCurrentUser}) => {
  console.log("inside profile")
  console.log("name:", currentUser.first_name)
  
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