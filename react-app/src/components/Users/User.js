import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";
import { deleteJoke } from '../../store/jokes';

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

  const handleDelete = function (e) {
    const res = window.confirm(`Are you sure you want to remove joke ${joke.id}?`);
    if (res) {
      dispatch(deleteJoke(joke.id))
      history.push(`/users/${joke.userId}`)
    }
  }

  return (
    <>
      <ul className="m-2">
        <li>
          <strong>Username</strong> {user.username}
        </li>
        <li>
          <strong>Email</strong> {user.email}
        </li>
      </ul>
      <div>
        <MessageFormModal receiver={user}/>
      </div>
    </>
  );
}
export default User;
