import {combineReducers} from 'redux';
import {userReducer} from './user-reducer';
import {statsReducer} from './stats-reducer';

export const appReducer = combineReducers({
  user: userReducer,
  stats: statsReducer,
});
