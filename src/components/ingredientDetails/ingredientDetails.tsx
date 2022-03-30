import ingredientDetails from './ingredientDetails.module.css';

import { TItem, useSelector } from '../../services/types/types';
import { useParams } from 'react-router-dom';
import { FC, useEffect, useState } from 'react';

const IngredientDetails: FC = () => {

    const { ingridients } = useSelector(state => state.ingridients);
    const [clickedIngridient, setClickedIngridient] = useState<TItem | undefined>();

    const params: {id: string} = useParams();

    useEffect(() => {
        const sortedIngridient = ingridients.find((item) => item._id === params.id);

        setClickedIngridient(sortedIngridient)
      }, [ingridients, params.id])

    

    return  <>
        { 
            clickedIngridient && (
                <div className={`pt-10 pb-15 ${ingredientDetails.ingredientDetails}`}>
                <h2 className={`pl-10 text text_type_main-large ${ingredientDetails.title}`}>Детали ингредиента</h2>
                <img className={`mb-4`} src={clickedIngridient.image_large} alt={clickedIngridient.name} />
                <p className={`mb-8 text text_type_main-medium`}>{clickedIngridient.name}</p>
                <ul className={`${ingredientDetails.infoItems}`}>
                    <li className={`mr-5 ${ingredientDetails.infoItem}`}>
                        <span className={`text text_type_main-default text_color_inactive mb-2`}>Калории, ккал</span>
                        <span className={`text text_type_digits-default text_color_inactive`}>{clickedIngridient.calories}</span>
                    </li>
                    <li className={`mr-5 ${ingredientDetails.infoItem}`}>
                        <span className={`text text_type_main-default text_color_inactive mb-2`}>Белки, г</span>
                        <span className={`text text_type_digits-default text_color_inactive`}>{clickedIngridient.proteins}</span>
                    </li>
                    <li className={`mr-5 ${ingredientDetails.infoItem}`}>
                        <span className={`text text_type_main-default text_color_inactive mb-2`}>Жиры, г</span>
                        <span className={`text text_type_digits-default text_color_inactive`}>{clickedIngridient.fat}</span>
                    </li>
                    <li className={`${ingredientDetails.infoItem}`}>
                        <span className={`text text_type_main-default text_color_inactive mb-2`}>Углеводы, г</span>
                        <span className={`text text_type_digits-default text_color_inactive`}>{clickedIngridient.carbohydrates}</span>
                    </li>
                </ul>
            </div>
        )}

    </>
}

export default IngredientDetails;