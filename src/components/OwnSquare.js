import React, { Component } from "react";

export default class OwnSquare extends Component {
  render() {
    const classNames = `square ${this.props.winner}`;
    return (
      <button className={classNames} onClick={this.props.onClick}>
        {this.props.value}
      </button>
    );
  }
}
