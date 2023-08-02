import React from 'react';
import PropTypes from 'prop-types';
import './ReceivedMessage.css';

const ReceivedMessage = (props) => {

    const toggleDelete = () => {
        props.deleteMessage(props.message_id, 'receivedMessage')
    };

    return (
        <div className='single-msg'>
            <h3 className='msg-title'>{props.title} </h3>
            <p className='msg-text'> {props.text} </p>
            <button onClick={toggleDelete}>🗑</button>
        </div>
    )
};

ReceivedMessage.propTypes = {
    message_id: PropTypes.number,
    userId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    // audio: PropTypes.string.isRequired,
    recipientId: PropTypes.number.isRequired,
    isSent: PropTypes.bool.isRequired,
    deleteMessage: PropTypes.func.isRequired
};

export default ReceivedMessage;