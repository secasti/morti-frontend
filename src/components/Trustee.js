import React from 'react';
import PropTypes from 'prop-types';
import './Trustee.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const Trustee = (props) => {

    const toggleDelete = () => {
        console.log("inside toggleDelete, trustee id:", props.user_id)
        props.updateDeleteTrustee(props.user_id)
    }

    return (
        <section className='single-msg'>
            <h3 className='msg-title'> {props.first_name} </h3>
            <p className='msg-text'> {props.email} </p>
            <button onClick={toggleDelete} className='delete-btn'>
                <FontAwesomeIcon icon={faTrash} />
            </button>
        </section>
    );
};

Trustee.propTypes = {
    user_id: PropTypes.number,
    first_name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    updateDeleteTrustee: PropTypes.func.isRequired
}

export default Trustee;