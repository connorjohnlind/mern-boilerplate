import React from 'react';
import { hot } from 'react-hot-loader';

import './Counter.scss';
import teacup from '../images/teacup.png';

class Counter extends React.Component {
  state = {
    count: 1,
  }
  climb() {
    this.setState({
      count: this.state.count + 1,
    });
  }
  render() {
    return (
      <div className="Counter">
        <img src={teacup} alt="teacup" />
        <button onClick={() => this.climb()}>Cups Drank Today: {this.state.count}</button>
      </div>
    );
  }
}

export default hot(module)(Counter);
