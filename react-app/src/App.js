import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// components

// import NavBar from './components/NavBar/index.js'
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/Users/UsersList';
import User from './components/Users/User';
import SplashPage from './components/SplashPage/splashPage'
import HomeFeed from "./components/HomeFeed/index"

import { useModalAndAuthContext } from './context/ModalAndAuth';

import { authenticate } from './services/auth';

function App() {
  const { authenticated, setAuthenticated } = useModalAndAuthContext();

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const user = await authenticate();
      if (!user.errors) {
        setAuthenticated(true);
      }
      setLoaded(true);
    })();
  }, [setAuthenticated]);

  if (!loaded) {
    return null;
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
      </Switch>
    </BrowserRouter>
  );
}

export default App;
