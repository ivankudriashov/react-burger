import st from './order.module.css';

import { Link, useLocation } from 'react-router-dom';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { TItem, useSelector } from '../../services/types/types';
import OrderIngredientIcon from '../orderIngredientIcon/orderIngredientIcon';
import { useEffect, useState } from 'react';
import { getOrderTimeCreation } from '../../utils/order';

const Order = ({order, userOrder}: any) => {

    const id = order._id;
    const location = useLocation();

    const { ingridients } = useSelector(state => state.ingridients);

    const [total, setTotal] = useState(0); 
    const [iconIngredientsArray, setIconIngredientsArray] = useState<Array<TItem | undefined>>(); 
    const [mainCounter, setMainCounter] = useState(0); 
    const [feedIngredients, setFeedIngredients] = useState<Array<TItem | undefined>>([]); 
    const [dateOfCreate, setDateOfCreate] = useState('');
    const [orderStatus, setClickedStatus] = useState('');

    useEffect(() => {
        let feedIngredients: Array<TItem | undefined>  = [];

        order.ingredients.forEach((item: string, index: any) => {
            if(ingridients) {
                feedIngredients[index]  =  ingridients.find(i => i._id === item)
            }
        })

        const orderStatus = order.status === "done" ? "Выполнен" : "Готовится"
        setClickedStatus(orderStatus)

        let total = 0;

        feedIngredients.map((item) => {
            if(item) {
                return total += item.price
            }
        });

        setTotal(total);

        feedIngredients.reverse();

        let feedIngredientsCutDublicate = feedIngredients;

        setFeedIngredients(feedIngredients)

        const iconIngredientsArray = feedIngredients.length >=6 ? feedIngredients.slice(0, 6) : feedIngredientsCutDublicate;

        setIconIngredientsArray(iconIngredientsArray)

        const mainCounter = feedIngredients.length - 6;

        setMainCounter(mainCounter);

        setDateOfCreate(getOrderTimeCreation(order.createdAt));

    }, [ingridients, order.createdAt, order.ingredients, order.status])

    const status = orderStatus === "Выполнен" ? st.statusDone : st.statusPedding

    const nameStyle = userOrder ? "mb-3" : "mb-6"

    return (
        <li className={`p-6 ${st.order}`}>
            <Link 
            to={{
                pathname: `${location.pathname}/${id}`,
                state: {background: location}
            }}
            className={`${st.order_link}`}>
                <div className={`mb-6 ${st.order__meta}`}>
                    <span className={`text text_type_digits-default ${st.order__number}`}>
                        {`#${order.number}`}
                    </span>
                    <span className={`text text_type_main-default text_color_inactive ${st.order__date}`}>
                        {dateOfCreate}
                    </span>
                </div>

                <span className={`${nameStyle} text text_type_main-medium ${st.order__title}`}>
                    { order.name }
                </span>

                {userOrder ? 
                <span className={`mb-6 text text_type_main-default ${status}`}>
                    { orderStatus }
                </span>
                : null
                }

                <div className={`${st.order__info}`}>
                    <ul className={`${st.order__ingredients}`}>
                        {iconIngredientsArray && iconIngredientsArray.map((item, index) => (
                            item && feedIngredients.length >= 6 ?
                            < OrderIngredientIcon 
                            item={item}
                            index={index}
                            withNumber={true}
                            mainCounter={mainCounter}
                            key={index}
                            />
                            :
                            < OrderIngredientIcon 
                            item={item}
                            index={index}
                            withNumber={false}
                            mainCounter={mainCounter}
                            key={index}
                            />
                        ))}
                    </ul>

                    <div className={`${st.order__cost}`}>
                        <span className={`text text_type_digits-default mr-2 ${st.order__costNumber}`}>
                            {total}
                        </span>

                        <div className={`${st.order__icon}`}>
                            <CurrencyIcon type="primary" />
                        </div>
                    </div>
                </div>
            </Link>
        </li>
       
    );
}

export default Order;