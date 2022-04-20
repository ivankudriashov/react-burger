import { combineReducers } from 'redux';
import { orderReducer } from './order';
import { ingridientsReducer } from './state';
import { userReducer } from './user';
import { wsReducer } from './ws';

export const rootReducer = combineReducers({
    ingridients: ingridientsReducer,
    user: userReducer,
    order: orderReducer,
    ws: wsReducer,
}) 