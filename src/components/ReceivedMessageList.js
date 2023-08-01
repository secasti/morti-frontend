import React from "react";
import PropTypes from 'prop-types';
import ReceivedMessage from "./ReceivedMessage";
import './ReceivedMessage.css';


const ReceivedMessageList = (props) =>{

    const receivedMessages = props.receivedMessages;

    const getReceivedMessagesJSX = (receivedMessages) => {
        return receivedMessages.map((message) => {
            return (
                <li key={message.received_user_id}>
                    <ReceivedMessage
                        id={message.id}
                        title={message.title}
                        text={message.text}
                        recipientId={message.recipientId}
                        isSent={message.isSent}
                    ></ReceivedMessage>
                </li>
            );
        });
    };
// class vs className?
    return (
        <div class="messages">
            <ol>{getReceivedMessagesJSX(receivedMessages)}</ol>
        </div>
    );
};

ReceivedMessageList.propTypes = {
    // receivedMessages below is made up, is it supposed to 
    // to be from anywhere?
    receivedMessages: PropTypes.arrayOf (
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

export default ReceivedMessageList;