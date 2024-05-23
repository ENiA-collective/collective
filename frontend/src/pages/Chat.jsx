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
      <div className='flex flex-col min-w-96 items-center'>
        {/* would be really cool if it displayed actual order info but this is enough for now */}
        <h1 className='header'>Chat: Order #{order_id}</h1>
        {errorText && <p>{ errorText}</p>}
        <div className="m-20 w-9/12">
          {messages.map(message => (
            <Message key={message.id} message={message} />
          ))}
        </div>
        <div className='flex flex-col min-w-96 items-center justify-center'>
          <label htmlFor='message-input'>Message:</label>
          <input
            id="message-input"
            placeholder='Type something....'
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            maxLength={250}
            className='input'
            required
          />
          <button
            id="send-button"
            onClick={handleSendMessage}
            className='bg-secondary text-text rounded-full font-semibold text-lg px-6 py-3 cursor-pointer transition-all duration-300 ease-in-out border border-black shadow-none hover:transform hover:translate-y-[-4px] hover:translate-x-[-2px] hover:shadow-[2px_5px_0_0_black] active:transform active:translate-y-[2px] active:translate-x-[1px] active:shadow-none'
          >Send</button>
        </div>
      </div>
    );
  }

export default Chat;