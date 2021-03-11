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
    <form onSubmit={onSend} className='msg-form'>
      <textarea
        value={msg}
        onChange={(e) => {
          setMsg(e.target.value);
        }}
        className='msg-form__input'
        maxLength={500}
        rows={3}
        required
      />
      <button type='submit' className='msg-form__button'>
        <i className='fas fa-play fa-2x'></i>
      </button>
    </form>
  );
}
