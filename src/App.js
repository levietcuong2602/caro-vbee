import React, { Component } from "react";
import "./App.css";

import OwnGame from "./components/OwnGame";
import { Button, Modal, Input } from "semantic-ui-react";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      gameSize: 3,
      gameSetting: 3,
      modalVisible: true
      // gameOptions: [
      //   { key: "3", value: "3", text: "Chạm 3 (default)" },
      //   { key: "4", value: "4", text: "Chạm 4" },
      //   { key: "5", value: "5", text: "Chạm 5" }
      // ]
    };

    this.closeModal = this.closeModal.bind(this);
    this.onSave = this.onSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  closeModal() {
    this.setState({ modalVisible: false });
  }

  onSave() {
    this.setState({ modalVisible: false });
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    const { gameSize, modalVisible, gameSetting } = this.state;

    return (
      <div className="mt-3">
        <div className="container">
          <OwnGame gameSize={gameSize} gameSetting={gameSetting} />
        </div>

        <Modal
          size="tiny"
          open={modalVisible}
          onClose={this.closeModal}
          style={{ position: "relative", height: "100%" }}
        >
          <Modal.Header style={{ background: "#3b943b", color: "#fff" }}>
            <h3 className="text-center">Game Setting</h3>
          </Modal.Header>
          <Modal.Content>
            <div className="row mt-3">
              <div className="col-lg-4">
                <label>
                  <strong>Game size: </strong>
                </label>
              </div>
              <div className="col-lg-8">
                <Input
                  name="gameSize"
                  placeholder="Nhập game size"
                  type="number"
                  style={{ width: "100%" }}
                  onChange={e => this.handleChange(e)}
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-lg-4">
                <label>
                  <strong>Settings: </strong>
                </label>
              </div>
              <div className="col-lg-8">
                {/* <Select
                  name="gameSetting"
                  placeholder="Select game settings"
                  options={gameOptions}
                  style={{ width: "100%" }}
                  onChange={e => this.handleChange(e)}
                /> */}
                <select
                  name="gameSetting"
                  id="gameSetting"
                  value="3"
                  style={{ width: "100%", height: "40px", borderRadius: "3px" }}
                  onChange={e => this.handleChange(e)}
                >
                  <option value="3">Chạm 3 (default)</option>
                  <option value="4">Chạm 4</option>
                  <option value="5">Chạm 5</option>
                </select>
              </div>
            </div>
          </Modal.Content>
          <Modal.Actions className="text-center">
            <Button positive onClick={this.onSave}>
              Xác nhận
            </Button>
            <Button negative onClick={this.closeModal}>
              Hủy bỏ
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}
