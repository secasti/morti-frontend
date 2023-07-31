import React from 'react';
import PropTypes from 'prop-types';
import './Trustee.css';

const Trustee = (props) => {

    const toggleDelete = () => {
        props.updateDeleteTrustee(props.trustee_id)
    }

    return (
        <section className='single-msg'>
            <h3 className='msg-title'> {props.trustee_name} </h3>
            <p className='msg-text'> {props.trustee_email} </p>
            <button onClick={toggleDelete}>🗑</button>
        </section>
    );
};

Trustee.propTypes = {
    trustee_id: PropTypes.number,
    trustee_name: PropTypes.string.isRequired,
    trustee_email: PropTypes.string.isRequired,
    updateDeleteTrustee: PropTypes.func.isRequired
}

export default Trustee;