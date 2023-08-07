import React from 'react';
import PropTypes from 'prop-types';
import './TrusteeFor.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faSkull } from '@fortawesome/free-solid-svg-icons';

const TrusteeFor = (props) => {

    const toggleDelete = () => {
        props.deleteTrusteeFor(props.user_id)
    }

    const markDeceased = (user_id, firstName, email) => {
        const isConfirmed = window.confirm(`Are you sure you want to mark ${firstName}, ${email}, as deceased?`);
        if (isConfirmed) {
          // Send patch request to backend that takes user_id, sets all messages that the user created "is_sent" to True
        console.log("User:", user_id, "is deceased and now messages should be sent");
        }
    };

    return (
        <section className='single-msg'>
            <h3 className='msg-title'> {props.first_name} </h3>
            <p className='msg-text'> {props.email} </p>
            <button onClick={markDeceased(props.user_id,  props.first_name, props.email)} className='skull-btn'> 
                <FontAwesomeIcon icon={faSkull} />
            </button>
            <button onClick={toggleDelete} className='delete-btn'>
                <FontAwesomeIcon icon={faTrash} />
            </button>
        </section>
    );
};

TrusteeFor.propTypes = {
    user_id: PropTypes.number,
    first_name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    deleteTrusteeFor: PropTypes.func.isRequired
}

export default TrusteeFor;