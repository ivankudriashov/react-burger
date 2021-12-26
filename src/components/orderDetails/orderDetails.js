import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';

import orderDetailsStyles from './orderDetails.module.css';

const OrderDetails = ({orderNumber}) => {


    return (
        <div className={`pt-30 pb-30 ${orderDetailsStyles.orderDetails}`}>
            <h2 className={`text text_type_digits-large mb-8 ${orderDetailsStyles.title}`}>{orderNumber}</h2>
            <p className={`text text_type_main-medium mb-15 ${orderDetailsStyles.subtitle}`}>идентификатор заказа</p>
            <div className={`mb-15 ${orderDetailsStyles.icon}`}>
                <CheckMarkIcon />
            </div>
            <p className={`text text_type_main-default mb-2`}>Ваш заказ начали готовить</p>
            <p className={`text text_type_main-default text_color_inactive`}>Дождитесь готовности на орбитальной станции</p>
        </div>
    )
}

OrderDetails.propTypes = {
    orderNumber: PropTypes.number.isRequired
};

export default OrderDetails;