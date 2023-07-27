import React from 'react';
import PropTypes from 'prop-types';
import './Message.css';

const Message = (props) => {


    return (
        <div className='single-msg'>
            <h3 className='msg-title'> {props.title} </h3>
            <p className='msg-text'> {props.text} </p>
        </div>
    )
};

Message.propTypes = {
    userId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    // audio: PropTypes.string.isRequired,
    recipientId: PropTypes.number.isRequired,
    isSent: PropTypes.bool.isRequired
};

export default Message;