export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_CLOSE: 'WS_CONNECTION_CLOSE' = 'WS_CONNECTION_CLOSE';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_GET_ALL_ORDERS: 'WS_GET_ALL_ORDERS' = 'WS_GET_ALL_ORDERS';

export const WS_USER_CONNECTION_START: 'WS_USER_CONNECTION_START' = 'WS_USER_CONNECTION_START';
export const WS_USER_CONNECTION_SUCCESS: 'WS_USER_CONNECTION_SUCCESS' = 'WS_USER_CONNECTION_SUCCESS';
export const WS_USER_CONNECTION_ERROR: 'WS_USER_CONNECTION_ERROR' = 'WS_USER_CONNECTION_ERROR';
export const WS_USER_CONNECTION_CLOSED: 'WS_USER_CONNECTION_CLOSED' = 'WS_USER_CONNECTION_CLOSED';
export const WS_GET_USER_ORDERS: 'WS_GET_USER_ORDERS' = 'WS_GET_USER_ORDERS';

export const wsConnectionSuccess = () => {
    return {
      type: WS_CONNECTION_SUCCESS
    };
  };
  
  export const wsConnectionError = () => {
    return {
      type: WS_CONNECTION_ERROR
    };
  };
  
  export const wsConnectionClosed = () => {
    return {
      type: WS_CONNECTION_CLOSED
    };
  };
  
  export const wsGetUsersOrders = (message: any) => {
    return {
      type: WS_GET_USER_ORDERS,
      payload: message
    };
  };
  
  export const wsGetAllOrders = (message: any) => {
    return {
      type: WS_GET_ALL_ORDERS,
      payload: message
    };
  };

