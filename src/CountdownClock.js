import React, { Component } from 'react';
import axios from 'axios';

class CountdownClock extends Component {
  constructor() {
    super();
    this.state = {
      time: {},
      countdownDate: null,
    };
    this.timer = 0;
    this.tick = this.tick.bind(this);
  }

  convertSeconds(secs) {
    const days = Math.floor(secs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((secs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((secs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((secs % (1000 * 60)) / 1000);
    return { days, hours, minutes, seconds };
  }

  async tick() {
    const now = new Date().getTime();
    const distance = this.state.countdownDate - now;
    if (distance < 0) {
      clearInterval(this.timer);
    }
    this.setState({ time: this.convertSeconds(distance) });
  }

  async calculateTimeofCommit() {
    const { data } = await axios.get(
      'https://api.staging.coord.co/codechallenge/commits'
    );
    // multiply by 1000 to get milliseconds
    const firstCommit = data[data.length - 1] * 1000;
    const lastCommit = data[0] * 1000;

    // extrapolate time of 2000th commit
    const timeSoFar = lastCommit - firstCommit;
    const commitsSoFar = data.length;
    const commitsUntil2000 = 2000 - commitsSoFar;
    const now = new Date().getTime();
    return now + (commitsUntil2000 / commitsSoFar) * timeSoFar;
  }

  async componentDidMount() {
    const countdownDate = await this.calculateTimeofCommit();
    this.setState({ countdownDate });
    this.timer = setInterval(this.tick, 1000);
  }

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
      </div>
    );
  }
}

export default CountdownClock;
