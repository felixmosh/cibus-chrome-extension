import { IAppState, IOrder, IUserDetails } from '../../../../types/types';
import { cibusApi } from '../../services/api';

export const StatsActions = {
  SAVE_ORDERS: 'save_orders',
  UPDATE_MONTH_BY: 'update_month_by'
};

function saveOrders(orders: IOrder[]) {
  return {
    type: StatsActions.SAVE_ORDERS,
    value: orders
  };
}

function updateMonthBy(monthBias: number) {
  return {
    type: StatsActions.UPDATE_MONTH_BY,
    value: monthBias
  };
}

export function getStats(fromDate: Date, toDate: Date, user: IUserDetails) {
  return (dispatch) => {
    cibusApi.getUserOrders(fromDate, toDate, user.token).then((response) => {
      dispatch(saveOrders(response.orders));
    });
  };
}

export function changeMonthBy(bias: number) {
  return (dispatch, getState: () => IAppState) => {
    dispatch(updateMonthBy(bias));
    const {
      stats: { fromDate, toDate },
      user
    } = getState();

    getStats(fromDate, toDate, user)(dispatch);
  };
}
