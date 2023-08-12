import React from "react";
import PropTypes from 'prop-types';
import Message from './Message';
import './MessageList.css';

const MessageList = ({ messages, deleteMessage, isMsgExpanded, expandMessage }) =>{


    const allMessages = messages.map((message)=> {
        return (
            < Message 
                key={ message.id } 
                messageId={ message.id }
                userId={ message.user_id }
                title= { message.title }
                text = { message.text_message }
                audio = { message.audio_message }
                recipientId = { message.recipient_id }
                isSent = { message.is_sent }
                deleteMessage= { deleteMessage }
                isMsgExpanded= { isMsgExpanded}
                expandMessage= {expandMessage}
            />
        )
    })
    return (
        <section className="message__page">
            <div className="messages">
                { allMessages }
            </div>
        </section> 
    );
};

MessageList.propTypes = {
    messages: PropTypes.array.isRequired,
    deleteMessage: PropTypes.func.isRequired,
    isMsgExpanded: PropTypes.object.isRequired,
    expandMessage: PropTypes.func.isRequired
};

export default MessageList