
import { useState, useEffect } from 'react';
import './App.css';
import { Route, Routes} from 'react-router-dom';
import Login from './components/Login';
import NavigationMenu from './components/NavigationMenu'
import useToken from './components/useToken';
import MessagePage from './components/MessagePage';
import TrusteePage from './components/TrusteePage';
import ReceivedMessageList from './components/ReceivedMessageList';
import axios from 'axios';
import Profile from './components/Profile'




function App() {

  //token for authenticating users
  const { token, removeToken, setToken } = useToken();


  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  
  // Function to handle successful authentication
  const handleAuthentication = (email) => {
    setIsAuthenticated({email:email, name: "Susi"});
  };

  //handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
  };

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
  useEffect(getMessages, [])
  
  
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
    

  // const Navigation = () => (
  //   <nav>
  //     <Link to="/login">
  //       <button>LOGIN</button>
  //     </Link>
  //     <Link to="/register">
  //       <button>SIGN UP</button>
  //     </Link>
  //     <Link to="/dashboard">Dashboard</Link>
  //   </nav>
  // )

  // If authenticated, show the main content based on the active component
  return (
    <div className="website-container">
      <div className='app-page-container'>

        <h1>M O R T I</h1>

        <NavigationMenu className={!isAuthenticated?  "invisible-menu": ""} removeToken={removeToken} handleLogout={handleLogout} isAuthenticated={isAuthenticated}/>

      </div>

      <div className='defining-routes'>

          {!token && token!=="" && token!== undefined ? 
          <Login setToken={ setToken } handleAuthentication={ handleAuthentication } /> :
          (
            <Routes>
              <Route
                exact path="*"
                element={
                    <Login 
                      setToken={ setToken } 
                      handleAuthentication={ handleAuthentication } />
                  }
                />
              <Route
                exact path="/login"
                element={
                    <Login 
                    setToken={ setToken } 
                    handleAuthentication={ handleAuthentication } />
                  }
                />
              <Route
                exact path="/profile"
                element={
                    <Profile 
                      token ={ token } 
                      isAuthenticated={isAuthenticated} 
                    />
                  }
              />

              <Route
                exact path="/messages"
                element={
                  <MessagePage messages = { messages} 
                  addMessage={ addMessage } 
                  deleteMessage={ deleteMessage }
                  expandMessage={ expandMessage }
                  isMsgExpanded = { isMsgExpanded }
                  getMessages = { getMessages }
             
                  />
                  }
              />
              <Route
                exact path="/trustees"
                element={
                  <TrusteePage 
                  trustees={trustees} 
                  addTrustee={addTrustee}
                  updateDeleteTrustee={updateDeleteTrustee}
                  trusteeFor = {trusteeFor}
                  deleteTrusteeFor = {deleteTrusteeFor}
                  />
                  }
              />
              <Route
                exact path="/messages/received-messages"
                element={
                  <ReceivedMessageList 
                  receivedMessages={receivedMessages}
                  getReceivedMessages={getReceivedMessages}
                  deleteMessage={deleteMessage}
                  />
                  }
              />
            </Routes>
          )}
      </div>
      

        <footer className="app-footer">
        <p>© 2023 MORTI </p>
        </footer>

    </div>
  );
};

export default App;
