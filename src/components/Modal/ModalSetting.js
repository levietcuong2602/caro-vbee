import React, { Component } from "react";
import { Modal, Button, Input } from "semantic-ui-react";

export default class ModalSetting extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gameSize: 3,
      gameSetting: 3,
      modalVisible: true
    };

    this.closeModal = this.closeModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  closeModal() {
    this.setState({ modalVisible: false });
  }

  handleSave() {
    const { gameSize, gameSetting } = this.state;
    this.setState({
      modalVisible: false
    });
    if (gameSize >= gameSetting) {
      this.setState(
        {
          gameSetting: parseInt(gameSetting),
          gameSize: parseInt(gameSize)
        },
        () => {
          this.props.onSave(this.state);
        }
      );
    }
  }

  render() {
    const { modalVisible, gameSetting, gameSize } = this.state;
    console.log(modalVisible);
    return (
      <div className="modal-setting">
        <Modal
          size="tiny"
          open={modalVisible}
          onClose={this.closeModal}
          style={{ position: "relative", height: "auto" }}
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
                  value={gameSize}
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
                <select
                  name="gameSetting"
                  id="gameSetting"
                  value={gameSetting}
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
            <Button positive onClick={this.handleSave}>
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
