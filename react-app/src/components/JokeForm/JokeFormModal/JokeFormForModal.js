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

    const onSend = async (e) => {
        e.preventDefault();
        setErrors([]);
        let newErrors = [];

        const joke = {
        userId: lgdInUserId,
        joke: jokeWords,
        jokeType,
        image,
        };

        const sendJoke = await dispatch(createJoke(joke));
        if (sendJoke) {
        setJokeWords("");
        setJokeType("");
        setImage("");
        setShowModal(false);
        }  
        else {
        newErrors = sendJoke.errors;
        setErrors(newErrors);
        }
        // const jokeOrErrors = await dispatch(
        //   !!jokeToUpdate
        //     ? createJoke(joke, jokeToUpdate.id) // if you pass in a joke id, it updates instead
        //     : createJoke(joke)
        // );
        // if (jokeOrErrors.errors) {
        //   newErrors = jokeOrErrors.errors;
        //   setErrors(newErrors);
        // } else {
        //   // no refresh, but post should show up in top of feed.
        // }
  };
  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  return (
    <form onSubmit={onSend}>
      <h2 className="m-1 p-1">Edit Post</h2>
      <div className='w-60'>
        <textarea
          value={jokeWords}
          onChange={(e) => {
            setJokeWords(e.target.value);
          }}
          className='bg-gray-400 rounded-xl m-1 p-1 text-black'
          maxLength={500}
          rows={3}
          required
        />
          <div className="h-20 pt-2">
            <label>Joke Type</label>
            <select
              name="jokeType"
              value={jokeType}
              onChange={(e) => setJokeType(e.target.value)}
              required
            >
              <option value="" disabled>
                -Select One-
              </option>
              <option value="Any">Any</option>
              <option value="Misc">Misc</option>
              <option value="Programming">Programming</option>
              <option value="Dark">Dark</option>
              <option value="Pun">Pun</option>
              <option value="Spooky">Spooky</option>
              <option value="Christmas">Christmas</option>
            </select>
          </div>
          <label className="pt-2">
            Image
            <input type="file" onChange={updateFile} />
          </label>
        <button type='submit' className='bg-green-joker rounded-xl m-1 p-1 text-black hover:bg-opacity-75'>
          <i className='m-1 p-1'>Send</i>
        </button>
      </div>
      <div>
          {errors.map((error) => (
            <div key={error}>{error}</div>
          ))}
        </div>
    </form>
  );
}
