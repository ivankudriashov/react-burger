import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';

import {store}  from '../store';
import { TActions } from '../reducers/state';

export type RootState = ReturnType<typeof store.getState>;

type TApplicationActions = TActions; 

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>; 

export type AppDispatch = typeof store.dispatch; 


export const GET_ALL_INGRIDIENTS_REQUEST: 'GET_ALL_INGRIDIENTS_REQUEST' = 'GET_ALL_INGRIDIENTS_REQUEST';
export const GET_ALL_INGRIDIENTS_SUCCESS: 'GET_ALL_INGRIDIENTS_SUCCESS' = 'GET_ALL_INGRIDIENTS_SUCCESS';
export const GET_ALL_INGRIDIENTS_FAILED: 'GET_ALL_INGRIDIENTS_FAILED' = 'GET_ALL_INGRIDIENTS_FAILED';

export const GET_ORDER_NUMBER_REQUEST: 'GET_ORDER_NUMBER_REQUEST' = 'GET_ORDER_NUMBER_REQUEST';
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

function checkResponse(res: { ok: boolean; json: () => any; status: any; }) {
  if (res.ok) {
      return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

export function getOrderNumber(orderIngredientsIds: {}) {
  return function(dispatch: (arg0: { type: "GET_ALL_INGRIDIENTS_REQUEST" | "GET_ORDER_NUMBER_SUCCESS" | "CLEAR_CONSTRUCTOR" | "GET_ORDER_NUMBER_FAILED"; orderNumber?: any; }) => void) {
    dispatch({
      type: GET_ALL_INGRIDIENTS_REQUEST
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
        dispatch({
          type: CLEAR_CONSTRUCTOR,
      });
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
}


export function getAllIngridients() {
  return function(dispatch: (arg0: { type: "GET_ORDER_NUMBER_REQUEST" | "GET_ALL_INGRIDIENTS_SUCCESS" | "GET_ALL_INGRIDIENTS_FAILED"; ingridients?: any; }) => void) {
    dispatch({
      type: GET_ORDER_NUMBER_REQUEST
    })
    fetch(`${BASE_URL}/ingredients`)
    .then(checkResponse)
    .then(res => {
      if (res && res.success) {
        dispatch({
          type: GET_ALL_INGRIDIENTS_SUCCESS,
          ingridients: res.data
        })
      } else {
        dispatch({
          type: GET_ALL_INGRIDIENTS_FAILED
        })
      }
    }).catch( err => {
      dispatch({
          type: GET_ALL_INGRIDIENTS_FAILED
      })
    })
  };
}