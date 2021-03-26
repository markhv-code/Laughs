import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createMessage } from '../../../store/messages';

export default function MessageFormForModal({ receiver, setShowModal }) {
  const dispatch = useDispatch();
  const [jokeWords, setJokeWords] = useState("");
  const [jokeType, setJokeType] = useState("");
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState([]);

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
    <form onSubmit={onSend}>
      <h2 className="m-1 p-1">Message {receiver.username}</h2>
      <div className='w-60'>
        <textarea
          value={msg}
          onChange={(e) => {
            setMsg(e.target.value);
          }}
          className='bg-gray-400 rounded-xl m-1 p-1 text-black'
          maxLength={500}
          rows={3}
          required
        />
        <button type='submit' className='bg-green-joker rounded-xl m-1 p-1 text-black hover:bg-opacity-75'>
          <i className='m-1 p-1'>Send</i>
        </button>
      </div>
    </form>
  );
}
