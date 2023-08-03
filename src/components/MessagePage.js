import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import NewMessageForm from './NewMessageForm';
import './MessagePage.css';
import MessageList from './MessageList';
import axios from 'axios';

const MessagePage = ({messages, addMessage, deleteMessage, expandMessage, isMsgExpanded, getMessages}) =>{
    console.log("MessagePage rendered");


    return (
        <section className="message__page">
            {/* render list of messages */}
            <div className="message-list">
                <MessageList 
                messages ={ messages }
                deleteMessage={deleteMessage}
                expandMessage={  expandMessage }
                isMsgExpanded = { isMsgExpanded }
                />  
            </div>
            {/* render form to create new message */}
            <div className="new-msg-form">
                <NewMessageForm 
                addMessageCallback={ addMessage }
                addDummyMessage={addMessage}
                messages={ messages } />
            </div>
        </section> 
    );
};

MessagePage.propTypes = {
    messages: PropTypes.arrayOf(
        PropTypes.shape({
            message_id: PropTypes.number,
            userId: PropTypes.number,
            title: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
            // audio: PropTypes.string.isRequired,
            recipientId: PropTypes.number.isRequired,
            isSent: PropTypes.bool.isRequired,
        }).isRequired
    ),
        addMessage: PropTypes.func.isRequired,
        deleteMessage:PropTypes.func.isRequired,
        isMsgExpanded: PropTypes.object.isRequired,
        expandMessage: PropTypes.func.isRequired
};

export default MessagePage;