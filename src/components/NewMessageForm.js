import React, { useState , useEffect} from "react";
import PropTypes from "prop-types";
import { debounce } from "lodash";
import axios from "axios"; 
import "./NewMessageForm.css";



//empty form data to reset form to
const INITIAL_FORM_DATA = {
    title: "",
    text: "",
    audio: "",
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

    const updatePreview = (event) => {
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



    //function to handle the submition of form and add new msg to initial data
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("we're in handleSubmit");


        //create object with data
        const newMessage = {
            id: messages.length + 1,
            userId: 1, //this must come from log-in session perhaps a state?
            title: messageFormData.title,
            text: messageFormData.text,
            audio: messageFormData.audio,
            recipientEmail: messageFormData.recipientEmail,
            recipientId: 2, // this will need to change from  the backend 
            isSent: false
        };
        //add new message to MESSAGE_DATA in app
        addMessage(newMessage)
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
                    onChange={updatePreview}
                />
            </div>
            {/* text */}
            <label htmlFor='text'>Message:</label>
                <input
                    type="text"
                    id="text"
                    name="text"
                    value={messageFormData.text}
                    onChange={updatePreview}
                />
            {/* audio */}
            <label htmlFor='audio'>Audio Recording:</label>
                <input
                    type="text"
                    id="audio"
                    name="audio"
                    value={messageFormData.audio}
                    onChange={updatePreview}
                />
            {/* recipient email */}
            <label htmlFor='recipientEmail'>Recipient Email:</label>
                <input
                    type="text"
                    id="recipientEmail"
                    name="recipientEmail"
                    value={messageFormData.recipientEmail}
                    onChange={updatePreview}
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
