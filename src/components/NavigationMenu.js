import React from 'react';
import LogOut from './LogOut';
import {useNavigate} from "react-router-dom";
import "./NavigationMenu.css"


const NavigationMenu = ({removeToken, handleLogout, isAuthenticated}) => {

  const navigate = useNavigate()
  
    return (
        <div className={!isAuthenticated?  "invisible-menu": "logged-menu-container"}>
          
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

export default NavigationMenu;