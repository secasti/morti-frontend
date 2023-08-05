import React from 'react';
import PropTypes from 'prop-types';
import NewTrusteeForm from './NewTrusteeForm';
import TrusteeList from './TrusteeList';
import './TrusteePage.css';

const TrusteePage = ({trustees, getTrustees, addTrustee, updateDeleteTrustee}) => {
    return (
        <section className='trustee__page'>
            <div className='trustee-list'>
                <TrusteeList 
                trustees={trustees}
                updateDeleteTrustee={updateDeleteTrustee}
                ></TrusteeList>
            </div>
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
        addTrustee: PropTypes.func.isRequired,
        updateDeleteTrustee: PropTypes.func.isRequired
};

export default TrusteePage;