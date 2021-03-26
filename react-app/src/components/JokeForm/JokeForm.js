import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createJoke } from "../../store/jokes";

function JokeForm() {
  const currentUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const [jokeWords, setJokeWords] = useState("");
  const [jokeType, setJokeType] = useState("");
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState([]);

  const createJokePost = async (e) => {
    e.preventDefault();
    setErrors([]);
    let newErrors = [];

    const joke = {
      userId: currentUser.id,
      joke: jokeWords,
      jokeType,
      image,
    };

    const sendJoke = await dispatch(createJoke(joke));
    if (sendJoke) {
      setJokeWords("");
      setJokeType("");
      setImage("");
    } else {
      newErrors = sendJoke.errors;
      setErrors(newErrors);
    }
  };
  
  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  return (
    <>
      <form
        className="text-lg col-start-3 col-end-6 row-start-2 row-end-4 p-1 m-1"
        onSubmit={createJokePost}
      >
        <div className="w-full h-24">
          <input
            className="w-full h-full rounded-lg border-4 border-light-blue-500 border-opacity-50 pl-2"
            name="joke"
            value={jokeWords}
            onChange={(e) => setJokeWords(e.target.value)}
            placeholder="Tell a joke!"
            required
          />
        </div>
        <div className="grid grid-flow-col grid-cols-3 grid-rows-1 gap-1">
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
          <div className="grid">
            <button
              className="h-1/3 bg-green-joker rounded-lg justify-self-end self-center px-1 hover:bg-opacity-50"
              type="submit"
            >
              Share Your Joke!
            </button>
          </div>
        </div>
        <div>
          {errors.map((error) => (
            <div key={error}>{error}</div>
          ))}
        </div>
      </form>
    </>
  );
}

export default JokeForm;
