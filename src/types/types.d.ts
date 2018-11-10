import {Dispatch} from 'redux';
import {IUserState} from '../scripts/popup/store/reducers/user-reducer';

export interface IReduxProps {
  dispatch?: Dispatch<any>;
}

export interface IAppState {
  user: Partial<IUserState>;
}
