import PropTypes from 'prop-types';
import NewMessageForm from './NewMessageForm';
import './MessagePage.css';
import MessageList from './MessageList';



const MessagePage = ({token, messages, addMessage, deleteMessage, expandMessage, isMsgExpanded, validateEmail, setEmailValidation, emailValidation}) =>{
    console.log("MessagePage rendered");
    //set up navigate from browserRouter


    return (
        <div>
            <section className="message__page">
            {/* render list of messages */}
            <div className="message-list">
                <MessageList
                token={token} 
                messages ={ messages }
                deleteMessage={ deleteMessage }
                expandMessage={  expandMessage }
                isMsgExpanded = { isMsgExpanded }
                />  
            </div>
            {/* render form to create new message */}
            <div className="new-msg-form">
                <NewMessageForm 
                token={token}
                addMessage={ addMessage }
                messages={ messages }
                validateEmail={validateEmail} 
                setEmailValidation={setEmailValidation}
                emailValidation={emailValidation}
                />
            </div>
        </section> 
        </div>
        
    );
};

MessagePage.propTypes = {
    messages: PropTypes.array.isRequired,
    addMessage: PropTypes.func.isRequired,
    deleteMessage:PropTypes.func.isRequired,
    isMsgExpanded: PropTypes.object.isRequired,
    expandMessage: PropTypes.func.isRequired,
    validateEmail: PropTypes.func.isRequired
};

export default MessagePage;