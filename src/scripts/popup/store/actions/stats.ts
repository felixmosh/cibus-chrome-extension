import {IOrder, IUserDetails} from '../../../../types/types';
import { cibusApi } from '../../services/api';

export const StatsActions = {
  SAVE_ORDERS: 'save_orders'
};

function saveOrders(orders: IOrder[]) {
  return {
    type: StatsActions.SAVE_ORDERS,
    value: orders
  };
}

export function getStats(fromDate: Date, toDate: Date, user: IUserDetails) {
  return (dispatch) => {
    cibusApi.getUserOrders(fromDate, toDate, user.token)
      .then((response) => {
        dispatch(saveOrders(response.orders));
      });
  };
}
