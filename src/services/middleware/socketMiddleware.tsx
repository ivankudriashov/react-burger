import { getCookie } from '../actions/user';
import { TWsActions } from '../reducers/ws';
import { TWsActionsAll } from '../types/types';
import { Middleware } from "redux";
import { RootState } from '../actions/state';

export const socketMiddleware = (wsUrl: string | URL, wsActions: TWsActionsAll, token: boolean ) : Middleware<{}, RootState> => {
    return (store) => {
        let socket: WebSocket | null = null;

    return (next) => (action: TWsActions) => {
      const { dispatch } = store;
      const { type } = action;
      const accessToken = getCookie('token');

      const { wsInit, wsClose, onOpen, onClose, onError, onMessage } = wsActions;
 
      if (type === wsInit) {
        socket = token ? new WebSocket(`${wsUrl}?token=${accessToken}`) : new WebSocket(`${wsUrl}/all`);
      }

      if (socket) {

        socket.onopen = event => {
            console.log('success')
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = event => {
            console.log('fail')
            console.log(event)
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = event => {
            console.log('message')

          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          dispatch({ type: onMessage, payload: restParsedData });
        };

        socket.onclose = event => {
          console.log('close')
          dispatch({ type: onClose, payload: event });
        };
      }

      if(wsClose && type === wsClose && socket) {
        socket.close()
      }

      next(action);
    };
    };
}; 