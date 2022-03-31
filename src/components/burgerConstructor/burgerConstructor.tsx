import React, { useEffect }  from 'react';
import { useDrop } from "react-dnd";

import burgerConstructorStyles from './burgerConstructor.module.css';

import BurgerConstructorIngridient from '../burgerConstructorIngridient/burgerConstructorIngridient';

import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import { useSelector, useDispatch, TFuncPreventDefault, TItemDrop } from '../../services/types/types';

import { 
    GET_TOTAL_PRICE, 
    DELETE_INGRIDIENT, 
    GET_INGRIDIENTS_IDS,
    GET_BUN_CONSTRUCTOR,
    GET_OTHER_INGRIDIENTS_CONSTRUCTOR,
    GET_INGRIDIENTS_CONSTRUCTOR 
} from '../../services/actions/order';

const BurgerConstructor = React.forwardRef<HTMLDivElement, TFuncPreventDefault>(({onClick}, ref) => {

    const { ingridients }  = useSelector(state => state.ingridients);
    const { constructorIngridients }  = useSelector(state => state.order);
    const { totalPrice }  = useSelector(state => state.order);

    const dispatch = useDispatch();

    const bun = constructorIngridients.find((item: { type: string; }) => item.type === "bun");

    function deleteIngridient(secondId: string, id: string) {
        dispatch({
            type: DELETE_INGRIDIENT,
            secondId,
            id
        });
    } 

    const draggableIngredient = (id: string) => {
        ingridients.forEach((ingridient: { _id: string; type: string; }) => {
            if (ingridient._id === id) {

                 if (ingridient.type === 'bun') {
                    dispatch({
                        type: GET_BUN_CONSTRUCTOR,
                        bun: ingridient
                    });

                    dispatch({
                        type: GET_INGRIDIENTS_CONSTRUCTOR,
                    });
                } else if (constructorIngridients[0]) {
                    const uid = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

                    dispatch({
                        type: GET_OTHER_INGRIDIENTS_CONSTRUCTOR,
                        otherIngridient: {...ingridient, secondId: uid()}
                    });

                    dispatch({
                        type: GET_INGRIDIENTS_CONSTRUCTOR,
                    });
                }
            }
        })
    }

    const [, dropTarget] = useDrop({
        accept: "ingredient",
        drop({item}: TItemDrop) {
            draggableIngredient(item._id)
        },
    });

    useEffect(
        () => {
            let total = 0;
            constructorIngridients.map((item) => (total += item.price));
            dispatch({
                type: GET_TOTAL_PRICE,
                totalPrice: total
            });

            let ids: string[] = []
            constructorIngridients.forEach((ingridient: { _id: string; }, index: number) => {
                ids[index] = ingridient._id
            })

            dispatch({
                type: GET_INGRIDIENTS_IDS,
                constructorIngridientId: ids
            });
        },
        [dispatch, constructorIngridients]
    );

    return (
        <section className={`pt-25 ${burgerConstructorStyles.burgerConstructor} `}>
            <div ref={dropTarget} className={`${burgerConstructorStyles.burgerConstructor__wrapper} `} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>  
                {bun && <div className={`pl-8 pr-4 ${burgerConstructorStyles.burgerConstructor__bunIngridient} `}>
                    <ConstructorElement
                        key={bun.secondId}
                        type="top"
                        isLocked={true}
                        text={`${bun.name} (верх)`}
                        price={bun.price}
                        thumbnail={`${bun.image}`}
                    />
                    
                </div>}
                { ingridients && <ul className={`pr-2 ${burgerConstructorStyles.burgerConstructor__mainIngridients} `}>
                    {constructorIngridients.filter((item) => item.type === "main" || item.type === "sauce").map((item, index) => (
                        <BurgerConstructorIngridient item={item} deleteIngridient={deleteIngridient} key={item.secondId} index={index} id={item._id}/>
                    ))}
                </ul> }

                {bun && <div className={`pl-8 pr-4 ${burgerConstructorStyles.burgerConstructor__bunIngridient} `}>
                        <ConstructorElement
                            key={bun.secondId}
                            type="bottom"
                            isLocked={true}
                            text={`${bun.name} (низ)`}
                            price={bun.price}
                            thumbnail={`${bun.image}`}
                        />
                </div>}
            </div>
            <div className={`pr-4 mt-10 ${burgerConstructorStyles.burgerConstructor__order}`}>
               {totalPrice && <p className={`text text_type_digits-default ${burgerConstructorStyles.burgerConstructor__count}`}>{totalPrice}</p>}
                <div className={`mr-10 ${burgerConstructorStyles.burgerConstructor__icon}`}>
                    <CurrencyIcon type="primary" />
                </div>

                <div ref={ref}>
                    <Button onClick={onClick} type="primary" size="large">
                        Оформить заказ
                    </Button>
                </div>
                
            </div>
        </section>
    );
});

export default BurgerConstructor;