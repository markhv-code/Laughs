import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signUp } from '../../../services/auth';
import { useModalAndAuthContext } from '../../../context/ModalAndAuth';
import { setUser } from '../../../store/session';
import { login } from '../../../services/auth';

function SignUpFormPage() {
  const { authenticated, setAuthenticated } = useModalAndAuthContext();
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    setErrors([]);
    if (password === repeatPassword) {
      const user = await signUp(username, email, password);
      console.log("---------user------", user);
      if (!user.errors) {
        dispatch(setUser(user));
        // dispatch(addUser(user));
        setAuthenticated(true);
        } else {
          setErrors(user.errors);
      } 
    } else {
      setErrors((prevErrors) => [...prevErrors, 'Password fields must match'])
    }
  };

  const demoLogin = async (e) => {
    e.preventDefault();
    const user = await login('demo@aa.io', 'password');
    dispatch(setUser(user));
    setAuthenticated(true);
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (authenticated) {
    return <Redirect to='/home' />;
  }

  return (
    <>
      <form onSubmit={onSignUp}>
        <div>
          {errors.map((error) => (
            <div>{error}</div>
          ))}
        </div>
        <div>
          <label>User Name</label>
          <input
            className="rounded-lg m-1 px-1"
            type='text'
            name='username'
            onChange={updateUsername}
            value={username}
          ></input>
        </div>
        <div>
          <label>Email</label>
          <input
            className="rounded-lg m-1 px-1"
            type='text'
            name='email'
            onChange={updateEmail}
            value={email}
          ></input>
        </div>
        <div>
          <label>Password</label>
          <input
            className="rounded-lg m-1 px-1"
            type='password'
            name='password'
            onChange={updatePassword}
            value={password}
          ></input>
        </div>
        <div>
          <label>Repeat Password</label>
          <input
            className="rounded-lg m-1 px-1"
            type='password'
            name='repeat_password'
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          ></input>
        </div>
        <div className='text-center'>
          <button 
          className='text-black rounded-lg m-1 px-1 bg-green-joker hover:bg-green-400'
          type='submit'>Sign Up</button>
        </div>
      </form>
      <form className='text-center' onSubmit={demoLogin}>
        <button 
        className='text-black rounded-lg m-1 px-1 bg-green-joker hover:bg-green-400'
        type='submit'>Demo Login</button>
      </form>
    </>
  );
}

export default SignUpFormPage;
