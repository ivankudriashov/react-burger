import { FC }  from 'react';

import { Redirect, Route, RouteProps } from 'react-router-dom';

import { useSelector } from '../services/types/types';

export const ProtectedRoute: FC<RouteProps> = ({ children, ...rest }) => {

  const { user }  = useSelector(state => state.user);


  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}