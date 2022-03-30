import ingredientDetailsPage from './ingredientDetailsPage.module.css';

import IngredientDetails from '../../components/ingredientDetails/ingredientDetails';

import { FC } from 'react';

const IngredientDetailsPage: FC = () => {
    return (
        <div className={`pt-20 ${ingredientDetailsPage.ingredientDetailsPage}`}>
            <IngredientDetails />
        </div>
    )
}

export default IngredientDetailsPage;