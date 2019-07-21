import React, { Component } from "react";

export default class Time extends Component {
  render() {
    const { styleObj } = this.props;
    return (
      <div className="time-game" style={styleObj}>
        <p>time </p>
        <p className="minute">12</p>
        <p> : </p>
        <p className="second">05</p>
      </div>
    );
  }
}
