import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';

import { store }  from '../store';
import { TActions } from '../reducers/state';

export type RootState = ReturnType<typeof store.getState>;

type TApplicationActions = TActions; 

export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>; 

export type AppDispatch = typeof store.dispatch; 

export const GET_ALL_INGRIDIENTS_REQUEST: 'GET_ALL_INGRIDIENTS_REQUEST' = 'GET_ALL_INGRIDIENTS_REQUEST';
export const GET_ALL_INGRIDIENTS_SUCCESS: 'GET_ALL_INGRIDIENTS_SUCCESS' = 'GET_ALL_INGRIDIENTS_SUCCESS';
export const GET_ALL_INGRIDIENTS_FAILED: 'GET_ALL_INGRIDIENTS_FAILED' = 'GET_ALL_INGRIDIENTS_FAILED';

export const GET_ORDER_NUMBER_SUCCESS: 'GET_ORDER_NUMBER_SUCCESS' = 'GET_ORDER_NUMBER_SUCCESS';
export const GET_ORDER_NUMBER_FAILED: 'GET_ORDER_NUMBER_FAILED' = 'GET_ORDER_NUMBER_FAILED';

export const GET_INGRIDIENTS_IDS: 'GET_INGRIDIENTS_IDS' = 'GET_INGRIDIENTS_IDS';
export const GET_INGRIDIENTS_CONSTRUCTOR: 'GET_INGRIDIENTS_CONSTRUCTOR' = 'GET_INGRIDIENTS_CONSTRUCTOR';
export const GET_BUN_CONSTRUCTOR: 'GET_BUN_CONSTRUCTOR' = 'GET_BUN_CONSTRUCTOR';
export const GET_OTHER_INGRIDIENTS_CONSTRUCTOR: 'GET_OTHER_INGRIDIENTS_CONSTRUCTOR' = 'GET_OTHER_INGRIDIENTS_CONSTRUCTOR';

export const DELETE_INGRIDIENT: 'DELETE_INGRIDIENT' = 'DELETE_INGRIDIENT';

export const GET_TOTAL_PRICE: 'GET_TOTAL_PRICE' = 'GET_TOTAL_PRICE';

export const OPEN_INGRIDIENT_DATA: 'OPEN_INGRIDIENT_DATA' = 'OPEN_INGRIDIENT_DATA';
export const CLOSE_INGRIDIENT_DATA: 'CLOSE_INGRIDIENT_DATA' = 'CLOSE_INGRIDIENT_DATA';

export const OPEN_ORDER_DATA: 'OPEN_ORDER_DATA' = 'OPEN_ORDER_DATA';
export const CLOSE_ORDER_DATA: 'CLOSE_ORDER_DATA' = 'CLOSE_ORDER_DATA';

export const GET_ORDER_NUMBER: 'GET_ORDER_NUMBER' = 'GET_ORDER_NUMBER';
export const CONSTRUCTOR_INGREDIENTS_SORT: 'CONSTRUCTOR_INGREDIENTS_SORT' = 'CONSTRUCTOR_INGREDIENTS_SORT';
export const CLEAR_CONSTRUCTOR: 'CLEAR_CONSTRUCTOR' = 'CLEAR_CONSTRUCTOR';

const BASE_URL = 'https://norma.nomoreparties.space/api';

function checkResponse(res: Response) {
  if (res.ok) {
      return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

export const getOrderNumber: AppThunk = (orderIngredientsIds: {ingredients: string[];}) => 
(dispatch: AppDispatch) => {
  dispatch({
    type: GET_ALL_INGRIDIENTS_REQUEST,
    ingridientsRequest: false,
    ingridientsFailed: false,
  })
  fetch(`${BASE_URL}/orders`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                        },
                    body: JSON.stringify(orderIngredientsIds)
                })
  .then(checkResponse)
  .then(res => {
    if (res && res.success) {
      dispatch({
        type: GET_ORDER_NUMBER_SUCCESS,
        orderNumber: res.order.number
      })
    } else {
      dispatch({
        type: GET_ORDER_NUMBER_FAILED
      })
    }
  }).catch( () => {
    dispatch({
        type: GET_ORDER_NUMBER_FAILED
    })
  })
};


export const getAllIngridients: AppThunk = () => 
  (dispatch: AppDispatch) => {
    fetch(`${BASE_URL}/ingredients`)
    .then(checkResponse)
    .then(res => {
      if (res && res.success) {
        dispatch({
          type: GET_ALL_INGRIDIENTS_SUCCESS,
          ingridients: res.data,
          ingridientsRequest: false,
          ingridientsFailed: false,
        })
      } else {
        dispatch({
          type: GET_ALL_INGRIDIENTS_FAILED,
          ingridientsFailed: true, 
          ingridientsRequest: false 
        })
      }
    }).catch( err => {
      dispatch({
          type: GET_ALL_INGRIDIENTS_FAILED,
          ingridientsFailed: true, 
          ingridientsRequest: false 
      })
    })
  }