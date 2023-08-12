import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import './Message.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const Message = (props) => {

    const [audio, setAudio] = useState(null)
    
    async function loadPlayer() {
        let newAudioBinary = await fetch(props.audio)
        let newAudioBlob = await newAudioBinary.blob()
        const audioURL = URL.createObjectURL(newAudioBlob);
        setAudio(audioURL)
    }
    useEffect(() => { loadPlayer();}, []);

    const toggleDelete = () => {
        props.deleteMessage(props.messageId, 'message')
    };

    return (
        <div className={`single-msg ${props.isMsgExpanded[props.messageId] ? 'expanded' : ''}`}>
            <h3 className='msg-title'> {props.title} </h3>
            <p className='msg-text'> 
                {/* if isMsgExpanded state is false, show only 30 char, if its true show it all */}
                {props.isMsgExpanded[props.messageId] ? props.text : props.text.slice (0, 40)}
                {/* if isMsgExpanded is false and text is > 50 char, show a read more button that on click runs expand msg func*/}
                {!props.isMsgExpanded[props.messageId] && props.text.length > 10 && (
                    <button onClick={() => props.expandMessage(props.messageId)} className='read-more-btn'>
                        Read More
                    </button>
                )}
            </p>
            <audio src={audio} controls></audio>
            {/* if  isMsgExpanded is true, show button that says show less and runs expand msg func */}
            {props.isMsgExpanded[props.messageId] && (
                <button onClick={() => props.expandMessage(props.messageId)} className='read-more-btn'>
                Show Less
                </button>
            )}
            {/* delete a msg button */}
            <button onClick={toggleDelete} className='delete-btn'>
                <FontAwesomeIcon icon={faTrash} />
            </button>
        </div>
    );
};

Message.propTypes = {
    messageId: PropTypes.number,
    userId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    audio: PropTypes.string.isRequired,
    recipientId: PropTypes.number.isRequired,
    isSent: PropTypes.bool.isRequired,
    deleteMessage: PropTypes.func.isRequired,
    isMsgExpanded: PropTypes.object.isRequired,
    expandMessage: PropTypes.func.isRequired
};

export default Message;