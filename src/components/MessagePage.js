import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import NewMessageForm from './NewMessageForm';
import './MessagePage.css';
import MessageList from './MessageList';
import axios from 'axios';

const MessagePage = ({dummyMessages, addDummyMessage, deleteMessage}) =>{

  const [messages, setMessages] = useState([])

  const addMessage = (newMessageData) => {
    console.log("DEBUG addMessage called")
    console.log("DEBUG newMessageData: " + JSON.stringify(newMessageData))
    if (newMessageData.audio_message != null && newMessageData.audio_message !== "") {
      console.log("DEBUG audio_message non empty")
      axios
        .post('http://127.0.0.1:5000/messages', newMessageData)
        .then((response) => {
          console.log("response data: ", response)
        })
        .catch((error)=> {
          console.log("error: ", error)
        })
    } else {
      console.log("DEBUG audio_message is empty, not POSTING")
    }
  }
  const getMessages = () => {
    axios.get('http://127.0.0.1:5000/messages')
      .then((response) => {
        const messagesData = [];
        response.data.forEach((message) => {
          messagesData.push(message);
        });
        setMessages(messagesData);
      })
      .catch((error) => {
        console.log("error: ", error);
      })
  }
  
  useEffect(getMessages, [])

    console.log("MessagePage rendered");
    return (
        <section className="message__page">
            {/* render list of messages */}
            <div className="message-list">
                <MessageList 
                listOfMessages={ messages }
                dummyMessages={dummyMessages}
                deleteMessage={deleteMessage}
                />  
            </div>
            {/* render form to create new message */}
            <div className="new-msg-form">
                <NewMessageForm 
                addMessageCallback={ addMessage }
                addDummyMessage={addDummyMessage}
                messages={ messages } />
            </div>
        </section> 
    );
};

MessagePage.propTypes = {
    messages: PropTypes.arrayOf(
        PropTypes.shape({
            message_id: PropTypes.number,
            userId: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
            // audio: PropTypes.string.isRequired,
            recipientId: PropTypes.number.isRequired,
            isSent: PropTypes.bool.isRequired,
        })
    ).isRequired,
        addMessage: PropTypes.func.isRequired,
        deleteMessage:PropTypes.func.isRequired
};

export default MessagePage;