
import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import TrusteePage from './components/TrusteePage';
import MessageList from './components/MessageList';
import ReceivedMessageList from './components/ReceivedMessageList';
import MessagePage from './components/MessagePage';

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
  id: 2,
  userId: 1,
  title: "Letter For Selene",
  text: "Thank you for being there for me. I love you!",
  // audio: 
  recipientId: 2, 
  isSent: false
},
{
  id: 3,
  userId: 1,
  title: "Letter For Anna",
  text: "Thank you for being there for me. I love you!",
  // audio: 
  recipientId: 3, 
  isSent: false
}]

  const TRUSTEE_DATA = [{
  trustee_id: 1,
  trustee_name: "sancho",
  trustee_email: "sancho@gmail.com"
}, {
  trustee_id: 2,
  trustee_name: "kween",
  trustee_email: "kween@gmail.com"
}, {
  trustee_id: 3,
  trustee_name: "ruka",
  trustee_email: "ruka@gmail.com"
}]

  const RECEIVED_MESSAGE_DATA = [{
  received_user_id: 4,
  userId: 1,
  received_title: "Boo bish!",
  received_text: "Ok, NOW you can play with the quija",
  // audio: 
  received_recipient_id: 2, 
  received_is_sent: false
}, {
  received_user_id: 3,
  userId: 1,
  received_title: "Hey I've transcended",
  received_text: "It's wildin' up here... like being high but actually!",
  // audio: 
  received_recipient_id: 2, 
  received_is_sent: false
},
{
  received_user_id: 2,
  userId: 1,
  received_title: "I'm haunting you!",
  received_text: "Do you notice me? Write down your dreams bish",
  // audio: 
  received_recipient_id: 2, 
  received_is_sent: false
},
{
  received_user_id: 1,
  userId: 1,
  received_title: "I'll visit ya!",
  received_text: "On 1/2/2033 I'll visit you in the form of a animal",
  // audio: 
  received_recipient_id: 2, 
  received_is_sent: false
}]

  // States
  const [messages, setMessages] = useState(MESSAGE_DATA);
  const [trustees, setTrustees] = useState(TRUSTEE_DATA)
  const [receivedMessages, setReceivedMessages] = useState(RECEIVED_MESSAGE_DATA)

  // Active component state (0 for Intro, 1 for MessageList, 2 for TrustedPersons, 3 for ReceivedMessages?)
  const [activeComponent, setActiveComponent] = useState(0);

  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(true);

// Function to add a new message to MESSAGE_DATA
  const addMessage = (newMessage) => {
  setMessages([...messages, newMessage]);
};

// Function to add a new trustee to TRUSTEE_DATA
  const addTrustee = (newTrustee) => {
  setTrustees([...trustees, newTrustee]);
};

  const updateDeleteTrustee = (trusteeId) => {
    const updatedTrustees = trustees.filter(function (trustees) {
      return trustees.trustee_id !== trusteeId;
    });

    setTrustees(updatedTrustees)
  };

  const getReceivedMessages = (response) => {
  const newMessages = response.map((message) => {
    return {
      'received_user_id': message.received_user_id,
      'received_title': message.received_title,
      'received_text': message.received_text,
      'received_recipient_id': message.received_recipient_id,
      'received_is_sent': message.received_is_sent
    }
  })
setReceivedMessages(RECEIVED_MESSAGE_DATA);
};

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
        <h1>M O R T I</h1>
        <nav>
          <button onClick={() => setActive(1)}>Messages</button>
          <button onClick={() => setActive(2)}>Trusted Persons</button>
          <button onClick={() => setActive(3)}>Received Messages</button>
          <button>Sign Out</button>
        </nav>
      </header>

      <section className="main-content">
        {activeComponent === 0 && (
          <p>Welcome! This is the introductory text for the page.</p>
        )}
        {activeComponent === 1 && (
          <MessagePage messages={messages} addMessage={addMessage} />
        )}
        {activeComponent === 2 && (
          <TrusteePage 
          trustees={trustees} 
          addTrustee={addTrustee}
          updateDeleteTrustee={updateDeleteTrustee}
          />
        )}
        {activeComponent === 3 && (
          <ReceivedMessageList 
          receivedMessages={receivedMessages}
          getReceivedMessages={getReceivedMessages}
          />
        )}
      </section>

      <footer className="app-footer">
        <p>© 2023 Your Company</p>
      </footer>

    </div>
  );
}

export default App;
