import st from './orderIngredientsDetails.module.css';

import { TCount, TItem, TOrder, useDispatch, useSelector } from '../../services/types/types';
import { useParams } from 'react-router-dom';
import { FC, useCallback, useEffect, useState } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { getOrderTimeCreation } from '../../utils/order';
import { WS_CONNECTION_CLOSE, WS_CONNECTION_START } from '../../services/actions/ws';

const OrderIngredientsDetails: FC = () => {

    const { orders } = useSelector(state => state.ws);
    const { ingridients } = useSelector(state => state.ingridients);

    const dispatch = useDispatch();

    const [clickedOrder, setClickedOrder] = useState<TOrder>();
    const [orderStatus, setClickedStatus] = useState('');
    const [dateOfCreate, setDateOfCreate] = useState('');
    const [total, setTotal] = useState(0);
    const [count, setCount] = useState();
    const [orderIngredients, setOrderIngredients] = useState<Array<TItem | undefined>>();

    useEffect(() => {
        if (orders.length === 0) {
            console.log(orders.length)
            dispatch({ type: WS_CONNECTION_START });
            
            return () => {
                dispatch({ type: WS_CONNECTION_CLOSE });
            }
        }
    }, [dispatch, orders]);

    const params: {id: string} = useParams();

    const countNotUniqueIngredients = useCallback(
        (array: any) => {
                 return array.reduce(function (counter: TCount, idValue: string) {
                   counter[idValue] ? counter[idValue]++ : counter[idValue] = 1;
                   return counter;
                 }, {});
             
             },
         []
       );

    useEffect(() => {
        const sortedOrder= orders.find((item) => item._id === params.id);
        setClickedOrder(sortedOrder)

        if(clickedOrder) {
            const orderStatus = clickedOrder.status === "done" ? "Выполнен" : "Готовится"
            setClickedStatus(orderStatus)

            setDateOfCreate(getOrderTimeCreation(clickedOrder.createdAt));

            let orderIngredients: Array<TItem | undefined>  = [];

            clickedOrder.ingredients.forEach((item: string, index: any) => {
                if(ingridients) {
                    orderIngredients[index]  =  ingridients.find(i => i._id === item)
                }
            })

            setOrderIngredients(orderIngredients)

            let total = 0;

            orderIngredients.map((item) => {
                if(item) {
                    return total += item.price
                }
            });
    
            setTotal(total);

            setCount(countNotUniqueIngredients(clickedOrder.ingredients));
        }
    }, [clickedOrder, orders, params.id, orderStatus, ingridients, countNotUniqueIngredients])


    const uniqIngredients = orderIngredients?.filter((ingredient, index, array) => {
        return array.indexOf(ingredient) === index
    });

    const status = orderStatus === "Выполнен" ? st.statusDone : st.statusPedding
    

    return  <>
        { clickedOrder && 
           <div className={`p-10 ${st.container}`}>
                <span className={`mb-5 text text_type_digits-default ${st.number}`}>
                   {`#${clickedOrder.number}`}
                </span>

                <h3 className={`mb-2 text text_type_main-medium ${st.title}`}>
                    {`${clickedOrder.name}`}
                </h3>

                <span className={`mb-15 text text_type_main-default ${status}`}>
                    {orderStatus}
                </span>

                <span className={`mb-6 text text_type_main-medium ${st.subtitle}`}>
                    Состав:
                </span>

                <ul className={`${st.orders}`}>
                {uniqIngredients && uniqIngredients.map((item, index) => ( item && count &&
                    <li key={index} className={`${st.order}`}>
                        <div className={`${st.imgContainer}`}>
                            <img className={`${st.img}`} src={`${item.image}`} alt="#" />
                        </div>

                        <span className={`mr-4 text text_type_main-default ${st.ingredientName}`}>
                            {item.name}
                        </span>

                        <div className={`${st.priceWrapper}`}>
                            <span className={`mr-1 text text_type_digits-default ${st.count}`}>{ count[item._id] }</span>
                            <span className={`mr-1 text text_type_main-default ${st.multiplier}`}>х</span>
                            <span className={`mr-2 text text_type_digits-default ${st.price}`}>
                                {item.price}
                            </span>

                            <div className={`mr-6 ${st.icon}`}>
                                <CurrencyIcon type="primary" />
                            </div>
                        </div>
                    </li>
                ))}
                </ul>

                <div className={`${st.footer}`}>
                    <span className={`text text_type_main-default text_color_inactive ${st.date}`}>
                        { dateOfCreate }
                    </span>

                    <div className={`${st.totalСost}`}>
                        <span className={`mr-2 text text_type_digits-default ${st.sum}`}>
                            {total}
                        </span>
                        
                        <div className={`${st.icon}`}>
                            <CurrencyIcon type="primary" />
                        </div>
                    </div>
                </div>
           </div>
       
        }
    </>
}

export default OrderIngredientsDetails;