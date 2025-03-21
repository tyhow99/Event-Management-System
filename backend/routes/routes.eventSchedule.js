const express = require("express");
const router = express.Router();
const pool = require("../db"); // Update the path based on your directory structure

// Create an event
router.post("/", async (req, res) => {
    try {
        const { event_name, event_date, event_start, event_end, organizer } = req.body;
        const newEvent = await pool.query(
            "INSERT INTO event_schedule (event_name, event_date, event_start, event_end, organizer) VALUES($1,$2,$3,$4,$5)",
            [event_name, event_date, event_start, event_end, organizer]
        );
        res.json(newEvent);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Error creating event" });
    }
});

//prints all events
router.get("/", async (req, res) => {
    try {
        const allEvents = await pool.query("SELECT * FROM event_schedule");
        res.json(allEvents.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Error fetching events" });
    }
}
);

//get an event
router.get("/:event_id", async (req, res) => {
    try {
        const { event_id } = req.params;
        const event = await pool.query(
            "SELECT * FROM event_schedule WHERE event_id = $1",
            [event_id]
        );
        res.json(event.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Error fetching event" });
    }
}
);
//update an event
router.put("/:event_id", async (req, res) => {
    try {
        const { event_id } = req.params;
        const { event_name, event_date, event_start, event_end, organizer } = req.body;
        const updateEvent = await pool.query(
            "UPDATE event_schedule SET event_name=$1, event_date=$2, event_start=$3, event_end=$4, organizer=$5 WHERE event_id=$6",
            [event_name, event_date, event_start, event_end, organizer, event_id]
        );
        res.json({ message: "Event updated successfully" });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Error updating event" });
    }
});
//delete an event
router.delete("/:event_id", async (req, res) => {
    try {
        const { event_id } = req.params;
        const deleteEvent = await pool.query(
            "DELETE FROM event_schedule WHERE event_id = $1",
            [event_id]
        );
        res.json({ message: "Event deleted successfully" });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Error deleting event" });
    }
});


module.exports = router;
