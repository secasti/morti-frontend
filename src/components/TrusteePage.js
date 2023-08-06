import React from 'react';
import PropTypes from 'prop-types';
import NewTrusteeForm from './NewTrusteeForm';
import TrusteeList from './TrusteeList';
import './TrusteePage.css';
import TrusteeForList from './TrusteeForList'

const TrusteePage = ({trustees, getTrustees, addTrustee, updateDeleteTrustee, trusteeFor, deleteTrusteeFor}) => {
    return (
        <section className='trustee__page'>
            {/* people who are trustees to me */}
            <div className='trustee-list'>
                <TrusteeList 
                trustees={trustees}
                updateDeleteTrustee={updateDeleteTrustee}
                ></TrusteeList>
            </div>
            {/* people who I am a trustee for */}
            <div className='trustee-for-list'>
                <TrusteeForList 
                trusteeFor={ trusteeFor }
                deleteTrusteeFor={ deleteTrusteeFor }
                ></TrusteeForList>
            </div>
            {/* Set a new Trustee Form */}
            <div className='new-trustee-form'>
                <NewTrusteeForm 
                addTrustee={addTrustee}
                ></NewTrusteeForm>
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
};

export default TrusteePage;