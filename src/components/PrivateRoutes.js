import { useState, useEffect } from 'react';
import { Route, Routes} from 'react-router-dom';
import Login from './Login';
import MessagePage from './MessagePage';
import TrusteePage from './TrusteePage';
import ReceivedMessageList from './ReceivedMessageList';
import axios from 'axios';
import Profile from './Profile'
import Register from './Register';

function PrivateRoutes({ isAuthenticated, token, setToken, handleAuthentication, users, setUsers }) {

    // States
    const [messages, setMessages] = useState([]);
    const [trustees, setTrustees] = useState([]);
    const [trusteeFor, setTrusteeFor] = useState([]);
    const [receivedMessages, setReceivedMessages] = useState([]);
    
    const [isMsgExpanded, setIsMsgExpanded] = useState(() => {
    // initial dictionary with each message id as key, and boolean value for if it is expanded. 
      const initialMsgExpandedState = {};
      messages.forEach((message) => {
          initialMsgExpandedState[message.message_id] = false;
      });
      return initialMsgExpandedState;
      })
    
    //REGISTER NEW USER
    const registerNewUser = (newUser) => {
      console.log("newUser info:", newUser)
      setUsers([...users, newUser]);
      console.log("all users now:", users)
    };

  //GET MESSAGE API CALL
    const getMessages = () => {
        axios({
          method: "GET",
          url:'https://morti-back-end.onrender.com/messages',
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then((response) => {
          const messagesData = [];
          response.data.forEach((message) => {
            messagesData.push(message);
          });
          setMessages(messagesData)
        })
        .catch((error) => {
            console.log("error: ", error.response);
            alert(error.response)
        })
    }
    useEffect(getMessages, [])

    // const webToken = localStorage.getItem('token'); DOEST NOT WORK DO NOT USE

    const addMessage = (newMessageData) => {
        console.log("addMessage called")
  
    console.log("request data:",newMessageData)
  
    if (newMessageData.audio_message != null && newMessageData.audio_message !== "") {
      console.log("DEBUG audio_message non empty")
      axios({
        method: "POST",
        url:'https://morti-back-end.onrender.com/messages',
        headers: {
          Authorization: "Bearer " + token
        },
        data: newMessageData 
      })
      .then((response) => {
          console.log("response data: ", response)
          getMessages()
          //re-render message page and make a get message axios call. 
          // getMessages()
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
    // const getReceivedMessages = (response) => {
    //   const newMessages = response.map((message) => {
    //     return {
    //       'message_id': message.message_id,
    //       'userId': message.userId,
    //       'title': message.title,
    //       'text': message.text,
    //       'recipientId': message.recipientId,
    //       'isSent': message.isSent
    //     };
    //   });
    // setReceivedMessages(RECEIVED_MESSAGE_DATA);
    // };
  
    //MESSAGES functions

    const deleteMessage = (messageId) => {
      axios({
        method: "DELETE",
        url: `https://morti-back-end.onrender.com/messages/${messageId}`,
        headers: {
          Authorization: "Bearer " + token
        },
      })
      .then((response) => {
          console.log("response data: ", response)
          getMessages()
        })
        .catch((error)=> {
          console.log("error: ", error)
          alert(error)
        })
    }
    
    // const deleteMessage = (messageId, messageType) => {
    //   let updatedMessages;
      
    //   axios.delete(`https://morti-back-end.onrender.com/messages/${messageId}/delete`)
    //   .then((response) => {
  
    //   switch (messageType) {
        
    //     case 'receivedMessage':
    //       updatedMessages = receivedMessages.filter(function (receivedMessages) {
    //         return receivedMessages.message_id !== messageId;
    //       });
    //       setReceivedMessages(updatedMessages);
    //       break;
  
    //     case 'message':
    //       console.log('in message switch')
    //       updatedMessages = messages.filter(function (messages) {
    //         return messages.message_id !== messageId;
    //       });
    //       setMessages(updatedMessages);
    //       break;
  
    //     default:
    //       console.error('Invalid messageType', messageType);

    // }).catch((error) => {
    //   console.log("error: ", error);
    // })
    
    // };
  
    const expandMessage = (message_id) => {
      console.log("inside expand Message")
        setIsMsgExpanded((prevExpanded)=>({
        ...prevExpanded,
        [message_id]: !prevExpanded[message_id]
        })); 
    };
    
    
    if (!token && token !== "" && token !== undefined) {
      return (
        <div>
          <Login
            token={token}
            setToken={setToken}
            handleAuthentication={handleAuthentication}
            registerNewUser={registerNewUser}
            users={users}
          />
          <Routes>
          <Route
            path="/register"
            element={<Register registerNewUser={registerNewUser} />}
          />
          </Routes>
        </div>
      );
    } else if (token) {
      return (
        <Routes>
          <Route path="/profile" element={<Profile token={token} isAuthenticated={isAuthenticated} />} />
          <Route
            path="/messages"
            element={
              <MessagePage
                token={token}
                messages={messages}
                addMessage={addMessage}
                deleteMessage={deleteMessage}
                expandMessage={expandMessage}
                isMsgExpanded={isMsgExpanded}
                getMessages={getMessages}
              />
            }
          />
          <Route
            path="/trustees"
            element={
              <TrusteePage
                trustees={trustees}
                addTrustee={addTrustee}
                updateDeleteTrustee={updateDeleteTrustee}
                trusteeFor={trusteeFor}
                deleteTrusteeFor={deleteTrusteeFor}
              />
            }
          />
          <Route
            path="/messages/received-messages"
            element={
              <ReceivedMessageList
                receivedMessages={receivedMessages}
                // getReceivedMessages={getReceivedMessages}
                deleteMessage={deleteMessage}
              />
            }
          />
          {/* Other routes */}
        </Routes>
      );
    } else {
      return (
        <Routes>
        <Route
          path="*"
          element={
            <Login
              token={token}
              setToken={setToken}
              handleAuthentication={handleAuthentication}
              registerNewUser={registerNewUser}
              users={users}
            />
          }
        />
        </Routes>
      );
    }
  }
  
  export default PrivateRoutes;