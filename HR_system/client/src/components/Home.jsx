import React, { useEffect, useState } from "react";
import axios from "axios";
import ModalDelete from "./ConfirmDeleteEmp";
import ModalUpdate from "./UpdateEmployeeForm";
import ModalAdd from "./AddEmployee";

const Home = () => {
  // View
  // ------------------------------

  const [EmployeeList, SetEmployeeList] = useState([]);

  // Extract `fetchAllItem` outside of `useEffect` so it can be used anywhere
  const fetchAllItem = async () => {
    try {
      const res = await axios.get("http://localhost:8800/employees");

      console.log("Data returned:", res);

      // Accessing the data correctly and ensuring it's an array
      const data = Array.isArray(res.data.data) ? res.data.data : [];
      SetEmployeeList(data);
    } catch (err) {
      console.error("Error fetching items:", err);
      SetEmployeeList([]); // Ensure EmployeeList is an array
    }
  };

  useEffect(() => {
    fetchAllItem(); // Initial fetch when the component mounts
  }, []); // Empty dependency array ensures this runs only on component mount

  // Delete
  // ------------------------------

  const [showModalDelete, setShowModalDelete] = useState(false);
  const [selectedEmpID, setSelectedEmpID] = useState(null);

  // Function to handle deleting an employee
  const handleDelete = async () => {
    if (selectedEmpID == null) return;

    try {
      const res = await axios.delete(
        `http://localhost:8800/employees/${selectedEmpID}`
      );
      if (res.data.success) {
        // Refresh the employee list after deletion
        fetchAllItem();
        handleCloseModal(); // Close the modal after deletion
      } else {
        console.error("Error:", res.data.message);
      }
    } catch (err) {
      console.error("Error deleting employee:", err);
    }
  };

  // Function to handle opening the delete confirmation modal
  const handleDeleteModal = (EmpID) => {
    setSelectedEmpID(EmpID);
    setShowModalDelete(true);
  };

  // Function to handle closing the modal
  const handleCloseModal = () => {
    setShowModalDelete(false);
    setSelectedEmpID(null);
  };

  // Update
  // ------------------------------

  const [showModalUpdate, setshowModalUpdate] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // Function to handle opening the update modal
  const handleUpdateModal = (employee) => {
    setSelectedEmployee(employee);
    setshowModalUpdate(true);
  };

  // Function to handle closing the update modal
  const handleCloseUpdateModal = () => {
    setshowModalUpdate(false);
    setSelectedEmployee(null);
  };

  // Function to handle updating an employee
  const handleUpdate = async (updatedEmployee) => {
    if (!updatedEmployee) return;

    console.log("Updated Employee:", updatedEmployee); // Check if EmpID is included

    try {
      const res = await axios.put(
        `http://localhost:8800/employees/${updatedEmployee.Emp_ID}`,
        {
          Emp_Name: updatedEmployee.Emp_Name,
          Emp_Age: updatedEmployee.Emp_Age,
          Emp_Speciality: updatedEmployee.Emp_Speciality,
          Emp_Department: updatedEmployee.Emp_Department,
        }
      );

      if (res.data.success) {
        // Refresh the employee list after update
        fetchAllItem();
        handleCloseUpdateModal();
        console.log("result:", res.data.message);
      } else {
        console.error("Error:", res.data.message);
      }
    } catch (err) {
      console.error("Error updating employee:", err);
    }
  };

  // Add
  // ------------------------------

  const [showModalAdd, setShowModalAdd] = useState(false);

  // Function to handle opening the add employee modal
  const handleAddModal = () => {
    setShowModalAdd(true);
  };

  // Function to handle closing the add employee modal
  const handleCloseAddModal = () => {
    setShowModalAdd(false);
  };

  // Function to handle adding an employee
  const handleAdd = async (addEmployee) => {
    if (!addEmployee) return;

    console.log("Added Employee:", addEmployee);

    try {
      const res = await axios.post("http://localhost:8800/AddEmployees", {
        EmpID: addEmployee.Emp_ID,
        Emp_Name: addEmployee.Emp_Name,
        Emp_Age: addEmployee.Emp_Age,
        Emp_Speciality: addEmployee.Emp_Speciality,
        Emp_Department: addEmployee.Emp_Department,
      });

      if (res.data.success) {
        // Refresh the employee list after adding a new employee
        fetchAllItem();
        handleCloseAddModal();
        console.error("result:", res.data.message);
      } else {
        console.error("Error:", res.data.message);
      }
    } catch (err) {
      console.error("Error adding employee:", err);
    }
  };

  return (
    <div>
      <main className="container mt-4">
        <div className="row mb-2">
          <div className="col-lg-12">
            <div>
              <button
                className="btn btn-primary"
                onClick={() => handleAddModal()}
              >
                Add Employee
              </button>
            </div>
          </div>
          <div className="col-lg-12">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Number</th>
                  <th>Employee Name</th>
                  <th>Age</th>
                  <th>Speciality</th>
                  <th>Department Name</th>
                  <th>Update</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {EmployeeList.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.Emp_Name}</td>
                    <td>{item.Emp_Age}</td>
                    <td>{item.Emp_Speciality}</td>
                    <td>{item.Dep_Name}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleUpdateModal(item)}
                      >
                        Update
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteModal(item.Emp_ID)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <ModalDelete
        show={showModalDelete}
        onClose={handleCloseModal}
        onConfirm={handleDelete}
      />

      <ModalUpdate
        show={showModalUpdate}
        onClose={handleCloseUpdateModal}
        onConfirm={(data) => handleUpdate({ ...selectedEmployee, ...data })} // Ensures EmpID is included
        employee={selectedEmployee}
      />

      <ModalAdd
        show={showModalAdd}
        onClose={handleCloseAddModal}
        onConfirm={handleAdd}
      />
    </div>
  );
};

export default Home;
