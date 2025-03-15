const express = require('express');
const app = express();
const cors = require("cors");
const pool = require("./db")
const port = 5000

//middleware
app.use(cors());
app.use(express.json());//gives access to req.body

//create an employee
app.post("/employee_information", async(res,req) =>{
    try {
        console.log(res.body)
        const {full_name, phone_number, email, dob, job} = res.body;
        const newEmployee = await pool.query("INSERT INTO employee_information (full_name, phone_number,email,dob,job) VALUES($1,$2,$3,$4,$5)",
            [full_name,phone_number,email,dob,job]);
    } catch (err) {
        console.log("error");
        console.error(err.message);
    }
});


app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})