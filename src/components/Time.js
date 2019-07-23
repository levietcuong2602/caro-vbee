import React, { Component } from "react";

export default class Time extends Component {
  render() {
    const { min, sec } = this.props;
    return (
      <div className="time-game">
        <p className="minute">{min}</p>
        <p>:</p>
        <p className="second">{sec}</p>
      </div>
    );
  }
}
