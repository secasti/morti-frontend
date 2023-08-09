import PropTypes from 'prop-types';
import NewMessageForm from './NewMessageForm';
import './MessagePage.css';
import MessageList from './MessageList';
import NavigationMenu from './NavigationMenu';


const MessagePage = ({messages, addMessage, deleteMessage, expandMessage, isMsgExpanded, removeToken, handleLogout}) =>{
    console.log("MessagePage rendered");
    //set up navigate from browserRouter


    return (
        <div>
            <div className="logged-menu-container">
                <NavigationMenu removeToken={removeToken} handleLogout={handleLogout} />
            </div>
            <section className="message__page">
            {/* render list of messages */}
            <div className="message-list">
                <MessageList 
                messages ={ messages }
                deleteMessage={ deleteMessage }
                expandMessage={  expandMessage }
                isMsgExpanded = { isMsgExpanded }
                />  
            </div>
            {/* render form to create new message */}
            <div className="new-msg-form">
                <NewMessageForm 
                addMessage={ addMessage }
                messages={ messages } />
            </div>
        </section> 
        </div>
        
    );
};

MessagePage.propTypes = {
    messages: PropTypes.arrayOf(
        PropTypes.shape({
            message_id: PropTypes.number,
            userId: PropTypes.number,
            title: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
            // audio: PropTypes.string.isRequired,
            recipientId: PropTypes.number.isRequired,
            isSent: PropTypes.bool.isRequired,
        }).isRequired
    ),
        addMessage: PropTypes.func.isRequired,
        deleteMessage:PropTypes.func.isRequired,
        isMsgExpanded: PropTypes.object.isRequired,
        expandMessage: PropTypes.func.isRequired
};

export default MessagePage;