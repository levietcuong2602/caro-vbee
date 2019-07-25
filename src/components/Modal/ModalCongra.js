import React, { Component } from "react";
import { Modal, Button } from "semantic-ui-react";

export default class ModalCongra extends Component {
  constructor() {
    super();
    this.state = {
      visibleModal: false
    };

    this.closeModal = this.closeModal.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.winner) {
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

  render() {
    const { visibleModal } = this.state;
    const { winner } = this.props;
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
            <p className="text-center">
              Chúc mừng <strong>{winner && winner.winnerPlayer}</strong> đã dành
              chiến thằng
            </p>
          </Modal.Content>
          <Modal.Actions className="text-center">
            <Button positive onClick={this.closeModal}>
              Xem chi tiết
            </Button>
            <Button negative onClick={this.closeModal}>
              Đánh lại
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}
