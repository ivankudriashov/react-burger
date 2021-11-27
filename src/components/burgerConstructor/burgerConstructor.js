import React from 'react';
import PropTypes from 'prop-types';

import burgerConstructorStyles from './burgerConstructor.module.css';


import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'

const BurgerConstructor = React.forwardRef(({items, onClick}, ref) => {

    let bun = items.filter(item => item.type === "bun");
    return (
        <section className={`pt-25 ${burgerConstructorStyles.burgerConstructor} `}>
            <div className={`${burgerConstructorStyles.burgerConstructor__wrapper} `} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>  
                <div className={`pl-8 pr-4 ${burgerConstructorStyles.burgerConstructor__bunIngridient} `}>              
                    {bun.map((item) => (
                        <ConstructorElement
                            key={item._id}
                            type="top"
                            isLocked={true}
                            text={`${item.name} (верх)`}
                            price={`${item.price}`}
                            thumbnail={`${item.image}`}
                        />
                    ))}
                </div>
                <ul className={`pr-2 ${burgerConstructorStyles.burgerConstructor__mainIngridients} `}>
                    {items.filter(item => item.type === "main" || item.type === "sauce").map((item) => (
                        <li className={`${burgerConstructorStyles.burgerConstructor__mainIngridient} `} key={item._id}>
                            <DragIcon  type="primary" />
                            <ConstructorElement
                                text={`${item.name}`}
                                price={`${item.price}`}
                                thumbnail={`${item.image}`}
                            />
                        </li>
                    ))}
                </ul>

                <div className={`pl-8 pr-4 ${burgerConstructorStyles.burgerConstructor__bunIngridient} `}>              
                    {bun.map((item) => (
                        <ConstructorElement
                            key={item._id}
                            type="bottom"
                            isLocked={true}
                            text={`${item.name} (низ)`}
                            price={`${item.price}`}
                            thumbnail={`${item.image}`}
                        />
                    ))}
                </div>
            </div>
            <div className={`pr-4 mt-10 ${burgerConstructorStyles.burgerConstructor__order}`}>
                <p className={`text text_type_digits-default ${burgerConstructorStyles.burgerConstructor__count}`}>610</p>
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

BurgerConstructor.propTypes = {
    items: PropTypes.arrayOf(dataPropTypes).isRequired,
    onClick: PropTypes.func.isRequired
};

export default BurgerConstructor;