import { h } from 'preact';
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  LabelList,
  ResponsiveContainer
} from 'precharts';
import {formatPrice, IStatsState} from '../../store/reducers/stats-reducer';
import { TooltipContent } from '../TooltipContent/TooltipContent';

export const Balance = ({ stats }: { stats: IStatsState }) => {
  const overdraft = stats.coveredByCompany - stats.totalExpense;
  let bar1;
  let bar2;
  let label1;
  let label2;
  let color1;
  let color2;

  if (overdraft >= 0) {
    bar1 = stats.totalExpense;
    bar2 = overdraft;
    label1 = '';
    label2 = '';
    color1 = '#3db241';
    color2 = '#dddddd';
  } else {
    bar1 = overdraft * -1;
    bar2 = stats.coveredByCompany;
    label1 = 'חריגה';
    label2 = 'מסובסד';
    color1 = '#ff453f';
    color2 = '#3db241';
  }
  const data = [{ bar1, bar2, label1, label2 }];

  return (
    <div>
      <h3>מאזן תקציב חודשי:</h3>
      <ResponsiveContainer width={'100%'} height={70}>
        <BarChart height={70} data={data} layout={'vertical'}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis type="category" width={0} />
          <Tooltip
            wrapperStyle={{ left: 0, top: -40 }}
            content={({ payload }) => (
              <TooltipContent withCaret>
                <ol>
                  {payload.map((item, index) => (
                    <li key={item.dataKey} style={{ color: item.color }}>
                      {`${item.payload[`label${index + 1}`]}: `}
                      <strong>
                        {formatPrice(item.value)}
                      </strong>
                    </li>
                  ))}
                </ol>
              </TooltipContent>
            )}
          />
          <Bar dataKey="bar1" stackId="a" fill={color1} />
          <Bar dataKey="bar2" stackId="a" fill={color2} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
