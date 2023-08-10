import React, { useState } from 'react';
import PropTypes from "prop-types";
import { debounce } from "lodash";
import axios from "axios"; 
import "./NewMessageForm.css"
import { useNavigate } from 'react-router-dom';

const INITIAL_FORM_DATA = {
    first_name: "",
    last_name: "",
    email: "",
    password: ""
};

const INITIAL_EMAIL_DATA = {
    isValidating: false,
    isValid: false,
}

const Register = ({ registerNewUser }) => {

    console.log('inside register')
    const [registerForm, setRegisterForm] = useState({INITIAL_FORM_DATA});
    const [isTypingEmail, setIsTypingEmail] = useState(false);
    const [emailValidation, setEmailValidation] = useState ({INITIAL_EMAIL_DATA});

    const navigate = useNavigate()

    const validateEmail = debounce(async (email) => {
        //when enter this function set validation status to validating
        setEmailValidation({ isValidating: true, isValid: false});
        console.log("entered validate email function and set:",emailValidation)
        //make API call to route that validates email
        try {
            //const response = await axios.get(`/validateEmail?email=${email}`)//route for validating email
            //this assumes that the reposnse we get is a json with key isValid and value of true or false
            //const isValidEmail = response.data.isValid;
                const isValidEmail = true
            //set validation status accordingly
            setEmailValidation({isValidating: false, isValid:isValidEmail});
            console.log("email successfully validated by axios fake call", emailValidation)
        
        } catch (error) {
            console.error("Error validating email:", error)
            // set validation to false
            setEmailValidation({isValidating: false, isValid: false});
        }
    }, 1000); // this 1000 adjust the debounce delay to every 500ms

    const handleChange = (evt) => {
        const newFormData = {
            ...registerForm,
            [evt.target.name]: evt.target.value,
            };
            setRegisterForm(newFormData);
            //check if email field is being changed
            if (evt.target.name === "recipientEmail") {
                //set state to is typing in email 
                setIsTypingEmail(true)
                //perform email validation for recipient email fied. 
                const isValid = validateEmail(evt.target.value);
                setEmailValidation({isValidating: true, isValid: isValid})
            }
        };

    const handleSubmit = (evt) => {
        evt.preventDefault();

        const newRegister = {
            first_name: registerForm.first_name,
            last_name: registerForm.last_name,
            email: registerForm.email,
            password: registerForm.password
        };

        registerNewUser(newRegister)

        setRegisterForm(INITIAL_FORM_DATA);
        };
    return (
        <section className="cardform__container">
            <h3 className="create-card-title">Sign Up</h3>
            <form onSubmit={handleSubmit} className='cardform'>
                <div className='message'>
                <label htmlFor='firstName'>First name:</label>
                    <input
                        type="text"
                        id="firstName"
                        value={registerForm.first_name}
                    ></input>
                </div>
                <label htmlFor='lastName'>Last name:</label>
                    <input
                        type="text"
                        id="lastName"
                        value={registerForm.last_name}
                    ></input>
                <label htmlFor='email'>Email:</label>
                    <input
                        type="text"
                        id="email"
                        value={registerForm.email}
                    ></input>
                <label htmlFor='password'>Password:</label>
                    <input
                        type="text"
                        id="password"
                        value={registerForm.password}
                    ></input>
            {/* Email validation feedback */}
            {isTypingEmail && emailValidation.isValidating &&
                <p className="validating-email">Validating email...</p>}

            {isTypingEmail && !emailValidation.isValid && (
                <p className="invalid-email">Invalid email</p>
            )}
            <input type="submit" value="Submit" onClick={handleSubmit} className="sumbit"></input>
            </form>
        </section>
    )
    };

export default Register;