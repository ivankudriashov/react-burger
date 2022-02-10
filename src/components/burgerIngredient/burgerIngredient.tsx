import React, { FC }  from 'react';
import { useDrag } from "react-dnd";
import burgerIngredientStyles from './burgerIngredient.module.css';

import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'

import { useSelector } from '../../services/types/types';

import { TItem } from '../../services/types/types';

const BurgerIngredient: FC<{
    onClick(event: React.MouseEvent<HTMLLIElement>): void
    item: TItem;
    id: string;
}> = ({onClick, item, id}) => {
    const { constructorIngridientsId }  = useSelector(state => state.ingridients);

    function getCount(ingredient: TItem) {
        let count = 0;

        constructorIngridientsId.forEach((id: string) => {
            if (id === ingredient._id) {
                if(ingredient.type === "bun") {
                    count = 2
                } else {
                    count += 1
                }
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
            <Counter count={getCount(item)} size="default" />
            <img className="mr-4 ml-4 mb-2" src={item.image} alt={item.name} />
            <div className={`mb-2 ${burgerIngredientStyles.burgerIngredient__price}`}>
                <p className={`mr-2 text text_type_digits-default`}>{item.price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className="mb-8 text text_type_main-default">{item.name}</p>
        </li>
    );
}

export default BurgerIngredient;