import PropTypes from 'prop-types';

import ingredientDetails from './ingredientDetails.module.css';

const IngredientDetails = ({ingridients, selectedIngredientId}) => {
    
    let a = ingridients.filter(item => item._id === selectedIngredientId);

    return (
        <div className={`pt-10 pb-15 ${ingredientDetails.ingredientDetails}`}>
            <h2 className={`pl-10 text text_type_main-large ${ingredientDetails.title}`}>Детали ингредиента</h2>
            <img className={`mb-4`} src={a[0].image_large} alt="" />
            <p className={`mb-8 text text_type_main-medium`}>{a[0].name}</p>
            <ul className={`${ingredientDetails.infoItems}`}>
                <li className={`mr-5 ${ingredientDetails.infoItem}`}>
                    <span className={`text text_type_main-default text_color_inactive mb-2`}>Калории, ккал</span>
                    <span className={`text text_type_digits-default text_color_inactive`}>{a[0].calories}</span>
                </li>
                <li className={`mr-5 ${ingredientDetails.infoItem}`}>
                    <span className={`text text_type_main-default text_color_inactive mb-2`}>Белки, г</span>
                    <span className={`text text_type_digits-default text_color_inactive`}>{a[0].proteins}</span>
                </li>
                <li className={`mr-5 ${ingredientDetails.infoItem}`}>
                    <span className={`text text_type_main-default text_color_inactive mb-2`}>Жиры, г</span>
                    <span className={`text text_type_digits-default text_color_inactive`}>{a[0].fat}</span>
                </li>
                <li className={`${ingredientDetails.infoItem}`}>
                    <span className={`text text_type_main-default text_color_inactive mb-2`}>Углеводы, г</span>
                    <span className={`text text_type_digits-default text_color_inactive`}>{a[0].carbohydrates}</span>
                </li>
            </ul>
        </div>
    )
}

const dataPropTypes = PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number,
    image: PropTypes.string,
    image_mobile: PropTypes.string,
    image_large: PropTypes.string,
    __v: PropTypes.number
});

IngredientDetails.propTypes = {
    ingridients: PropTypes.arrayOf(dataPropTypes).isRequired,
    selectedIngredientId: PropTypes.string.isRequired
};


export default IngredientDetails;