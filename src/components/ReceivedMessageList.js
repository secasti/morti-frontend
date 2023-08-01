import React from "react";
import PropTypes from 'prop-types';
import ReceivedMessage from "./ReceivedMessage";
import './ReceivedMessage.css';


const ReceivedMessageList = (props) =>{

    const receivedMessages = props.receivedMessages;

    const getReceivedMessagesJSX = (receivedMessages) => {
        return receivedMessages.map((message) => {
            return (
                <li key={message.userId}>
                    <ReceivedMessage
                        message_id={message.message_id}
                        userId={message.userId}
                        title={message.title}
                        text={message.text}
                        recipientId={message.recipientId}
                        isSent={message.isSent}
                        deleteMessage={props.deleteMessage}
                    ></ReceivedMessage>
                </li>
            );
        });
    };
// class vs className?
    return (
        <div className="messages">
            <ol>{getReceivedMessagesJSX(receivedMessages)}</ol>
        </div>
    );
};

ReceivedMessageList.propTypes = {
    // receivedMessages below is made up, is it supposed to 
    // to be from anywhere?
    receivedMessages: PropTypes.arrayOf (
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
}

export default ReceivedMessageList;