import st from './orderIngredientsDetailsPage.module.css';

import { TItem, useSelector } from '../../services/types/types';
import { useParams } from 'react-router-dom';
import { FC, useEffect, useState } from 'react';
import OrderIngredientsDetails from '../../components/orderIngredientsDetails/orderIngredientsDetails';

const orderIngredientsDetailsPage: FC = () => {

    // const { ingridients } = useSelector(state => state.ingridients);
    // const [clickedIngridient, setClickedIngridient] = useState<TItem | undefined>();

    // // const params: {id: string} = useParams();

    // useEffect(() => {
    //     const sortedIngridient = ingridients.find((item) => item._id === params.id);

    //     setClickedIngridient(sortedIngridient)
    //   }, [ingridients, params.id])

    

    return  (
        <div className={`pt-20 ${st.container}`}>
            <OrderIngredientsDetails />
        </div>
        
    )
}

export default orderIngredientsDetailsPage;