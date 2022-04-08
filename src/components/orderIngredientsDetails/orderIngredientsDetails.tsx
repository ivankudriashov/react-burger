import st from './orderIngredientsDetails.module.css';

import { TItem, useSelector } from '../../services/types/types';
import { useParams } from 'react-router-dom';
import { FC, useEffect, useState } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const OrderIngredientsDetails: FC = () => {

    // const { ingridients } = useSelector(state => state.ingridients);
    // const [clickedIngridient, setClickedIngridient] = useState<TItem | undefined>();

    // // const params: {id: string} = useParams();

    // useEffect(() => {
    //     const sortedIngridient = ingridients.find((item) => item._id === params.id);

    //     setClickedIngridient(sortedIngridient)
    //   }, [ingridients, params.id])

    

    return  <>
        {/* { 
            clickedIngridient &&  */}
         
           <div className={`p-10 ${st.container}`}>
                <span className={`mb-5 text text_type_digits-default ${st.number}`}>
                    #034533
                </span>

                <h3 className={`mb-2 text text_type_main-medium ${st.title}`}>
                    Black Hole Singularity острый бургер
                </h3>

                <span className={`mb-15 text text_type_main-default ${st.status}`}>
                    Выполнен
                </span>

                <span className={`mb-6 text text_type_main-medium ${st.subtitle}`}>
                    Состав:
                </span>

                <ul className={`${st.orders}`}>
                    <li className={`${st.order}`}>
                        <div className={`${st.imgContainer}`}>
                            <img src="#" alt="#" />
                        </div>

                        <span className={`mr-4 text text_type_main-default ${st.ingredientName}`}>
                            Флюоресцентная булка R2-D3
                        </span>

                        <div className={`${st.priceWrapper}`}>
                            <span className={`mr-1 text text_type_digits-default ${st.count}`}>2</span>
                            <span className={`mr-1 text text_type_main-default ${st.multiplier}`}>х</span>
                            <span className={`mr-2 text text_type_digits-default ${st.price}`}>20</span>

                            <div className={`${st.icon}`}>
                                <CurrencyIcon type="primary" />
                            </div>
                        </div>
                    </li>

                    <li className={`mr-6 ${st.order}`}>
                        <div className={`mr-6 ${st.imgContainer}`}>
                            <img src="#" alt="#" />
                        </div>

                        <span className={`mr-4 text text_type_main-default ${st.ingredientName}`}>
                            Флюоресцентная булка R2-D3
                        </span>

                        <div className={`${st.priceWrapper}`}>
                            <span className={`mr-1 text text_type_digits-default ${st.count}`}>2</span>
                            <span className={`mr-1 text text_type_main-default ${st.multiplier}`}>х</span>
                            <span className={`mr-2 text text_type_digits-default ${st.price}`}>20</span>

                            <div className={`${st.icon}`}>
                                <CurrencyIcon type="primary" />
                            </div>
                        </div>
                    </li>
                </ul>

                <div className={`${st.footer}`}>
                    <span className={`text text_type_main-default text_color_inactive ${st.date}`}>
                        Сегодня, 16:20 i-GMT+3
                    </span>

                    <div className={`${st.totalСost}`}>
                        <span className={`mr-2 text text_type_digits-default ${st.sum}`}>
                            510
                        </span>
                        
                        <div className={`${st.icon}`}>
                            <CurrencyIcon type="primary" />
                        </div>
                    </div>
                </div>
           </div>
       
        {/* } */}

    </>
}

export default OrderIngredientsDetails;