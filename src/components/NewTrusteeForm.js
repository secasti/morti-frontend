import React, { useState } from "react";
import PropTypes from "prop-types";
import "./NewTrusteeForm.css";
import debounce from "lodash/debounce";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';


const INITIAL_FORM_DATA = {
    user_id: "",
    email: ""
};

const NewTrusteeForm = (props) => {
    const [trusteeFormData, setTrusteeFormData] = useState(INITIAL_FORM_DATA);
    const [isFormExpanded, setIsFormExpanded] = useState(false);

    const validateEmailDebounced = debounce(props.validateEmail, 500);



    const anInputChanged = (evt) => {
        const newTrusteeFormData = {
            ...trusteeFormData, 
            [evt.target.name]: evt.target.value
        };
        setTrusteeFormData(newTrusteeFormData);

         // Check if email field is being changed
         if (evt.target.name === "email") {
            // Perform email validation for email field
            validateEmailDebounced(evt.target.value);
        }
        
    };

    const onFormSubmit = (evt) => {
        evt.preventDefault();

        props.addTrustee(trusteeFormData);

        setTrusteeFormData(INITIAL_FORM_DATA)
    };

    const toggleForm = () => {
        setIsFormExpanded(!isFormExpanded);
    };

    return (
        <section className={`trustee-form--container ${isFormExpanded ? 'form-expanded': ''} `}>
            <h3 className="trustee-form-title" onClick={toggleForm}> {isFormExpanded ? '−' : '+'} Add New Trustee</h3>
            {/* is below class same as other form? */}
            <form onSubmit={onFormSubmit} className="new-trustee-form">
                <label htmlFor='email'></label>
                    <input
                    type="text"
                    text="Email"
                    placeholder="Email"
                    id="email"
                    name="email"
                    value={trusteeFormData.email}
                    onChange={anInputChanged}
                    ></input>
              {/* Email validation feedback */}
              {trusteeFormData.email && (
                    <p className="email-validation-message">
                        {props.emailValidation.isValidating && (
                            <span className="validating-email">Validating email...</span>
                        )}
                        {!props.emailValidation.isValidating && props.emailValidation.isValid && (
                            <span className="valid-email">
                                <FontAwesomeIcon icon={faCheckCircle} className="icon" /> Valid email
                            </span>
                        )}
                        {!props.emailValidation.isValidating && !props.emailValidation.isValid && (
                            <span className="invalid-email">
                                <FontAwesomeIcon icon={faTimesCircle} className="icon" /> Invalid email
                            </span>
                        )}
                    </p>
                )}
                <input 
                type="submit" 
                value="Submit"
                onClick={onFormSubmit}
                className="trustee-form-submit-button"
                ></input>
            </form>
        </section>
    );
};

NewTrusteeForm.propTypes = {
    addTrustee: PropTypes.func,
    emailValidation: PropTypes.object,
    validateEmail: PropTypes.func
};

export default NewTrusteeForm;