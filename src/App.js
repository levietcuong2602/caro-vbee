import React, { Component } from "react";
import "./App.css";

import OwnGame from "./components/OwnGame";
import ModalSetting from "./components/Modal/ModalSetting";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      gameSize: 3,
      gameSetting: 3
    };

    this.onSave = this.onSave.bind(this);
  }

  onSave({ gameSize, gameSetting }) {
    if (gameSize || gameSetting) {
      this.setState({ gameSize, gameSetting });
    }
  }

  render() {
    const { gameSize, gameSetting } = this.state;

    return (
      <div className="mt-3">
        <div className="container">
          <OwnGame gameSize={gameSize} gameSetting={gameSetting} />
        </div>
        <ModalSetting onSave={this.onSave} />
      </div>
    );
  }
}
