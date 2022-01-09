import { useDrag } from "react-dnd";
import PropTypes from 'prop-types';
import burgerIngredientStyles from './burgerIngredient.module.css';

import { useSelector } from 'react-redux';

import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'

const BurgerIngredient = ({onClick, item, id}) => {
    const { constructorIngridientsId }  = useSelector(state => state.ingridients);

    function getCount(id) {
        let count = 0;

        constructorIngridientsId.forEach(item => {
            if (item === id) {
                count += 1
            }
        })

        return count;
    }

    const [, dragRef] = useDrag({
        type: "ingredient",
        item: {item}
    });

    return (
            <li ref={dragRef} onClick={onClick} key={item._id} id={id} className={`mr-2 ml-2 ${burgerIngredientStyles.burgerIngredient}`} >
                <Counter count={getCount(item._id)} size="default" />
                <img className="mr-4 ml-4 mb-2" src={item.image} alt={item.name} />
                <div className={`mb-2 ${burgerIngredientStyles.burgerIngredient__price}`}>
                    <p className={`mr-2 text text_type_digits-default`}>{item.price}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <p className="mb-8 text text_type_main-default">{item.name}</p>
            </li>
    );
}

BurgerIngredient.propTypes = {
    onClick: PropTypes.func.isRequired,
    item: PropTypes.shape({
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
      }).isRequired,
    id: PropTypes.string.isRequired,
};

export default BurgerIngredient;