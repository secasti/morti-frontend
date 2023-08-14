import React, { useState } from 'react';
import PropTypes from "prop-types";
import { debounce } from "lodash";
import { useNavigate } from 'react-router-dom';
import './Register.css';

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

const Register = ({ registerNewUser, isRegisterFormVisible, setIsRegisterFormVisible }) => {
    
    const navigate = useNavigate()

    console.log('inside register')
    const [registerForm, setRegisterForm] = useState(INITIAL_FORM_DATA);
    const [isTypingEmail, setIsTypingEmail] = useState(false);

    const handleChange = (evt) => {
        const newUserFormData = {
            ...registerForm,
            [evt.target.name]: evt.target.value,
            };
            setRegisterForm(newUserFormData);
            //check if email field is being changed
            if (evt.target.name === "recipientEmail") {
                //set state to is typing in email 
                setIsTypingEmail(true)
                //perform email validation for recipient email fied. 
            }
        };
    
    const backToLogin = () => {
        navigate('/login');
        setIsRegisterFormVisible(false);
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();

        const newRegister = {
            first_name: registerForm.first_name,
            last_name: registerForm.last_name,
            email: registerForm.email,
            password: registerForm.password
        };

        console.log(newRegister)

        registerNewUser(newRegister)

        setRegisterForm(INITIAL_FORM_DATA);

        alert('Registration successful! Please wait to be redirected to your new Profile.');
        
        };
    return (
        <section className="register-form--container">
            <form onSubmit={handleSubmit} className='register-form'>
                    <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        value={registerForm.first_name}
                        onChange={handleChange}
                        placeholder='First Name'
                    ></input>
                    <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        value={registerForm.last_name}
                        onChange={handleChange}
                        placeholder="Last Name"

                    ></input>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={registerForm.email}
                        onChange={handleChange}
                        placeholder='Email'
                    ></input>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={registerForm.password}
                        onChange={handleChange}
                        placeholder='Password'
                    ></input>
            {/* Email validation feedback */}
            <button className='form-submit-button'> 
                {isRegisterFormVisible ? 'SIGN UP' : 'LOGIN'}
            </button>
            <p className="not-a-member">
            {isRegisterFormVisible ? (
                <>
                Already have an account?{' '}
                <button onClick={backToLogin}  className="link-button">
                Log in.
                </button>
                </>
            ) : (
                <>
                Not a member?{' '}
                <button
                    className="link-button"
                    onClick={() => setIsRegisterFormVisible(false)}
                >
                    Sign Up
                </button>
                </>
            )}
            </p>
            </form>
        </section>
    )
    };

    Register.propTypes = {
        registerNewUser: PropTypes.func
    };

export default Register;