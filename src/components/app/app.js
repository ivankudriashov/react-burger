import React from 'react';
import appStyles from './app.module.css';
import {items} from '../utils/items';

import AppHeader from '../appHeader/appHeader';
import BurgerIngredients from '../burgerIngredients/burgerIngredients';
import BurgerConstructor from '../burgerConstructor/burgerConstructor';
import Modal from '../modal/modal';
import OrderDetails from '../orderDetails/orderDetails';
import IngredientDetails from '../ingredientDetails/ingredientDetails';

const REQUEST_URL = 'https://norma.nomoreparties.space/api/ingredients';

const App = (props) => {

    const [ingridients, setingridients] = React.useState([]);
    const [selectedIngredientId, setSelectedIngredientId] = React.useState("");    
    const [visiblity, setVisiblity] = React.useState(false); 
    const [modalOrderDetailsOpened, setModalOrderDetailsOpened] = React.useState(false);
    const [modalIngredientDetailsOpened, setModalIngredientDetailsOpened] = React.useState(false);

    const buttonElement = React.useRef(null);
    
    const handleOpenModal = (e) => {
        setVisiblity(true);

        if (e.currentTarget === buttonElement.current.childNodes[0]) {
            setModalOrderDetailsOpened(true);
        } else {
            setModalIngredientDetailsOpened(true);
        }

        setSelectedIngredientId(e.currentTarget.id);
    }
    
    const handleCloseModal = () => {
        setVisiblity(false);
        setModalIngredientDetailsOpened(false);
        setModalOrderDetailsOpened(false);
        setSelectedIngredientId("");
    }

    React.useEffect(() => {
        const getIngridients = async () => {
            try {
                const res = await fetch(REQUEST_URL);
                const data = await res.json();
                setingridients(data.data);
                
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
                <BurgerIngredients onClick={handleOpenModal} data={ingridients} />
                <BurgerConstructor ref={buttonElement} onClick={handleOpenModal} items={items} />

                {visiblity && modalIngredientDetailsOpened && 
                <Modal onClose={handleCloseModal}>
                    <IngredientDetails ingridients={ingridients}
                       selectedIngredientId={selectedIngredientId}/>
                </Modal> }

                {visiblity && modalOrderDetailsOpened && 
                <Modal onClose={handleCloseModal}>
                    <OrderDetails />
                </Modal> }
            </div>
        </div>
    )
}
  
export default App;