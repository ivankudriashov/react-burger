import React from 'react';
import appStyles from './app.module.css';
import {items} from '../utils/items';

import AppHeader from '../appHeader/appHeader';
import BurgerIngredients from '../burgerIngredients/burgerIngredients';
import BurgerConstructor from '../burgerConstructor/burgerConstructor';
import Modal from '../modal/modal';
import OrderDetails from '../orderDetails/orderDetails';
import IngredientDetails from '../ingredientDetails/ingredientDetails';

const App = (props) => {

    const [state, setState] = React.useState({
        ingridients: [],
        selectedIngredientId: ""
    }); 
    
    const [visiblity, setVisiblity] = React.useState({
        visible: false,
    }); 

    const [modalsOpened, setmodalsOpened] = React.useState({
        modalOrderDetailsOpened: false,
        modalIngredientDetailsOpened: false
    }); 

    const buttonElement = React.useRef(null);
    
    const handleOpenModal = (e) => {
        setVisiblity({ visible: true });

        if (e.currentTarget === buttonElement.current.childNodes[0]) {
            setmodalsOpened({modalOrderDetailsOpened: true});
        } else {
            setmodalsOpened({modalIngredientDetailsOpened: true});
        }

        setState({...state, selectedIngredientId: e.currentTarget.id});
    }
    
    const handleCloseModal = () => {
        setVisiblity({ visible: false });
        setmodalsOpened({modalIngredientDetailsOpened: false});
        setmodalsOpened({modalOrderDetailsOpened: false});
        setState({...state, selectedIngredientId: ""});
    }

    React.useEffect(() => {
        const url = 'https://norma.nomoreparties.space/api/ingredients';

        const getIngridients = async () => {
            try {
                const res = await fetch(url);
                const data = await res.json();
                setState({...state, ingridients: data.data});
                
            } catch (error){
                console.log("error", error);
            }
        };

        getIngridients();
    }, []);

    return (
        <div className={appStyles.app}>
            <AppHeader />
            <div className={appStyles.app__container}>
                <BurgerIngredients onClick={handleOpenModal} data={state.ingridients} />
                <BurgerConstructor ref={buttonElement} onClick={handleOpenModal} items={items} />

                {visiblity.visible && modalsOpened.modalIngredientDetailsOpened && 
                <Modal onClose={handleCloseModal}>
                    <IngredientDetails ingridients={state.ingridients}
                       selectedIngredientId={state.selectedIngredientId}/>
                </Modal> }

                {visiblity.visible && modalsOpened.modalOrderDetailsOpened && 
                <Modal onClose={handleCloseModal}>
                    <OrderDetails />
                </Modal> }
            </div>
        </div>
    )
}
  
export default App;