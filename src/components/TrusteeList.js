import React from 'react';
import PropTypes from 'prop-types';
import Trustee from './Trustee';
import './TrusteeList.css';

const TrusteeList = (props) => {
    console.log("inside TList")

    const trustees = props.trustees;
    console.log("trustees",props.trustees)
    const getTrusteesJSX = (trustees) => {
        return trustees.map((trustee) => {
            return (
                <li key={trustee.id} className="trustee-item">
                    <Trustee
                        user_id={trustee.id}
                        first_name={trustee.first_name}
                        last_name={trustee.last_name}
                        email={trustee.email}
                        updateDeleteTrustee={props.updateDeleteTrustee}
                    ></Trustee>
                </li>
            );
        });
    };

    return (
        <section>
            <ol>{getTrusteesJSX(trustees)}</ol>
        </section>
    );
};

TrusteeList.propTypes = {
    trustees: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            first_name: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired
        })
    ).isRequired,
    updateDeleteTrustee: PropTypes.func,
};

export default TrusteeList;