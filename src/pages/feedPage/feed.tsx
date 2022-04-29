import { useEffect }  from 'react';

import { useDispatch, useSelector } from '../../services/types/types';

import st from './feed.module.css';

import Order from '../../components/order/order';
import { WS_CONNECTION_START, WS_CONNECTION_CLOSE } from '../../services/actions/ws';

const FeedPage = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: WS_CONNECTION_START });

        return () => {
            dispatch({ type: WS_CONNECTION_CLOSE });
        }

    }, [dispatch])

    const { orders, totalToday, total }  = useSelector(state => state.ws);

    return (
        <div className={`ml-5 ${st.feed}`}>
            <h1 className={`mt-10 mb-5 text text_type_main-large`}>Лента заказов</h1>
            <div className={`${st.feed__container}`}>
                <ul className={`mr-15 ${st.feed__orders}`}>
                    {orders.map((item) => (
                        <Order 
                        order={item}
                        key={ item._id }
                        userOrder={false}
                    />
                    ))}
                </ul>

                <div className={`${st.feed__info}`}>
                    <div className={`mb-15 ${st.feed__status}`}>
                        <div className={`mr-9 ${st.feed__statusContainer}`}>
                            <span className={`text text_type_main-medium mb-6 ${st.feed__statusTitle}`}>
                                Готовы:
                            </span>
                            <ul className={`${st.feed__statusList}`}>
                                {orders.filter((item) => item.status === 'done').slice(0, 10).map((item) => (
                                    <li className={`text text_type_digits-default ${st.feed__statusItem} ${st.feed__statusItemDone}`} key={item._id}>
                                        {item.number}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className={`${st.feed__statusContainer}`}>
                            <span className={`text text_type_main-medium mb-6 ${st.feed__statusTitle}`}>
                                В работе:
                            </span>
                            <ul className={`${st.feed__statusList}`}>
                                {orders.filter((item) => item.status === 'pending').slice(0, 10).map((item) => (
                                    <li className={`text text_type_digits-default ${st.feed__statusItem}`} key={item._id}>
                                        {item.number}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className={`mb-15 ${st.feed__statistics}`}>
                        <span className={`text text_type_main-medium ${st.feed__statisticsTitle}`}>
                            Выполнено за все время:
                        </span>

                        <span className={`text text_type_digits-large ${st.feed__statisticsInfo}`}>
                            {total}
                        </span>
                    </div>

                    <div className={`${st.feed__statistics}`}>
                        <span className={`text text_type_main-medium ${st.feed__statisticsTitle}`}>
                            Выполнено за сегодня:
                        </span>

                        <span className={`text text_type_digits-large ${st.feed__statisticsInfo}`}>
                            {totalToday}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FeedPage;