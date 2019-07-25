import React, { Component } from "react";
import { Modal, Button } from "semantic-ui-react";
import * as constants from "../../constants/index";
export default class ModalCongra extends Component {
  constructor() {
    super();
    this.state = {
      visibleModal: false
    };

    this.closeModal = this.closeModal.bind(this);
    this.handleResetGame = this.handleResetGame.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.statusGame === constants.GAME_END) {
      this.setState({
        visibleModal: true
      });
    }
  }

  closeModal() {
    this.setState({
      visibleModal: false
    });
  }

  handleResetGame(e) {
    this.setState({
      visibleModal: false
    });
    this.props.onReset(e);
  }

  render() {
    const { visibleModal } = this.state;
    const { winner } = this.props;
    let status;
    if (winner) {
      status = `Xin chúc mừng <strong>${
        winner.winnerPlayer
      }</strong> đã dành chiến thắng`;
    } else {
      status = "Hoà cờ";
    }

    return (
      <div>
        <Modal
          size="tiny"
          open={visibleModal}
          onClose={this.closeModal}
          style={{ position: "relative" }}
        >
          <Modal.Header style={{ background: "#3b943b", color: "#fff" }}>
            <h3 className="text-center">Chúc mừng</h3>
          </Modal.Header>
          <Modal.Content>
            <p
              className="text-center"
              dangerouslySetInnerHTML={{ __html: status }}
            >
              {/* {status} */}
            </p>
          </Modal.Content>
          <Modal.Actions className="text-center">
            <Button positive onClick={this.closeModal}>
              Xem chi tiết
            </Button>
            <Button negative onClick={this.handleResetGame}>
              Đánh lại
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}
