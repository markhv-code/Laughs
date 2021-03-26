// import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';

// import context
import { useModalAndAuthContext } from '../../context/ModalAndAuth';

// import css
import './navBar.css';

const NavBar = () => {
  const { authenticated } = useModalAndAuthContext();

  return (
    <header className='site-header'>
      <nav className='navbar bg-gradient-to-r from-blue-joker via-red-joker to-green-joker'>
        <div>
          <img className="logo" alt="Laughs App logo" src="https://pairyopet.s3-us-west-1.amazonaws.com/pyp-logo-cropped.png"></img>
        </div>
        <ul className='navbar__links'>
          <li className='navbar__link'>
            <NavLink to='/home' exact={true} className='text-2xl hover:underline ' activeClassName='text-3xl text-white hover:no-underline'>
              Home
            </NavLink>
          </li>
          {authenticated && (
            <>
              <li className='navbar__link'>
                <NavLink to='/messages' exact={true} className='text-2xl hover:underline ' activeClassName='text-3xl text-white hover:no-underline'>
                  Messages
                </NavLink>
              </li>
              <li className='navbar__link'>
                <NavLink to='/users' exact={true} className='text-2xl hover:underline ' activeClassName='text-3xl text-white hover:no-underline'>
                  Users
                </NavLink>
              </li>
              <li className='navbar__link'>
                <LogoutButton />
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
