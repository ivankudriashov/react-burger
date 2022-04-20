import { AppDispatch, AppThunk, BASE_URL, checkResponse } from "./state";

export const GET_ORDER_NUMBER_SUCCESS: 'GET_ORDER_NUMBER_SUCCESS' = 'GET_ORDER_NUMBER_SUCCESS';
export const GET_ORDER_NUMBER_FAILED: 'GET_ORDER_NUMBER_FAILED' = 'GET_ORDER_NUMBER_FAILED';

export const GET_INGRIDIENTS_IDS: 'GET_INGRIDIENTS_IDS' = 'GET_INGRIDIENTS_IDS';
export const GET_INGRIDIENTS_CONSTRUCTOR: 'GET_INGRIDIENTS_CONSTRUCTOR' = 'GET_INGRIDIENTS_CONSTRUCTOR';
export const GET_BUN_CONSTRUCTOR: 'GET_BUN_CONSTRUCTOR' = 'GET_BUN_CONSTRUCTOR';
export const GET_OTHER_INGRIDIENTS_CONSTRUCTOR: 'GET_OTHER_INGRIDIENTS_CONSTRUCTOR' = 'GET_OTHER_INGRIDIENTS_CONSTRUCTOR';

export const DELETE_INGRIDIENT: 'DELETE_INGRIDIENT' = 'DELETE_INGRIDIENT';

export const GET_TOTAL_PRICE: 'GET_TOTAL_PRICE' = 'GET_TOTAL_PRICE';

export const OPEN_ORDER_DATA: 'OPEN_ORDER_DATA' = 'OPEN_ORDER_DATA';
export const CLOSE_ORDER_DATA: 'CLOSE_ORDER_DATA' = 'CLOSE_ORDER_DATA';

export const GET_ORDER_NUMBER: 'GET_ORDER_NUMBER' = 'GET_ORDER_NUMBER';
export const CONSTRUCTOR_INGREDIENTS_SORT: 'CONSTRUCTOR_INGREDIENTS_SORT' = 'CONSTRUCTOR_INGREDIENTS_SORT';
export const CLEAR_CONSTRUCTOR: 'CLEAR_CONSTRUCTOR' = 'CLEAR_CONSTRUCTOR';


export const getOrderNumber: AppThunk = (orderIngredientsIds: {ingredients: string[];}) => 
(dispatch: AppDispatch) => {
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