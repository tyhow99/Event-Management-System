import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./AddWorker.css";

const UpdateEvent = () => {
  const { event_id } = useParams(); // Get event_id from the URL params
  const navigate = useNavigate();

  const [event, setEvent] = useState({
    event_name: "",
    event_start: "",
    event_end: "",
    event_date: "",
    organizer: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/event_schedule/${event_id}`
        );
        setEvent(response.data);
      } catch (error) {
        console.error("Error fetching event data:", error);
        setErrorMessage("Failed to load event data. Please try again.");
      }
    };

    fetchEvent();
  }, [event_id]);

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:5001/event_schedule/${event_id}`,
        event
      );
      setSuccessMessage("Event updated successfully!");
      setErrorMessage("");
      setTimeout(() => {
        setSuccessMessage("");
        navigate("/EventSchedule"); // Redirect back to the event schedule page
      }, 2000);
    } catch (error) {
      console.error("Error updating event:", error);
      setErrorMessage("Failed to update event. Please try again.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="container">
      <h1 className="update-worker-header">Update Event Information</h1>

      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <div className="form-container">
        <form onSubmit={handleSubmit} className="worker-form">
          <input
            type="text"
            placeholder="Event Name"
            name="event_name"
            value={event.event_name}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Event Start Time"
            name="event_start"
            value={event.event_start}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Event End Time"
            name="event_end"
            value={event.event_end}
            onChange={handleChange}
          />
          <input
            type="date"
            placeholder="Event Date"
            name="event_date"
            value={event.event_date}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Organizer"
            name="organizer"
            value={event.organizer}
            onChange={handleChange}
          />
          <div className="form-actions">
            <button type="submit">Update Event</button>
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate("/EventSchedule")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateEvent;
