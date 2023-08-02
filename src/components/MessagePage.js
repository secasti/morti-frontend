import React from "react";
import PropTypes from 'prop-types';
import NewMessageForm from './NewMessageForm';
import './MessagePage.css';
import MessageList from './MessageList';

const MessagePage = ({messages, addMessage, deleteMessage}) =>{
    console.log("MessagePage rendered");
    return (
        <section className="message__page">
            {/* render list of messages */}
            <div className="message-list">
                <MessageList 
                messages={ messages }
                deleteMessage={deleteMessage}
                expandMessage={  expandMessage }
                />  
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
        deleteMessage:PropTypes.func.isRequired,
        expandMessage: PropTypes.func.isRequired
};

export default MessagePage;