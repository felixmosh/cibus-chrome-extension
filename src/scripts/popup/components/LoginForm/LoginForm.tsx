import { Component, h } from 'preact';
import * as s from './LoginForm.scss';

export interface ILoginFormProps {
  onLogin: (username: string, password: string) => void;
  errorMessage?: string;
}

interface ILoginFormState {
  username: string;
  password: string;
  hasError: 'username' | 'password' | '';
  isSubmitted: boolean;
}

export class LoginForm extends Component<ILoginFormProps, ILoginFormState> {
  constructor(props) {
    super(props);

    this.state = {
      hasError: '',
      password: '',
      username: '',
      isSubmitted: false,
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  public render() {
    return (
      <form onSubmit={this.onSubmit} className={s.LoginForm}>
        <ul className={s.formList}>
          <li>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="אימייל"
              onInput={this.onInputChange}
              value={this.state.username}
            />
          </li>
          <li>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="סיסמא"
              onInput={this.onInputChange}
              value={this.state.password}
            />
          </li>
          {this.state.hasError && this.state.isSubmitted && (
            <li>
              <label className={s.errorMessage} for={this.state.hasError}>
                חובה למלא את כל השדות
              </label>
            </li>
          )}
          {this.props.errorMessage && (
            <li>
              <div className={s.errorMessage}>{this.props.errorMessage}</div>
            </li>
          )}
          <li>
            <button type="submit">התחבר</button>
          </li>
        </ul>
      </form>
    );
  }

  private onSubmit(e) {
    e.preventDefault();
    this.setState({ isSubmitted: true });
    const errorMessage = this.updateErrorMessage();
    if (!errorMessage) {
      this.props.onLogin(this.state.username, this.state.password);
    }
  }

  private onInputChange(e) {
    this.setState({ [e.target.name]: e.target.value }, () => {
      this.updateErrorMessage();
    });
  }

  private updateErrorMessage() {
    const errorMessage = this.getErrorMessage();
    this.setState({ hasError: errorMessage });
    return errorMessage;
  }

  private getErrorMessage() {
    if (!this.state.username) {
      return 'username';
    } else if (!this.state.password) {
      return 'password';
    }
    return '';
  }
}
