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

const initialState = {
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

    order: {},
    orderNumber: ''
  };

export const ingridientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_INGRIDIENTS_REQUEST: {
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
        constructorIngridients: [...state.constructorIngridients].filter(item => item.secondId !== action.secondId),
        otherIngridients: [...state.otherIngridients].filter(item => item.secondId !== action.secondId),
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