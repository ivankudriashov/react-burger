import { compose, createStore, applyMiddleware } from 'redux';
import { rootReducer } from './reducers';
import thunk from 'redux-thunk';
import { socketMiddleware } from './middleware';
import { WS_CONNECTION_CLOSE, WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_CONNECTION_START, WS_CONNECTION_SUCCESS, WS_GET_ALL_ORDERS, WS_GET_USER_ORDERS, WS_USER_CONNECTION_CLOSED, WS_USER_CONNECTION_ERROR, WS_USER_CONNECTION_START, WS_USER_CONNECTION_SUCCESS } from './actions/ws';

const wsUrl = 'wss://norma.nomoreparties.space/orders'

const wsAllOrdersActions = {
  wsInit: WS_CONNECTION_START,
  wsClose: WS_CONNECTION_CLOSE,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_ALL_ORDERS
}

const wsUserOrdersActions = {
  wsInit: WS_USER_CONNECTION_START,
  wsClose: WS_CONNECTION_CLOSE,
  onOpen: WS_USER_CONNECTION_SUCCESS,
  onClose: WS_USER_CONNECTION_CLOSED,
  onError: WS_USER_CONNECTION_ERROR,
  onMessage: WS_GET_USER_ORDERS
}


declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ 
    : compose;

const enhancer = composeEnhancers(applyMiddleware(
  thunk, 
  socketMiddleware(wsUrl, wsAllOrdersActions, false),
  socketMiddleware(wsUrl, wsUserOrdersActions, true),
));

export const store = createStore(rootReducer, enhancer);