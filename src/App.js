
import { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import './App.css';
import TrusteePage from './components/TrusteePage';
import ReceivedMessageList from './components/ReceivedMessageList';
import MessagePage from './components/MessagePage';
import { get } from 'lodash';

function App() {
  const[ user, setUser ] = useState ({});

 //message hard-coded practice data
  const MESSAGE_DATA = [{
  message_id: 1,
  userId: 1,
  title: "Letter For Susi",
  text: "Thank you for being there for me. I love you! this is a really long letter to show the expand option for a message. I am making this so long you should really stop reading because there will not me anything of substance here. ",
  // audio: 
  recipientId: 2, 
  isSent: false
},
{
  message_id: 2,
  userId: 2,
  title: "Letter For Selene",
  text: "Thank you for being there for me. I love you!",
  // audio: 
  recipientId: 2, 
  isSent: false
},
{
  message_id: 3,
  userId: 3,
  title: "Letter For Anna",
  text: "Thank you for being there for me. I love you!",
  // audio: 
  recipientId: 3, 
  isSent: false
}]

  const TRUSTEE_DATA = [{
  user_id: 1,
  first_name: "sancho",
  email: "sancho@gmail.com"
}, {
  user_id: 2,
  first_name: "kween",
  email: "kween@gmail.com"
}, {
  user_id: 3,
  first_name: "ruka",
  email: "ruka@gmail.com"
}]

  const RECEIVED_MESSAGE_DATA = [{
  message_id: 4,
  userId: 1,
  title: "Boo bish!",
  text: "Ok, NOW you can play with the quija",
  // audio: 
  recipientId: 2, 
  isSent: false
}, {
  message_id: 3,
  userId: 2,
  title: "Hey I've transcended",
  text: "It's wildin' up here... like being high but actually!",
  // audio: 
  recipientId: 2, 
  isSent: false
},
{
  message_id: 2,
  userId: 3,
  title: "I'm haunting you!",
  text: "Do you notice me? Write down your dreams bish",
  // audio: 
  recipientId: 2, 
  isSent: false
},
{
  message_id: 1,
  userId: 4,
  title: "I'll visit ya!",
  text: "On 1/2/2033 I'll visit you in the form of a animal",
  // audio: 
  recipientId: 2, 
  isSent: false
}]

const TRUSTEE_FOR_DATA = [{
  user_id: 1,
  first_name: "susi",
  email: "susi@gmail.com"
}, {
  user_id: 2,
  first_name: "ana",
  email: "ana@gmail.com"
}, {
  user_id: 3,
  first_name: "anna",
  email: "anna@gmail.com"
}]

  // States
  const [messages, setMessages] = useState(MESSAGE_DATA);
  const [trustees, setTrustees] = useState(TRUSTEE_DATA);
  const [trusteeFor, setTrusteeFor] = useState(TRUSTEE_FOR_DATA);
  const [receivedMessages, setReceivedMessages] = useState(RECEIVED_MESSAGE_DATA);
  const [isMsgExpanded, setIsMsgExpanded] = useState(() => {
  // initial dictionary with each message id as key, and boolean value for if it is expanded. 
    const initialMsgExpandedState = {};
    messages.forEach((message) => {
      initialMsgExpandedState[message.message_id] = false;
    });
    return initialMsgExpandedState;
  })

const setupGoogleSso = () => {
  /*global google */
  window.google.accounts.id.initialize({
    client_id: "444393723578-hqvu6heuhrubn9putumbq943iredeh73.apps.googleusercontent.com",
    callback: handleCallbackResponse
  });
  
  window.google.accounts.id.renderButton(
    document.getElementById("signInDiv"),
    {theme: "outline", size: "large"}
  );

  window.google.accounts.id.prompt();
}

function handleCallbackResponse(response) {
  const jwt = response.credential;
  console.log("Encoded JWT ID token: " + response.credential);
  var userObject = jwt_decode(response.credential);
  console.log(userObject);
  setUser(userObject);

  // Send the Google ID token to the backend
  const token = { email: userObject.email,
    first_name: userObject.family_name, 
    last_name: userObject.given_name}; // The Google ID token obtained during sign-in
  
  console.log(token)

  axios.post("http://localhost:5000/google_callback", { token })
    .then((response) => {
      // Handle the response from the backend (if needed)
      console.log("Backend response:", response.data);
      const data = response.data;
    
      // Check if login was successful
      if (data.success) {
        // Login successful, redirect the user to protected area
        window.location.href = "/dashboard"; // Change to URL for protected area
      } else {
        console.error("Login failed:", data.error);
        // show pop-up or alert
      }
    })
    .catch((error) => {
      // Handle any errors that occurred during the resquest
      console.error("Error sending token to the backend:", error);
    });

  document.getElementById("signInDiv").hidden = true;
}

function handleSignOut(event) {
  setUser({});
  document.getElementById("signInDiv").hidden = false;
}

//GET MESSAGE API CALL
const getMessages = () => {
  axios.get('https://morti-back-end.onrender.com/farewell_messages')
    .then((response) => {
      const messagesData = response.data.map((message) => {
        return {
          message_id: message.id, // Rename 'id' to 'message_id'
          userId: message.id_recipient, // Rename 'id_recipient' to 'userId'
          title: message.title,
          text: message.text_message,
          // audio: message.audio_message, // Uncomment this line if you have an 'audio' prop in your component
          recipientId: message.id_recipient, // Rename 'id_recipient' to 'recipientId'
          isSent: message.is_sent, // Rename 'is_sent' to 'isSent'
        };
      });
      setMessages(messagesData);
    })
    .catch((error) => {
      console.log("error: ", error);
    })
}
useEffect(() => {
  getMessages();
  if (window.google) {
    setupGoogleSso();
  }
}, []);

  // Active component state (0 for Intro, 1 for MessageList, 2 for TrustedPersons, 3 for ReceivedMessages)
  const [activeComponent, setActiveComponent] = useState(0);

  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(true);

// Function to add a new message to MESSAGE_DATA
//   const addDummyMessage = (newMessage) => {
//   setMessages([...messages, newMessage]);
// };
const addMessage = (newMessageData) => {
  console.log("addMessage called")

  const requestData = {
    title: newMessageData.title,
    text_message: newMessageData.text, // Rename 'text' to 'text_message'
    audio_message: newMessageData.audio_message,
    id_recipient: newMessageData.recipientId, // Rename 'userId' to 'id_recipient'
    is_sent: newMessageData.isSent, // Rename 'isSent' to 'is_sent'
    recipient_email: newMessageData.recipientEmail
  };

  console.log("request data:",requestData)

  if (newMessageData.audio_message != null && newMessageData.audio_message !== "") {
    console.log("DEBUG audio_message non empty")
    axios
      .post('https://morti-back-end.onrender.com/farewell_messages', requestData)
      .then((response) => {
        console.log("response data: ", response)
        //re-render message page and make a get message axios call. 
        getMessages()
      })
      .catch((error)=> {
        console.log("error: ", error)
      })

  } else {
    console.log("DEBUG audio_message is empty, not POSTING")
  }
}

// TRUSTEE functions
  const addTrustee = (newTrustee) => {
  setTrustees([...trustees, newTrustee]);
};

  const updateDeleteTrustee = (trusteeId) => {
    const updatedTrustees = trustees.filter(function (trustees) {
      return trustees.user_id !== trusteeId;
    });

    setTrustees(updatedTrustees)
  };

// TRUSTEE FOR functions
  const deleteTrusteeFor = (trusteeId) => {
    const updatedTrustees = trusteeFor.filter(function (trusteeFor) {
      return trusteeFor.user_id !== trusteeId;
    });

    setTrusteeFor(updatedTrustees)
  };


// RECEIVED MESSAGES functions
  const getReceivedMessages = (response) => {
    const newMessages = response.map((message) => {
      return {
        'message_id': message.message_id,
        'userId': message.userId,
        'title': message.title,
        'text': message.text,
        'recipientId': message.recipientId,
        'isSent': message.isSent
      };
    });
  setReceivedMessages(RECEIVED_MESSAGE_DATA);
  };

  //MESSAGES functions
  const deleteMessage = (messageId, messageType) => {
    let updatedMessages;
    
    axios.delete(`https://morti-back-end.onrender.com/farewell_messages/${messageId}/delete`)
    .then((response) => {

    switch (messageType) {
      
      case 'receivedMessage':
        updatedMessages = receivedMessages.filter(function (receivedMessages) {
          return receivedMessages.message_id !== messageId;
        });
        setReceivedMessages(updatedMessages);
        break;

      case 'message':
        console.log('in message switch')
        updatedMessages = messages.filter(function (messages) {
          return messages.message_id !== messageId;
        });
        setMessages(updatedMessages);
        break;

      default:
        console.error('Invalid messageType', messageType);
        break;
    }
  }).catch((error) => {
    console.log("error: ", error);
  })
  
};

  const expandMessage = (message_id) => {
    console.log("inside expand Message")
      setIsMsgExpanded((prevExpanded)=>({
      ...prevExpanded,
      [message_id]: !prevExpanded[message_id]
      })); 
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
          <div id="signInDiv"></div>  
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
        )}

      </section>

      <footer className="app-footer">
        <p>© 2023 Your Company</p>
      </footer>

    </div>
  );
}

export default App;
