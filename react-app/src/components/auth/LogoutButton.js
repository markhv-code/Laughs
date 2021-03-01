import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../services/auth';
import { removeUser } from '../../store/session';

// import context
import { useModalAndAuthContext } from '../../context/ModalAndAuth';

const LogoutButton = () => {
  const { setAuthenticated } = useModalAndAuthContext();
  const dispatch = useDispatch();
  const onLogout = async (e) => {
    await logout();
    dispatch(removeUser())
    setAuthenticated(false);
  };

  return <button onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
