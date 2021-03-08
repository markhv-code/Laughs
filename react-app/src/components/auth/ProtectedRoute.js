import React from "react";
import { Route, Redirect } from "react-router-dom";
import NavBar from "../NavBar/index";

const ProtectedRoute = (props) => {
  return (
    <Route {...props}>
      {props.authenticated ? (
        <>
          <NavBar /> {props.children}
        </>
      ) : (
        <Redirect to="/" />
      )}
    </Route>
  );
};

export default ProtectedRoute;
