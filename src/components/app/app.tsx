import { useEffect }  from 'react';

import { Switch, Route, useLocation, useHistory } from 'react-router-dom';

import appStyles from './app.module.css';

import AppHeader from '../appHeader/appHeader';

import { ConstructorPage, LoginPage, RegistarationPage, ForgotPage, ResetPasswordPage, ProfilePage, IngredientDetailsPage } from '../../pages/'

import {  getAllIngridients } from '../../services/actions/state';
import { getCookie, getUserInfo } from '../../services/actions/user';

import { useDispatch } from '../../services/types/types';
import { ProtectedRoute } from '../protected-route';
import IngredientDetails from '../ingredientDetails/ingredientDetails';
import Modal from '../modal/modal';


const App = () => {

    const history: any = useHistory();
    const location: any = useLocation();

    let background = history.action === 'PUSH' && location.state && location.state.background;

    const dispatch = useDispatch();

    const token = getCookie('token');
    const accessToken = 'Bearer ' + getCookie('token');
    const refreshToken = getCookie('refreshToken');

    useEffect(() => {
        dispatch(getAllIngridients());

        if(token) {
            dispatch(getUserInfo(accessToken, refreshToken));
        }

    }, [dispatch, token, accessToken, refreshToken, history])

    return (
        <div className={appStyles.app}>
            <AppHeader />
            <div className={appStyles.app__container}>
                <Switch location={background || location}>
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

                    <Route path="/ingredients/:id" exact={true}>
                        <IngredientDetailsPage />
                    </Route>

                    <Route path="/" exact={true}>
                        <ConstructorPage />
                    </Route>
                </Switch>

                {
                    background &&
                    <Route path="/ingredients/:id" exact={true}>
                        <Modal onClose={() => {
                            history.goBack();
                        }}>
                            <IngredientDetails/>
                        </Modal> 
                    </Route>
                }
            </div>
        </div>
    )
}
  
export default App;