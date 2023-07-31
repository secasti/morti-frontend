import React from 'react';
import PropTypes from 'prop-types';
import TrusteeList from './TrusteeList';
import './TrusteePage.css';

const TrustedPersons = ({trustees}) => {
    return (
        <section>
            <h2>This is  TrustedPersons</h2>
            <div>
                <TrusteeList trustees={trustees}></TrusteeList>
            </div>
            <div>
            </div>
        </section>
    );
};

export default TrustedPersons;