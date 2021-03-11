import { createContext, useContext, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// import components
import MessageUsersHolder from './MessageUsersHolder';
import MessageTextsHolder from './MessageTextsHolder';

// import thunk
import { getMessages } from '../../store/messages';

// import './Messages.css';

// otherUser will be the user that the logged in user clicks on to message
const OtherUserContext = createContext();
export const useOtherUserContext = () => useContext(OtherUserContext);

export default function Messages() {
  // grab states from store
  const lgdInUser = useSelector((state) => state.session.user);
  console.log(lgdInUser, "-------------user-----");
  const allMsgs = useSelector((state) => state.messages);
  const allUsers = useSelector((state) => state.users);

  //
  const dispatch = useDispatch();

  // set up state for context provider
  const [otherUser, setOtherUser] = useState({ id: null });

  useEffect(() => {
    dispatch(getMessages());
  }, [dispatch]);

  // filter for all messages from or to logged in user
  const msgsArray = Object.values(allMsgs);
  const allMsgsLgdInUser = msgsArray.filter(
    (message) =>
      message.senderId === lgdInUser.id || message.receiverId === lgdInUser.id
  );

  // filter again for all messages between logged in user and other user (chosen user)
  const allMsgsWOtherUser = allMsgsLgdInUser.filter((message) => {
    const idToCheck = otherUser.id;
    return message.senderId === idToCheck || message.receiverId === idToCheck;
  });

  return (
    <>
      {allUsers && lgdInUser && allMsgsLgdInUser && allMsgsWOtherUser && (
        <OtherUserContext.Provider value={{ otherUser, setOtherUser }}>
          <div className='messages'>
            <MessageUsersHolder
              allUsers={allUsers}
              lgdInUser={lgdInUser}
              allMsgsLgdInUser={allMsgsLgdInUser}
            />
            <MessageTextsHolder
              lgdInUser={lgdInUser}
              allMsgsWOtherUser={allMsgsWOtherUser}
            />
          </div>
        </OtherUserContext.Provider>
      )}
    </>
  );
}
