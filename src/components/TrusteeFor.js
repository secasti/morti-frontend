import React from 'react';
import PropTypes from 'prop-types';
import './TrusteeFor.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const TrusteeFor = (props) => {

    const toggleDelete = () => {
        props.deleteTrusteeFor(props.user_id)
    }

    const markDeceased = (user_id) => {
        //send patch request to back end that takes user_id, sets all messages that user created "is_sent" to True
        console.log("user:", user_id, "dead and now messages should be sent")

    }
    return (
        <section className='single-msg'>
            <h3 className='msg-title'> {props.first_name} </h3>
            <p className='msg-text'> {props.email} </p>
            <button onClick={markDeceased}> </button>
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