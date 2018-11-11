import {Component, h} from 'preact';
import {connect} from 'preact-redux';
import {IAppState, IReduxProps} from '../../types/types';
import {LoginForm} from './components/LoginForm/LoginForm';
import {Stats} from './components/Stats';
import {login, restoreLogin} from './store/actions/user';
import {Header} from './components/Header/Header';

interface IAppProps extends IReduxProps, Partial<IAppState> {
}

@connect((s: IAppState) => s)
export class App extends Component<IAppProps, {}> {
  constructor(props) {
    super(props);
    this.onLogin = this.onLogin.bind(this);
  }

  public componentWillMount() {
    const {dispatch} = this.props;
    dispatch(restoreLogin());
  }

  public render() {
    return <div>
      <Header firstname={this.props.user.firstname} lastname={this.props.user.lastname}/>
      <main>{this.renderContent()}</main>
    </div>;
  }

  private renderContent() {
    const {user} = this.props;
    if (user.isRestoreLoginInProgress) {
      return <div>טוען...</div>;
    } else {
      if (!this.props.user.isLoginInProgress && !!this.props.user.token) {
        return <Stats/>;
      } else {
        return (
          <LoginForm
            onLogin={this.onLogin}
            errorMessage={this.props.user.loginError}
          />
        );
      }
    }
  }

  private onLogin(username: string, password: string) {
    this.props.dispatch(login(username, password));
  }
}
