import {
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_ALL_ORDERS,
    WS_USER_CONNECTION_SUCCESS,
    WS_USER_CONNECTION_ERROR,
    WS_USER_CONNECTION_CLOSED,
    WS_GET_USER_ORDERS
  } from '../actions/ws';
import { TFeedState, TOrder } from '../types/types';

export interface IWsSuccessAction {
  readonly type: typeof WS_CONNECTION_SUCCESS;
  readonly wsConnected: boolean;
}

export interface IWsErrorAction {
  readonly type: typeof WS_CONNECTION_ERROR;
  readonly wsConnected: boolean;
}

export interface IWsClosedAction {
  readonly type: typeof WS_CONNECTION_CLOSED;
  readonly wsConnected: boolean;
}

export interface IWsGetAction {
  readonly payload: any;
  readonly type: typeof WS_GET_ALL_ORDERS;
  orders: ReadonlyArray<TOrder>,
  readonly total: number;
  readonly totalToday: number;
}

export interface IWsUserSuccessAction {
  readonly type: typeof WS_USER_CONNECTION_SUCCESS;
  readonly wsConnected: boolean;
}

export interface IWsUserErrorAction {
  readonly type: typeof WS_USER_CONNECTION_ERROR;
  readonly wsConnected: boolean;
}

export interface IWsUserClosedAction {
  readonly type: typeof WS_USER_CONNECTION_CLOSED;
  readonly wsConnected: boolean;
}

export interface IWsUserGetAction {
  readonly type: typeof WS_GET_USER_ORDERS;
  orders: ReadonlyArray<TOrder>,
  readonly total: number;
  readonly totalToday: number;
  readonly payload: any
}

export type TUserActions = 
  | IWsSuccessAction
  | IWsErrorAction
  | IWsClosedAction
  | IWsGetAction
  | IWsUserSuccessAction
  | IWsUserErrorAction
  | IWsUserClosedAction
  | IWsUserGetAction;

  const initialState: TFeedState = {
    wsConnected: false,
    orders: [],
    total: 0,
    totalToday: 0,
  };
  
  export const wsReducer = (state = initialState, action: TUserActions): TFeedState => {
    switch (action.type) {
      case WS_CONNECTION_SUCCESS:
        return {
          ...state,
          wsConnected: true
        };
  
      case WS_CONNECTION_ERROR:
        return {
          ...state,
          wsConnected: false
        };
  
      case WS_CONNECTION_CLOSED:
        return {
          ...state,
          wsConnected: false
        };
  
      case WS_GET_ALL_ORDERS:
        return {
          ...state,
          orders: [action.payload.orders][0],
          total: action.payload.total,
          totalToday: action.payload.totalToday,
        };

        case WS_USER_CONNECTION_SUCCESS:
        return {
          ...state,
          wsConnected: true
        };
  
      case WS_USER_CONNECTION_ERROR:
        return {
          ...state,
          wsConnected: false
        };
  
      case WS_USER_CONNECTION_CLOSED:
        return {
          ...state,
          wsConnected: false
        };
  
      case WS_GET_USER_ORDERS:
        return {
          ...state,
          orders: [action.payload.orders][0],
          total: action.payload.total,
          totalToday: action.payload.totalToday,
        };

      default:
        return state;
    }
  };