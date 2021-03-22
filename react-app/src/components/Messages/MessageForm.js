import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createMessage } from '../../store/messages';
import { useOtherUserContext } from './index';

export default function MessageForm() {
  const dispatch = useDispatch();
  const [msg, setMsg] = useState('');

  const { otherUser } = useOtherUserContext();
  const lgdInUserId = useSelector((state) => state.session.user.id);

  const onSend = async function (e) {
    e.preventDefault();
    const msgOrErrors = await dispatch(
      createMessage({
        senderId: lgdInUserId,
        receiverId: otherUser.id,
        message: msg,
      })
    );
    if (!msgOrErrors.errors) {
      setMsg('');
    }
  };

  return (
    <form onSubmit={onSend} className='flex mt-1'>
      <textarea
        value={msg}
        onChange={(e) => {
          setMsg(e.target.value);
        }}
        className='rounded-xl w-full p-1 font-serif text-base bg-gray-300'
        maxLength={500}
        rows={3}
        required
      />
      <button type='submit' className='bg-green-joker rounded-xl m-1 p-1'>
        <i className='m-1 p-1'>Send</i>
      </button>
    </form>
  );
}
