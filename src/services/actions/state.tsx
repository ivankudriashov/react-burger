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

export const GET_USER: 'GET_USER' = 'GET_USER';
export const CLEAN_USER: 'CLEAN_USER' = 'CLEAN_USER';

const BASE_URL = 'https://norma.nomoreparties.space/api';

function setCookie(name: string, value: string | boolean , props?: any) {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + '=' + value;
  for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }
  document.cookie = updatedCookie;
} 

export function getCookie(name: string ) {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
} 

function checkResponse(res: Response) {
  if (res.ok) {
      return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

export function deleteCookie(name: string) {
  setCookie(name, false, { expires: -1 });
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


  export const getResetPasswordCode: AppThunk = (email: {email: string;}, setSuccess) => 
  (dispatch: AppDispatch) => {
    // dispatch({
    //   type: GET_ALL_INGRIDIENTS_REQUEST,
    //   ingridientsRequest: false,
    //   ingridientsFailed: false,
    // })
    fetch(`${BASE_URL}/password-reset`, {
                      method: 'POST',
                      headers: {
                          'Content-Type': 'application/json'
                          },
                      body: JSON.stringify(email)
                  })
    .then(checkResponse)
    .then(res => {
      if (res && res.success) {
        // dispatch({
        //   type: GET_ORDER_NUMBER_SUCCESS,
        //   orderNumber: res.order.number
        // })

        setSuccess(true);
  
      } else {
        // dispatch({
        //   type: GET_ORDER_NUMBER_FAILED
        // })
      }
    // }).catch( () => {
    //   dispatch({
    //       type: GET_ORDER_NUMBER_FAILED
    //   })
    })
  };

  export const resetPassword: AppThunk = (data: {password: string, token: string }) => 
  (dispatch: AppDispatch) => {
    // dispatch({
    //   type: GET_ALL_INGRIDIENTS_REQUEST,
    //   ingridientsRequest: false,
    //   ingridientsFailed: false,
    // })
    fetch(`${BASE_URL}/password-reset/reset`, {
                      method: 'POST',
                      headers: {
                          'Content-Type': 'application/json'
                          },
                      body: JSON.stringify(data)
                  })
    .then(checkResponse)
    .then(res => {
      if (res && res.success) {
        // dispatch({
        //   type: GET_ORDER_NUMBER_SUCCESS,
        //   orderNumber: res.order.number
        // })
  
      } else {
        // dispatch({
        //   type: GET_ORDER_NUMBER_FAILED
        // })
      }
    // }).catch( () => {
    //   dispatch({
    //       type: GET_ORDER_NUMBER_FAILED
    //   })
    })
  };

  export const createUser: AppThunk = (form) => 
  (dispatch: AppDispatch) => {
    return fetch(`${BASE_URL}/auth/register`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(form)
                  })
    .then(checkResponse)
    .then(res => {
      if (res && res.success) {
        const authToken = res.accessToken.split('Bearer ')[1];

        setCookie('token', authToken);
        setCookie('refreshToken', res.refreshToken);

        dispatch({
          type: GET_USER,
          email: res.user.email,
          name: res.user.name
        })
  
      } else {
        // dispatch({
        //   type: GET_ORDER_NUMBER_FAILED
        // })
      }
    // }).catch( () => {
    //   dispatch({
    //       type: GET_ORDER_NUMBER_FAILED
    //   })
    })
  };

  export const logIn: AppThunk = (data: {email: string, password: string }) => 
  (dispatch: AppDispatch) => {
    fetch(`${BASE_URL}/auth/login`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
            })
    .then(checkResponse)
    .then(res => {
      if (res && res.success) {
        const authToken = res.accessToken.split('Bearer ')[1];

        setCookie('token', authToken);
        setCookie('refreshToken', res.refreshToken);

        dispatch({
          type: GET_USER,
          email: res.user.email,
          name: res.user.name
        })
      } 
    //   else {
    //     dispatch({
    //       type: GET_ALL_INGRIDIENTS_FAILED,
    //       ingridientsFailed: true, 
    //       ingridientsRequest: false 
    //     })
    //   }
    // }).catch( err => {
    //   dispatch({
    //       type: GET_ALL_INGRIDIENTS_FAILED,
    //       ingridientsFailed: true, 
    //       ingridientsRequest: false 
    //   })
    })
  }

  export const logOut: AppThunk = (refreshToken: string) =>
  (dispatch: AppDispatch) => {
    fetch(`${BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "token": `${refreshToken}`
    } )
    })
    .then(checkResponse)
    .then(res => {
      dispatch({
        type: CLEAN_USER,
        user: null
      })
      deleteCookie('token');
      deleteCookie('refreshToken');

    })
  }

  export const getUserInfo: AppThunk = (accessToken: string, refreshToken: string) => 
  (dispatch: AppDispatch) => {
    fetch(`${BASE_URL}/auth/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': accessToken ? accessToken : ''
      },
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.json());
      })
    .then(res => {
      if (res && res.success) {
        dispatch({
          type: GET_USER,
          email: res.user.email,
          name: res.user.name
        })
      } 
    })
    .catch((err) => {
      return err
    })
    .then((err) => {
      if (err && err.message === 'jwt expired') {
        fetch(`${BASE_URL}/auth/token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "token": `${refreshToken}`
        } )
        })
        .then(checkResponse)
        .then((res) => {
          const authToken = res.accessToken.split('Bearer ')[1];
          const refToken = res.refreshToken;

          setCookie('token', authToken);
          setCookie('refreshToken', res.refreshToken);
          return getUserInfo(authToken, refToken)
        })

      } else {
      }
    })
  }


  export const changeUserData: AppThunk = (accessToken: string, data: {email: string, password: string,  name: string}) => 
  (dispatch: AppDispatch) => {
    fetch(`${BASE_URL}/auth/user`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': accessToken ? accessToken : ''
      },
      body: JSON.stringify(data)
    })
    .then(checkResponse)
    .then(res => {
      if (res && res.success) {
        dispatch({
          type: GET_USER,
          email: res.user.email,
          name: res.user.name
        })
      } 
    })
    .catch((err) => {
    })
    // .then((err) => {
    //   if (err && err.message === 'jwt expired') {
    //     fetch(`${BASE_URL}/auth/token`, {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json'
    //       },
    //       body: JSON.stringify({
    //         "token": `${refreshToken}`
    //     } )
    //     })
    //     .then(checkResponse)
    //     .then((res) => {
    //       const authToken = res.accessToken.split('Bearer ')[1];
    //       const refToken = res.refreshToken;

    //       setCookie('token', authToken);
    //       setCookie('refreshToken', res.refreshToken);

    //       getUserInfo(authToken, refToken)
    //     })

    //     console.log('sss')
    //   } else {
    //     console.log('aaa')
    //   }
    // })
  }

