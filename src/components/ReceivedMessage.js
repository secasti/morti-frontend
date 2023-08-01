import React from 'react';
import PropTypes from 'prop-types';
import './ReceivedMessage.css';

const ReceivedMessage = (props) => {

    const toggleDelete = () => {
        props.deleteMessage(props.title)
    }

    return (
        <div className='single-msg'>
            <h3 className='msg-title'>{props.title} </h3>
            <p className='msg-text'> {props.text} </p>
            <button onClick={console.log('pressed delete a received message!')}>🗑</button>
        </div>
    )
};

ReceivedMessage.propTypes = {
    userId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    // audio: PropTypes.string.isRequired,
    recipientId: PropTypes.number.isRequired,
    isSent: PropTypes.bool.isRequired
};

export default ReceivedMessage;