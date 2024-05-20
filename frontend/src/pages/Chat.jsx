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
  
      const { id } = useParams;
  
      const {currentUser} = useContext(CurrentUserContext)
      useEffect(() => {
        // Fetch messages from the server (replace with your backend endpoint)
        // axios.get('/api/messages')
        //   .then(response => setMessages(response.data))
        //   .catch(error => console.error('Error fetching messages:', error));
        const loadConversation = async () => {
          const [conversation, error] = await getConvo(id);
          if (error) return setErrorText(error.message);
          setMessages(conversation)
        };
        loadConversation();
      }, []);
  
      const handleSendMessage = async () => {
        const [newMsg, error] = await sendMessage(id, currentUser.id, newMessage);
        if (error) return setErrorText(error.message)
        setMessages([...messages, newMsg])
        setNewMessage('')
        // Send the new message to the server (replace with your backend endpoint)
        // axios.post('/api/messages', { text: newMessage })
        //   .then(response => {
        //     setMessages([...messages, response.data]);
        //     setNewMessage('');
        //   })
        //   .catch(error => console.error('Error sending message:', error));
      };
  
      return (
        <>
          {/* would be really cool if it displayed actual order info but this is enough for now */}
          <h1>Chat: Order #{id}</h1>
          {errorText && <p>{ errorText}</p>}
          <div>
            {messages.map(message => (
              <Message key={message.id} text={message.text} />
            ))}
          </div>
          <div>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </>
      );
    }
  
  export default Chat;