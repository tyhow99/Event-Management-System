const express = require('express');
const app = express();
const cors = require("cors");
const pool = require("./db")
const employeeRoutes = require("./routes/routes.employeeInformation.js")
const eventRoutes = require("./routes/routes.eventSchedule.js")
const vendorRoutes = require("./routes/routes.vendorInformation.js")
const workerScheduleRoutes = require("./routes/routes.worker_schedule.js")
const port = 5000

//middleware
app.use(cors());
app.use(express.json());//gives access to req.body

//routes
app.use("/employee_information", employeeRoutes);
app.use("/event_schedule", eventRoutes);
app.use("/vendor_information", vendorRoutes);
app.use("/worker_schedule", workerScheduleRoutes);

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})