import React, {useEffect, useState} from 'react';
import axios from 'axios';
import TrusteePage from './TrusteePage';
import ReceivedMessageList from './ReceivedMessageList';
import MessagePage from './MessagePage';
import LogOut from './LogOut';
import {Route, Routes} from 'react-router-dom'
import {useNavigate} from "react-router-dom";


const Dashboard = ({removeToken, handleLogout}) => {
  console.log("inside profile")

  const navigate = useNavigate()
  
    return (
        <div className="logged-menu-container">
          
          <header className="logged-nav-menu">
          
            <nav>
              <button onClick={() => navigate('/messages')}>Messages</button>
              <button onClick={() => navigate('/trustees')}>Trusted Persons</button>
              <button onClick={() => navigate('/messages/received-messages')}>Received Messages</button>
              <LogOut removeToken = { removeToken } handleLogout={ handleLogout } />
            </nav>
          </header>
    
        </div>
      );
};

export default Dashboard;