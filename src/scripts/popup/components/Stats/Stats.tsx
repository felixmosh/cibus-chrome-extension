import { Component, h } from 'preact';
import { connect } from 'preact-redux';
import { IAppState, IReduxProps, IUserDetails } from '../../../../types/types';
import { changeMonthBy, getStats } from '../../store/actions/stats';
import { Balance } from '../Balance/Balance';
import { MonthlyExpense } from '../MonthlyExpense/MonthlyExpense';
import { MonthNavigation } from '../MonthNavigation/MonthNavigation';

interface IStatsProps extends IReduxProps, Partial<IAppState> {}

class StatsInner extends Component<IStatsProps> {
  public componentDidMount() {
    const { user, stats, dispatch } = this.props;
    dispatch(getStats(stats.fromDate, stats.toDate, user as IUserDetails));
  }

  public render() {
    const { stats } = this.props;
    return (
      <div>
        <MonthNavigation
          currentDate={stats.fromDate}
          onClickPrev={this.onClickPrev}
          onClickNext={this.onClickNext}
        />
        <Balance stats={stats} />
        <MonthlyExpense stats={stats} />
      </div>
    );
  }

  private onClickPrev = () => {
    const { dispatch } = this.props;
    dispatch(changeMonthBy(-1));
  };

  private onClickNext = () => {
    const { dispatch } = this.props;
    dispatch(changeMonthBy(1));
  };
}

export const Stats = connect((s: IAppState) => s)(StatsInner as any);
