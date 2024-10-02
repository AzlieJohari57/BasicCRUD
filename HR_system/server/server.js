import express from "express";
import mysql from "mysql";
import cors from "cors";
import axios from "axios";
import session from "express-session";

const app = express();
app.use(express.json());

// Configure session middleware
app.use(
  session({
    secret: "your-secret-key", // Add a secret key for session signing
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      secure: false, // Set to true in production with HTTPS
      httpOnly: true, // Ensures the cookie is sent only over HTTP(S), not client JavaScript
    },
  })
);

app.use(
  cors({
    origin: ["http://localhost:5174"], // Allow requests from this origin
    methods: ["POST", "GET", "DELETE", "PUT", "PATCH"], // Allow POST, GET, and DELETE methods
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);

// Database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "hr_system",
});

// Get all employees and their departments
app.get("/employees", (req, res) => {
  const sql =
    "SELECT employee.*, department.* FROM employee RIGHT JOIN department ON employee.Emp_Department = department.Dep_ID";

  db.query(sql, (err, result) => {
    if (err) {
      return res.json({
        success: false,
        message: "Database query error",
        error: err,
      });
    }
    if (result.length > 0) {
      return res.json({ success: true, data: result });
    } else {
      return res.json({ success: false, message: "Employee doesn't exist" });
    }
  });
});

// Get employees and their projects
app.get("/employees/projects", (req, res) => {
  const sql =
    "SELECT em.*, empr.*, pr.* FROM employee em JOIN employee_project empr ON em.Emp_ID = empr.EmpID_FK JOIN project pr ON empr.ProjectID_FK = pr.Project_ID";

  db.query(sql, (err, result) => {
    if (err) {
      return res.json({
        success: false,
        message: "Database query error",
        error: err,
      });
    }
    if (result.length > 0) {
      return res.json({ success: true, data: result });
    } else {
      return res.json({ success: false, message: "Employee doesn't exist" });
    }
  });
});

// Add a new employee
app.post("/AddEmployees", (req, res) => {
  console.log("Request Body:", req.body);

  const { Emp_Name, Emp_Age, Emp_Speciality, Emp_Department } = req.body;

  const sql = `
      INSERT INTO employee (Emp_Name, Emp_Age, Emp_Speciality, Emp_Department)
      VALUES ( ?, ?, ?, ?)
    `;

  db.query(
    sql,
    [Emp_Name, Emp_Age, Emp_Speciality, Emp_Department],
    (err, result) => {
      if (err) {
        console.error("Database query error:", err);
        return res.json({
          success: false,
          message: "Database query error",
          error: err,
        });
      }
      return res.json({
        success: true,
        message: "Employee added successfully",
      });
    }
  );
});

// Update an employee (using PUT for complete replacement)
app.put("/employees/:EmpID", (req, res) => {
  console.log("Request Body:", req.body);

  const { EmpID } = req.params;
  const { Emp_Name, Emp_Age, Emp_Speciality, Emp_Department } = req.body;

  if (!EmpID) {
    return res.json({ success: false, message: "Employee ID is required" });
  }

  const sql =
    "UPDATE `employee` SET `Emp_Name` = ?, `Emp_Age` = ?, `Emp_Speciality` = ?, `Emp_Department` = ? WHERE `Emp_ID` = ?";

  db.query(
    sql,
    [Emp_Name, Emp_Age, Emp_Speciality, Emp_Department, EmpID],
    (err, result) => {
      if (err) {
        return res.json({
          success: false,
          message: "Database query error",
          error: err,
        });
      }
      if (result.affectedRows > 0) {
        return res.json({
          success: true,
          message: "Employee updated successfully",
        });
      } else {
        return res.json({ success: false, message: "Employee doesn't exist" });
      }
    }
  );
});

// Delete an employee
app.delete("/employees/:EmpID", (req, res) => {
  const { EmpID } = req.params;
  const sql = "DELETE FROM employee WHERE Emp_ID = ?";

  db.query(sql, [EmpID], (err, result) => {
    if (err) {
      return res.json({
        success: false,
        message: "Database query error",
        error: err,
      });
    }
    if (result.affectedRows > 0) {
      return res.json({
        success: true,
        message: "Employee deleted successfully",
      });
    } else {
      return res.json({ success: false, message: "Employee doesn't exist" });
    }
  });
});


app.listen(8800, () => {
  console.log("Connected to backend on http://localhost:8800/");
});
