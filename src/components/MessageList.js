import React from "react";
import PropTypes from 'prop-types';
import Message from './Message';
import './MessageList.css';

const MessageList = (props) =>{
    return (
        <section className="message__page">
            <div className="messages">
                {
                    props.messages.map((message) => (
                        < Message 
                            key={ message.message_id } 
                            message_id={message.message_id}
                            userId={ message.userId }
                            title= { message.title }
                            text = { message.text }
                            // audio = { message.audio }
                            recipientId = { message.recipientId }
                            isSent = {message.isSent}
                            deleteMessage={props.deleteMessage}
                        />
                    ))
                }
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
        //add create new message function required
        //load messages function(api call)
    ).isRequired,
    deleteMessage: PropTypes.func
};

export default MessageList