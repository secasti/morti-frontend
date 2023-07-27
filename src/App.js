
import { useState, useEffect } from 'react';
import axios from 'axios';
import TrustedPersons from './components/TrustedPersons';
import './App.css';
import MessageList from './components/MessageList';

function App() {
 //message hard-coded practice data
 const MESSAGE_DATA = [{
  id: 1,
  userId: 1,
  title: "Letter For Susi",
  text: "Thank you for being there for me. I love you!",
  // audio: 
  recipientId: 2, 
  isSent: false
},
{
  id: 1,
  userId: 1,
  title: "Letter For Selene",
  text: "Thank you for being there for me. I love you!",
  // audio: 
  recipientId: 2, 
  isSent: false
},
{
  id: 1,
  userId: 1,
  title: "Letter For Anna",
  text: "Thank you for being there for me. I love you!",
  // audio: 
  recipientId: 2, 
  isSent: false
}]

  // Message data state
  const [messages, setMessages] = useState(MESSAGE_DATA);

  // Active component state (0 for Intro, 1 for MessageList, 2 for TrustedPersons)
  const [activeComponent, setActiveComponent] = useState(0);

  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  // Function to set active component
  const setActive = (componentIndex) => {
    setActiveComponent(componentIndex);
  };

  // Function to handle successful authentication
  const handleAuthentication = () => {
    // Set isAuthenticated to true after successful authentication
    setIsAuthenticated(true);
  };

  // If not authenticated, show Sign In button and return null for main content
  if (!isAuthenticated) {
    return (
      <div className="App">
        <header className="app-header">
          <h1>My App</h1>
          <nav>
            <button>Sign In</button>
          </nav>
        </header>
        <section className="main-content">
          <p>Please sign in to access the content.</p>
        </section>
        <footer className="app-footer">
          <p>© 2023 Your Company</p>
        </footer>
      </div>
    );
  }

  // If authenticated, show the main content based on the active component
  return (
    <div className="App">
      <header className="app-header">
        <h1>My App</h1>
        <nav>
          <button onClick={() => setActive(1)}>Messages</button>
          <button onClick={() => setActive(2)}>Trusted Persons</button>
          <button>Sign Out</button>
        </nav>
      </header>

      <section className="main-content">
        {activeComponent === 0 && (
          <p>Welcome! This is the introductory text for the page.</p>
        )}
        {activeComponent === 1 && (
          <MessageList messages={messages} />
        )}
        {activeComponent === 2 && (
          <TrusteeList />
        )}
      </section>

      <footer className="app-footer">
        <p>© 2023 Your Company</p>
      </footer>

    </div>
  );
}

export default App;
