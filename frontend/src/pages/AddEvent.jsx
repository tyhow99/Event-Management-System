import { useState } from 'react';
import axios from 'axios';
import './AddEvent.css';

const AddEvent = () => {
    const [formData, setFormData] = useState({
        event_name: '',
        event_date: '',
        event_start: '',
        event_end: '',
        organizer: '',
    });

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // New error message state

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5001/event_schedule', formData);
            console.log("Event added:", response.data);
            setSuccessMessage("Event added successfully!");
            setErrorMessage(''); // Clear any previous errors
            setTimeout(() => setSuccessMessage(''), 3000); // Hide success message after 3 seconds

            //Reset after sucessful submit 
            setFormData({
                event_name: '',
                event_date: '',
                event_start: '',
                event_end: '',
                organizer: '',
            });
        } catch (error) {
            console.error("There was an error adding the event:", error);
            setErrorMessage("Failed to add event. Please try again.");
            setSuccessMessage(''); // Clear any success message
        }
    };

    return (
        <div className="container">
            <h1>Add New Event</h1>
            {successMessage && <p className="success-message">{successMessage}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}
            <div className="form-container">
                <form onSubmit={handleSubmit} className="event-form">
                    <input
                        type="text"
                        placeholder="Event Name"
                        id="event_name"
                        name="event_name"
                        value={formData.event_name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="date"
                        placeholder="Date"
                        id="event_date"
                        name="event_date"
                        value={formData.event_date}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="time"
                        placeholder="Start Time"
                        id="event_start"
                        name="event_start"
                        value={formData.event_start}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="time"
                        placeholder="End Time"
                        id="event_end"
                        name="event_end"
                        value={formData.event_end}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Organizer"
                        id="organizer"
                        name="organizer"
                        value={formData.organizer}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">Add</button>
                </form>
            </div>
        </div>
    );
};

export default AddEvent;