import {
  GET_ALL_INGRIDIENTS_REQUEST,
  GET_ALL_INGRIDIENTS_SUCCESS,
  GET_ALL_INGRIDIENTS_FAILED,

  OPEN_INGRIDIENT_DATA,
  CLOSE_INGRIDIENT_DATA,

} from '../actions/state';

import { TItem, TIngredientsInitialState } from '../types/types';

interface IGetAllIngridientsAction  {
  readonly type: typeof GET_ALL_INGRIDIENTS_REQUEST;
  readonly ingridientsRequest: boolean;
  readonly ingridientsFailed: boolean;
}

interface IGetAllIngridientsSuccessAction  {
  readonly type: typeof GET_ALL_INGRIDIENTS_SUCCESS;
  readonly ingridients: TItem[];
  readonly ingridientsRequest: boolean;
  readonly ingridientsFailed: boolean;
}

interface IGetAllIngridientsFailedAction {
  readonly type: typeof GET_ALL_INGRIDIENTS_FAILED;
  readonly ingridientsRequest: boolean;
  readonly ingridientsFailed: boolean;
}

interface IOpenIngridientDataAction {
  readonly type: typeof OPEN_INGRIDIENT_DATA;
  readonly modalIngredientDetailsOpened: boolean;
  readonly indridientId: string;
}

interface ICloseIngridientDataAction {
  readonly type: typeof CLOSE_INGRIDIENT_DATA;
  readonly modalIngredientDetailsOpened: boolean;
  readonly indridientId: string;
}

export type TIngredientActions = 
  | IGetAllIngridientsAction
  | IGetAllIngridientsSuccessAction
  | IGetAllIngridientsFailedAction
  | IOpenIngridientDataAction
  | ICloseIngridientDataAction;

const initialState: TIngredientsInitialState = {
    ingridients: [],
    ingridientsRequest: false,
    ingridientsFailed: false,
    modalIngredientDetailsOpened: false,
    indridientId: '',
  };

export const ingridientsReducer = (state = initialState, action: TIngredientActions): TIngredientsInitialState => {
  switch (action.type) {
    case GET_ALL_INGRIDIENTS_REQUEST:{
      return {
        ...state,
        ingridientsRequest: true,
        ingridientsFailed: false,
      };
    }
    case GET_ALL_INGRIDIENTS_SUCCESS: {
      return { 
        ...state, 
        ingridients: action.ingridients, 
        ingridientsRequest: false,
        ingridientsFailed: false,
      };
    }
    case GET_ALL_INGRIDIENTS_FAILED: {
      return { 
        ...state, 
        ingridientsFailed: true, 
        ingridientsRequest: false 
      };
    }

    case OPEN_INGRIDIENT_DATA: {
      return { 
        ...state, 
        modalIngredientDetailsOpened: true,
        indridientId: action.indridientId
      };
    }
    case CLOSE_INGRIDIENT_DATA: {
      return { 
        ...state, 
        modalIngredientDetailsOpened: false,
        indridientId: ''
      };
    }

    default: {
        return state
    }
  }
} 
