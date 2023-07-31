import React from 'react';
import PropTypes from 'prop-types';
import Trustee from './Trustee';
import './TrusteeList.css';

const TrusteeList = (props) => {

    const trustees = props.trustees;

    const getTrusteesJSX = (trustees) => {
        return trustees.map((trustee) => {
            return (
                <li key={trustee.trustee_id}>
                    <Trustee
                        trustee_id={trustee.trustee_id}
                        trustee_name={trustee.trustee_name}
                        trustee_email={trustee.trustee_email}
                        updateDeleteTrustee={props.updateDeleteTrustee}
                    ></Trustee>
                </li>
            );
        });
    };

    return (
        <section>
            <h2>Trusted Persons </h2>
            <ol>{getTrusteesJSX(trustees)}</ol>
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
    ).isRequired,
    updateDeleteTrustee:PropTypes.func,
};

export default TrusteeList;