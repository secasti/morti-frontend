import React, { useState } from "react";
import PropTypes from "prop-types";
import "./NewTrusteeForm.css";

const INITIAL_FORM_DATA = {
    user_id: "",
    first_name: "",
    email: ""
};

const NewTrusteeForm = (props) => {
    const [trusteeFormData, setTrusteeFormData] = useState(INITIAL_FORM_DATA);

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

    return (
        <section className="cardform__container">
            <h3 className="create-card-title">New Trustee</h3>
            {/* is below class same as other form? */}
            <form onSubmit={onFormSubmit} className="cardform">
                <div className="message">
                    <label htmlFor='first_name'>Name:</label>
                    <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={trusteeFormData.first_name}
                    onChange={anInputChanged}
                    ></input>
                </div>
                <label htmlFor='email'>Email:</label>
                    <input
                    type="text"
                    id="email"
                    name="email"
                    value={trusteeFormData.email}
                    onChange={anInputChanged}
                    ></input>
                <input 
                type="submit" 
                value="submit"
                onClick={onFormSubmit}
                className="submit"
                ></input>
            </form>
        </section>
    );
};

NewTrusteeForm.propTypes = {
    addTrustee: PropTypes.func
};

export default NewTrusteeForm;