import React, { Component } from 'react';
import { convertSeconds, getDataFromUrl, calculateTimeofCommit } from './utils';

class CountdownClock extends Component {
  constructor() {
    super();
    this.state = {
      time: {},
      countdownDate: null,
      data: [],
      message: '',
    };
    this.timer = 0;
    this.tick = this.tick.bind(this);
    this.addCommit = this.addCommit.bind(this);
  }

  async componentDidMount() {
    const data = await getDataFromUrl();
    this.setState({ data, countdownDate: calculateTimeofCommit(data) });
    this.timer = setInterval(this.tick, 1000);
  }

  tick() {
    const now = new Date().getTime();
    const distance = this.state.countdownDate - now;
    if (distance < 0) {
      clearInterval(this.timer);
      this.setState({ message: '🎉 2000th commit reached! 🎉' });
    }
    this.setState({ time: convertSeconds(distance) });
  }

  addCommit() {
    const now = Math.floor(new Date().getTime() / 1000);
    const data = [now, ...this.state.data];
    this.setState({ data, countdownDate: calculateTimeofCommit(data) });
  }

  render() {
    return (
      <div>
        <h2>Time Until 2000th Commit</h2>
        {this.state.time.days ? (
          <p>
            ⏲️ {this.state.time.days} days {this.state.time.hours} hours{' '}
            {this.state.time.minutes} minutes {this.state.time.seconds} seconds
            ⏲️
          </p>
        ) : (
          <p>⌛ Loading... ⌛</p>
        )}
        <p>{this.state.message}</p>
        <button type="button" onClick={this.addCommit}>
          ➕Add Another Commit
        </button>
      </div>
    );
  }
}

export default CountdownClock;
