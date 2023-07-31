import React from "react";
import PropTypes from 'prop-types';
import NewMessageForm from './NewMessageForm';
import './MessagePage.css';
import MessageList from './MessageList';

const MessagePage = ({messages, addMessage}) =>{
    console.log("MessagePage rendered");
    return (
        <section className="message__page">
            {/* render list of messages */}
            <div class="message-list">
                <MessageList messages={ messages } />  
            </div>
            {/* render form to create new message */}
            <div className="new-msg-form">
                <NewMessageForm 
                addMessage={ addMessage }
                messages={ messages } />
            </div>
        </section> 
    );
};

MessagePage.propTypes = {
    messages: PropTypes.arrayOf(
        PropTypes.shape({
            userId: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
            // audio: PropTypes.string.isRequired,
            recipientId: PropTypes.number.isRequired,
            isSent: PropTypes.bool.isRequired,
        })
    ).isRequired,
        addMessage: PropTypes.func.isRequired,
};

export default MessagePage;