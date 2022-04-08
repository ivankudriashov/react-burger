import { useEffect }  from 'react';

import { Switch, Route, useLocation, useHistory } from 'react-router-dom';

import appStyles from './app.module.css';

import AppHeader from '../appHeader/appHeader';

import { ConstructorPage, LoginPage, RegistarationPage, ForgotPage, ResetPasswordPage, ProfilePage, IngredientDetailsPage, FeedPage, UserOrdersPage } from '../../pages/'

import {  getAllIngridients } from '../../services/actions/state';
import { getCookie, getUserInfo } from '../../services/actions/user';

import { useDispatch } from '../../services/types/types';
import { ProtectedRoute } from '../protected-route';
import IngredientDetails from '../ingredientDetails/ingredientDetails';
import Modal from '../modal/modal';
import OrderDetails from '../orderDetails/orderDetails';
import OrderIngredientsDetails from '../orderIngredientsDetails/orderIngredientsDetails';
import OrderIngredientsDetailsPage from '../../pages/orderIngredientsDetailsPage/orderIngredientsDetailsPage';



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
                    <ProtectedRoute path="/profile/order" exact={true}>
                        <UserOrdersPage />
                    </ProtectedRoute>

                    <ProtectedRoute path="/profile/order/:id" exact={true}>
                        <OrderIngredientsDetailsPage />
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

                    <Route path="/feed" exact={true}>
                        <FeedPage />
                    </Route>

                    <Route path="/feed/:id" exact={true}>
                        <OrderIngredientsDetailsPage />
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

                {
                    background &&
                    <Route path="/feed/:id" exact={true}>
                        <Modal onClose={() => {
                            history.goBack();
                        }}>
                            <OrderIngredientsDetails/>
                        </Modal> 
                    </Route>
                }

                {
                    background &&
                    <Route path="/profile/order/:id" exact={true}>
                        <Modal onClose={() => {
                            history.goBack();
                        }}>
                            <OrderIngredientsDetails/>
                        </Modal> 
                    </Route>
                }
            </div>
        </div>
    )
}
  
export default App;