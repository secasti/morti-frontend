import React, { useState } from 'react';
import PropTypes from 'prop-types';
import NewTrusteeForm from './NewTrusteeForm';
import TrusteeList from './TrusteeList';
import './TrusteePage.css';
import TrusteeForList from './TrusteeForList'


const TrusteePage = ({trustees, addTrustee, updateDeleteTrustee, trusteeFor, deleteTrusteeFor, updateExpired, emailValidation, validateEmail }) => {
    


    return (
        <section className='trustee__page'>
    
        <div className="left-column">
            {/* Trustee For List */}
            <div className={`trustee-for-list`}>
                <h2 className='accordion-heading'>I am a Trustee For </h2>
                
                    <TrusteeForList
                    trusteeFor={trusteeFor}
                    deleteTrusteeFor={deleteTrusteeFor}
                    updateExpired={updateExpired}
                    />
    
            </div>
        </div>
        <div className='right-column'>
             {/* Trustee List */}
            <div className='trustee-list'>
                <h2 className='accordion-heading' >My Trustees</h2>
                    <TrusteeList
                    trustees={trustees}
                    updateDeleteTrustee={updateDeleteTrustee}
                    />
            </div>
            {/* Set a new Trustee Form */}
            <div className=''>
                <NewTrusteeForm 
                addTrustee={addTrustee}
                emailValidation={emailValidation}
                validateEmail={validateEmail}

                ></NewTrusteeForm>
            </div>
        </div>
        </section>
    );
};

TrusteePage.propTypes = {
    trustees: PropTypes.arrayOf(
        PropTypes.shape({
            user_id: PropTypes.number,
            first_name: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired
        })
    ).isRequired,
    trusteeFor: PropTypes.arrayOf(
        PropTypes.shape({
            user_id: PropTypes.number,
            first_name: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired
        })
    ).isRequired,
        addTrustee: PropTypes.func.isRequired,
        updateDeleteTrustee: PropTypes.func.isRequired,
        deleteTrusteeFor: PropTypes.func.isRequired,
        emailValidation: PropTypes.object.isRequired,
        validateEmail: PropTypes.func.isRequired
};

export default TrusteePage;