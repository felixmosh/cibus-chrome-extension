import {combineReducers} from 'redux';
import {userReducer} from './user-reducer';

export const appReducer = combineReducers({
  user: userReducer,
});
