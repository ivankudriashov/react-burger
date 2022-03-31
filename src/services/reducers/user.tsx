import {  
    GET_USER,
    CLEAN_USER
  } from '../actions/user';
  
import { TUserInitialState } from '../types/types';

export interface IUserRegistrationAction {
    readonly type: typeof GET_USER;
    readonly name: string;
    readonly email: string;
}

export interface IUserLogOutAction {
    readonly type: typeof CLEAN_USER;
    readonly user: null;
}

const initialState: TUserInitialState = {
    user: null
  };

export type TUserActions = 
    | IUserRegistrationAction
    | IUserLogOutAction;

export const userReducer = (state = initialState, action: TUserActions): TUserInitialState => {
    switch (action.type) {
      case GET_USER: {
        return {
          ...state,
          user: {
            name: action.name,
            email: action.email
          }
        };
      }
  
      case CLEAN_USER: {
        return {
          ...state,
          user: action.user,
        };
      }
  
      default: {
          return state
      }
    }
  } 