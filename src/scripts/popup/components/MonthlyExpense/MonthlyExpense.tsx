import { h } from 'preact';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'precharts';
import { IOrder } from '../../../../types/types';
import { formatPrice, getDateKey, IStatsState } from '../../store/reducers/stats-reducer';
import { TooltipContent } from '../TooltipContent/TooltipContent';

export const MonthlyExpense = ({ stats }: { stats: IStatsState }) => {
  const data = stats.orders.map((stat) => ({
    displayDate: getDateKey(stat.date),
    ...stat,
  }));
  return (
    <div>
      <h3>פירוט חיובים חודשי:</h3>
      <ResponsiveContainer height={240}>
        <BarChart height={240} data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="displayDate" />
          <YAxis width={0} />
          <Tooltip
            wrapperStyle={{ left: 0, top: -20 }}
            content={({ payload }) => {
              const columnData = payload[0];
              if (columnData) {
                return (
                  <TooltipContent>
                    <ol>
                      {columnData.payload.orders.map((order: IOrder) => (
                        <li key={`${order.restaurantName}`}>{`${
                          order.restaurantName
                        } - ${formatPrice(order.price)}`}</li>
                      ))}
                    </ol>
                    <time>
                      {columnData.payload.date.toLocaleDateString('he-IL', {
                        day: '2-digit',
                        weekday: 'long',
                        month: '2-digit',
                      })}
                    </time>
                    {columnData.payload.total ? (
                      <strong>סה״כ: {formatPrice(columnData.payload.total)}</strong>
                    ) : null}
                  </TooltipContent>
                );
              }
            }}
          />
          <ReferenceLine y={35} stroke="red" strokeDasharray="3 3" />
          <Bar dataKey="total" fill="#8884d8" unit="ILS" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
