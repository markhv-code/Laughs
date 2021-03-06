import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { deleteJoke } from "../../store/jokes";
import JokeFormModal from "../JokeForm/JokeFormModal";

import MessageFormModal from "../Messages/MessagesFormModal/index";
import ThreadForm from "../ThreadForm";

function User() {
  const [user, setUser] = useState({});
  // Notice we use useParams here instead of getting the params
  // From props.
  const { userId } = useParams();

  const dispatch = useDispatch();
  const lgnUsr = useSelector((state) => state.session.user);
  const allJokes = useSelector((state) => Object.values(state.jokes));
  const jokeComments = useSelector((state) => Object.values(state.threads));
  const allUsers = useSelector((state) => Object.values(state.users));
  const userJokes = allJokes.filter((joke) => joke.userId === user.id);

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  if (!user) {
    return null;
  }

  const handleDelete = function (e, post) {
    const res = window.confirm(
      `Are you sure you want to remove post ${post.id}?`
    );
    if (res) {
      dispatch(deleteJoke(post.id));
      window.location.reload(false);
    }
  };

  return (
    <div className="w-full h-full grid grid-flow-col grid-cols-7 grid-rows-7 gap-3">
      <div className="m-2 col-start-4 col-end-6 row-start-1 row-end-2 self-center">
        <div>
          <strong className="text-xl">Username</strong> {user.username}
        </div>
        <div>
          <strong className="text-xl">Email</strong> {user.email}
        </div>
        { lgnUsr.id !== user.id &&
          <div>
            <MessageFormModal receiver={user} />
          </div>
        }
      </div>
      <div className="col-start-3 col-end-6 row-start-5 row-end-7">
        {userJokes.reverse().map((post) => {
          const { id, userId, imageURL, joke, jokeType } = post;
          const myDate = new Date(post.timestamp);
          const filteredComments = jokeComments.filter(
            (joke) => joke.jokeId === id
          );
          return (
            <div
              key={id}
              className="rounded-lg border-4 border-light-blue-500 border-opacity-50 p-1 m-2"
            >
              <div className="flex justify-between py-1"> 
                <strong className="ml-1">{post.users.username}</strong>
                {lgnUsr.id === userId &&
                  <JokeFormModal post={post}/>
                }
              </div>
              <div className="flex justify-between py-1">
                <h3 className="ml-1">Joke Type: {jokeType}</h3>
                {lgnUsr.id === userId &&
                  <div className="w-1/12 rounded-lg bg-red-joker hover:bg-opacity-50">
                    <button
                      onClick={(e) => handleDelete(e, post)}
                    >
                      Delete
                    </button>
                    </div>
                }
              </div>
              <h3 className="ml-1">{myDate.toLocaleString()}</h3>
              <h3 className="text-lg ml-1">{joke}</h3>
              {filteredComments &&
                filteredComments.map((comment) => {
                  let user = allUsers.filter(
                    (usrObj) => usrObj.id === comment.userId
                  );
                  return (
                    <div
                      key={comment.id}
                      className="text-sm items-center bg-blue-joker my-1 ml-4 pl-1 rounded-lg w-2/5"
                    >
                      {user[0].username}: {comment.comment}
                    </div>
                  );
                })}
              <ThreadForm id={id} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default User;
