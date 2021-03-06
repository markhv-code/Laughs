import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../../services/auth';
import { useModalAndAuthContext } from '../../../context/ModalAndAuth';
import { setUser } from '../../../store/session'

function LoginForm() {
  const { authenticated, setAuthenticated } = useModalAndAuthContext();
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const user = await login(email, password);
    if (!user.errors) {
      dispatch(setUser(user))
      setAuthenticated(true);
    } else {
      setErrors(user.errors);
    }
  };

  const demoLogin = async (e) => {
    e.preventDefault();
    const user = await login('demo@aa.io', 'password');
    dispatch(setUser(user));
    setAuthenticated(true);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (authenticated) {
    return <Redirect to='/home' />;
  }

  return (
    <>
      <form onSubmit={onLogin}>
        <div>
          {errors.map((error) => (
            <div>{error}</div>
          ))}
        </div>
        <div>
          <label className="ml-1" htmlFor='email'>Email</label>
          <input
            className="rounded-lg m-1 px-1 w-full"
            name='email'
            type='text'
            placeholder='Email'
            value={email}
            onChange={updateEmail}
          />
        </div>
        <div>
          <label className="ml-1" htmlFor='password'>Password</label>
          <input
            className="rounded-lg m-1 px-1 w-full"
            name='password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={updatePassword}
          />
          <div className='text-center'>
            <button 
              className='text-black rounded-lg m-1 px-1 bg-green-joker hover:bg-green-400 w-2/5'
              type='submit'
            >
              Login</button>
          </div>
          </div>
      </form>
      <form className='text-center' onSubmit={demoLogin}>
          <button 
            className=' text-black rounded-lg m-1 px-1 bg-green-joker hover:bg-green-400 w-2/5'
            type='submit'
          >
            Demo Login</button>
      </form>
    </>
  );
}

export default LoginForm;
