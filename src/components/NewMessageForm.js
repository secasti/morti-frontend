import React, { useState , useEffect} from "react";
import PropTypes from "prop-types";
import { debounce } from "lodash";
import axios from "axios"; 
import "./NewMessageForm.css";
import AudioRecorder from "./AudioRecorder";


//empty form data to reset form to
const INITIAL_FORM_DATA = {
    title: "",
    text_message: "",
    audio_message: "",
    recipient_email: ""
};

const NewMessageForm = ({ token, addMessage }) => {
    
    const [messageFormData, setMessageFormData] = useState(INITIAL_FORM_DATA);
    const [isTypingEmail, setIsTypingEmail] = useState(false);



    //Async validation function using debounce from Lodash
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

    const handleChange = (event) => {
        const newFormData = {
        ...messageFormData,
        [event.target.name]: event.target.value,
        };
        setMessageFormData(newFormData);

        //check if email field is being changed
        if (event.target.name === "recipientEmail") {
            //set state to is typing in email 
            setIsTypingEmail(true)
            //perform email validation for recipient email fied. 
            const isValid = validateEmail(event.target.value);
            setEmailValidation({isValidating: true, isValid: isValid})
        }
    };

    // state to tract the validation status of email input (prob needs to be raised to be used by trustee form)
    const [emailValidation, setEmailValidation] = useState ({
        isValidating: false,
        isValid: false,
    });

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
            {isTypingEmail && emailValidation.isValidating &&
                <p className="validating-email">Validating email...</p>}

            {isTypingEmail && !emailValidation.isValid && (
                <p className="invalid-email">Invalid email</p>
            )}
            {/* submit button */}
            <input type="submit" value="submit" onClick={handleSubmit} className="submit"/>
        </form>
        </section>
    );
    };

    NewMessageForm.propTypes = {
        addMessage: PropTypes.func.isRequired,
    };

    export default NewMessageForm;
