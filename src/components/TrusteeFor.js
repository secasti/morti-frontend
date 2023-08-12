import React from 'react';
import PropTypes from 'prop-types';
import './TrusteeFor.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faSkull } from '@fortawesome/free-solid-svg-icons';

const TrusteeFor = (props) => {

    const toggleDelete = () => {
        props.deleteTrusteeFor(props.userId)
    }

    const markDeceasedClick = () => {
        console.log("inside markDeceasedClick, userId:", props.userId)
        const isConfirmed = window.confirm(`Are you sure you want to mark ${props.firstName}, ${props.email}, ${props.userId}, as deceased?`);
        if (isConfirmed) {
          // Send patch request to backend that takes user_id, sets all messages that the user created "is_sent" to True
        console.log("User:", props.userId, "is deceased and now messages should be sent");
        props.updateExpired(props.userId)
        }
    };

    return (
        <section className='single-msg'>
            <h3 className='msg-title'> {props.firstName} </h3>
            <p className='msg-text'> {props.email} </p>
            <button onClick={markDeceasedClick} className='skull-btn'> 
                <FontAwesomeIcon icon={faSkull} />
            </button>
            <button onClick={toggleDelete} className='delete-btn'>
                <FontAwesomeIcon icon={faTrash} />
            </button>
        </section>
    );
};

TrusteeFor.propTypes = {
    userId: PropTypes.number,
    firstName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    deleteTrusteeFor: PropTypes.func.isRequired
}

export default TrusteeFor;