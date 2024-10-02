import React from "react";
import { Modal, Button } from "react-bootstrap";


const ConfirmDeleteEmp = ({ show, onClose, onConfirm }) => {
    if (!show) return null;

    return (
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to Delete?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={onClose}>
            No
          </Button>
          <Button variant="primary" onClick={onConfirm}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    );
}

export default ConfirmDeleteEmp