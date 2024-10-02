import React, { useEffect, useState } from "react";
import axios from "axios";

const Project = () => {
  // View
  // ------------------------------

  const [EmployeeProjectList, SetEmployeeProjectList] = useState([]);

  // Extract `fetchAllItem` outside of `useEffect` so it can be used anywhere
  const fetchAllItem = async () => {
    try {
      const res = await axios.get("http://localhost:8800/getEmployeeProject");

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

  return (
    <div>
      <main className="container mt-4">
        <div className="row mb-2">
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
                {EmployeeProjectList.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.Emp_Name}</td>
                    <td>{item.Emp_Age}</td>
                    <td>{item.Emp_Speciality}</td>
                    <td>{item.Dep_Name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Project;
