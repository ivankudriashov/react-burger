import BurgerIngredients from '../../components/burgerIngredients/burgerIngredients';
import BurgerConstructor from '../../components/burgerConstructor/burgerConstructor';
import Modal from '../../components/modal/modal';
import OrderDetails from '../../components/orderDetails/orderDetails';

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useHistory, useLocation } from 'react-router-dom';
import React from 'react';

import { 
    OPEN_ORDER_DATA, 
    CLOSE_ORDER_DATA, 
    CLEAR_CONSTRUCTOR,
    getOrderNumber
} from '../../services/actions/order';

import { 
    OPEN_INGRIDIENT_DATA
} from '../../services/actions/state';

import { useSelector, useDispatch } from '../../services/types/types';

const ConstructorPage = () => {

    const { user }  = useSelector(state => state.user);
    const { orderNumber }  = useSelector(state => state.order);
    const location = useLocation();
    const history = useHistory()

    const { constructorIngridientsId }  = useSelector(state => state.order);
    const dispatch = useDispatch();

    const { modalOrderDetailsOpened }  = useSelector(state => state.order);
    const { constructorIngridients }  = useSelector(state => state.order);


    const buttonElement = React.useRef(null);

    const handleOpenIndredientModal = (e: React.MouseEvent<HTMLLIElement>): void => {
        dispatch({
            type: OPEN_INGRIDIENT_DATA,
            indridientId: e.currentTarget.id
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
        e.preventDefault();

        if (user) {
            if(constructorIngridients.length) {
                const orderIngredientsIds = { 
                    "ingredients": constructorIngridientsId
                };
        
                dispatch({
                    type: OPEN_ORDER_DATA,
                });
        
                dispatch(getOrderNumber(orderIngredientsIds));
            }
        } else {
            history.push('/login', { from: location })
        }
    }

    return (
        <>
            <DndProvider backend={HTML5Backend}>
                <BurgerIngredients onClick={handleOpenIndredientModal}/>
                
                <BurgerConstructor ref={buttonElement} onClick={handleOpenOrderModal} />
            </DndProvider>

            {modalOrderDetailsOpened && orderNumber && 
            <Modal onClose={handleCloseOrderModal}>
                <OrderDetails/>
            </Modal> } 
        </>        
    );
}

export default ConstructorPage;