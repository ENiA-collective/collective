import { useContext, useEffect, useState } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import UserLink from "./buttons/UserLink";
import { getUser } from "../adapters/user-adapter";
import { readableDate } from "../utils";

const Message = ({ message }) => {
  const [sender, setSender] = useState({})
  const [errorText, setErrorText] = useState('')
  const {currentUser} = useContext(CurrentUserContext)
  useEffect(() => {
    if (message.sender_id === currentUser.id) return setSender(currentUser)
    const loadSender = async () => {
      const [user, error] = await getUser(message.sender_id)
      if (error) return setErrorText(error.message)
      setSender(user)
    }
    loadSender();
  }, [])

  //you can add a scaled down pfp if you'd like
  return (
    <div>

      <div className={sender.id === currentUser.id ? 'chat chat-end' : 'chat chat-start'}>
        <div className="chat-image avatar">
         <div className="w-10 rounded-full">
           <img alt="profile picture" src={sender.pfp_src} />
         </div>
        </div>
        
        <div className="chat-header">
          <UserLink user={sender} />
          <p className="text-xs opacity-50">{readableDate(message.created_at) }</p>
        </div>
        <div className="chat-bubble chat-bubble-primary">
          {message.message}
        </div>
      </div>

      {errorText && <p>{errorText}</p>}
      
   </div>
  );
}

export default Message;

