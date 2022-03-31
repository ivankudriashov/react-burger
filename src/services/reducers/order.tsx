import {
    GET_INGRIDIENTS_IDS,
    GET_BUN_CONSTRUCTOR,
    GET_OTHER_INGRIDIENTS_CONSTRUCTOR,
    GET_INGRIDIENTS_CONSTRUCTOR,
    DELETE_INGRIDIENT,
    GET_TOTAL_PRICE,
    CONSTRUCTOR_INGREDIENTS_SORT,
    CLEAR_CONSTRUCTOR,
    OPEN_ORDER_DATA,
    CLOSE_ORDER_DATA,
  
    GET_ORDER_NUMBER_SUCCESS,
    GET_ORDER_NUMBER_FAILED,
} from '../actions/order';
import { TItem, TOrderInitialState } from '../types/types';

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
  
  interface IGetOrderNumberFailedAction {
    readonly type: typeof GET_ORDER_NUMBER_FAILED;
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
    readonly orderNumber: string
  }

  export type TOrderActions = 
  | IOpenOrderDataAction
  | ICloseOrderDataAction
  | IGetTotalPriceAction
  | IGetOrderNumberSuccessAction
  | IGetOrderNumberFailedAction
  | IGetIngridientsIdsAction
  | IGetIngridientsConstructorAction
  | IConstructorIngridientsSortAction
  | IGetOtherIngridientsConstructorAction
  | IDeleteIngridientAction
  | IClearConstructorAction
  | IGetBunConstructorAction;


  const initialState: TOrderInitialState = {  
    constructorIngridientsId: [],
    constructorIngridients: [],
    buns: [],
    otherIngridients: [],

    totalPrice: 0,

    modalOrderDetailsOpened: false,

    orderNumber: '',
  };

  export const orderReducer = (state = initialState, action: TOrderActions): TOrderInitialState => {
    switch (action.type) {
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
  
      case GET_ORDER_NUMBER_FAILED: {
        return {
          ...state
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
          constructorIngridients: [...state.constructorIngridients].filter((item) => item.secondId !== action.secondId),
          otherIngridients: [...state.otherIngridients].filter((item) => item.secondId !== action.secondId),
        };
      }
  
      case CLEAR_CONSTRUCTOR: {
        return {
          ...state,
          constructorIngridients: [],
          buns: [],
          otherIngridients: [],
          orderNumber: ''
        };
      }
  
      default: {
          return state
      }
    }
  } 