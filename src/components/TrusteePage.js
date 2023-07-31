import React from 'react';
import PropTypes from 'prop-types';
import NewTrusteeForm from './NewTrusteeForm';
import TrusteeList from './TrusteeList';
import './TrusteePage.css';

const TrustedPersons = ({trustees, addTrustee}) => {
    return (
        <section className='trustee__page'>
            <div className='trustee-list'>
                <TrusteeList trustees={trustees}></TrusteeList>
            </div>
            <div className='new-trustee-form'>
                <NewTrusteeForm addTrustee={addTrustee}></NewTrusteeForm>
            </div>
        </section>
    );
};

export default TrustedPersons;