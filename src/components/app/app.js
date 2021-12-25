import React from 'react';
import appStyles from './app.module.css';

import AppHeader from '../appHeader/appHeader';
import BurgerIngredients from '../burgerIngredients/burgerIngredients';
import BurgerConstructor from '../burgerConstructor/burgerConstructor';
import Modal from '../modal/modal';
import OrderDetails from '../orderDetails/orderDetails';
import IngredientDetails from '../ingredientDetails/ingredientDetails';

import { ConstructorContext } from '../utils/appContext';

const REQUEST_URL = 'https://norma.nomoreparties.space/api/ingredients';
const REQUEST_OREDER_NUMBER_URL = 'https://norma.nomoreparties.space/api/orders';

const App = (props) => {

    const [ingridients, setingridients] = React.useState([]);
    const [selectedIngredientId, setSelectedIngredientId] = React.useState("");

    const [constructorIngridients, setConstructorIngridients] = React.useState([]);

    const [totalPrice, setTotalPrice] = React.useState([]);

    const [orderNumber, setOrderNumber] = React.useState(0);

    const [visiblity, setVisiblity] = React.useState(false); 
    const [modalOrderDetailsOpened, setModalOrderDetailsOpened] = React.useState(false);
    const [modalIngredientDetailsOpened, setModalIngredientDetailsOpened] = React.useState(false);

    const buttonElement = React.useRef(null);

    const getOrderNumber = function() {
        let orderIngridientsArr = [];

        constructorIngridients.forEach((item, i) => {
            orderIngridientsArr[i] = item._id
        })

        const orderIngredientsIds = { 
            "ingredients": orderIngridientsArr
        };
        const getIngridients = async () => {
            try {
                const res = await fetch(REQUEST_OREDER_NUMBER_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                        },
                    body: JSON.stringify(orderIngredientsIds)
                })
                const data = await res.json();
                setOrderNumber(data.order.number);
            } catch (error){
                console.log("error", error);
            }
        };

        getIngridients();
    }
    
    const handleOpenModal = (e) => {
        setVisiblity(true);

        if (e.currentTarget === buttonElement.current.childNodes[0]) {
            setModalOrderDetailsOpened(true);

            getOrderNumber();

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
        const getOrderNumber = async () => {
            try {
                const res = await fetch(REQUEST_URL);
                const data = await res.json();
                setingridients(data.data);
                setConstructorIngridients(data.data);
            }
            catch (error){
                console.log("error", error);
            }
        };
        getOrderNumber();
    }, []);

    React.useEffect(
        () => {
            let total = 0;
            constructorIngridients.map(item => (total += item.price));
            setTotalPrice(total);
        },
        [constructorIngridients, setTotalPrice]
    );

    return (
        <ConstructorContext.Provider value={{ constructorIngridients, setConstructorIngridients }}>
            <div className={appStyles.app}>
                <AppHeader />
                <div className={appStyles.app__container}>
                
                    <BurgerIngredients onClick={handleOpenModal} data={ingridients} />

                    <BurgerConstructor totalPrice={totalPrice} ref={buttonElement} onClick={handleOpenModal} />

                    {visiblity && modalIngredientDetailsOpened && 
                    <Modal onClose={handleCloseModal}>
                        <IngredientDetails ingridients={ingridients}
                        selectedIngredientId={selectedIngredientId}/>
                    </Modal> }

                    {visiblity && modalOrderDetailsOpened && 
                    <Modal onClose={handleCloseModal}>
                        <OrderDetails orderNumber={orderNumber}/>
                    </Modal> }
                </div>
            </div>
        </ConstructorContext.Provider>
    )
}
  
export default App;