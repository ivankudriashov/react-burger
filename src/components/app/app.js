import React from 'react';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useSelector, useDispatch } from 'react-redux';

import appStyles from './app.module.css';

import AppHeader from '../appHeader/appHeader';
import BurgerIngredients from '../burgerIngredients/burgerIngredients';
import BurgerConstructor from '../burgerConstructor/burgerConstructor';
import Modal from '../modal/modal';
import OrderDetails from '../orderDetails/orderDetails';
import IngredientDetails from '../ingredientDetails/ingredientDetails';

import { getOrderNumber } from '../../services/actions/state';

import { 
    OPEN_INGRIDIENT_DATA, 
    CLOSE_INGRIDIENT_DATA, 
    OPEN_ORDER_DATA, 
    CLOSE_ORDER_DATA, 
} from '../../services/actions/state';

const App = (props) => {

    const { constructorIngridientsId }  = useSelector(state => state.ingridients);
    const { modalIngredientDetailsOpened }  = useSelector(state => state.ingridients);
    const { modalOrderDetailsOpened }  = useSelector(state => state.ingridients);

    const dispatch = useDispatch();

    const buttonElement = React.useRef(null);

    const handleOpenModal = (e) => {
        const orderIngredientsIds = { 
            "ingredients": constructorIngridientsId
        };

        if (e.currentTarget === buttonElement.current.childNodes[0]) {
            dispatch({
                type: OPEN_ORDER_DATA,
            });
            dispatch(getOrderNumber(orderIngredientsIds) );
        } else {
            dispatch({
                type: OPEN_INGRIDIENT_DATA,
                indridientId: e.currentTarget.id
            });
        }
    }
    
    const handleCloseModal = () => {
        dispatch({
            type: CLOSE_INGRIDIENT_DATA,
        });
        dispatch({
            type: CLOSE_ORDER_DATA
        });
    }

    return (
        <div className={appStyles.app}>
            <AppHeader />
            <div className={appStyles.app__container}>

                <DndProvider backend={HTML5Backend}>
                    <BurgerIngredients onClick={handleOpenModal}/>
                    
                    <BurgerConstructor ref={buttonElement} onClick={handleOpenModal} />
                </DndProvider>

                {modalIngredientDetailsOpened && 
                <Modal onClose={handleCloseModal}>
                    <IngredientDetails/>
                </Modal> }

                {modalOrderDetailsOpened && 
                <Modal onClose={handleCloseModal}>
                    <OrderDetails/>
                </Modal> }
            </div>
        </div>
    )
}
  
export default App;