import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createJoke } from "../../store/jokes";

function JokeForm({ jokeToUpdate }) {
  const currentUser = useSelector((state) => state.session.user);
  console.log("------------------CurrentUsr", currentUser);
  const dispatch = useDispatch();

  const [jokeWords, setJokeWords] = useState("");
  const [jokeType, setJokeType] = useState("");
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (!!jokeToUpdate) {
      setJokeWords(jokeToUpdate.joke);
      setJokeType(jokeToUpdate.jokeType);
      setImage(jokeToUpdate.image);
    }
  }, [jokeToUpdate]);

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

    const jokeOrErrors = await dispatch(
      !!jokeToUpdate
        ? createJoke(joke, jokeToUpdate.id) // if you pass in a joke id, it updates instead
        : createJoke(joke)
    );
    if (jokeOrErrors.errors) {
      newErrors = jokeOrErrors.errors;
      setErrors(newErrors);
    } else {
      // no refresh, but post should show up in top of feed.
    }
  };
  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  return (
    <>
      {/* <h1 className="text-4xl col-start-3 col-end-6 row-start-1 row-end-2 p-1 m-1 justify-self-center">
        {!!jokeToUpdate ? "Update Joke" : "Add Joke"}
      </h1> */}
      <form
        className="text-lg col-start-3 col-end-6 row-start-2 row-end-4 p-1 m-1"
        onSubmit={createJokePost}
      >
        <div className="w-full h-24">
          {/* <label className="self-center">Joke</label> */}
          <input
            className="w-full h-full rounded-lg border-4 border-light-blue-500 border-opacity-50"
            name="joke"
            value={jokeWords}
            onChange={(e) => setJokeWords(e.target.value)}
            placeholder="Tell a joke!"
            required
          />
        </div>
        <div className="grid grid-flow-col grid-cols-3 grid-rows-1 gap-1">
            <div className="h-20">
            <label>Joke Type</label>
            <select
                name="jokeType"
                value={jokeType}
                onChange={(e) => setJokeType(e.target.value)}
                required
                // className='joke-form__input'
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
            <label>
            Image
            <input type="file" onChange={updateFile} />
            </label>
            <div className="grid">
            <button className="h-1/3 bg-green-joker rounded-lg justify-self-end self-center" type="submit">Share Your Joke!</button>
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
