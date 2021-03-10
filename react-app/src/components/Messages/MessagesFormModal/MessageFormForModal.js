import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createMessage } from '../../../store/messages';

export default function MessageFormForModal({ receiver, setShowModal }) {
  const dispatch = useDispatch();
  const [msg, setMsg] = useState('');

  const lgdInUserId = useSelector((state) => state.session.user.id);

  const onSend = async function (e) {
    e.preventDefault();
    const msgOrErrors = await dispatch(
      createMessage({
        senderId: lgdInUserId,
        receiverId: receiver.id,
        message: msg,
      })
    );
    if (!msgOrErrors.errors) {
      setMsg('');
      setShowModal(false);
    }
  };

  return (
    <form onSubmit={onSend} className='msg-form-modal'>
      <h2>Message {receiver.username}</h2>
      <div className='msg-form-modal__msg-and-btn'>
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
        <button type='submit' className='msg-form-modal__button'>
          <i className='fas fa-play fa-2x'></i>
        </button>
      </div>
    </form>
  );
}
