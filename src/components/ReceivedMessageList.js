import React from "react";
import PropTypes from 'prop-types';
import ReceivedMessage from "./ReceivedMessage";
import './ReceivedMessageList.css';



const ReceivedMessageList = (props) =>{

    const receivedMessages = props.receivedMessages.map((receivedMessage) => {
            return (
                        <ReceivedMessage
                            key={ receivedMessage.id } 
                            messageId={ receivedMessage.id }
                            userId={ receivedMessage.user_id }
                            title= { receivedMessage.title }
                            text = { receivedMessage.text_message }
                            audio = { receivedMessage.audio_message }
                            recipientId = { receivedMessage.recipient_id }
                            isSent = { receivedMessage.is_sent }
                            deleteMessage={props.deleteMessage}
                        ></ReceivedMessage>
            
            );
    });

    return (
        <div className="received-msg-page-container">
                    <div className="messages">
                        { receivedMessages }
                    </div>
        </div>
    );
};

ReceivedMessageList.propTypes = {
    receivedMessages: PropTypes.array.isRequired,
    deleteMessage: PropTypes.func
};

export default ReceivedMessageList;