import React, { useState } from "react";
import PropTypes from "prop-types";
import "./NewTrusteeForm.css";

const INITIAL_FORM_DATA = {
    user_id: "",
    email: ""
};

const NewTrusteeForm = (props) => {
    const [trusteeFormData, setTrusteeFormData] = useState(INITIAL_FORM_DATA);
    const [isFormExpanded, setIsFormExpanded] = useState(false);


    const anInputChanged = (evt) => {
        const newTrusteeFormData = {
            ...trusteeFormData, 
            [evt.target.name]: evt.target.value
        };
        setTrusteeFormData(newTrusteeFormData);
        
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
    addTrustee: PropTypes.func
};

export default NewTrusteeForm;