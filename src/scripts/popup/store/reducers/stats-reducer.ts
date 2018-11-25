import { IAction, IOrder, IOrderDay } from '../../../../types/types';
import { StatsActions } from '../actions/stats';

export interface IStatsState {
  fromDate: Date;
  toDate: Date;
  orders: IOrderDay[];
  coveredByCompany: number;
  totalExpense: number;
}

const today = new Date();
const initialState: IStatsState = {
  fromDate: getFirstDayOfMonth(today),
  toDate: getLastDayOfMonth(today),
  orders: [],
  coveredByCompany: 770,
  totalExpense: 0
};

export function statsReducer(
  state: IStatsState = initialState,
  action: IAction
) {
  switch (action.type) {
    case StatsActions.SAVE_ORDERS:
      return {
        ...state,
        orders: calculateOrders(action.value, state),
        totalExpense: calculateTotalExpense(action.value)
      };
    case StatsActions.UPDATE_MONTH_BY:
      const newDate = new Date(
        state.fromDate.getFullYear(),
        state.fromDate.getMonth() + action.value,
        state.fromDate.getDate()
      );
      return {
        ...state,
        fromDate: getFirstDayOfMonth(newDate),
        toDate: getLastDayOfMonth(newDate)
      };
    default:
      return state;
  }
}

export function getFirstDayOfMonth(date: Date): Date {
  const y = date.getFullYear();
  const m = date.getMonth();
  return new Date(y, m, 1);
}

function getLastDayOfMonth(date: Date): Date {
  const y = date.getFullYear();
  const m = date.getMonth();
  return new Date(y, m + 1, 0);
}

function calculateTotalExpense(orders: IOrder[]): number {
  return orders.reduce((total, order) => total + order.price, 0);
}

export function getDateKey(date) {
  return date.toLocaleDateString('he-IL', { day: '2-digit', month: '2-digit' });
}

function calculateOrders(orders: IOrder[], state: IStatsState) {
  const sortedOrders = orders.sort(
    (d1, d2) => d1.date.getTime() - d2.date.getTime()
  );
  const accOrders: { [key: string]: IOrderDay } = {};

  for (let i = state.fromDate.getDate(); i < state.toDate.getDate(); i++) {
    const currentDate = new Date(
      state.fromDate.getFullYear(),
      state.fromDate.getMonth(),
      state.fromDate.getDate() + i
    );

    const key = getDateKey(currentDate);
    const dayOrders = sortedOrders.filter(
      (order) => key === getDateKey(order.date)
    );

    accOrders[key] = {
      date: currentDate,
      orders: dayOrders,
      total: dayOrders.reduce((total, { price }) => total + price, 0)
    };
  }

  return Object.values(accOrders);
}

export function formatPrice(price: number) {
  return price.toLocaleString('he-IL', {
    style: 'currency',
    currency: 'ILS'
  });
}
