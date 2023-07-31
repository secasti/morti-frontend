import React from 'react';
import PropTypes from 'prop-types';
import './Trustee.css';

const Trustee = (props) => {

    return (
        <section className='single-msg'>
            <h3 className='msg-title'> {props.trustee_name} </h3>
            <p className='msg-text'> {props.trustee_email} </p>
            <button onClick={console.log('pressed delete a trustee!')}>🗑</button>
        </section>
    );
};

Trustee.propTypes = {
    trustee_id: PropTypes.number,
    trustee_name: PropTypes.string.isRequired,
    trustee_email: PropTypes.string.isRequired
}

export default Trustee;