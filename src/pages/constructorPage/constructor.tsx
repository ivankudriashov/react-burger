import BurgerIngredients from '../../components/burgerIngredients/burgerIngredients';
import BurgerConstructor from '../../components/burgerConstructor/burgerConstructor';
import Modal from '../../components/modal/modal';
import OrderDetails from '../../components/orderDetails/orderDetails';
import IngredientDetails from '../../components/ingredientDetails/ingredientDetails';

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Redirect, useLocation } from 'react-router-dom';
import React, { useEffect } from 'react';

import { 
    OPEN_INGRIDIENT_DATA, 
    CLOSE_INGRIDIENT_DATA, 
    OPEN_ORDER_DATA, 
    CLOSE_ORDER_DATA, 
    CLEAR_CONSTRUCTOR
} from '../../services/actions/state';

import { useSelector, useDispatch } from '../../services/types/types';
import { getOrderNumber, getUserInfo, getAllIngridients, getCookie } from '../../services/actions/state';

const ConstructorPage = () => {

    const { user }  = useSelector(state => state.ingridients);
    const location = useLocation();

    const { constructorIngridientsId }  = useSelector(state => state.ingridients);
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

    const { modalIngredientDetailsOpened }  = useSelector(state => state.ingridients);
    const { modalOrderDetailsOpened }  = useSelector(state => state.ingridients);


    const buttonElement = React.useRef(null);

    const handleOpenIndredientModal = (e: React.MouseEvent<HTMLLIElement>): void => {
        dispatch({
            type: OPEN_INGRIDIENT_DATA,
            indridientId: e.currentTarget.id
        });
    }
    
    const handleCloseIndredientModal = () => {
        dispatch({
            type: CLOSE_INGRIDIENT_DATA,
        });
    }

    const handleCloseOrderModal = () => {
        dispatch({
            type: CLOSE_ORDER_DATA
        });

        dispatch({
            type: CLEAR_CONSTRUCTOR
        });
    }

    const handleOpenOrderModal = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        if (user) {
            const orderIngredientsIds = { 
                "ingredients": constructorIngridientsId
            };
    
            dispatch({
                type: OPEN_ORDER_DATA,
            });
    
            dispatch(getOrderNumber(orderIngredientsIds));
        } else {

            console.log(user)
            console.log('Отработал блок else')
            return (
                <Redirect
                to={{
                    pathname: '/login',
                    state: { from: location }
                  }}
                />
            );
        }
    }

    return (
        <>
            <DndProvider backend={HTML5Backend}>
                <BurgerIngredients onClick={handleOpenIndredientModal}/>
                
                <BurgerConstructor ref={buttonElement} onClick={handleOpenOrderModal} />
            </DndProvider>

            {modalIngredientDetailsOpened && 
            <Modal onClose={handleCloseIndredientModal}>
                <IngredientDetails/>
            </Modal> }

            {modalOrderDetailsOpened && 
            <Modal onClose={handleCloseOrderModal}>
                <OrderDetails/>
            </Modal> } 
        </>
        
    );
}

export default ConstructorPage;