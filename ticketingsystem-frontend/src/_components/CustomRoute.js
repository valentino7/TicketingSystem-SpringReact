import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, path, name, ...rest }) => (
    <Route {...path} {...name} render={props => (
        localStorage.getItem('user')
            ? <Component {...props} {...rest} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
);

export const PublicRoute = ({ component: Component, path, name, ...rest }) => (
  <Route {...path} {...name} render={props => (
    localStorage.getItem('user')
      ? <Redirect to={{ pathname: '/' }} />
      : <Component {...props} {...rest} />
  )} />
);
