import React, { useState } from "react";
import PropTypes from "prop-types";
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

    const updatePreview = (event) => {
        const newFormData = {
        ...messageFormData,
        [event.target.name]: event.target.value,
        };
        setMessageFormData(newFormData);
    };

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

            <input type="submit" value="submit" onClick={handleSubmit} className="submit"/>
        </form>
        </section>
    );
    };

    NewMessageForm.propTypes = {
        addMessage: PropTypes.func.isRequired,
    };

    export default NewMessageForm;
