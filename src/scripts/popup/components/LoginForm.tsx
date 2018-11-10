import {Component, h} from 'preact';

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
      isSubmitted: false
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  public render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          type="text"
          name="username"
          id="username"
          onInput={this.onInputChange}
          value={this.state.username}
        />
        <input
          type="password"
          name="password"
          id="password"
          onInput={this.onInputChange}
          value={this.state.password}
        />
        {this.state.hasError && this.state.isSubmitted && (
          <label for={this.state.hasError}>חובה למלא את כל השדות</label>
        )}
        {this.props.errorMessage && <div>{this.props.errorMessage}</div>}
        <input type="submit">התחבר</input>
      </form>
    );
  }

  private onSubmit(e) {
    e.preventDefault();
    this.setState({isSubmitted: true});
    const errorMessage = this.updateErrorMessage();
    if (!errorMessage) {
      this.props.onLogin(this.state.username, this.state.password);
    }
  }

  private onInputChange(e) {
    this.setState({[e.target.name]: e.target.value}, () => {
      this.updateErrorMessage();
    });
  }

  private updateErrorMessage() {
    const errorMessage = this.getErrorMessage();
    this.setState({hasError: errorMessage});
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
