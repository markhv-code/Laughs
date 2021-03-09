import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createThread } from "../../store/threads";

export default function ThreadForm({ id }) {
  const currentUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const currentJoke = useSelector((state) => state.jokes);

  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState([]);

  const createThreadPost = async (e) => {
    e.preventDefault();
    setErrors([]);

    const thread = {
      userId: currentUser.id,
      jokeId: id,
      comment: comment,
    };

    const sendThread = await dispatch(createThread(thread));
    console.log('---------sendThread-------', sendThread);
    if (sendThread) {
      setComment("");
    } else {
      setErrors(sendThread.errors);
    }
  };

  return (
    <>
      <form onSubmit={createThreadPost}>
        <input
          className="w-5/6 rounded-lg border-4"
          name="comment"
          value={comment}
          onChange={(e) => setComment(e.target.balue)}
          placeholder="Leave a comment!"
          required
        />
        <button type="submit" className="m-2 w-1/12 rounded-lg bg-green-joker">Post</button>
      </form>
    </>
  );
}
