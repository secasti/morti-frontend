import React from 'react';
import PropTypes from 'prop-types';
import './Trustee.css';

const Trustee = (props) => {

    return (
        <section>
            This the Trustee component
        </section>
    );
};

Trustee.propTypes = {
    trustee_id: PropTypes.number,
    trustee_name: PropTypes.string.isRequired,
    trustee_email: PropTypes.string.isRequired
}

export default Trustee;