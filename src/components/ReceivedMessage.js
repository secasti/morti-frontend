import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './ReceivedMessage.css';


const ReceivedMessage = (props) => {
    
    const [audio, setAudio] = useState(null)

    async function loadPlayer() {
        let newAudioBinary = await fetch(props.audio_message)
        let newAudioBlob = await newAudioBinary.blob()
        const audioURL = URL.createObjectURL(newAudioBlob);
        setAudio(audioURL)
    }
    useEffect(() => { loadPlayer();}, []);

    const toggleDelete = () => {
        props.deleteMessage(props.message_id, 'receivedMessage')
    };

    return (
        <div className='received-msg-page-container'>
            <div className='single-msg'>
                <h3 className='msg-title'>{props.title} </h3>
                <p className='msg-text'> {props.text} </p>
                <audio src={audio} controls></audio>
                <button onClick={toggleDelete}>🗑</button>
            </div>
        </div>
    )
};

ReceivedMessage.propTypes = {
    message_id: PropTypes.number,
    userId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    audio_message: PropTypes.string.isRequired,
    recipientId: PropTypes.number.isRequired,
    isSent: PropTypes.bool.isRequired,
    deleteMessage: PropTypes.func.isRequired
};

export default ReceivedMessage;