import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const UpdateEmployeeForm = ({ show, onClose, onConfirm }) => {

  // States to manage the form fields
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [department, setDepartment] = useState("");

  
  // Function to handle form submission
  const handleSubmit = () => {
    const updatedEmployee = {
        Emp_Name: name,
        Emp_Age: age,
        Emp_Speciality: speciality,
        Emp_Department: department, // Corrected field name
      };
    onConfirm(updatedEmployee);
  };

  if (!show) return null;

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Employee Information</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Employee Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter employee name"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Enter employee age"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Speciality</Form.Label>
            <Form.Control
              type="text"
              value={speciality}
              onChange={(e) => setSpeciality(e.target.value)}
              placeholder="Enter employee speciality"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Department ID</Form.Label>
            <Form.Control
              type="number"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              placeholder="Enter employee department"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateEmployeeForm;
