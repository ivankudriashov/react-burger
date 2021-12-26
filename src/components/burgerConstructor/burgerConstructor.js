import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import burgerConstructorStyles from './burgerConstructor.module.css';

import { BurgerContext } from '../utils/appContext';

import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'

const BurgerConstructor = React.forwardRef(({onClick, totalPrice}, ref) => {

    const { ingridients } = useContext(BurgerContext);

    const bun = ingridients.find((item) => item.type === "bun");

    return (
        <section className={`pt-25 ${burgerConstructorStyles.burgerConstructor} `}>
            <div className={`${burgerConstructorStyles.burgerConstructor__wrapper} `} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>  
                {bun && <div className={`pl-8 pr-4 ${burgerConstructorStyles.burgerConstructor__bunIngridient} `}>              
                    
                        <ConstructorElement
                            key={bun._id}
                            type="top"
                            isLocked={true}
                            text={`${bun.name} (верх)`}
                            price={`${bun.price}`}
                            thumbnail={`${bun.image}`}
                        />
                    
                </div>}
                { ingridients && <ul className={`pr-2 ${burgerConstructorStyles.burgerConstructor__mainIngridients} `}>
                    {ingridients.filter(item => item.type === "main" || item.type === "sauce").map((item) => (
                        <li className={`${burgerConstructorStyles.burgerConstructor__mainIngridient} `} key={item._id}>
                            <DragIcon  type="primary" />
                            <ConstructorElement
                                text={`${item.name}`}
                                price={`${item.price}`}
                                thumbnail={`${item.image}`}
                            />
                        </li>
                    ))}
                </ul> }

                {bun && <div className={`pl-8 pr-4 ${burgerConstructorStyles.burgerConstructor__bunIngridient} `}>
                        <ConstructorElement
                            key={bun._id}
                            type="bottom"
                            isLocked={true}
                            text={`${bun.name} (низ)`}
                            price={`${bun.price}`}
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

BurgerConstructor.propTypes = {
    onClick: PropTypes.func.isRequired
};

export default BurgerConstructor;