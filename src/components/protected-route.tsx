import { FC }  from 'react';

import { Redirect, Route } from 'react-router-dom';

import { useSelector } from '../services/types/types';

export const ProtectedRoute: FC<{path?: string; exact?: boolean}> = ({ children, ...rest }) => {

  const { user }  = useSelector(state => state.ingridients);


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