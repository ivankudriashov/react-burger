import st from './order.module.css';

import { Link, useLocation } from 'react-router-dom';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const Order = () => {

    const id = 123;
    const location = useLocation();

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
                        #034535
                    </span>
                    <span className={`text text_type_main-default text_color_inactive ${st.order__date}`}>
                        Сегодня, 16:20 i-GMT+3
                    </span>
                </div>

                <span className={`mb-6 text text_type_main-medium ${st.order__title}`}>
                    Death Star Starship Main бургер
                </span>

                <div className={`${st.order__info}`}>
                    <ul className={`${st.order__ingredients}`}>
                        <li className={`${st.order__ingredient}`}>
                            <div className={`${st.order__imgContainer}`}>
                                <img src="#" alt="#" />
                            </div>
                        </li>

                        <li className={`${st.order__ingredient}`}>
                            <div className={`${st.order__imgContainer}`}>
                                <img src="#" alt="#" />
                            </div>
                        </li>

                        <li className={`${st.order__ingredient}`}>
                            <div className={`${st.order__imgContainer}`}>
                                <img src="#" alt="#" />
                            </div>
                        </li>
                    </ul>

                    <div className={`${st.order__cost}`}>
                        <span className={`text text_type_digits-default mr-2 ${st.order__costNumber}`}>
                            480
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