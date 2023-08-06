import React, { useState , useEffect} from "react";
import PropTypes from "prop-types";
import { debounce } from "lodash";
import axios from "axios"; 
import "./NewMessageForm.css";
import AudioRecorder from "./AudioRecorder";


//empty form data to reset form to
const INITIAL_FORM_DATA = {
    title: "",
    text: "",
    audio_message: "",
    recipientEmail: "",
    isSent: "false"
};

const NewMessageForm = ({ messages, addMessage }) => {
    
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
            // "audio_message": base64String -- PUT THIS BACK IT'S THE ACTUAL AUDIO
            "audio_message": "thisIsLessThanFiveHundredCharacters"
        }));
    console.log("Updated messageFormData:", messageFormData)
    }

    //function to handle the submition of form and add new msg to initial data
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("we're in handleSubmit");
        //create object with data
        //comment this chunk out once backend is connected
        const newMessage = {
            //userId: 6, //this must come from log-in session perhaps a state? this is not a field required in backend
            title: messageFormData.title,
            text: messageFormData.text,
            audio_message: messageFormData.audio_message,
            recipientEmail: messageFormData.recipientEmail,
            recipientId: 2, // this will need to change from  the backend 
            isSent: false
        };
        //send messageform data to app for post request
        console.log("new message in HS getting sent to 'add message':", newMessage)
        addMessage(newMessage)
        //addMessageCallback(messageFormData)
        //reset form data to blank
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
            <label htmlFor='text'>Message:</label>
                <input
                    type="text"
                    id="text"
                    name="text"
                    value={messageFormData.text}
                    onChange={handleChange}
                />
            {/* audio */}
            <label htmlFor='audio'>Audio Recording:</label>
            <AudioRecorder onAudioData={handleAudioData}/>
            {/* recipient email */}
            <label htmlFor='recipientEmail'>Recipient Email:</label>
                <input
                    type="text"
                    id="recipientEmail"
                    name="recipientEmail"
                    value={messageFormData.recipientEmail}
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
