import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import orderDetailsStyles from './orderDetails.module.css';

import { useSelector } from '../../services/types/types';


const OrderDetails = () => {

    const { orderNumber }  = useSelector(state => state.ingridients);

    return (
        <div className={`pt-30 pb-30 ${orderDetailsStyles.orderDetails}`}>
            <h2 className={`text text_type_digits-large mb-8 ${orderDetailsStyles.title}`}>{orderNumber}</h2>
            <p className={`text text_type_main-medium mb-15 ${orderDetailsStyles.subtitle}`}>идентификатор заказа</p>
            <div className={`mb-15 ${orderDetailsStyles.icon}`}>
                <CheckMarkIcon type={'secondary'} />
            </div>
            <p className={`text text_type_main-default mb-2`}>Ваш заказ начали готовить</p>
            <p className={`text text_type_main-default text_color_inactive`}>Дождитесь готовности на орбитальной станции</p>
        </div>
    )
}

export default OrderDetails;
