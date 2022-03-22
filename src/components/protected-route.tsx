import { FC }  from 'react';
// import { useAuth } from '../services/auth';
import { Redirect, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { useSelector, useDispatch } from '../services/types/types';

export const ProtectedRoute: FC<{path?: string; exact?: boolean}> = ({ children, ...rest }) => {

  const { user }  = useSelector(state => state.ingridients);
  // const [isUserLoaded, setUserLoaded] = useState(false);

  // useEffect(() => {
  //   if(user) {
  //       setUserLoaded(true);
  //     }
  // }, [user]);

  // if (!isUserLoaded) {
  //   return null;
  // }

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