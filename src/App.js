import React, { Component } from "react";
import "./App.css";

import OwnGame from "./components/OwnGame";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      gameSize: 5
    };
  }

  render() {
    const { gameSize } = this.state;
    return (
      <div className="mt-3">
        <div className="container">
          <OwnGame gameSize={gameSize} />
        </div>
      </div>
    );
  }
}
