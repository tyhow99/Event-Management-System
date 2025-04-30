const express = require("express");
const router = express.Router();
const pool = require("../db.js"); // Update the path based on your directory structure

// Create an employee
router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const { full_name, phone_number, email, dob, job } = req.body;
    const newEmployee = await pool.query(
      "INSERT INTO employee_information (full_name, phone_number, email, dob, job) VALUES($1,$2,$3,$4,$5)",
      [full_name, phone_number, email, dob, job]
    );
    res.json(newEmployee);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Error creating employee" });
  }
});

// See all employees
router.get("/", async (req, res) => {
  try {
    const allEmployees = await pool.query("SELECT * FROM employee_information");
    res.json(allEmployees.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Error fetching employees" });
  }
});

// Get an employee
router.get("/:worker_id", async (req, res) => {
  try {
    const { worker_id } = req.params;
    const employee = await pool.query(
      "SELECT * FROM employee_information WHERE worker_id = $1",
      [worker_id]
    );
    res.json(employee.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Error fetching employee" });
  }
});

// Update an employee
router.put("/:worker_id", async (req, res) => {
  try {
    const { worker_id } = req.params;
    const { full_name, phone_number, email, dob, job } = req.body;
    const updateEmployee = await pool.query(
      "UPDATE employee_information SET full_name=$1, phone_number=$2, email=$3, dob=$4, job=$5 WHERE worker_id=$6",
      [full_name, phone_number, email, dob, job, worker_id]
    );
    res.json({ message: "Employee updated successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Error updating employee" });
  }
});

// DELETE an employee by ID
router.delete('/:id', async (req, res) => {
  const workerId = req.params.id;

  try {
    const result = await pool.query(
      'DELETE FROM employee_information WHERE worker_id = $1',
      [workerId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (err) {
    console.error('Error deleting employee:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = router;
