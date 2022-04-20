import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';

import { store }  from '../store';
import { TIngredientActions } from '../reducers/state';
import { TUserActions } from '../reducers/user';
import { rootReducer } from '../reducers';

// export type RootState = ReturnType<typeof store.getState>;
export type RootState = ReturnType<typeof rootReducer>;

type TApplicationActions = TIngredientActions | TUserActions; 

export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>; 

export type AppDispatch = typeof store.dispatch; 

export const GET_ALL_INGRIDIENTS_REQUEST: 'GET_ALL_INGRIDIENTS_REQUEST' = 'GET_ALL_INGRIDIENTS_REQUEST';
export const GET_ALL_INGRIDIENTS_SUCCESS: 'GET_ALL_INGRIDIENTS_SUCCESS' = 'GET_ALL_INGRIDIENTS_SUCCESS';
export const GET_ALL_INGRIDIENTS_FAILED: 'GET_ALL_INGRIDIENTS_FAILED' = 'GET_ALL_INGRIDIENTS_FAILED';

export const OPEN_INGRIDIENT_DATA: 'OPEN_INGRIDIENT_DATA' = 'OPEN_INGRIDIENT_DATA';
export const CLOSE_INGRIDIENT_DATA: 'CLOSE_INGRIDIENT_DATA' = 'CLOSE_INGRIDIENT_DATA';


export const BASE_URL = 'https://norma.nomoreparties.space/api';

export function checkResponse(res: Response) {
  if (res.ok) {
      return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

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

      console.log(err)
      dispatch({
          type: GET_ALL_INGRIDIENTS_FAILED,
          ingridientsFailed: true, 
          ingridientsRequest: false 
      })
    })
  }