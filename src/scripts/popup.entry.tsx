import {Component, h, render} from 'preact';

class Clock extends Component {
  public render() {
    const time = new Date().toLocaleTimeString();
    return <span>{time}</span>;
  }
}

render(<Clock/>, document.getElementById('root'));
