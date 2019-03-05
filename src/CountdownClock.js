import React, { Component } from 'react';

class CountdownClock extends Component {
  constructor() {
    super();
    this.state = {
      time: {},
    };
  }

  convertSeconds(secs) {
    const days = Math.floor(secs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((secs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((secs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((secs % (1000 * 60)) / 1000);
    return { days, hours, minutes, seconds };
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <h3>Time Until 2000th Commit:</h3>
        <p>
          {this.state.time.days}days {this.state.time.hours}hours{' '}
          {this.state.time.minutes}minutes {this.state.time.seconds}seconds
        </p>
      </div>
    );
  }
}

export default CountdownClock;
