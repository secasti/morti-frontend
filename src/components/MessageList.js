import React from "react";
import PropTypes from 'prop-types';
import Message from './Message';
import './MessageList.css';

const MessageList = ({ messages, deleteMessage, isMsgExpanded, expandMessage }) =>{
  

    const allMessages = messages.map((message)=> {
        return (
            < Message 
                key={ message.message_id } 
                message_id={ message.message_id }
                userId={ message.userId }
                title= { message.title }
                text = { message.text }
                audio_message = { message.audio_message }
                recipientId = { message.recipientId }
                isSent = { message.isSent }
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
    messages: PropTypes.arrayOf (
        PropTypes.shape({
            message_id: PropTypes.number,
            userId: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
            // audio: PropTypes.string.isRequired,
            recipientId: PropTypes.number.isRequired,
            isSent: PropTypes.bool.isRequired
        })

    ).isRequired,
    deleteMessage: PropTypes.func.isRequired,
    isMsgExpanded: PropTypes.object.isRequired,
    expandMessage: PropTypes.func.isRequired
};

export default MessageList