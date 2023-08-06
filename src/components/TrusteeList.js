import React from 'react';
import PropTypes from 'prop-types';
import Trustee from './Trustee';
import './TrusteeList.css';

const TrusteeList = (props) => {

    const trustees = props.trustees;

    const getTrusteesJSX = (trustees) => {
        return trustees.map((trustee) => {
            return (
                <li key={trustee.user_id}>
                    <Trustee
                        user_id={trustee.user_id}
                        first_name={trustee.first_name}
                        email={trustee.email}
                        updateDeleteTrustee={props.updateDeleteTrustee}
                    ></Trustee>
                </li>
            );
        });
    };

    return (
        <section>
            <h2>My Chosen Trustees</h2>
            <ol>{getTrusteesJSX(trustees)}</ol>
        </section>
    );
};

TrusteeList.propTypes = {
    trustees: PropTypes.arrayOf(
        PropTypes.shape({
            user_id: PropTypes.number,
            first_name: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired
        })
    ).isRequired,
    updateDeleteTrustee: PropTypes.func,
};

export default TrusteeList;