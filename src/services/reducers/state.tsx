import {
  GET_ALL_INGRIDIENTS_REQUEST,
  GET_ALL_INGRIDIENTS_SUCCESS,
  GET_ALL_INGRIDIENTS_FAILED,
  
  GET_INGRIDIENTS_IDS,
  GET_BUN_CONSTRUCTOR,
  GET_OTHER_INGRIDIENTS_CONSTRUCTOR,
  GET_INGRIDIENTS_CONSTRUCTOR,
  DELETE_INGRIDIENT,
  GET_TOTAL_PRICE,
  CONSTRUCTOR_INGREDIENTS_SORT,
  CLEAR_CONSTRUCTOR,

  OPEN_INGRIDIENT_DATA,
  CLOSE_INGRIDIENT_DATA,

  OPEN_ORDER_DATA,
  CLOSE_ORDER_DATA,

  GET_ORDER_NUMBER_SUCCESS,
} from '../actions/state';

import { TItem, TInitialState } from '../types/types';

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

interface IOpenOrderDataAction {
  readonly type: typeof OPEN_ORDER_DATA;
  readonly modalOrderDetailsOpened: boolean;
}

interface ICloseOrderDataAction {
  readonly type: typeof CLOSE_ORDER_DATA;
  readonly modalOrderDetailsOpened: boolean;
}

interface IGetTotalPriceAction {
  readonly type: typeof GET_TOTAL_PRICE;
  readonly totalPrice: number;
}

interface IGetOrderNumberSuccessAction {
  readonly type: typeof GET_ORDER_NUMBER_SUCCESS;
  readonly orderNumber: string;
}

interface IGetIngridientsIdsAction {
  readonly type: typeof GET_INGRIDIENTS_IDS;
  readonly constructorIngridientsId: Array<string>;
  readonly constructorIngridientId: Array<string>;
}

interface IGetBunConstructorAction {
  readonly type: typeof GET_BUN_CONSTRUCTOR;
  readonly buns: TItem[];
  readonly bun: TItem;
}

interface IGetIngridientsConstructorAction {
  readonly type: typeof GET_INGRIDIENTS_CONSTRUCTOR;
  readonly constructorIngridients: TItem[];
}

interface IConstructorIngridientsSortAction {
  readonly type: typeof CONSTRUCTOR_INGREDIENTS_SORT;
  readonly otherIngridients: TItem[];
  readonly hoverIndex: number;
  readonly dragIndex: number;
}

interface IGetOtherIngridientsConstructorAction {
  readonly type: typeof GET_OTHER_INGRIDIENTS_CONSTRUCTOR;
  readonly otherIngridients: TItem[];
  readonly otherIngridient: TItem;
}

interface IDeleteIngridientAction {
  readonly type: typeof DELETE_INGRIDIENT;
  readonly constructorIngridients: TItem[];
  readonly otherIngridients: TItem[];
  readonly secondId: string;
}

interface IClearConstructorAction {
  readonly type: typeof CLEAR_CONSTRUCTOR;
  readonly constructorIngridients: TItem[];
  readonly otherIngridients: TItem[];
  readonly buns: TItem[];
}

export type TActions = 
  | IGetAllIngridientsAction
  | IGetAllIngridientsSuccessAction
  | IGetAllIngridientsFailedAction
  | IOpenIngridientDataAction
  | ICloseIngridientDataAction
  | IOpenOrderDataAction
  | ICloseOrderDataAction
  | IGetTotalPriceAction
  | IGetOrderNumberSuccessAction
  | IGetIngridientsIdsAction
  | IGetIngridientsConstructorAction
  | IConstructorIngridientsSortAction
  | IGetOtherIngridientsConstructorAction
  | IDeleteIngridientAction
  | IClearConstructorAction
  | IGetBunConstructorAction;

const initialState: TInitialState = {
    ingridients: [],
    ingridientsRequest: false,
    ingridientsFailed: false,
  
    constructorIngridientsId: [],
    constructorIngridients: [],
    buns: [],
    otherIngridients: [],

    totalPrice: 0,
  
    modalIngredientDetailsOpened: false,
    indridientId: '',

    modalOrderDetailsOpened: false,

    orderNumber: ''
  };

export const ingridientsReducer = (state = initialState, action: TActions): TInitialState => {
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

    case OPEN_ORDER_DATA: {
      return { 
        ...state, 
        modalOrderDetailsOpened: true,
      };
    }
    case CLOSE_ORDER_DATA: {
      return { 
        ...state, 
        modalOrderDetailsOpened: false,
      };
    }

    case GET_TOTAL_PRICE: {
      return { 
        ...state, 
        totalPrice: action.totalPrice,
      };
    }

    case GET_ORDER_NUMBER_SUCCESS: {
      return {
        ...state,
        orderNumber: action.orderNumber
      };
    }

    case GET_INGRIDIENTS_IDS: {
      return {
        ...state,
        constructorIngridientsId: action.constructorIngridientId
      };
    }

    case GET_INGRIDIENTS_CONSTRUCTOR: {
      return {
        ...state,
        constructorIngridients: state.buns.concat(state.otherIngridients),
      };
    }

    case GET_BUN_CONSTRUCTOR: {
      return {
        ...state,
        buns: [action.bun]
      };
    }

    case CONSTRUCTOR_INGREDIENTS_SORT: {
      let sortIngridients = [...state.otherIngridients];
      let otherIngredientsSort = sortIngridients.splice(action.dragIndex, 1);
      sortIngridients.splice(action.hoverIndex, 0, ...otherIngredientsSort);

      return {
        ...state, 
        otherIngridients: sortIngridients
      }
    }

    case GET_OTHER_INGRIDIENTS_CONSTRUCTOR: {
      return {
        ...state,
        otherIngridients: [...state.otherIngridients, action.otherIngridient]
      };
    }

    case DELETE_INGRIDIENT: {
      return {
        ...state,
        constructorIngridients: [...state.constructorIngridients].filter((item: TItem) => item.secondId !== action.secondId),
        otherIngridients: [...state.otherIngridients].filter((item: TItem) => item.secondId !== action.secondId),
      };
    }

    case CLEAR_CONSTRUCTOR: {
      return {
        ...state,
        constructorIngridients: [],
        buns: [],
        otherIngridients: []
      };
    }

    default: {
        return state
    }
  }
} 