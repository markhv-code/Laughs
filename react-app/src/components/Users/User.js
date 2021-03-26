import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";
import { getJokes, deleteJoke } from '../../store/jokes';

import MessageFormModal from '../Messages/MessagesFormModal/index'

function User() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [user, setUser] = useState({});
  // Notice we use useParams here instead of getting the params
  // From props.
  const { userId }  = useParams();

  useEffect(() => {
    if (!userId) {
      return
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

  // const handleDelete = function (e) {
  //   const res = window.confirm(`Are you sure you want to remove joke ${joke.id}?`);
  //   if (res) {
  //     dispatch(deleteJoke(joke.id))
  //     history.push(`/users/${joke.userId}`)
  //   }
  // }

  return (
    <div className="w-full h-full grid grid-flow-col grid-cols-7 grid-rows-7 gap-3">
      <div className="m-2 col-start-3 col-end-6 row-start-5 row-end-7">
        <div>
          <strong>Username</strong> {user.username}
        </div>
        <div>
          <strong>Email</strong> {user.email}
        </div>
        <div>
          <MessageFormModal receiver={user}/>
        </div>
      </div>
    </div>
  );
}
export default User;
