import React from 'react';
import PropTypes from 'prop-types';
import TrusteeFor from './TrusteeFor';
import './TrusteeForList.css';

const TrusteeForList = (props) => {

    const trusteeFor = props.trusteeFor;

    const getTrusteesJSX = (trusteeFor) => {
        return trusteeFor.map((trustee) => {
            return (
                <li key={trustee.user_id}>
                    <TrusteeFor
                        user_id={trustee.user_id}
                        first_name={trustee.first_name}
                        email={trustee.email}
                        deleteTrusteeFor={props.deleteTrusteeFor}
                    ></TrusteeFor>
                </li>
            );
        });
    };

    return (
        <section>
            <h2>I am a Trustee For: </h2>
            <ol>{getTrusteesJSX(trusteeFor)}</ol>
        </section>
    );
};

TrusteeForList.propTypes = {
    trusteeFor: PropTypes.arrayOf(
        PropTypes.shape({
            user_id: PropTypes.number,
            first_name: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired
        })
    ).isRequired,
    deleteTrusteeFor: PropTypes.func.isRequired,
};

export default TrusteeForList;