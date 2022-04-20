import AsideMenu from '../../components/asideMenu/asideMenu';
import Order from '../../components/order/order';
import st from './userOrdersPage.module.css';

import { useDispatch, useSelector } from '../../services/types/types';
import { useEffect } from 'react';
import { WS_USER_CONNECTION_CLOSED, WS_USER_CONNECTION_START } from '../../services/actions/ws';

const UserOrdersPage = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: WS_USER_CONNECTION_START });

        return () => {
            dispatch({ type: WS_USER_CONNECTION_CLOSED });
        }

    }, [dispatch])

    const { orders }  = useSelector(state => state.ws);

    return (
        <div className={`${st.container}`}>
            <div className={`mt-30 ${st.menuContainer}`}>
                <AsideMenu />
                <span className={`text text_type_main-default text_color_inactive mt-20 pl-5 ${st.menuInfo}`}>
                    В этом разделе вы можете просмотреть свою историю заказов
                </span>
            </div>

            <ul className={`mt-10 ${st.orders}`}>
                {orders.map((item) => (
                    <Order 
                        order={item}
                        key={ item._id }
                        userOrder={true}
                    />
                ))}
            </ul>
        </div>
    )
}

export default UserOrdersPage;