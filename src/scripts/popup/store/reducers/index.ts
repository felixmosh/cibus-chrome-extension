import { combineReducers } from 'redux';
import { statsReducer } from './stats-reducer';
import { userReducer } from './user-reducer';

export const appReducer = combineReducers({
  user: userReducer,
  stats: statsReducer,
});
