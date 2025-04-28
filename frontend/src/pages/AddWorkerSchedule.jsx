import { useState } from 'react';
import axios from 'axios';
import './AddWorkerSchedule.css';

const AddWorkerSchedule = () => {
    const [formData, setFormData] = useState({
        vendor_id: '',
        event_id: '',
        pay_rate: '',
        worker_start: '',
        worker_end: '',
        section: '',
        schedule_date: '',
        worker_id: '',
    });

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // New error message state

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5001/worker_schedule', formData);
            console.log("Schedule added:", response.data);
            setSuccessMessage("Schedule added successfully!");
            setErrorMessage(''); // Clear any previous errors
            setTimeout(() => setSuccessMessage(''), 3000); // Hide success message after 3 seconds
    
            //Reset after sucessful submit
            setFormData({
                vendor_id: '',
                event_id: '',
                pay_rate: '',
                worker_start: '',
                worker_end: '',
                section: '',
                schedule_date: '',
                worker_id: '',
            });
        } catch (error) {
            console.error("There was an error adding the worker schedule:", error);
            setErrorMessage("Failed to add worker schedule. Please try again.");
            setSuccessMessage(''); // Clear any success message
        }
    };

    return (
        <div className="container">
            <h1>Add New Worker Schedule</h1>
            {successMessage && <p className="success-message">{successMessage}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}
            <div className="form-container">
                <form onSubmit={handleSubmit} className="worker-schedule-form">
                    <input
                    type="number"
                    placeholder="Vendor ID"
                    id="vendor_id"
                    name="vendor_id"
                    value={formData.vendor_id}
                    onChange={handleChange}
                    required
                    />

                    <input
                    type="number"
                    placeholder="Event ID"
                    id="event_id"
                    name="event_id"
                    value={formData.event_id}
                    onChange={handleChange}
                    required
                    />

                    <input
                    type="number"
                    placeholder="Pay Rate"
                    id="pay_rate"
                    name="pay_rate"
                    step="0.01"
                    value={formData.pay_rate}
                    onChange={handleChange}
                    required
                    />

                    <input
                    type="time"
                    placeholder="Start Time"
                    id="worker_start"
                    name="worker_start"
                    value={formData.worker_start}
                    onChange={handleChange}
                    required
                    />

                    <input
                    type="time"
                    placeholder="End Time"
                    id="worker_end"
                    name="worker_end"
                    value={formData.worker_end}
                    onChange={handleChange}
                    required
                    />

                    <input
                    type="text"
                    placeholder="Section"
                    id="section"
                    name="section"
                    value={formData.section}
                    onChange={handleChange}
                    required
                    />

                    <input
                    type="date"
                    placeholder="Date"
                    id="schedule_date"
                    name="schedule_date"
                    value={formData.schedule_date}
                    onChange={handleChange}
                    required
                    />

                    <input
                    type="number"
                    placeholder="Worker ID"
                    id="worker_id"
                    name="worker_id"
                    value={formData.worker_id}
                    onChange={handleChange}
                    required
                    />

                    <button type="submit">Add</button>
                </form>
            </div>
        </div>
    );
};

export default AddWorkerSchedule;