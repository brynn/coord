import React, { Component } from 'react';
import { convertSeconds, calculateTimeofCommit } from './utils';

class CountdownClock extends Component {
  constructor() {
    super();
    this.state = {
      time: {},
      countdownDate: null,
    };
    this.timer = 0;
    this.tick = this.tick.bind(this);
    this.addCommit = this.addCommit.bind(this);
  }

  async componentDidMount() {
    const countdownDate = await calculateTimeofCommit();
    this.setState({ countdownDate });
    this.timer = setInterval(this.tick, 1000);
  }

  tick() {
    const now = new Date().getTime();
    const distance = this.state.countdownDate - now;
    if (distance < 0) {
      clearInterval(this.timer);
    }
    this.setState({ time: convertSeconds(distance) });
  }

  addCommit() {}

  render() {
    return (
      <div>
        <h3>Time Until 2000th Commit:</h3>
        {this.state.time.days ? (
          <p>
            {this.state.time.days} days {this.state.time.hours} hours{' '}
            {this.state.time.minutes} minutes {this.state.time.seconds} seconds
          </p>
        ) : (
          <p>Loading...</p>
        )}
        <button onClick={this.addCommit}>Commit</button>
      </div>
    );
  }
}

export default CountdownClock;
