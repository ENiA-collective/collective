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
      <UserLink user={sender} />
      <p>{readableDate(message.created_at) }</p>
      <p>{message.message}</p>
      {errorText && <p>{ errorText }</p>}
    </div>
  );
}

export default Message;

