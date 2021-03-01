import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';

// import components
import SignUpFormModal from '../auth/SignUpFormModal';
import LoginFormModal from '../auth/LoginFormModal';

// import context
import { useModalAndAuthContext } from '../../context/ModalAndAuth';

// import css
import './navBar.css';

const NavBar = () => {
  const { authenticated } = useModalAndAuthContext();

  return (
    <header className='site-header'>
      <nav className='navbar'>
        <div>
          <img className="logo" alt="pair yo' pet logo" src="/images/pyp-logo-cropped.png"></img>
        </div>
        <ul className='navbar__links'>
          <li className='navbar__link'>
            <NavLink to='/' exact={true} activeClassName='active'>
              Home
            </NavLink>
          </li>
          {authenticated && (
            <>
              <li className='navbar__link'>
                <NavLink to='/users' exact={true} activeClassName='active'>
                  Users
                </NavLink>
              </li>
              <li className='navbar__link'>
                <LogoutButton />
              </li>
            </>
          )}
          {!authenticated && (
            <>
              <li className='navbar__link'>
                <SignUpFormModal />
              </li>
              <li className='navbar__link'>
                <LoginFormModal />
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
