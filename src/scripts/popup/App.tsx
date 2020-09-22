import { Component, h } from 'preact';
import { connect } from 'preact-redux';
import { IAppState, IReduxProps } from '../../types/types';
import { LoginForm } from './components/LoginForm/LoginForm';
import { Stats } from './components/Stats/Stats';
import { login, restoreLogin } from './store/actions/user';
import { Header } from './components/Header/Header';
import * as styles from './App.scss';

interface IAppProps extends IReduxProps, Partial<IAppState> {}

@((connect() as any)((s: IAppState) => s))
export class App extends Component<IAppProps> {
  constructor(props) {
    super(props);
    this.onLogin = this.onLogin.bind(this);
  }

  public componentDidMount() {
    const { dispatch } = this.props;
    dispatch(restoreLogin());
  }

  public componentDidUpdate(previousProps: Readonly<IAppProps>) {
    if (this.props.user.company_id !== previousProps.user.company_id) {
      document.body.style.setProperty(
        '--company-logo',
        `url(https://www.mysodexo.co.il/images/company_logo/CompLogo${this.props.user.company_id}_1.jpg)`
      );
    }
  }

  public render() {
    const { user } = this.props;
    return (
      <div className={styles.app}>
        <Header firstname={user.firstname} lastname={user.lastname} />
        <main className={styles.main}>{this.renderContent()}</main>
      </div>
    );
  }

  private renderContent() {
    const { user } = this.props;
    if (user.isRestoreLoginInProgress) {
      return <div>טוען...</div>;
    }

    if (!this.props.user.isLoginInProgress && !!this.props.user.token) {
      return <Stats />;
    }

    return (
      <LoginForm
        onLogin={this.onLogin}
        errorMessage={this.props.user.loginError}
      />
    );
  }

  private onLogin(username: string, password: string) {
    this.props.dispatch(login(username, password));
  }
}
