// import React from 'react';
import { useDispatch } from 'react-redux';

// context
import { useOtherUserContext } from './index';

// components
import MessageForm from './MessageForm';

// thunks
import { deleteMessage } from '../../store/messages';

export default function MessageTextsHolder({ lgdInUser, allMsgsWOtherUser }) {
  const { otherUser } = useOtherUserContext();
  const dispatch = useDispatch();

  const handleDelete = function (msg) {
    const res = window.confirm(`Delete this message? "${msg.message}"`);
    if (res) dispatch(deleteMessage(msg.id));
  };

  const formatDate = function (dateString) {
    let amPm = 'am';
    const date = new Date(dateString);
    let hours = date.getHours();
    if (hours >= 12) amPm = 'pm';
    if (hours > 12) hours -= 12;
    date.setHours(hours);
    const day = date.toDateString();
    const time = date.toTimeString().slice(0, 5);
    return `${day}, ${time} ${amPm}`;
  };

  // reverse messages, so they are in the right order in conjunction with "flex-direction: column-reverse" (reverse() strangely did not work, so we did sort())
  // this is so it defaults to scrolling to the bottom when there are too many messages to fit
  allMsgsWOtherUser.sort((a, b) => b.id - a.id);

  if (!otherUser.id) {
    return (
      <div className='flex flex-col from-gray-400 shadow-lg rounded-xl m-1 p-4 w-full justify-between'>
        <div>
          <h1 className='from-bg-blue-joker font-light w-auto	mx-auto bg-gray-400 mb-4'>No conversation selected</h1>
          <p style={{ textAlign: 'center' }}>
            Click a username on the left, or browse jokes to message other users.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div 
    style={
      {height: "fit-content",}
    }
    className='flex flex-col from-gray-400 shadow-lg rounded-xl m-1 p-4 w-full justify-between'>
      <h1 className='from-bg-blue-joker font-light w-auto	mx-auto rounded-lg p-1 bg-gray-400 mb-4'>
        {otherUser.id ? otherUser.username : 'No Conversation Selected'}
      </h1>
      <div className='flex flex-col w-full m-0'>
        <div className='overflow-scroll max-h-96 flex flex-col-reverse'>
          {otherUser &&
            allMsgsWOtherUser.map((msg) => (
              <div
                className={
                  lgdInUser.id === msg.sender.id
                    ? 'self-end ml-3 flex flex-col items-end hover:cursor-pointer'
                    : 'mr-3'
                }
                key={msg.id}
              >
                <p
                  style={
                    lgdInUser.id === msg.sender.id
                      ? {
                          background: 'rgba(13, 51, 223, 0.65)',
                        }
                      : {
                          width: "fit-content",
                          background: 'rgba(160, 225, 147, 0.65)',
                        }
                  }
                  className='bg-blue-900 rounded-xl p-1 box-content m-0'

                  title={msg.sender.username}
                  onClick={lgdInUser.id === msg.sender.id ? () => handleDelete(msg) : undefined}
                >
                  {msg.message}
                </p>
                <p className='text-xs'>{formatDate(msg.timestamp)}</p>
              </div>
            ))}
        </div>
        <MessageForm />
      </div>
    </div>
  );
}
