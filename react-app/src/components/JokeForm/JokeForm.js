import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createJoke } from "../../store/jokes";

function JokeForm({ jokeToUpdate }) {
  const currentUser = useSelector((state) => state.session.user);
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
        
    }
}
