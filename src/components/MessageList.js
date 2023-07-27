import React from "react";
import PropTypes from 'prop-types';
import Message from './Message';
import './MessageList.css';



const MessageList = (props) =>{
    return (
        <div class="messages">
            {
                props.messages.map((message) => (
                    < Message 
                        key={ message.id } 
                        userId={ message.userId }
                        title= { message.title }
                        text = { message.text }
                        // audio = { message.audio }
                        recipientId = { message.recipientId }
                        isSent = {message.isSent}
                    />
                ))
            }
        </div>
    );
};

MessageList.propTypes = {
    messages: PropTypes.arrayOf (
        PropTypes.shape({
            userId: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
            // audio: PropTypes.string.isRequired,
            recipientId: PropTypes.number.isRequired,
            isSent: PropTypes.bool.isRequired
        })
        //add create new message function required
        //load messages function(api call)
    )
}

export default MessageList