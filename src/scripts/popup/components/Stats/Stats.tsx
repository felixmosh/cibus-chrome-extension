import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { IAppState, IReduxProps, IUserDetails } from '../../../../types/types';
import { getStats } from '../../store/actions/stats';
import { Balance } from '../Balance/Balance';
import {MonthlyExpense} from '../MonthlyExpense/MonthlyExpense';

interface IStatsProps extends IReduxProps, Partial<IAppState> {}

@connect((s: IAppState) => s)
export class Stats extends Component<IStatsProps> {
  public componentWillMount() {
    const { user, stats, dispatch } = this.props;
    dispatch(getStats(stats.fromDate, stats.toDate, user as IUserDetails));
  }

  public render() {
    return (
      <div>
        <Balance stats={this.props.stats}/>
        <MonthlyExpense stats={this.props.stats} />
      </div>
    );
  }
}
