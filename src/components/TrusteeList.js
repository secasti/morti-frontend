import React from 'react';
import PropTypes from 'prop-types';
import Trustee from './Trustee';
import './TrusteeList.css';

const TrusteeList = () => {
    return (
        <section>
            <h2>This is TrusteeList</h2>
            <Trustee></Trustee>
        </section>
    );
};

TrusteeList.propTypes = {
    trustees: PropTypes.arrayOf(
        PropTypes.shape({
            trustee_id: PropTypes.number,
            trustee_name: PropTypes.string.isRequired,
            trustee_email: PropTypes.string.isRequired
        })
    ).isRequired
};

export default TrusteeList;