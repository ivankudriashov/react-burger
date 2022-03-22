import React, { useEffect }  from 'react';

import { BrowserRouter as Router, Switch, Route, Redirect, useLocation } from 'react-router-dom';

import appStyles from './app.module.css';

import AppHeader from '../appHeader/appHeader';

import { ConstructorPage, LoginPage, RegistarationPage, ForgotPage, ResetPasswordPage, ProfilePage } from '../../pages/'

import { getOrderNumber, getUserInfo, getAllIngridients, getCookie } from '../../services/actions/state';



import { useSelector, useDispatch } from '../../services/types/types';
import { ProtectedRoute } from '../protected-route';

const App = () => {

    const { user }  = useSelector(state => state.ingridients);

    const dispatch = useDispatch();

    const token = getCookie('token');
    const accessToken = 'Bearer ' + getCookie('token');
    const refreshToken = getCookie('refreshToken');

    useEffect(() => {
        dispatch(getAllIngridients());

        if(token) {
            dispatch(getUserInfo(accessToken, refreshToken));
        }

    }, [dispatch, token, accessToken, refreshToken])

    return (
        <Router>
            <Switch>
                <div className={appStyles.app}>
                    <AppHeader />
                    <div className={appStyles.app__container}>
                        
                    {/* ProtectedRoute */}
                        <Route path="/" exact={true}>
                            <ConstructorPage />
                        </Route>

                        <ProtectedRoute path="/order" exact={true}>
                            <LoginPage />
                        </ProtectedRoute>

                        <ProtectedRoute path="/profile" exact={true}>
                            <ProfilePage />
                        </ProtectedRoute>

                        <Route path="/login" exact={true}>
                            <LoginPage />
                        </Route>

                        <Route path="/register" exact={true}>
                            <RegistarationPage />
                        </Route>

                        <Route path="/forgot-password" exact={true}>
                            <ForgotPage />
                        </Route>

                        <Route path="/reset-password" exact={true}>
                            <ResetPasswordPage />
                        </Route>
                    </div>
                </div>
            </Switch>
        </Router>
    )
}
  
export default App;