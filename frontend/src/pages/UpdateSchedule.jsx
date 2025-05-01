import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./AddWorker.css";

const UpdateWorkerSchedule = () => {
  const { worker_id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    vendor_id: "",
    event_id: "",
    pay_rate: "",
    worker_start: "",
    worker_end: "",
    section: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchScheduleData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/worker_schedule/${worker_id}`
        );
        const scheduleData = response.data;

        // Safely handle potential undefined/null values
        const formattedStart = scheduleData.worker_start
          ? scheduleData.worker_start.includes("T")
            ? scheduleData.worker_start.split("T")[1].substring(0, 5)
            : scheduleData.worker_start.substring(0, 5)
          : "";

        const formattedEnd = scheduleData.worker_end
          ? scheduleData.worker_end.includes("T")
            ? scheduleData.worker_end.split("T")[1].substring(0, 5)
            : scheduleData.worker_end.substring(0, 5)
          : "";

        setFormData({
          vendor_id: scheduleData.vendor_id || "",
          event_id: scheduleData.event_id || "",
          pay_rate: scheduleData.pay_rate || "",
          worker_start: formattedStart,
          worker_end: formattedEnd,
          section: scheduleData.section || "",
        });
      } catch (error) {
        console.error("Error fetching schedule data:", error);
        setErrorMessage("Failed to load schedule data. Please try again.");
      }
    };

    fetchScheduleData();
  }, [worker_id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5001/worker_schedule/${worker_id}`,
        formData
      );
      setSuccessMessage("Worker schedule updated successfully!");
      setErrorMessage("");
      setTimeout(() => {
        setSuccessMessage("");
        navigate("/WorkerSchedule");
      }, 2000);
    } catch (error) {
      console.error("Error updating worker schedule:", error);
      setErrorMessage("Failed to update worker schedule. Please try again.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="container">
      <h1 className="update-worker-header">Update Worker Schedule</h1>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="form-container">
        <form onSubmit={handleSubmit} className="worker-form">
          <input
            type="text"
            placeholder="Vendor ID"
            id="vendor_id"
            name="vendor_id"
            value={formData.vendor_id}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Event ID"
            id="event_id"
            name="event_id"
            value={formData.event_id}
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Pay Rate"
            id="pay_rate"
            name="pay_rate"
            value={formData.pay_rate}
            onChange={handleChange}
            step="0.01"
          />
          <input
            type="time"
            placeholder="Start Time"
            id="worker_start"
            name="worker_start"
            value={formData.worker_start}
            onChange={handleChange}
          />
          <input
            type="time"
            placeholder="End Time"
            id="worker_end"
            name="worker_end"
            value={formData.worker_end}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Section"
            id="section"
            name="section"
            value={formData.section}
            onChange={handleChange}
          />
          <div className="form-actions">
            <button type="submit">Update</button>
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate("/WorkerSchedule")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateWorkerSchedule;
