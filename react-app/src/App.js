import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// components

// import NavBar from './components/NavBar/index.js'
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/Users/UsersList';
import User from './components/Users/User';
import SplashPage from './components/SplashPage/splashPage'
import HomeFeed from "./components/HomeFeed/index"

import { useModalAndAuthContext } from './context/ModalAndAuth';
import { getJokes } from './store/jokes';
import { getThreads } from './store/threads';
import { authenticate } from './services/auth';

function App() {
  const { authenticated, setAuthenticated } = useModalAndAuthContext();
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    dispatch(getJokes());
    dispatch(getThreads());
    (async () => {
      const user = await authenticate();
      if (!user.errors) {
        setAuthenticated(true);
      }
      setLoaded(true);
    })();
  }, [setAuthenticated, dispatch]);

  if (!loaded) {
    return 'loading...';
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact={true}>
          <SplashPage />
        </Route>
        {/* <NavBar /> */}
        <ProtectedRoute
          path='/users'
          exact={true}
          authenticated={authenticated}
        >
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute
          path='/users/:userId'
          exact={true}
          authenticated={authenticated}
        >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/home' exact={true} authenticated={authenticated}>
          <HomeFeed />
        </ProtectedRoute>
        <ProtectedRoute
          path='/messages'
          exact={true}
          authenticated={!!sessionUser}
          >
          <Messages />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
