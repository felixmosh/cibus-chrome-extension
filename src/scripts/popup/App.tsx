import {Component, h} from 'preact';
import {connect} from 'preact-redux';
import {IReduxProps} from '../../types/types';
import {login} from './store/actions/user';

interface IAppProps extends IReduxProps {
  dispatch?: (action: any) => void;
}

@connect((s: any) => s)
export class App extends Component<IAppProps, {}> {
  public componentWillMount() {
    const {dispatch} = this.props;
    dispatch(login());
  }

  public render() {
    return <main>
      <section>

        sdfdsf

      </section>
    </main>;
  }
}
