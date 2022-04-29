import {
    TypedUseSelectorHook,
    useDispatch as dispatchHook,
    useSelector as selectorHook
} from 'react-redux';
  
import { AppDispatch, AppThunk, RootState } from '../actions/state';
import { WS_CONNECTION_CLOSE, WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_CONNECTION_START, WS_CONNECTION_SUCCESS, WS_GET_ALL_ORDERS, WS_GET_USER_ORDERS, WS_USER_CONNECTION_CLOSED, WS_USER_CONNECTION_ERROR, WS_USER_CONNECTION_START, WS_USER_CONNECTION_SUCCESS } from '../actions/ws';

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export const useDispatch = () => dispatchHook<AppDispatch | AppThunk>(); 

export type TItem = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  secondId: string;
}

export type TOrder = {
  createdAt: string;
  ingredients: string[];
  name: string;
  number: number;
  status: string;
  updatedAt: string;
  _id: string;
}

export type TIngredientsInitialState = {
  ingridients: ReadonlyArray<TItem>;
  ingridientsRequest: boolean;
  ingridientsFailed: boolean;
  modalIngredientDetailsOpened: boolean;
  indridientId: string;
}

export type TOrderInitialState = {
  constructorIngridientsId: Array<string>;
  constructorIngridients: ReadonlyArray<TItem>;
  buns: ReadonlyArray<TItem>;
  otherIngridients: ReadonlyArray<TItem>;
  totalPrice: number;
  modalOrderDetailsOpened: boolean;
  orderNumber: string;
}

export type TUserInitialState = {
  user: null | {
    name: string,
    email: string
  };
}

export type TFeedState = {
  wsConnected: boolean,
  orders: Array<TOrder>,
  total: number,
  totalToday: number,
}

export type TItemDrop = {
  item: TItem
}

export type TFunc = {
  onClick: () => void;
}

export type TFuncPreventDefault = {
  onClick: (e: { preventDefault: () => void}) => void;
}

export type TModalProps = {
  onClose: () => void;
} ;

export type TCount = {
  [index: string]: number;
}

export type TWsActionsAll = {
  wsInit: typeof WS_CONNECTION_START | typeof WS_USER_CONNECTION_START,
  wsClose: typeof WS_CONNECTION_CLOSE,
  onOpen: typeof WS_CONNECTION_SUCCESS | typeof WS_USER_CONNECTION_SUCCESS,
  onClose: typeof WS_CONNECTION_CLOSED | typeof WS_USER_CONNECTION_CLOSED,
  onError: typeof WS_CONNECTION_ERROR | typeof WS_USER_CONNECTION_ERROR,
  onMessage: typeof WS_GET_ALL_ORDERS | typeof WS_GET_USER_ORDERS,
}