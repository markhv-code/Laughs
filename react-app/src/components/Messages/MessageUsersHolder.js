import { useOtherUserContext } from './index';

export default function MessageUsersHolder({
  allUsers,
  lgdInUser,
  allMsgsLgdInUser,
}) {
  const { setOtherUser, otherUser } = useOtherUserContext();

  // Find all users (only once) that the logged in user has had cnv with
  const set = new Set();
  const cnvUserIdArr = [];

  for (let i = allMsgsLgdInUser.length - 1; i >= 0; i--) {
    let msg = allMsgsLgdInUser[i];
    const idToAdd =
      msg.senderId === lgdInUser.id ? msg.receiverId : msg.senderId;
    if (!set.has(idToAdd)) cnvUserIdArr.push(idToAdd);
    set.add(idToAdd);
  }

  const cnvUsers = [];
  cnvUserIdArr.forEach((id) => cnvUsers.push(allUsers[id]));
  if (cnvUsers.length === 0) cnvUsers.push({ username: 'No message history' });

  return (
    <>
      {cnvUsers.length > 0 && !!cnvUsers[0] && (
        <div className='messages__container messages__users-holder'>
          <h1 className='messages__title'>Chats</h1>
          {cnvUsers.map((user) => {
            return (
              <div
                className={
                  user.username === 'No message history'
                    ? 'messages__no-msg-history'
                    : user.id === otherUser.id
                    ? 'messages__other-user messages__other-user-active'
                    : 'messages__other-user'
                }
                key={user.id}
                onClick={() => {
                  setOtherUser(user);
                }}
              >
                {user.username}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
