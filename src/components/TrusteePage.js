import React, { useState } from 'react';
import PropTypes from 'prop-types';
import NewTrusteeForm from './NewTrusteeForm';
import TrusteeList from './TrusteeList';
import './TrusteePage.css';
import TrusteeForList from './TrusteeForList'


const TrusteePage = ({trustees, getTrustees, addTrustee, updateDeleteTrustee, trusteeFor, deleteTrusteeFor, removeToken, handleLogout}) => {
    
    //set up states to create an accordion menu that shows trustee for and trustee list. 
    const [isTrusteeListExpanded, setIsTrusteeListExpanded] = useState(false);
    const [isTrusteeForListExpanded, setIsTrusteeForListExpanded] = useState(false);

    const toggleTrusteeList = () => {
    setIsTrusteeListExpanded(!isTrusteeListExpanded);

    };

    const toggleTrusteeForList = () => {
    setIsTrusteeForListExpanded(!isTrusteeForListExpanded);

    };


    return (
        <section className='trustee__page'>
    
            <div className="accordion--container">
                 {/* Trustee List */}
            <div className={`trustee-list ${isTrusteeListExpanded ? 'expanded' : ''}`}>
                <h2 className='accordion-heading' onClick={toggleTrusteeList}>My Trustees:</h2>
                {isTrusteeListExpanded && (
                    <TrusteeList
                    trustees={trustees}
                    updateDeleteTrustee={updateDeleteTrustee}
                    />
                )}
            </div>
            {/* Trustee For List */}
            <div className={`trustee-for-list ${isTrusteeForListExpanded ? 'expanded' : ''}`}>
                <h2 className='accordion-heading' onClick={toggleTrusteeForList}>I am a Trustee For:</h2>
                {isTrusteeForListExpanded && (
                    <TrusteeForList
                    trusteeFor={trusteeFor}
                    deleteTrusteeFor={deleteTrusteeFor}
                    />
                )}
                </div>
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