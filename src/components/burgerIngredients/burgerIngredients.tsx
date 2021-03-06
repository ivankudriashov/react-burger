import React, { useState, useRef, FC } from 'react';

import burgerIngredientsStyles from './burgerIngredients.module.css';

import BurgerIngredient from '../burgerIngredient/burgerIngredient';

import { Tab} from '@ya.praktikum/react-developer-burger-ui-components'

import { useSelector } from '../../services/types/types';

const BurgerIngredients: FC<{
    onClick(event: React.MouseEvent<HTMLLIElement>): void;
}> = ({onClick}) => {
    const [current, setCurrent] = useState('one');

    const { ingridients } = useSelector(state => state.ingridients);

    const refBun = useRef<HTMLDivElement>(null);
    const refSauce = useRef<HTMLDivElement>(null);
    const refMain = useRef<HTMLDivElement>(null);

    const scrollTab = (e: React.MouseEvent<HTMLDivElement> & { target: { getBoundingClientRect: () => { (): any; new(): any; top: any; }; }; }) => {
        const listTop = e.target.getBoundingClientRect().top;

        const bunTop = refBun.current!.getBoundingClientRect().top;
        const bunBottom = refBun.current!.getBoundingClientRect().bottom;
        const sauceTop = refSauce.current!.getBoundingClientRect().top;
        const sauceBottom = refSauce.current!.getBoundingClientRect().bottom;
        const mainTop = refMain.current!.getBoundingClientRect().top;
        const mainBottom = refMain.current!.getBoundingClientRect().bottom;

        if (listTop >= bunTop && listTop < bunBottom) {
            setCurrent('one');
        } else if (listTop >= sauceTop && listTop < sauceBottom) {
            setCurrent('two');
        } else if (listTop >= mainTop && listTop < mainBottom) {
            setCurrent('three');
        }
    }

    return (
        <section className={`mr-10 ml-5 ${burgerIngredientsStyles.burgerIngredients} `}>
            <h1 className="mt-10 mb-5 text text_type_main-large">Соберите бургер</h1>
            <div style={{ display: 'flex' }}>
                <Tab value="one" active={current === 'one'} onClick={(value) => {
                    setCurrent(value);
                    refBun.current?.scrollIntoView({behavior: 'smooth'});
                }}>
                    Булки
                </Tab>
                <Tab value="two" active={current === 'two'} onClick={(value) => {
                    setCurrent(value);
                    refSauce.current?.scrollIntoView({behavior: 'smooth'});
                }}>
                    Соусы
                </Tab>
                <Tab value="three" active={current === 'three'} onClick={(value) => {
                    setCurrent(value);
                    refMain.current?.scrollIntoView({behavior: 'smooth'});
                }}>
                    Начинки
                </Tab>
            </div>

            <div className={`${burgerIngredientsStyles.burgerIngredients__scrollWrapper}`} onScroll={scrollTab}>
                <div ref={refBun} className={`pt-10 ${burgerIngredientsStyles.burgerIngredients__ingredients}`}>
                    <h2 className={`mb-6 text text_type_main-medium 1`}>Булки</h2>
                    <ul className={`pl-2 ${burgerIngredientsStyles.burgerIngredients__items}`}>
                        {ingridients.filter((item) => item.type === "bun").map((item) => (
                            <BurgerIngredient onClick={onClick} item={item} key={item._id} id={item._id}/>
                        ))} 
                    </ul>
                </div>

                <div ref={refSauce} className={`pt-10 ${burgerIngredientsStyles.burgerIngredients__ingredients}`}>
                    <h2 className={`mb-6 text text_type_main-medium 2`}>Соусы</h2>                
                    <ul className={`pl-2 ${burgerIngredientsStyles.burgerIngredients__items}`}>
                        {ingridients.filter((item) => item.type === "sauce").map((item) => (
                            <BurgerIngredient onClick={onClick} item={item} key={item._id} id={item._id}/>
                        ))}
                    </ul> 
                </div>

                <div ref={refMain} className={`pt-10 ${burgerIngredientsStyles.burgerIngredients__ingredients}`}>
                    <h2 className={`mb-6 text text_type_main-medium 3`}>Основные ингридиенты</h2>                
                    <ul className={`pl-2 ${burgerIngredientsStyles.burgerIngredients__items}`}>
                        {ingridients.filter((item) => item.type === "main").map((item) => (
                            <BurgerIngredient onClick={onClick} item={item} key={item._id} id={item._id}/>
                        ))}
                    </ul> 
                </div>
            </div>
        </section>
    );
}

export default BurgerIngredients;