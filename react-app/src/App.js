import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// components

// import NavBar from './components/NavBar/index.js'
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/Users/UsersList';
import User from './components/Users/User';
import SplashPage from './components/SplashPage/splashPage'
import HomeFeed from "./components/HomeFeed/index";
import Messages from './components/Messages';


// import { useModalAndAuthContext } from './context/ModalAndAuth';
import { getJokes } from './store/jokes';
import { getThreads } from './store/threads';
import { getMessages } from './store/messages';
import { setUser } from './store/session';
import { getUsers } from './store/users';
import { authenticate } from './services/auth';

function App() {
  // const { authenticated, setAuthenticated } = useModalAndAuthContext();
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);


  useEffect(() => {
    dispatch(getJokes());
    dispatch(getThreads());
    dispatch(getMessages());
    dispatch(getUsers());

    (async () => {
      const user = await authenticate();
      if (!user.errors) {
        // setAuthenticated(true);
        dispatch(setUser(user));

      }
      setLoaded(true);
    })();
  }, [dispatch]);

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
          authenticated={!!sessionUser}
        >
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute
          path='/users/:userId'
          exact={true}
          authenticated={!!sessionUser}
        >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/home' exact={true} authenticated={!!sessionUser}>
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
