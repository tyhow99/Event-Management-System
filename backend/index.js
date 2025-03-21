const express = require('express');
const app = express();
const cors = require("cors");
const pool = require("./db")
const employeeRoutes = require("./routes/routes.employeeInformation.js")
const port = 5000

//middleware
app.use(cors());
app.use(express.json());//gives access to req.body

//routes
app.use("/employee_information", employeeRoutes);

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})