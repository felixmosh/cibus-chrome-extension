import { Dispatch } from 'redux';
import { IUserState } from '../scripts/popup/store/reducers/user-reducer';
import { IStatsState } from '../scripts/popup/store/reducers/stats-reducer';

export interface IReduxProps {
  dispatch?: Dispatch<any>;
}

export interface IAction {
  type: string;
  value: any;
}

export interface IAppState {
  user: IUserState;
  stats: IStatsState;
}

export interface IUserDetails {
  token: string;
  firstname: string;
  lastname: string;
  id: number;
  company_id: number;
}

export interface IOrderDay {
  date: Date;
  orders: IOrder[];
  total: number;
}

export interface IOrder {
  date: Date;
  price: number;
  restaurantName: string;
}
