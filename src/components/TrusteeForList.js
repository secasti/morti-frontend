import React from 'react';
import PropTypes from 'prop-types';
import TrusteeFor from './TrusteeFor';
import './TrusteeForList.css';

const TrusteeForList = (props) => {

    const trusteeFor = props.trusteeFor;

    const getTrusteesJSX = (trusteeFor) => {
        return trusteeFor.map((trustee) => {
            return (
                <li key={trustee.id}>
                    <TrusteeFor
                        key={trustee.email}
                        firstName={trustee.first_name}
                        lastName={trustee.last_name}
                        email={trustee.email}
                        deleteTrusteeFor={props.deleteTrusteeFor}
                        updateExpired={props.updateExpired}
                        userId={trustee.id}
                    ></TrusteeFor>
                </li>
            );
        });
    };

    return (
        <section>
            <ol>{getTrusteesJSX(trusteeFor)}</ol>
        </section>
    );
};

TrusteeForList.propTypes = {
    trusteeFor: PropTypes.arrayOf(
        PropTypes.shape({
            firstName: PropTypes.string.isRequired,
            lastName: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired
        })
    ).isRequired,
    deleteTrusteeFor: PropTypes.func.isRequired,
    updateExpired: PropTypes.func.isRequired
};

export default TrusteeForList;