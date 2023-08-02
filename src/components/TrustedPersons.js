import React from 'react';
import PropTypes from 'prop-types';
import TrusteeList from './TrusteeList';
import './TrustedPersons.css';

const TrustedPersons = () => {
    return (
        <section>
            <h2>This is  TrustedPersons</h2>
            <TrusteeList></TrusteeList>
        </section>
    );
};

export default TrustedPersons;