import React, { useEffect }  from 'react';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import appStyles from './app.module.css';

import AppHeader from '../appHeader/appHeader';
import BurgerIngredients from '../burgerIngredients/burgerIngredients';
import BurgerConstructor from '../burgerConstructor/burgerConstructor';
import Modal from '../modal/modal';
import OrderDetails from '../orderDetails/orderDetails';
import IngredientDetails from '../ingredientDetails/ingredientDetails';

import { getOrderNumber } from '../../services/actions/state';
import { getAllIngridients } from '../../services/actions/state';

import { 
    OPEN_INGRIDIENT_DATA, 
    CLOSE_INGRIDIENT_DATA, 
    OPEN_ORDER_DATA, 
    CLOSE_ORDER_DATA, 
    CLEAR_CONSTRUCTOR
} from '../../services/actions/state';

import { useSelector, useDispatch } from '../../services/types/types';

const App = () => {

    const { constructorIngridientsId }  = useSelector(state => state.ingridients);
    const { modalIngredientDetailsOpened }  = useSelector(state => state.ingridients);
    const { modalOrderDetailsOpened }  = useSelector(state => state.ingridients);

    const dispatch = useDispatch();

    const buttonElement = React.useRef(null);

    useEffect(() => {
        dispatch(getAllIngridients()) 
    }, [dispatch])

    const handleOpenOrderModal = () => {

        const orderIngredientsIds = { 
            "ingredients": constructorIngridientsId
        };

        dispatch({
            type: OPEN_ORDER_DATA,
        });

        dispatch(getOrderNumber(orderIngredientsIds));
       
    }

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

    return (
        <div className={appStyles.app}>
            <AppHeader />
            <div className={appStyles.app__container}>

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
            </div>
        </div>
    )
}
  
export default App;