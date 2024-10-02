import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const UpdateEmployeeForm = ({ show, onClose, onConfirm, employee }) => {
  // States to manage the form fields
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [department, setDepartment] = useState("");

  // Populate the form fields with employee data when the component is shown
  useEffect(() => {
    if (employee) {
      console.log("Employee data:", employee); // Check if EmpID is present
      setName(employee.Emp_Name || "");
      setAge(employee.Emp_Age || "");
      setSpeciality(employee.Emp_Speciality || "");
      setDepartment(employee.Dep_ID || "");
    }
  }, [employee]);

  // Function to handle form submission
  const handleSubmit = () => {
    const updatedEmployee = {
        Emp_ID: employee.Emp_ID, // Ensure EmpID is included
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
        <Modal.Title>Update Employee Information</Modal.Title>
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
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateEmployeeForm;
