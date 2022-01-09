import React, { useRef }  from 'react';
import PropTypes from 'prop-types';
import { useDrop, useDrag } from "react-dnd";

import burgerConstructorIngridientStyles from './burgerConstructorIngridient.module.css';

import { ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';

import { useDispatch } from 'react-redux';

import {ingredientType} from '../utils/types';

import { 
    GET_INGRIDIENTS_CONSTRUCTOR,
    CONSTRUCTOR_INGREDIENTS_SORT
 } from '../../services/actions/state';

const BurgerConstructorIngridient = ({deleteIngridient, item, id, index}) => {

    const dispatch = useDispatch();

    const moveIngredient = (dragIndex, hoverIndex) => {
        dispatch({
            type: CONSTRUCTOR_INGREDIENTS_SORT,
            dragIndex,
            hoverIndex
        });
        
        dispatch({
            type: GET_INGRIDIENTS_CONSTRUCTOR,
        });
    };

    const ref = useRef(null);
    const [, drop] = useDrop({
        accept: 'sortIngridients-item',
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) {
                return;
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            moveIngredient(dragIndex, hoverIndex);

            item.index = hoverIndex;
        },
    });

    const [, drag] = useDrag({
        type: 'sortIngridients-item',
        item: () => {
            return { id, index };
        },
    });

    const dragDropRef = drag(drop(ref));

    return (
        <li ref={dragDropRef} className={`${burgerConstructorIngridientStyles.burgerConstructorIngridient}`} >
            <DragIcon  type="primary" />
            <ConstructorElement
                handleClose={() => {
                    deleteIngridient(item.secondId, item._id)
                }}
                text={`${item.name}`}
                price={`${item.price}`}
                thumbnail={`${item.image}`}
            />
        </li>
    );
};

BurgerConstructorIngridient.propTypes = {
    deleteIngridient: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    item: ingredientType.isRequired,
};

export default BurgerConstructorIngridient;