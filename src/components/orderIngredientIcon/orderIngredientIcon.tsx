import st from './orderIngredientIcon.module.css';

import { TItem } from '../../services/types/types';
import { FC } from 'react';


const OrderIngredientIcon: FC<{
    item: TItem | undefined;
    index: number;
    withNumber: boolean;
    mainCounter: number
}> = ({item, index, withNumber, mainCounter}) => {


    return ( 
    <>
        {withNumber && index === 0 ?
            <li className={`${st.ingredient}`}>
                <div className={`${st.imgContainer}`}>
                    <img className={`${st.img}`} src={item?.image} alt={item?.name} />
                </div>

                <span className={`text text_type_main-default ${st.mainCounter}`}>{`+${mainCounter}`}</span>
            </li> 
            :
            <li className={`${st.ingredient}`}>
                <div className={`${st.imgContainer}`}>
                    <img className={`${st.img}`} src={item?.image} alt={item?.name} />
                </div>
            </li> 
        }
    </>
        
        
    )
}

export default OrderIngredientIcon;