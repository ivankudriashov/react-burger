import ingredientDetails from './ingredientDetails.module.css';

import { useSelector } from 'react-redux';

const IngredientDetails = () => {

    const { indridientId }  = useSelector(state => state.ingridients);
    const { ingridients } = useSelector(state => state.ingridients);

    const clickedIngridient = ingridients.filter(item => item._id === indridientId);

    return (
        <div className={`pt-10 pb-15 ${ingredientDetails.ingredientDetails}`}>
            <h2 className={`pl-10 text text_type_main-large ${ingredientDetails.title}`}>Детали ингредиента</h2>
            <img className={`mb-4`} src={clickedIngridient[0].image_large} alt={clickedIngridient[0].name} />
            <p className={`mb-8 text text_type_main-medium`}>{clickedIngridient[0].name}</p>
            <ul className={`${ingredientDetails.infoItems}`}>
                <li className={`mr-5 ${ingredientDetails.infoItem}`}>
                    <span className={`text text_type_main-default text_color_inactive mb-2`}>Калории, ккал</span>
                    <span className={`text text_type_digits-default text_color_inactive`}>{clickedIngridient[0].calories}</span>
                </li>
                <li className={`mr-5 ${ingredientDetails.infoItem}`}>
                    <span className={`text text_type_main-default text_color_inactive mb-2`}>Белки, г</span>
                    <span className={`text text_type_digits-default text_color_inactive`}>{clickedIngridient[0].proteins}</span>
                </li>
                <li className={`mr-5 ${ingredientDetails.infoItem}`}>
                    <span className={`text text_type_main-default text_color_inactive mb-2`}>Жиры, г</span>
                    <span className={`text text_type_digits-default text_color_inactive`}>{clickedIngridient[0].fat}</span>
                </li>
                <li className={`${ingredientDetails.infoItem}`}>
                    <span className={`text text_type_main-default text_color_inactive mb-2`}>Углеводы, г</span>
                    <span className={`text text_type_digits-default text_color_inactive`}>{clickedIngridient[0].carbohydrates}</span>
                </li>
            </ul>
        </div>
    )
}

export default IngredientDetails;