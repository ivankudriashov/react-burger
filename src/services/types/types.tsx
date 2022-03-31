import {
    TypedUseSelectorHook,
    useDispatch as dispatchHook,
    useSelector as selectorHook
} from 'react-redux';
  
import { AppDispatch, AppThunk, RootState } from '../actions/state';
  

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