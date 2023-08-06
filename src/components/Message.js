import React from 'react';
import PropTypes from 'prop-types';
import './Message.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const Message = (props) => {

    const toggleDelete = () => {
        props.deleteMessage(props.message_id, 'message')
    };

    return (
        <div className={`single-msg ${props.isMsgExpanded[props.message_id] ? 'expanded' : ''}`}>
            <h3 className='msg-title'> {props.title} </h3>
            <p className='msg-text'> 
                {/* if isMsgExpanded state is false, show only 30 char, if its true show it all */}
                {props.isMsgExpanded[props.message_id] ? props.text : props.text.slice (0, 10)}
                {/* if isMsgExpanded is false and text is > 50 char, show a read more button that on click runs expand msg func*/}
                {!props.isMsgExpanded[props.message_id] && props.text.length > 10 && (
                    <button onClick={() => props.expandMessage(props.message_id)} className='read-more-btn'>
                        Read More
                    </button>
                )}
            </p>
            {/* if  isMsgExpanded is true, show button that says show less and runs expand msg func */}
            {props.isMsgExpanded[props.message_id] && (
                <button onClick={() => props.expandMessage(props.message_id)} className='read-more-btn'>
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
    message_id: PropTypes.number,
    userId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    // audio: PropTypes.string.isRequired,
    recipientId: PropTypes.number.isRequired,
    isSent: PropTypes.bool.isRequired,
    deleteMessage: PropTypes.func.isRequired,
    isMsgExpanded: PropTypes.object.isRequired,
    expandMessage: PropTypes.func.isRequired
};

export default Message;