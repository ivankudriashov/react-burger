import { useRef, FC }  from 'react';
import { useDrop, useDrag } from "react-dnd";

import burgerConstructorIngridientStyles from './burgerConstructorIngridient.module.css';

import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { useDispatch } from '../../services/types/types';

import { 
    GET_INGRIDIENTS_CONSTRUCTOR,
    CONSTRUCTOR_INGREDIENTS_SORT
} from '../../services/actions/state';

import { TItem } from '../../services/types/types';

const BurgerConstructorIngridient: FC<{
    deleteIngridient(secondId: string, id: string): void;
    item: TItem;
    id: string,
    index: number
}> = ({deleteIngridient, item, id, index}) => {

    const dispatch = useDispatch();

    const moveIngredient = (dragIndex: number, hoverIndex: number) => {
        dispatch({
            type: CONSTRUCTOR_INGREDIENTS_SORT,
            dragIndex,
            hoverIndex
        });
        
        dispatch({
            type: GET_INGRIDIENTS_CONSTRUCTOR,
        });
    };

    const ref = useRef<HTMLLIElement>(null);

    const [, drop] = useDrop({
        accept: 'sortIngridients-item',
        hover(item: {index: number}, monitor) {
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
            const hoverClientY = clientOffset!.y - hoverBoundingRect.top;
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

    drag(drop(ref));

    return (
        <li ref={ref} className={`${burgerConstructorIngridientStyles.burgerConstructorIngridient}`} >
            <DragIcon  type="primary" />
            <ConstructorElement
                handleClose={() => {
                    deleteIngridient(item.secondId, item._id)
                }}
                text={`${item.name}`}
                price={item.price}
                thumbnail={`${item.image}`}
            />
        </li>
    );
};

export default BurgerConstructorIngridient;