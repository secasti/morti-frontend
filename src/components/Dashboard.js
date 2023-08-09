import React, {useEffect, useState} from 'react';
import axios from 'axios';
import TrusteePage from './TrusteePage';
import ReceivedMessageList from './ReceivedMessageList';
import MessagePage from './MessagePage';
import LogOut from './LogOut';
import {Route, Routes} from 'react-router-dom'
import {useNavigate} from "react-router-dom";


const Dashboard = ({token, isAuthenticated,removeToken, handleLogout}) => {
  console.log("inside dashboard")

  const navigate = useNavigate()
 //message hard-coded practice data

    // // Function to set active component
    // const setActive = (componentIndex) => {
    //   setActiveComponent(componentIndex);
    // };
  
    return (
        <div className="dashboard">
          
          <header className="dashboard-header">
          <Routes>
         
          </Routes>
          
            <nav>
              <button onClick={() => navigate('/messages')}>Messages</button>
              <button onClick={() => navigate('/trustees')}>Trusted Persons</button>
              <button onClick={() => navigate('/messages/received-messages')}>Received Messages</button>
              <LogOut removeToken = { removeToken } handleLogout={ handleLogout } />
            </nav>
          </header>
    
          <section className="dashboard-main-content">
            {/* {activeComponent === 0 && (
              <p>Welcome {isAuthenticated}! This is your profile. </p>
            )}
            {activeComponent === 1 && (
              <MessagePage messages = { messages} 
              addMessage={ addMessage } 
              deleteMessage={ deleteMessage }
              expandMessage={ expandMessage }
              isMsgExpanded = { isMsgExpanded }
              getMessages = { getMessages }
              />
            )}
            {activeComponent === 2 && (
              <TrusteePage 
              trustees={trustees} 
              addTrustee={addTrustee}
              updateDeleteTrustee={updateDeleteTrustee}
              trusteeFor = {trusteeFor}
              deleteTrusteeFor = {deleteTrusteeFor}
              />
            )}
            {activeComponent === 3 && (
              <ReceivedMessageList 
              receivedMessages={receivedMessages}
              getReceivedMessages={getReceivedMessages}
              deleteMessage={deleteMessage}
              />
            )} */}
    
          </section>
    
        </div>
      );
};

export default Dashboard;