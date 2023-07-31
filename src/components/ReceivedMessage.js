import React from 'react';
import PropTypes from 'prop-types';
import './ReceivedMessage.css';

const ReceivedMessage = (props) => {

    return (
        <div className='single-msg'>
            <h3 className='msg-title'>{props.received_title} </h3>
            <p className='msg-text'> {props.received_text} </p>
            <button onClick={console.log('pressed delete a received message!')}>🗑</button>
        </div>
    )
};

ReceivedMessage.propTypes = {
    received_user_id: PropTypes.number.isRequired,
    received_title: PropTypes.string.isRequired,
    received_text: PropTypes.string.isRequired,
    // audio: PropTypes.string.isRequired,
    received_recipient_id: PropTypes.number.isRequired,
    received_is_sent: PropTypes.bool.isRequired
};

export default ReceivedMessage;