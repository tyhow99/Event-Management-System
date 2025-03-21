const express = require('express');
const app = express();
const cors = require("cors");
const pool = require("./db")
const port = 5000

//middleware
app.use(cors());
app.use(express.json());//gives access to req.body

//create an employee
app.post("/employee_information", async(req,res) =>{
    try {
        console.log(res.body)
        const {full_name, phone_number, email, dob, job} = req.body;
        const newEmployee = await pool.query("INSERT INTO employee_information (full_name, phone_number,email,dob,job) VALUES($1,$2,$3,$4,$5)",
            [full_name,phone_number,email,dob,job]);
        res.json(newEmployee);
    } catch (err) {
        console.log("error");
        console.error(err.message);
    }
});

//see all employees
app.get("/employee_information", async(req,res)=> {
    try {
        const allEmployees = await pool.query("SELECT * FROM employee_information");
        res.json(allEmployees);
    } catch (err) {
        console.error(err.message)
    }
});

//get a employee
app.get("/employee_information/:worker_id", async(req,res)=> {
    try {
        const {worker_id} = req.params;
        const employee = await pool.query("SELECT * FROM employee_information WHERE worker_id = $1", [worker_id]);
        res.json(employee.rows[0]);
    } catch (err) {
        console.error(err.message)
    }
});

//update an employee
app.put("/employee_information/:worker_id", async (req,res) => {
    try {
        const { worker_id } = req.params;
        const { full_name, phone_number, email, dob, job } = req.body;
        const updateEmployee = await pool.query(
        "UPDATE employee_information SET full_name=$1, phone_number=$2, email=$3, dob=$4, job=$5 WHERE worker_id=$6",
        [full_name, phone_number, email, dob, job, worker_id]
);
res.json("Was updated");

    } catch (error) {

    }
})
app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})