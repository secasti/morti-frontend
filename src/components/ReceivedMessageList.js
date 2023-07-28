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
                        received_user_id={message.received_user_id}
                        received_title={message.received_title}
                        received_text={message.received_text}
                        received_recipient_id={message.received_recipient_id}
                        received_is_sent={message.received_is_sent}
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
            received_user_id: PropTypes.number.isRequired,
            received_title: PropTypes.string.isRequired,
            received_text: PropTypes.string.isRequired,
            // audio: PropTypes.string.isRequired,
            received_recipient_id: PropTypes.number.isRequired,
            received_is_sent: PropTypes.bool.isRequired
        })
        //add create new message function required
        //load messages function(api call)
    )
}

export default ReceivedMessageList;