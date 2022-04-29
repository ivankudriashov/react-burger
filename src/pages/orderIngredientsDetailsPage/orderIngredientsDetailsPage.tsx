import st from './orderIngredientsDetailsPage.module.css';
import { FC } from 'react';
import OrderIngredientsDetails from '../../components/orderIngredientsDetails/orderIngredientsDetails';

const orderIngredientsDetailsPage: FC = () => {

    return  (
        <div className={`pt-20 ${st.container}`}>
            <OrderIngredientsDetails />
        </div>
    )
}

export default orderIngredientsDetailsPage;