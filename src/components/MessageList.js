import React from "react";
import PropTypes from 'prop-types';
import Message from './Message';
import './MessageList.css';

const MessageList = (props) =>{
    const {listOfMessages, dummyMessages, deleteMessage} = props;

    const allMessages = listOfMessages.map((message)=> {
        return (
            < Message 
                key={ message.message_id } 
                message_id={message.message_id}
                userId={ message.userId }
                title= { message.title }
                text = { message.text }
                audio_message = {message.audio_message}
                recipientId = { message.recipientId }
                isSent = {message.isSent}
                deleteMessage={props.deleteMessage}
            />
        )
    })
    //dummy data
    const allDummyMessages = dummyMessages.map((message)=> {
        return (
            < Message 
                key={ message.message_id } 
                message_id={message.message_id}
                userId={ message.userId }
                title= { message.title }
                text = { message.text }
                // audio_message = {message.audio_message}
                recipientId = { message.recipientId }
                isSent = {message.isSent}
                deleteMessage={props.deleteMessage}
            />
        )
    })
    return (
        <section className="message__page">
            <div className="messages">
                { allMessages }
            </div>
            <div>
                {allDummyMessages}
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
    deleteMessage: PropTypes.func,
    isMsgExpanded: PropTypes.object.isRequired,
    expandMessage: PropTypes.func.isRequired
};

export default MessageList