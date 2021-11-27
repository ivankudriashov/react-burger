import React from 'react';
import PropTypes from 'prop-types';

import burgerIngredientsStyles from './burgerIngredients.module.css';


import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'

const BurgerIngredients = ({data, onClick}) => {
    const [current, setCurrent] = React.useState('one');

    const refBun = React.createRef();
    const refSauce = React.createRef();
    const refMain = React.createRef();

    return (
        <section className={`mr-10 ml-5 ${burgerIngredientsStyles.burgerIngredients} `}>
            <h1 className="mt-10 mb-5 text text_type_main-large">Соберите бургер</h1>
            <div style={{ display: 'flex' }}>
                <Tab value="one" active={current === 'one'} onClick={(value) => {
                    setCurrent(value);
                    refBun.current.scrollIntoView({behavior: 'smooth'});
                }}>
                    Булки
                </Tab>
                <Tab value="two" active={current === 'two'} onClick={(value) => {
                    setCurrent(value);
                    refSauce.current.scrollIntoView({behavior: 'smooth'});
                }}>
                    Соусы
                </Tab>
                <Tab value="three" active={current === 'three'} onClick={(value) => {
                    setCurrent(value);
                    refMain.current.scrollIntoView({behavior: 'smooth'});
                }}>
                    Начинки
                </Tab>
            </div>

            <div className={`${burgerIngredientsStyles.burgerIngredients__scrollWrapper}`}>
                <div ref={refBun} className={`pt-10 ${burgerIngredientsStyles.burgerIngredients__ingredients}`}>
                    <h2 className={`mb-6 text text_type_main-medium 1`}>Булки</h2>                
                    <ul className={`pl-2 ${burgerIngredientsStyles.burgerIngredients__items}`}>
                        {data.filter(item => item.type === "bun").map((item) => (
                            <li onClick={onClick} id={item._id} className={`mr-2 ml-2 ${burgerIngredientsStyles.burgerIngredients__item}`} key={item._id}>
                                <Counter count={1} size="default" />
                                <img className="mr-4 ml-4 mb-2" src={item.image} alt={item.name} />
                                <div className={`mb-2 ${burgerIngredientsStyles.burgerIngredients__price}`}>
                                    <p className={`mr-2 text text_type_digits-default`}>{item.price}</p>
                                    <CurrencyIcon type="primary" />
                                </div>
                                <p className="mb-8 text text_type_main-default">{item.name}</p>
                            </li>
                        ))}
                    </ul>
                </div>

                <div ref={refSauce} className={`pt-10 ${burgerIngredientsStyles.burgerIngredients__ingredients}`}>
                    <h2 className={`mb-6 text text_type_main-medium 2`}>Соусы</h2>                
                    <ul className={`pl-2 ${burgerIngredientsStyles.burgerIngredients__items}`}>
                        {data.filter(item => item.type === "sauce").map((item) => (
                            <li onClick={onClick} id={item._id} className={`mr-2 ml-2 ${burgerIngredientsStyles.burgerIngredients__item}`} key={item._id}>
                                <Counter count={1} size="default" />
                                <img className="mr-4 ml-4 mb-2" src={item.image} alt={item.name} />
                                <div className={`mb-2 ${burgerIngredientsStyles.burgerIngredients__price}`}>
                                    <p className={`mr-2 text text_type_digits-default`}>{item.price}</p>
                                    <CurrencyIcon type="primary" />
                                </div>
                                <p className={`mb-8 text text_type_main-default ${burgerIngredientsStyles.burgerIngredients__ingredientName}`}>{item.name}</p>
                            </li>
                        ))}
                    </ul>
                </div>

                <div ref={refMain} className={`pt-10 ${burgerIngredientsStyles.burgerIngredients__ingredients}`}>
                    <h2 className={`mb-6 text text_type_main-medium 3`}>Основные ингридиенты</h2>                
                    <ul className={`pl-2 ${burgerIngredientsStyles.burgerIngredients__items}`}>
                        {data.filter(item => item.type === "main").map((item) => (
                            <li onClick={onClick} id={item._id} className={`mr-2 ml-2 ${burgerIngredientsStyles.burgerIngredients__item}`} key={item._id}>
                                <Counter count={1} size="default" />
                                <img className="mr-4 ml-4 mb-2" src={item.image} alt={item.name} />
                                <div className={`mb-2 ${burgerIngredientsStyles.burgerIngredients__price}`}>
                                    <p className={`mr-2 text text_type_digits-default`}>{item.price}</p>
                                    <CurrencyIcon type="primary" />
                                </div>
                                <p className={`mb-8 text text_type_main-default ${burgerIngredientsStyles.burgerIngredients__ingredientName}`}>{item.name}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
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

  BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(dataPropTypes).isRequired,
    onClick: PropTypes.func.isRequired
};


export default BurgerIngredients;