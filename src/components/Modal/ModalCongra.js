import React, { Component } from "react";
import { Modal, Button } from "semantic-ui-react";

export default class ModalCongra extends Component {
  constructor() {
    super();

    this.closeModal = this.closeModal.bind(this);
  }
  closeModal() {
    this.setState({
      visibleModal: false
    });
  }
  render() {
    const { winner, visibleModal } = this.props;
    return (
      <div>
        <Modal size="tiny" open={visibleModal} onClose={this.closeModal}>
          <Modal.Header>
            <h3 className="text-center">Chúc mừng</h3>
          </Modal.Header>
          <Modal.Content>
            <p className="text-center">
              Chúc mừng {winner} đã dành chiến thằng
            </p>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.closeModal}>Xem chi tiết</Button>
            <Button onClick={this.closeModal}>Chơi tiếp</Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}
