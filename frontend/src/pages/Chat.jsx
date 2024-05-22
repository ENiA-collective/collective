// dont allow typing if an order is complete
// do something to stop a chat probably
//also it needs to update for new messages
  
  //most of this is template code. replace all axios stuff
import { useState, useEffect, useContext } from 'react';
import { sendMessage, getConvo } from '../adapters/message-adapter';
import Message from '../components/Message';
import { useParams } from 'react-router-dom';
import CurrentUserContext from '../contexts/CurrentUserContext';

  const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [errorText, setErrorText] = useState('')

    const { order_id } = useParams();

    const {currentUser} = useContext(CurrentUserContext)
    useEffect(() => {
      const loadConversation = async () => {
        const conversation = await getConvo(order_id);
        setMessages(conversation)
      };
      loadConversation();
    }, [order_id]);

    const handleSendMessage = async () => {
      const [newMsg, error] = await sendMessage(order_id, currentUser.id, newMessage);
      if (error) return setErrorText(error.message)
      setMessages([...messages, newMsg])
      setNewMessage('')
    };

    return (
      <>
        {/* would be really cool if it displayed actual order info but this is enough for now */}
        <h1>Chat: Order #{order_id}</h1>
        {errorText && <p>{ errorText}</p>}
        <div>
          {messages.map(message => (
            <Message key={message.id} message={message} />
          ))}
        </div>
        <div>
          <input
            htmlFor="send-button"
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            maxLength={250}
          />
          <button id="send-button" onClick={handleSendMessage}>Send</button>
        </div>
      </>
    );
  }

export default Chat;