const express = require("express");
const router = express.Router();
const pool = require("../db"); // Update the path based on your directory structure

// Create a Worker Schedule Entry
router.post("/", async (req, res) => {
    try {
        const {vendor_id, event_id, pay_rate, worker_start, worker_end, section, schedule_date,  worker_id} = req.body;
        const newWorkerSchedule = await pool.query(
            "INSERT INTO worker_schedule (vendor_id, event_id, pay_rate, worker_start, worker_end, section, schedule_date, worker_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
            [worker_id, vendor_id, event_id, pay_rate, worker_start, worker_end, section]
        );
        res.json(newWorkerSchedule.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Error creating worker schedule entry" });
    }
});

// Get All Worker Schedules
router.get("/", async (req, res) => {
    try {
        const allWorkerSchedules = await pool.query("SELECT * FROM worker_schedule");
        res.json(allWorkerSchedules.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Error retrieving worker schedules" });
    }
});

// Get Worker Schedule by ID
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const workerSchedule = await pool.query(
            "SELECT * FROM worker_schedule WHERE worker_id = $1",
            [id]
        );
        if (workerSchedule.rows.length === 0) {
            return res.status(404).json({ error: "Worker schedule not found" });
        }
        res.json(workerSchedule.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Error retrieving worker schedule" });
    }
});

// Update Worker Schedule Information
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { vendor_id, event_id, pay_rate, worker_start, worker_end, section } = req.body;
        const updatedWorkerSchedule = await pool.query(
            "UPDATE worker_schedule SET vendor_id = $1, event_id = $2, pay_rate = $3, worker_start = $4, worker_end = $5, section = $6 WHERE worker_id = $7 RETURNING *",
            [vendor_id, event_id, pay_rate, worker_start, worker_end, section, id]
        );
        if (updatedWorkerSchedule.rows.length === 0) {
            return res.status(404).json({ error: "Worker schedule not found" });
        }
        res.json(updatedWorkerSchedule.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Error updating worker schedule" });
    }
});

// Delete Worker Schedule
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedWorkerSchedule = await pool.query(
            "DELETE FROM worker_schedule WHERE worker_id = $1 RETURNING *",
            [id]
        );
        if (deletedWorkerSchedule.rows.length === 0) {
            return res.status(404).json({ error: "Worker schedule not found" });
        }
        res.json({ message: "Worker schedule deleted successfully" });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Error deleting worker schedule" });
    }
});


module.exports = router;
