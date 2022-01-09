import { combineReducers } from 'redux';
import { ingridientsReducer } from './state';

export const rootReducer = combineReducers({
    ingridients: ingridientsReducer
}) 