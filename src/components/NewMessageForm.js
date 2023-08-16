import React, { useState } from "react";
import PropTypes from "prop-types";
import "./NewMessageForm.css";
import AudioRecorder from "./AudioRecorder";
import debounce from "lodash/debounce";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';





//empty form data to reset form to
const INITIAL_FORM_DATA = {
    title: "",
    text_message: "",
    audio_message: "",
    recipient_email: ""
};

const NewMessageForm = ({ token, addMessage, validateEmail, setEmailValidation, emailValidation }) => {
    
    const [messageFormData, setMessageFormData] = useState(INITIAL_FORM_DATA);

    const validateEmailDebounced = debounce(validateEmail, 500);


    const handleChange = (event) => {
        const newFormData = {
        ...messageFormData,
        [event.target.name]: event.target.value,
        };
        setMessageFormData(newFormData);

        //check if email field is being changed
        if (event.target.name === "recipient_email") {
            //perform email validation for recipient email fied. 
            validateEmailDebounced(event.target.value);

        }
    };

    

    // function to save 64baseString to FormData
    const handleAudioData = (base64String) => {
        console.log("Audio data captured:", base64String)
        setMessageFormData((prevFormData)=> ({
            ...messageFormData,
            "audio_message": base64String
        }));
    console.log("Updated messageFormData:", messageFormData)
    }

    //function to handle the submition of form and add new msg to initial data
    const handleSubmit = (event) => {

        event.preventDefault();
        console.log("we're in handleSubmit");
        addMessage(messageFormData)
        setMessageFormData(INITIAL_FORM_DATA);
        };
    return (
        <section className="cardform__container">
        <h3 className="create-card-title"> New Farewell</h3>
        <form onSubmit={handleSubmit} className="cardform" >
            <div className="message">
            {/* title */}
            <label htmlFor='title'>Title:</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={messageFormData.title}
                    onChange={handleChange}
                />
            </div>
            {/* text */}
            <label htmlFor='text_message'>Message:</label>
                <input
                    type="text"
                    id="text_message"
                    name="text_message"
                    value={messageFormData.text_message}
                    onChange={handleChange}
                />
            {/* audio */}
            <label htmlFor='audio_message'>Audio Recording:</label>
            <AudioRecorder 
                onAudioData={handleAudioData} 
                value={messageFormData.audio_message}
                />
            {/* recipient email */}
            <label htmlFor='recipient_email'>Recipient Email:</label>
                <input
                    type="text"
                    id="recipient_email"
                    name="recipient_email"
                    value={messageFormData.recipient_email}
                    onChange={handleChange}
                /> 
            {/* Email validation feedback */}
            {emailValidation.isValidating ? (
                <p className="validating-email">Validating email...</p>
            ) : emailValidation.isValid ? (
                <p className="valid-email"> <FontAwesomeIcon icon={faCheckCircle} /> &nbsp; Valid email </p>
            ) : (
                <p className="invalid-email"> <FontAwesomeIcon icon={faTimesCircle} /> &nbsp; Invalid email</p>
            )}
            {/* submit button */}
            <input type="submit" value="submit" onClick={handleSubmit} className="submit"/>
        </form>
        </section>
    );
    };

    NewMessageForm.propTypes = {
        addMessage: PropTypes.func.isRequired,
        validateEmail: PropTypes.func.isRequired
    };

    export default NewMessageForm;
