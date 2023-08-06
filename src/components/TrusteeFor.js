import React from 'react';
import PropTypes from 'prop-types';
import './TrusteeFor.css';

const TrusteeFor = (props) => {

    const toggleDelete = () => {
        props.deleteTrusteeFor(props.user_id)
    }

    return (
        <section className='single-msg'>
            <h3 className='msg-title'> {props.first_name} </h3>
            <p className='msg-text'> {props.email} </p>
            <button onClick={toggleDelete}>🗑</button>
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