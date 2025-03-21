const express = require("express");
const router = express.Router();
const pool = require("../db"); // Update the path based on your directory structure

router.post("/", async (req, res) => {
    try {
        const { vendor_name, contact_info, specialty } = req.body;
        const newVendor = await pool.query(
            "INSERT INTO vendor_information (vendor_name, contact_info, specialty) VALUES ($1, $2, $3) RETURNING *",
            [vendor_name, contact_info, specialty]
        );
        res.json(newVendor.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Error creating vendor" });
    }
});

router.get("/", async (req, res) => {
    try {
        const allVendors = await pool.query("SELECT * FROM vendor_information");
        res.json(allVendors.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Error retrieving vendor_information" });
    }
});


router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const vendor = await pool.query(
            "SELECT * FROM vendor_information WHERE vendor_id = $1",
            [id]
        );
        if (vendor.rows.length === 0) {
            return res.status(404).json({ error: "Vendor not found" });
        }
        res.json(vendor.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Error retrieving vendor" });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { vendor_name, contact_info, specialty } = req.body;
        const updatedVendor = await pool.query(
            "UPDATE vendor_information SET vendor_name = $1, contact_info = $2, specialty = $3 WHERE vendor_id = $4 RETURNING *",
            [vendor_name, contact_info, specialty, id]
        );
        if (updatedVendor.rows.length === 0) {
            return res.status(404).json({ error: "Vendor not found" });
        }
        res.json(updatedVendor.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Error updating vendor" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedVendor = await pool.query(
            "DELETE FROM vendor_information WHERE vendor_id = $1 RETURNING *",
            [id]
        );
        if (deletedVendor.rows.length === 0) {
            return res.status(404).json({ error: "Vendor not found" });
        }
        res.json({ message: "Vendor deleted successfully" });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Error deleting vendor" });
    }
});


module.exports = router;
