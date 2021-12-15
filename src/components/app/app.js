import React from 'react';
import appStyles from './app.module.css';

import AppHeader from '../appHeader/appHeader';
import BurgerIngredients from '../burgerIngredients/burgerIngredients';
import BurgerConstructor from '../burgerConstructor/burgerConstructor';
import Modal from '../modal/modal';
import OrderDetails from '../orderDetails/orderDetails';
import IngredientDetails from '../ingredientDetails/ingredientDetails';

import { ConstructorContext, TotalPriceContext } from '../utils/appContext';

const REQUEST_URL = 'https://norma.nomoreparties.space/api/ingredients';

const App = (props) => {

    const [ingridients, setingridients] = React.useState([]);
    const [selectedIngredientId, setSelectedIngredientId] = React.useState("");

    const [constructorIngridients, setConstructorIngridients] = React.useState([]);

    const [visiblity, setVisiblity] = React.useState(false); 
    const [modalOrderDetailsOpened, setModalOrderDetailsOpened] = React.useState(false);
    const [modalIngredientDetailsOpened, setModalIngredientDetailsOpened] = React.useState(false);

    const buttonElement = React.useRef(null);
  
    const [totalPrice, setTotalPrice] = React.useState(0);
    
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
        const getTotalPrice = () => {
                const totalPrice = constructorIngridients.reduce((a, b) => {
                    
                    console.log(a)
                    console.log(b.price)
                    let c = a + b.price;
                    return c;
                }, 0)
                setTotalPrice(totalPrice)
        };
        getTotalPrice();
    }, [constructorIngridients]);

    React.useEffect(() => {
        const getIngridients = async () => {
            try {
                const res = await fetch(REQUEST_URL);
                const data = await res.json();
                setingridients(data.data);
                setConstructorIngridients(data.data);
                
            } catch (error){
                console.log("error", error);
            }
        };

        getIngridients();
    }, []);

    return (
        <ConstructorContext.Provider value={{ constructorIngridients, setConstructorIngridients }}>
            <div className={appStyles.app}>
                <AppHeader />
                <div className={appStyles.app__container}>
                    <TotalPriceContext.Provider value={{ totalPrice }}>
                        <BurgerIngredients onClick={handleOpenModal} data={ingridients} />
                    </TotalPriceContext.Provider>

                    <BurgerConstructor ref={buttonElement} onClick={handleOpenModal} />

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
        </ConstructorContext.Provider>
    )
}
  
export default App;