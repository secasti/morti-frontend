import React from 'react';
import LogOut from './LogOut';
import {useNavigate} from "react-router-dom";
import "./NavigationMenu.css"


const NavigationMenu = ({token, setToken, removeToken, handleLogout, isAuthenticated}) => {

  const navigate = useNavigate()
  
    return (
        <div className={!token?  "invisible-menu": "logged-menu-container"}>
          
          <header className="logged-nav-menu">
            <nav>
              <button className="pirate-button" onClick={() => navigate('/messages')}>Messages</button>
              <button className="pirate-button" onClick={() => navigate('/trustees')}>Mortals</button>
              <button className="pirate-button" onClick={() => navigate('/messages/received-messages')}>Received Messages</button>
              <LogOut removeToken = { removeToken } handleLogout={ handleLogout } />
            </nav>
          </header>
    
        </div>
      );
};

export default NavigationMenu;