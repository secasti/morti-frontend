import React from "react";
import PropTypes from 'prop-types';
import ReceivedMessage from "./ReceivedMessage";
import './ReceivedMessageList.css';
import NavigationMenu from "./NavigationMenu";


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
                            audio_message={message.audio_message}
                            recipientId={message.recipientId}
                            isSent={message.isSent}
                            deleteMessage={props.deleteMessage}
                        ></ReceivedMessage>
                    </li>
            
            );
        });
    };

    return (
        <div className="received-msg-page-container">
                <div className="logged-menu-container">
                    <header className="logged-nav-menu">
                        <NavigationMenu removeToken={props.removeToken} handleLogout={props.handleLogout} />
                    </header>
                </div>
                    <div className="messages">
                        <ol>{getReceivedMessagesJSX(receivedMessages)}</ol>
                    </div>
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
            audio_message: PropTypes.string.isRequired,
            recipientId: PropTypes.number.isRequired,
            isSent: PropTypes.bool.isRequired
        })
        //add create new message function required
        //load messages function(api call)
    ).isRequired,
    deleteMessage: PropTypes.func
};

export default ReceivedMessageList;